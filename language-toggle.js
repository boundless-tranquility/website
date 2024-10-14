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
