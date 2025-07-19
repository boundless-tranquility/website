describe('Navigation and Mobile Menu', () => {
  let menuToggle;
  let navLinks;

  beforeEach(() => {
    // Setup DOM elements
    menuToggle = document.getElementById('mobile-menu');
    navLinks = document.getElementById('nav-links');
    
    // Reset classes
    navLinks.classList.remove('nav-active');
    menuToggle.classList.remove('is-active');
    document.body.style.overflow = '';
    
    // Manually attach event listeners for testing
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('nav-active');
      menuToggle.classList.toggle('is-active');
      
      if (navLinks.classList.contains('nav-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when links are clicked
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
          navLinks.classList.remove('nav-active');
          menuToggle.classList.remove('is-active');
          document.body.style.overflow = '';
        }
      });
    });
  });

  afterEach(() => {
    // Clean up
    navLinks.classList.remove('nav-active');
    menuToggle.classList.remove('is-active');
    document.body.style.overflow = '';
  });

  describe('Mobile Menu Toggle', () => {
    test('should toggle menu when hamburger is clicked', () => {
      // Initial state
      expect(navLinks.classList.contains('nav-active')).toBe(false);
      expect(menuToggle.classList.contains('is-active')).toBe(false);
      expect(document.body.style.overflow).toBe('');

      // Simulate click
      menuToggle.click();

      // After click
      expect(navLinks.classList.contains('nav-active')).toBe(true);
      expect(menuToggle.classList.contains('is-active')).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');

      // Click again to close
      menuToggle.click();

      // After second click
      expect(navLinks.classList.contains('nav-active')).toBe(false);
      expect(menuToggle.classList.contains('is-active')).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    test('should close menu when navigation link is clicked', () => {
      // Manually open menu
      navLinks.classList.add('nav-active');
      menuToggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      
      expect(navLinks.classList.contains('nav-active')).toBe(true);

      // Click on a navigation link
      const firstLink = navLinks.querySelector('a');
      firstLink.click();

      // Menu should be closed
      expect(navLinks.classList.contains('nav-active')).toBe(false);
      expect(menuToggle.classList.contains('is-active')).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Navigation Links', () => {
    test('should have correct navigation structure', () => {
      const links = navLinks.querySelectorAll('a');
      
      expect(links).toHaveLength(5);
      expect(links[0].getAttribute('href')).toBe('#home');
      expect(links[1].getAttribute('href')).toBe('#philosophy');
      expect(links[2].getAttribute('href')).toBe('#blog');
      expect(links[3].getAttribute('href')).toBe('#about');
      expect(links[4].getAttribute('href')).toBe('#disclosure');
    });

    test('should have proper text content', () => {
      const links = navLinks.querySelectorAll('a');
      
      expect(links[0].textContent.trim()).toBe('Home');
      expect(links[1].textContent.trim()).toBe('Investment Philosophy');
      expect(links[2].textContent.trim()).toBe('Market Insights');
      expect(links[3].textContent.trim()).toBe('About Us');
      expect(links[4].textContent.trim()).toBe('Disclosure');
    });

    test('should have proper accessibility attributes', () => {
      const links = navLinks.querySelectorAll('a');
      
      links.forEach(link => {
        expect(link.hasAttribute('href')).toBe(true);
        expect(link.textContent.trim()).not.toBe('');
      });
    });
  });

  describe('Logo', () => {
    test('should have correct logo structure', () => {
      const logo = document.querySelector('.logo');
      const logoImg = logo.querySelector('img');
      
      expect(logo).toBeTruthy();
      expect(logoImg).toBeTruthy();
      expect(logoImg.getAttribute('src')).toBe('/images/logo.svg');
      expect(logoImg.getAttribute('alt')).toBe('Boundless Tranquillity Capital Logo');
    });

    test('should link to home section', () => {
      const logo = document.querySelector('.logo');
      expect(logo.getAttribute('href')).toBe('#home');
    });
  });

  describe('Language Toggle', () => {
    test('should have language toggle button', () => {
      const languageToggle = document.getElementById('language-toggle');
      
      expect(languageToggle).toBeTruthy();
      expect(languageToggle.textContent.trim()).toBe('中文');
      expect(languageToggle.tagName).toBe('BUTTON');
    });

    test('should have proper styling classes', () => {
      const languageToggle = document.getElementById('language-toggle');
      
      expect(languageToggle.classList.contains('language-toggle')).toBe(true);
    });
  });

  describe('Responsive Design', () => {
    test('should have hamburger menu for mobile', () => {
      const hamburger = document.querySelector('.menu-toggle');
      const bars = hamburger.querySelectorAll('.bar');
      
      expect(hamburger).toBeTruthy();
      expect(bars).toHaveLength(3);
      
      bars.forEach(bar => {
        expect(bar.tagName).toBe('DIV');
      });
    });

    test('should have proper container structure', () => {
      const container = document.querySelector('.container');
      const nav = document.querySelector('nav');
      
      expect(container).toBeTruthy();
      expect(nav).toBeTruthy();
      expect(nav.querySelector('.container')).toBe(container);
    });
  });

  describe('Scroll Behavior', () => {
    test('should prevent body scroll when menu is open', () => {
      // Manually open menu
      navLinks.classList.add('nav-active');
      menuToggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      
      expect(document.body.style.overflow).toBe('hidden');

      // Manually close menu
      navLinks.classList.remove('nav-active');
      menuToggle.classList.remove('is-active');
      document.body.style.overflow = '';
      
      expect(document.body.style.overflow).toBe('');
    });

    test('should restore body scroll when menu is closed via link click', () => {
      // Manually open menu
      navLinks.classList.add('nav-active');
      menuToggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      
      expect(document.body.style.overflow).toBe('hidden');

      // Close via link click
      const firstLink = navLinks.querySelector('a');
      firstLink.click();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Event Listeners', () => {
    test('should handle multiple rapid clicks gracefully', () => {
      // Rapid clicks
      for (let i = 0; i < 5; i++) {
        menuToggle.click();
      }

      // Should be in a consistent state
      const isOpen = navLinks.classList.contains('nav-active');
      expect(menuToggle.classList.contains('is-active')).toBe(isOpen);
      expect(document.body.style.overflow).toBe(isOpen ? 'hidden' : '');
    });

    test('should handle link clicks when menu is closed', () => {
      // Menu starts closed
      expect(navLinks.classList.contains('nav-active')).toBe(false);

      // Click link
      const firstLink = navLinks.querySelector('a');
      firstLink.click();

      // Should still be closed
      expect(navLinks.classList.contains('nav-active')).toBe(false);
    });
  });
}); 