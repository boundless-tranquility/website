// script.js

// Select DOM Items
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

// Toggle Function
function toggleMenu() {
    navLinks.classList.toggle('nav-active');
    menuToggle.classList.toggle('is-active');

    // Prevent scrolling when the menu is open
    if (navLinks.classList.contains('nav-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Event Listener
menuToggle.addEventListener('click', toggleMenu);

// Close the menu when a link is clicked
const navLinksItems = document.querySelectorAll('#nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            toggleMenu();
        }
    });
});
