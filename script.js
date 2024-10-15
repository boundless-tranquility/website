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

document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is on the root or index page
    const isOnIndexPage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
    const isOnChinesePage = window.location.pathname.includes('index-zh.html');

    if (isOnIndexPage || isOnChinesePage) {
        // Check if a language preference is stored in localStorage
        const userLangPreference = localStorage.getItem('site-lang');

        if (userLangPreference) {
            // If a manual preference exists, redirect to the proper page based on that preference
            if (userLangPreference === 'zh' && !isOnChinesePage) {
                window.location.href = "index-zh.html"; // Redirect to Chinese version
            } else if (userLangPreference === 'en' && isOnChinesePage) {
                window.location.href = "index.html"; // Redirect to English version
            }
        } else {
            // If no preference is stored, use browser language for first-time visitors
            const userLang = navigator.language || navigator.userLanguage;

            if (userLang.includes('zh') && !isOnChinesePage) {
                window.location.href = "index-zh.html"; // Redirect to Chinese version
            }
            // No need to store any preference in localStorage at this point
        }
    }
});
