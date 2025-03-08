# Contributing to IUI Success Tracker

Thank you for considering contributing to IUI Success Tracker! This document outlines the guidelines for contributing to the project.

## Core Principles

Before contributing, please understand our core principles:

1. **Zero Data Storage**: The application must never store user data, either locally or remotely
2. **Complete Privacy**: No analytics, no tracking, no user accounts
3. **Client-Side Only**: All operations must happen in the browser with no server communication
4. **Instant Results**: Calculations and recommendations should be immediate

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the issue, and find related reports.

Before creating bug reports, please check [this list](https://github.com/yourusername/iui-tracker/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots or animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most users.

### Pull Requests

* Fill in the required template
* Follow the TypeScript and React style guides
* Document new code
* End all files with a newline
* Ensure no data storage or server communication is introduced
* Maintain the client-side only architecture

## Development Process

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/iui-tracker.git
   cd iui-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. Make your changes
2. Test your changes:
   ```bash
   npm test
   ```
3. Make sure your code follows the style guidelines:
   ```bash
   npm run lint
   ```
4. Commit your changes using a descriptive commit message that follows [conventional commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new feature"
   ```
5. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a pull request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Styleguide

* Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
* Use types instead of interfaces for consistency
* Avoid using `any` - use proper typing
* Use type inference when possible
* Export types and interfaces when they're needed in other files
* Do not introduce any data persistence or storage mechanisms

### React Styleguide

* Use functional components with hooks instead of class components
* Keep components small and focused (< 300 lines)
* Use React.memo for purely functional components
* Use named exports instead of default exports
* Ensure all calculations and operations remain client-side
* Do not introduce any server communication or data storage
* Organize component files in this order:
  1. Imports
  2. Types/Interfaces
  3. Component
  4. Styles (if using CSS-in-JS)
  5. Exports

### CSS / Styling

* Follow the [BEM naming convention](http://getbem.com/) if using CSS modules
* Use CSS variables for common values (colors, spacing, etc.)
* Avoid inline styles

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute. 