// Language Toggle Handler
(function() {
    'use strict';
    
    // Get the language toggle button
    const languageToggle = document.getElementById("language-toggle");
    
    if (!languageToggle) {
        console.warn('Language toggle button not found');
        return;
    }
    
    // Handle language toggle and store user's selection in localStorage for future visits
    languageToggle.addEventListener("click", function() {
        const currentLang = window.location.pathname.includes('index-zh.html') ? 'zh' : 'en';

        // Toggle between English and Chinese based on current page
        if (currentLang === 'zh') {
            localStorage.setItem('site-lang', 'en'); // Store English preference
            window.location.assign("index.html"); // Redirect to English version
        } else {
            localStorage.setItem('site-lang', 'zh'); // Store Chinese preference
            window.location.assign("index-zh.html"); // Redirect to Chinese version
        }
    });
    
    // Check for stored language preference on page load
    function checkLanguagePreference() {
        const storedLang = localStorage.getItem('site-lang');
        const currentPath = window.location.pathname;
        
        if (storedLang === 'zh' && !currentPath.includes('index-zh.html')) {
            window.location.assign('index-zh.html');
        } else if (storedLang === 'en' && currentPath.includes('index-zh.html')) {
            window.location.assign('index.html');
        }
    }
    
    // Check browser language on first visit
    function checkBrowserLanguage() {
        const storedLang = localStorage.getItem('site-lang');
        
        // Only check browser language if no preference is stored
        if (!storedLang) {
            const browserLang = navigator.language || navigator.userLanguage;
            const chineseCodes = ['zh', 'zh-CN', 'zh-TW', 'zh-HK', 'zh-SG'];
            
            if (chineseCodes.some(code => browserLang.startsWith(code))) {
                localStorage.setItem('site-lang', 'zh');
                window.location.assign('index-zh.html');
            }
        }
    }
    
    // Initialize language detection
    checkLanguagePreference();
    checkBrowserLanguage();
})();
