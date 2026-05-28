# Contributing to AeroWeather

Thank you for your interest in contributing to AeroWeather! We welcome contributions of all forms, including bug fixes, feature enhancements, documentation updates, and design polishes.

By contributing to this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (usually bundled with Node.js)

### Local Development Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/weather-app.git
   cd weather-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the local development server**:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173` to view the application.

---

## Coding Standards

### Structure & Styling

- Keep components modular and single-purpose inside the `src/components/` directory.
- All styles should be placed in `src/index.css` or scoped inside components using React standard practices.
- AeroWeather uses a glassmorphic design theme. When adding new elements, use standard glassmorphic utility classes:
  - `.glass-panel`: standard card backdrop with blur and subtle hover translate.
  - `--glass-bg`: `rgba(255, 255, 255, 0.1)`
  - `--glass-border`: `rgba(255, 255, 255, 0.3)`
  - `--glass-blur`: `blur(20px)`

### Linting

Run the linter before committing to ensure there are no syntax or style issues:
```bash
npm run lint
```

### Commit Messages

Use clear, descriptive commit messages. We recommend using the conventional commits format:
- `feat: add offline caching support`
- `fix: correct wind unit conversion factor`
- `docs: update deployment guidelines`
- `style: polish glassmorphic button alignment`

---

## Submitting a Pull Request

1. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** and verify they work locally.
3. **Commit and push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Open a Pull Request (PR)** against our `main` branch.
5. Ensure your PR description is filled out according to our template and that the automated CI builds pass successfully.
