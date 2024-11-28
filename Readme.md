# enterprise-nextjs-template

An opinionated Next.js 14 project generator that enforces best practices, testing, and modern development workflows. This template sets up a scalable, enterprise-ready Next.js application with built-in testing, TypeScript, Tailwind CSS, shadcn/ui, and comprehensive tooling.

## Features

### 🏗 Project Structure
- App Router-based Next.js 14 setup
- Organized directory structure for scalability
- Separation of concerns with dedicated directories
- Type-safe components and utilities

### 🎨 Styling and UI
- Tailwind CSS for utility-first styling
- shadcn/ui components pre-configured
- Dark mode support out of the box
- Toast notifications setup

### 🧪 Testing
- Jest + React Testing Library configuration
- Unit test templates
- Integration test setup
- E2E testing ready
- 80% code coverage requirement
- Automatic test file generation

### 📝 Code Quality
- TypeScript for type safety
- ESLint with custom rule set
- Prettier for consistent formatting
- Husky for Git hooks
- Commitlint for conventional commits
- Commitizen for interactive commits
- lint-staged for efficient checks

### 🛠 Development Tools
- VS Code configuration
- Format on save
- Type checking
- Accessibility checks
- Hot reload
- Debug configuration

## Installation

```bash
npm install -g enterprise-nextjs-template
# or
yarn global add enterprise-nextjs-template
```

## Usage

### Creating a New Project

```bash
# Using npx (recommended)
npx enterprise-nextjs-template new my-app

# Or if installed globally
enterprise-nextjs-template new my-app
```

### Generating Components

```bash
npx enterprise-nextjs-template generate component Button
# Creates:
# - src/components/common/Button/Button.tsx
# - src/components/common/Button/Button.test.tsx
```

### Generating Pages

```bash
npx enterprise-nextjs-template generate page dashboard
# Creates:
# - src/app/dashboard/page.tsx
# - src/app/dashboard/page.test.tsx
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── common/      # Shared components
│   ├── forms/       # Form-related components
│   └── layouts/     # Layout components
├── lib/             # Utility functions and hooks
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Helper functions
│   ├── api/         # API-related functions
│   ├── constants/   # Constants and configuration
│   ├── types/       # TypeScript types/interfaces
│   └── validation/  # Schema validation
├── styles/          # Global styles
└── tests/           # Test files
    ├── unit/        # Unit tests
    ├── integration/ # Integration tests
    └── e2e/        # End-to-end tests
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Check linting
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript checks
npm run commit       # Create a conventional commit
```

## Git Hooks

### Pre-commit
- Runs linting on staged files
- Formats code with Prettier
- Runs TypeScript checks
- Ensures tests pass

### Commit Message
- Enforces conventional commit format
- Checks commit message length
- Validates commit type

## Conventional Commits

This template enforces [Conventional Commits](https://www.conventionalcommits.org/) specification with the following types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## VS Code Integration

### Recommended Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Jest
- GitLens

### Workspace Settings
- Format on save enabled
- ESLint auto-fix on save
- Tailwind CSS IntelliSense
- Jest runner configuration

## Testing

### Unit Tests
```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Coverage Requirements
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Configuration Files

- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `jest.config.js` - Jest configuration
- `.commitlintrc.js` - Commitlint rules
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using `npm run commit`
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the incredible framework
- shadcn for the amazing UI components
- Testing Library team for the testing utilities
- All other open-source contributors

## Support

For support, issues, or feature requests, please create an issue in the GitHub repository.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Documentation](https://testing-library.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
