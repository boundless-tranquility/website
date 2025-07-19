// Jest setup file for DOM testing
require('@testing-library/jest-dom');

// Mock fetch globally for RSS feed tests
global.fetch = jest.fn();

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'en-US',
  writable: true
});

Object.defineProperty(navigator, 'userLanguage', {
  value: 'en-US',
  writable: true
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:8000/',
    pathname: '/',
    assign: jest.fn(),
    replace: jest.fn(),
  },
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Setup DOM environment
document.body.innerHTML = `
  <nav>
    <div class="container">
      <a href="#home" class="logo">
        <img src="/images/logo.svg" alt="Boundless Tranquillity Capital Logo">
      </a>
      <div class="menu-toggle" id="mobile-menu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <ul class="nav-links" id="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#philosophy">Investment Philosophy</a></li>
        <li><a href="#blog">Market Insights</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#disclosure">Disclosure</a></li>
      </ul>
      <button id="language-toggle" class="language-toggle">中文</button>
    </div>
  </nav>
  <section id="blog" class="section blog">
    <div class="container">
      <h2>Market Insights</h2>
      <p class="blog-intro">Stay informed with our latest market observations and analysis.</p>
      <div class="blog-posts">
        <!-- Blog posts will be loaded dynamically from RSS feed -->
      </div>
    </div>
  </section>
`;

// Helper function to load and execute scripts
global.loadScript = function(scriptPath) {
  const fs = require('fs');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  
  // Create a function from the script content
  const scriptFunction = new Function('document', 'window', 'localStorage', 'navigator', scriptContent);
  
  // Execute the script with the mocked environment
  scriptFunction(document, window, localStorageMock, navigator);
};

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  window.location.assign.mockClear();
  if (window.location.replace && window.location.replace.mockClear) {
    window.location.replace.mockClear();
  }
  global.fetch.mockClear();
}); 