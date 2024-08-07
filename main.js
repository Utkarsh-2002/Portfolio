console.log("JavaScript is running");

/*================================= Toggle Icon Navbar =======================*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
});


document.querySelectorAll('.radial-progress').forEach(progress => {
    const value = progress.getAttribute('data-progress');
    const radius = 45; // radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    progress.querySelector('circle:last-child').style.strokeDashoffset = offset;
  });

/*=============================== Scroll Section Active Link ============*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`header nav a[href="#${id}"]`).classList.add('active');
        }
    });

    /*============================== Sticky Navbar ===========================*/
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================= Remove Toggle Icon and Navbar ===========*/
    if (!menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    }
});

/*======================= Scroll Reveal =====================*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

/*======================= Typed.js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['ML Engineer', 'SportsPerson', 'AI Enthusiast'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

/*======================= Video Hover Effect ====================*/
document.querySelectorAll('.portfolio-box').forEach(box => {
    const video = box.querySelector('.portfolio-video');

    if (video) {
        box.addEventListener('mouseover', () => {
            video.play();
        });

        box.addEventListener('mouseout', () => {
            video.pause();
            video.currentTime = 0;  // Reset video to the start
        });
    }
});

/*======================= Botpress WebChat Integration ====================*/
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is running");

    // Initialize Botpress WebChat
    if (window.botpressWebChat) {
        window.botpressWebChat.init({
            botId: '43af28f2-6265-4e34-9139-11f2e63bf2d8',
            hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
            useSessionStorage: true, // Use sessionStorage instead of localStorage
            enablePersistHistory: false // Disable persisting sent messages
        });
    } else {
        console.error('Botpress WebChat is not loaded');
    }

    // Toggle chat widget visibility
    const chatWidget = document.getElementById('chat-widget');
    const closeButton = document.getElementById('chat-close-btn');
    const chatIcon = document.getElementById('chat-icon'); // Ensure this element exists

    if (chatWidget && closeButton && chatIcon) {
        // Open and close the widget
        chatIcon.addEventListener('click', function() {
            console.log('Chat icon clicked');
            if (chatWidget.classList.contains('show')) {
                chatWidget.classList.remove('show');
                if (window.botpressWebChat) {
                    window.botpressWebChat.hide(); // Hide the chat when closing
                }
            } else {
                chatWidget.classList.add('show');
                if (window.botpressWebChat) {
                    window.botpressWebChat.show(); // Show the chat when opening
                    window.botpressWebChat.reset(); // Reset the chat
                }
            }
        });

        closeButton.addEventListener('click', function() {
            console.log('Close button clicked');
            chatWidget.classList.remove('show');
            if (window.botpressWebChat) {
                window.botpressWebChat.hide(); // Hide the chat when closing
                window.botpressWebChat.reset(); // Reset the chat
            }
        });

        // Close the chat widget when clicking outside of it
        window.addEventListener('click', function(event) {
            if (!chatWidget.contains(event.target) && !chatIcon.contains(event.target)) {
                chatWidget.classList.remove('show');
                if (window.botpressWebChat) {
                    window.botpressWebChat.hide(); // Hide the chat when closing
                    window.botpressWebChat.reset(); // Reset the chat
                }
            }
        });

        // Close the chat widget when pressing the ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                console.log('ESC key pressed');
                chatWidget.classList.remove('show');
                if (window.botpressWebChat) {
                    window.botpressWebChat.hide(); // Hide the chat when closing
                    window.botpressWebChat.reset(); // Reset the chat
                }
            }
        });
    } else {
        console.error('Chat widget elements not found');
    }
});



/*======================= Read More Toggle ====================*/
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const longDesc = this.previousElementSibling;
        const shortDesc = longDesc.previousElementSibling;
        if (longDesc.style.display === 'none' || longDesc.style.display === '') {
            longDesc.style.display = 'block';
            shortDesc.style.display = 'none';
            this.textContent = 'Read Less';
        } else {
            longDesc.style.display = 'none';
            shortDesc.style.display = 'block';
            this.textContent = 'Read More';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const skillBoxes = document.querySelectorAll('.skill-box');

    const handleScroll = () => {
        skillBoxes.forEach(box => {
            const progress = box.querySelector('.progress');
            const boxTop = box.getBoundingClientRect().top;
            const boxVisible = boxTop - window.innerHeight + 100;

            if (boxVisible < 0 && progress.style.width === '0%') {
                progress.style.width = progress.getAttribute('data-progress') + '%';
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to handle cases where the section is already in view
});
