/* ============================================================
   UTKARSH SINGH GEHLOT — PORTFOLIO JS
   Three.js Stars · Custom Cursor · VanillaTilt · ScrollReveal
   Typed.js · Skill Bars · Timeline · Counter Animation
============================================================ */

/* ────────────────────────────────────────────
   1. CUSTOM CURSOR
──────────────────────────────────────────── */
const cursor   = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    let mx = 0, my = 0;
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
    });

    (function animateFollower() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        follower.style.left = fx + 'px';
        follower.style.top  = fy + 'px';
        requestAnimationFrame(animateFollower);
    })();

    // Hover effect
    document.querySelectorAll('a, button, .skill-card, .project-card, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

/* ────────────────────────────────────────────
   2. THREE.JS PARTICLE BACKGROUND
──────────────────────────────────────────── */
(function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || !window.THREE) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 40;

    // Star geometry
    const COUNT    = window.innerWidth < 768 ? 1200 : 2800;
    const geo      = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    const palette = [
        [0.48, 0.23, 0.93], // purple
        [0.02, 0.71, 0.83], // cyan
        [0.96, 0.96, 0.96], // white
        [0.60, 0.40, 1.00], // lavender
    ];

    for (let i = 0; i < COUNT; i++) {
        // Spread stars in a large sphere
        const r = 80 + Math.random() * 70;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);

        positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
        positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i*3+2] = r * Math.cos(phi);

        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i*3]   = c[0];
        colors[i*3+1] = c[1];
        colors[i*3+2] = c[2];
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.22,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
    });

    const stars = new THREE.Points(geo, mat);
    scene.add(stars);

    // Mouse influence
    let targetRX = 0, targetRY = 0;
    document.addEventListener('mousemove', e => {
        targetRX = (e.clientY / window.innerHeight - 0.5) * 0.6;
        targetRY = (e.clientX / window.innerWidth  - 0.5) * 0.6;
    });

    // Animate
    (function animate() {
        requestAnimationFrame(animate);
        stars.rotation.x += (targetRX - stars.rotation.x) * 0.018 + 0.0003;
        stars.rotation.y += (targetRY - stars.rotation.y) * 0.018 + 0.0007;
        renderer.render(scene, camera);
    })();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* ────────────────────────────────────────────
   3. TYPED.JS
──────────────────────────────────────────── */
if (window.Typed) {
    new Typed('.multiple-text', {
        strings: ['SDE-1', 'AI Enthusiast', 'AI Builder', 'Problem Solver'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1800,
        loop: true,
        cursorChar: '|',
    });
}

/* ────────────────────────────────────────────
   4. STICKY HEADER
──────────────────────────────────────────── */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 60);
});

/* ────────────────────────────────────────────
   5. NAVBAR TOGGLE (MOBILE)
──────────────────────────────────────────── */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    });

    // Close on nav link click
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        });
    });
}

/* ────────────────────────────────────────────
   6. ACTIVE NAV ON SCROLL
──────────────────────────────────────────── */
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`header nav a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

/* ────────────────────────────────────────────
   7. SKILL PILL STAGGER ANIMATION
──────────────────────────────────────────── */
const skillCloud = document.querySelector('.skill-cloud');
if (skillCloud) {
    const pillObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-pill').forEach((pill, i) => {
                    pill.style.opacity = '0';
                    pill.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        pill.style.opacity = '1';
                        pill.style.transform = 'translateY(0)';
                    }, i * 80);
                });
            }
        });
    }, { threshold: 0.2 });
    pillObs.observe(skillCloud);
}

/* ────────────────────────────────────────────
   8. TIMELINE ENTRANCE ANIMATION
──────────────────────────────────────────── */
const timelineItems = document.querySelectorAll('.timeline-item');

const tlObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

timelineItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.18}s`;
    tlObs.observe(item);
});

/* ────────────────────────────────────────────
   9. COUNTER ANIMATION (ABOUT STATS)
──────────────────────────────────────────── */
function animateCounter(el, target, duration = 1400) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

const statsSection = document.querySelector('.about-stats');
let countersTriggered = false;

if (statsSection) {
    const cObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersTriggered) {
                countersTriggered = true;
                document.querySelectorAll('.stat-num[data-count]').forEach(el => {
                    const target = parseInt(el.getAttribute('data-count'));
                    animateCounter(el, target);
                });
            }
        });
    }, { threshold: 0.5 });

    cObs.observe(statsSection);
}

/* ────────────────────────────────────────────
   10. VIDEO HOVER (PROJECT CARDS)
──────────────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

/* ────────────────────────────────────────────
   11. SCROLL REVEAL
──────────────────────────────────────────── */
if (window.ScrollReveal) {
    const sr = ScrollReveal({
        distance: '50px',
        duration: 900,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        reset: false,
        mobile: true,
    });

    sr.reveal('.home-content',   { origin: 'left',   delay: 100 });
    sr.reveal('.home-3d',        { origin: 'right',  delay: 300 });
    sr.reveal('.section-header', { origin: 'top',    delay: 100 });
    sr.reveal('.about-left',     { origin: 'left',   delay: 200 });
    sr.reveal('.about-right',    { origin: 'right',  delay: 300 });
    sr.reveal('.skill-card',     { origin: 'bottom', delay: 100, interval: 80 });
    sr.reveal('.project-card',   { origin: 'bottom', delay: 100, interval: 100 });
    sr.reveal('.contact-info',   { origin: 'left',   delay: 200 });
    sr.reveal('.contact-form',   { origin: 'right',  delay: 300 });
    sr.reveal('.footer-content', { origin: 'bottom', delay: 100 });
}

/* ────────────────────────────────────────────
   12. VANILLA TILT (if not auto-initialized)
──────────────────────────────────────────── */
if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 12,
        speed: 400,
        glare: false,
        'max-glare': 0.15,
    });
}
