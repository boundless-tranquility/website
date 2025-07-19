# Boundless Tranquility Capital Website

A professional website for Boundless Tranquility Capital, featuring automated RSS feed integration from the Market Decoding blog.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Bilingual Support**: English and Chinese versions with automatic language detection
- **Dynamic Blog Integration**: Automatically loads latest posts from Blogger RSS feed
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Performance Optimized**: Fast loading times and efficient resource usage
- **Automated Testing**: 49 unit tests with 100% reliability
- **Quality Assurance**: Git hooks ensure code quality on every commit/push
- **Dynamic Year Management**: Automatic year updates in HTML and README

## Project Structure

```
fund-website/
├── index.html              # English version
├── index-zh.html           # Chinese version
├── thank-you.html          # Contact form success page
├── style.css               # Main stylesheet
├── script.js               # Navigation and mobile menu
├── language-toggle.js      # Language switching logic
├── rss-feed.js             # RSS feed handler (English)
├── rss-feed-zh.js          # RSS feed handler (Chinese)
├── update-readme-year.js   # Automated year update script
├── images/                 # Image assets
├── tests/                  # Test files
│   ├── setup.js           # Jest setup and mocks
│   ├── basic.test.js      # Basic functionality tests
│   ├── rss-feed.test.js   # RSS feed tests
│   ├── navigation.test.js # Navigation tests
│   └── language-toggle.test.js # Language toggle tests
├── .github/workflows/      # GitHub Actions
│   └── test.yml
├── .husky/                 # Git hooks
│   ├── pre-commit         # Pre-commit hook
│   └── pre-push           # Pre-push hook
├── package.json            # Dependencies and scripts
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3+ (for local server)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/boundless-tranquility/website
```

2. Install dependencies:
```bash
npm install
```

3. Start local development server:
```bash
python -m http.server 8000
```

4. Open your browser and navigate to `http://localhost:8000`

## Automated Year Management

The website automatically keeps years current:

- **HTML Files**: Use `<script>document.write(new Date().getFullYear());</script>` for dynamic year display
- **README**: Automatically updated on every push via Git hooks
- **No Manual Updates**: Years stay current without manual intervention

## Testing

### Running Tests

The project includes comprehensive testing with multiple layers:

#### 1. Unit Tests (Jest)
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

#### 2. Linting
```bash
# Run ESLint (JavaScript)
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

#### 3. All Tests Together
```bash
# Run all tests and linting
npm run test:all

# Update year in README
npm run update-readme-year

# Git Hooks (Automated)
- **Pre-commit**: Runs linting and tests before each commit
- **Pre-push**: Updates README year and runs all tests before pushing
```

### Test Coverage

The project maintains high test coverage:
- **Unit Tests**: 49 tests covering all JavaScript functionality
- **Test Categories**: RSS feed, navigation, language toggle, basic functionality
- **Error Handling**: Comprehensive error scenario testing
- **Mock Environment**: Full DOM and browser API mocking for reliable tests

## Automated Testing with GitHub Actions

The project includes automated testing that runs on every push and pull request:

### What Gets Tested Automatically:

1. **Code Quality**
   - ESLint for JavaScript linting and style checking

2. **Unit Tests**
   - RSS feed functionality (fetching, parsing, display)
   - Navigation system (mobile menu, smooth scrolling)
   - Language toggle (localStorage, redirects)
   - Basic functionality (DOM manipulation, event handling)

3. **Security**
   - Dependency vulnerability scanning
   - Security audit with npm audit

### Pre-Push Hook Setup

Tests automatically run before pushing to GitHub via Husky pre-push hooks.

### GitHub Actions Workflows

The project uses two automated workflows:

#### 1. **Test Website** (`test.yml`)
- **Triggers**: Every push and pull request
- **Purpose**: Quality assurance and testing
- **Steps**:
  - ✅ Linting (ESLint)
  - ✅ Unit tests (49 tests)
  - ✅ Security audit
  - ✅ File verification

#### 2. **Deploy to Pages** (`pages.yml`)
- **Triggers**: Only after successful test workflow
- **Purpose**: Automatic deployment to GitHub Pages
- **Condition**: Only runs if `Test Website` workflow passes
- **Result**: Live website at `https://boundless-tranquility.github.io/website`

### Testing Strategy

The project uses a **simplified and reliable testing approach**:

- ✅ **Unit Tests**: 49 comprehensive tests covering all functionality
- ✅ **Linting**: ESLint ensures code quality and consistency
- ✅ **Git Hooks**: Automated testing on every commit and push

This approach ensures **100% test reliability** while maintaining high code quality.

## Deployment

### Manual Deployment

1. Run all tests:
```bash
npm run test:all
```

2. If all tests pass, deploy to your hosting service

### Automated Deployment

The GitHub Actions workflow automatically:
1. Runs linting and code quality checks
2. Executes all unit tests (49 tests)
3. Performs security audit with npm audit
4. Verifies static site files are present
5. **Only deploys to GitHub Pages if ALL tests pass**

**Deployment Flow:**
```
Push → Test Website Workflow → ✅ Pass → Deploy to GitHub Pages
Push → Test Website Workflow → ❌ Fail → No Deployment
```

## RSS Feed Configuration

The website automatically fetches blog posts from:
- **Blog URL**: https://marketdecoding.blogspot.com/
- **RSS Feed**: https://marketdecoding.blogspot.com/feeds/posts/default?alt=rss
- **Posts Displayed**: Latest 3 posts
- **Update Frequency**: Every page load

### RSS Feed Features:
- Automatic content parsing
- HTML tag removal
- Smart text truncation
- Relative date formatting
- Error handling with fallback
- CORS proxy integration

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance & Quality

- **Fast Loading**: Optimized assets and efficient resource usage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Semantic HTML**: Proper structure for accessibility and SEO
- **Automated Testing**: 49 unit tests ensure reliability
- **Code Quality**: ESLint enforces consistent code style
- **Git Hooks**: Automated quality checks on every commit and push

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test:all`
5. Commit with descriptive messages (pre-commit hook will run tests)
6. Push to your branch (pre-push hook will update year and run tests)
7. Create a pull request

**Note**: Git hooks automatically ensure code quality and test coverage before commits and pushes.

## License

© 2024 Boundless Tranquility Capital Limited. All rights reserved.

## Support

For technical support or questions about the website, contact:
- Email: info@boundlesstranquility.com
- Website: https://www.boundlesstranquility.com/ 