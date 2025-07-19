describe('Language Toggle Functionality', () => {
  let languageToggle;

  beforeEach(() => {
    languageToggle = document.getElementById('language-toggle');
    
    // Reset localStorage
    localStorage.clear();
    
    // Reset window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:8000/',
        pathname: '/',
        assign: jest.fn(),
        replace: jest.fn(),
      },
      writable: true,
    });
    
    // Reset navigator language
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    });
    
    Object.defineProperty(navigator, 'userLanguage', {
      value: 'en-US',
      writable: true
    });
  });

  describe('Button Click Functionality', () => {
    test('should toggle from English to Chinese', () => {
      // Set up English page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/index.html',
          pathname: '/index.html',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Click the language toggle button
      languageToggle.click();
      
      // Should store Chinese preference
      expect(localStorage.setItem).toHaveBeenCalledWith('site-lang', 'zh');
      
      // Should redirect to Chinese page
      expect(window.location.assign).toHaveBeenCalledWith('index-zh.html');
    });

    test('should toggle from Chinese to English', () => {
      // Set up Chinese page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/index-zh.html',
          pathname: '/index-zh.html',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Click the language toggle button
      languageToggle.click();
      
      // Should store English preference
      expect(localStorage.setItem).toHaveBeenCalledWith('site-lang', 'en');
      
      // Should redirect to English page
      expect(window.location.assign).toHaveBeenCalledWith('index.html');
    });
  });

  describe('Language Detection', () => {
    test('should detect Chinese browser language', () => {
      // Set Chinese browser language
      Object.defineProperty(navigator, 'language', {
        value: 'zh-CN',
        writable: true
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Should store Chinese preference
      expect(localStorage.setItem).toHaveBeenCalledWith('site-lang', 'zh');
      
      // Should redirect to Chinese page
      expect(window.location.assign).toHaveBeenCalledWith('index-zh.html');
    });

    test('should handle various Chinese language codes', () => {
      const chineseCodes = ['zh', 'zh-CN', 'zh-TW', 'zh-HK', 'zh-SG'];
      
      chineseCodes.forEach(code => {
        // Reset mocks
        jest.clearAllMocks();
        localStorage.clear();
        
        // Set Chinese browser language
        Object.defineProperty(navigator, 'language', {
          value: code,
          writable: true
        });

        // Load the language toggle script
        loadScript('language-toggle.js');
        
        // Should store Chinese preference
        expect(localStorage.setItem).toHaveBeenCalledWith('site-lang', 'zh');
        
        // Should redirect to Chinese page
        expect(window.location.assign).toHaveBeenCalledWith('index-zh.html');
      });
    });
  });

  describe('LocalStorage Persistence', () => {
    test('should respect stored language preference', () => {
      // Set stored preference to Chinese
      localStorage.getItem.mockReturnValue('zh');
      
      // Set up English page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/index.html',
          pathname: '/index.html',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Should check for stored preference
      expect(localStorage.getItem).toHaveBeenCalledWith('site-lang');
      
      // Should redirect to Chinese page
      expect(window.location.assign).toHaveBeenCalledWith('index-zh.html');
    });

    test('should handle switching back to English', () => {
      // Set stored preference to English
      localStorage.getItem.mockReturnValue('en');
      
      // Set up Chinese page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/index-zh.html',
          pathname: '/index-zh.html',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Should check for stored preference
      expect(localStorage.getItem).toHaveBeenCalledWith('site-lang');
      
      // Should redirect to English page
      expect(window.location.assign).toHaveBeenCalledWith('index.html');
    });
  });

  describe('Page-Specific Behavior', () => {
    test('should handle root page correctly', () => {
      // Set up root page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/',
          pathname: '/',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Should check for language preference
      expect(localStorage.getItem).toHaveBeenCalledWith('site-lang');
    });

    test('should handle index.html page correctly', () => {
      // Set up index.html page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/index.html',
          pathname: '/index.html',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Should check for language preference
      expect(localStorage.getItem).toHaveBeenCalledWith('site-lang');
    });

    test('should handle Chinese page correctly', () => {
      // Set up Chinese page
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8000/index-zh.html',
          pathname: '/index-zh.html',
          assign: jest.fn(),
        },
        writable: true,
      });

      // Load the language toggle script
      loadScript('language-toggle.js');
      
      // Should check for language preference
      expect(localStorage.getItem).toHaveBeenCalledWith('site-lang');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing language toggle button gracefully', () => {
      // Remove the language toggle button
      const button = document.getElementById('language-toggle');
      if (button) {
        button.remove();
      }
      
      // Should not throw error when script loads
      expect(() => {
        loadScript('language-toggle.js');
      }).not.toThrow();
    });

    test('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw error
      localStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      // Should not throw error when script loads
      expect(() => {
        loadScript('language-toggle.js');
      }).not.toThrow();
    });
  });
}); 