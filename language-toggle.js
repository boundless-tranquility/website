// Handle language toggle
document.getElementById("language-toggle").addEventListener("click", function() {
    const currentLang = window.location.pathname;

    // Toggle to English if on Chinese version
    if (currentLang.includes('index-zh')) {
        window.location.href = "index.html"; // Redirect to English version
    } else {
        window.location.href = "index-zh.html"; // Redirect to Chinese version
    }
});


// Handle language toggle and store user's selection in localStorage for future visits
document.getElementById("language-toggle").addEventListener("click", function() {
    const currentLang = window.location.pathname.includes('index-zh.html') ? 'zh' : 'en';

    // Toggle between English and Chinese based on current page
    if (currentLang === 'zh') {
        localStorage.setItem('site-lang', 'en'); // Store English preference
        window.location.href = "index.html"; // Redirect to English version
    } else {
        localStorage.setItem('site-lang', 'zh'); // Store Chinese preference
        window.location.href = "index-zh.html"; // Redirect to Chinese version
    }
});
