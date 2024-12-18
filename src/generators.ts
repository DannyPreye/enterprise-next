import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import os from "os";

// src/templates/project/.eslintrc.js
export const eslintConfig = `
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
`;

// src/templates/project/.husky/pre-commit
export const preCommitTemplate = `
npm run pre-commit
`;

// src/templates/project/.husky/commit-msg
export const commitMsgTemplate = `
npx --no -- commitlint --edit "\${1}"
`;

// src/templates/project/.commitlintrc.js
export const commitlintConfig = `
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
`;

export const generateProject = async (projectName: string) =>
{
  const mainSpinner = ora('Creating project...').start();
  const isWindows = os.platform() === 'win32';
  try {
    // Create project directory
    await fs.mkdir(projectName);
    process.chdir(projectName);

    mainSpinner.text = "Initializing Next.js...";

    execSync(
      'npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes',
      {
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: 'true' }
      }
    );



    mainSpinner.text = "Initializing Shadcn UI...";
    execSync("npx shadcn@latest init -d -y",
      {
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: "true" }
      }
    );

    // initialize the toast and button components
    mainSpinner.text = "Initializing toast and button components...";
    execSync("npx shadcn@latest add toast button",
      {
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: "true" }
      }
    );
    // next-themes
    mainSpinner.text = "Installing next-themes";
    execSync(
      "npm install next-themes --legacy-peer-deps",
      {
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: 'true' }
      }
    );

    // Install additional dependencies
    mainSpinner.text = "Installing dependencies...";
    execSync(
      "npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node  @types/jest --legacy-peer-deps",
      {
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: 'true' }
      }
    );

    // Create jest.setup.js if it doesn't exist
    const jestSetupContent = `
import '@testing-library/jest-dom';
    `;
    await fs.writeFile('jest.setup.js', jestSetupContent);

    // Install Husky
    mainSpinner.text = "Installing Husky and commitlint...";
    execSync(
      "npm install --save-dev husky @commitlint/cli @commitlint/config-conventional --legacy-peer-deps",
      {
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: 'true' }
      }
    );

    // Update package.json to add test scripts
    const packageJson = await fs.readJSON('package.json');
    packageJson.scripts = {
      ...packageJson.scripts,
      test: 'jest',
      'test:watch': 'jest --watch',
      'test:coverage': 'jest --coverage',
      prepare: 'husky install',
      'pre-commit': 'npm run lint && npm run test'
    };
    await fs.writeJSON('package.json', packageJson, { spaces: 2 });

    ;

    // Create project structure
    mainSpinner.text = "Creating project structure...";
    const dirs = [
      "src/components/ui",
      "src/components/common",
      "src/components/forms",
      "src/components/layouts",
      "src/components/providers",
      "src/lib/hooks",
      "src/lib/utils",
      "src/lib/api",
      "src/lib/constants",
      "src/lib/types",
      "src/lib/validation",
      "src/styles",
      "src/tests/unit",
      "src/tests/integration",
      "src/tests/e2e",
    ];

    dirs.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

    // Copy templates
    await fs.writeFile("jest.config.js", jestConfigTemplate);
    await fs.writeFile("src/app/layout.tsx", layoutTemplate);
    await fs.writeFile("src/components/providers/theme-provider.tsx", themeProvider);

    // Initialize Husky
    mainSpinner.text = "Initializing Husky...";
    execSync('npx husky install', {
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: 'true' }
    });

    // Create Husky hooks
    // Create Husky hooks directory
    const huskyDir = path.join(process.cwd(), '.husky');
    await fs.mkdir(huskyDir, { recursive: true });
    // Create pre-commit hook
    const preCommitPath = path.join(huskyDir, 'pre-commit');
    await fs.writeFile(preCommitPath, `\n\nnpm run pre-commit`);


    // Create commit-msg hook
    const commitMsgPath = path.join(huskyDir, 'commit-msg');
    await fs.writeFile(commitMsgPath, `\n\nnpx --no -- commitlint --edit "$1"`);

    if (!isWindows) {
      execSync(`chmod +x ${preCommitPath} ${commitMsgPath}`, {
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: 'true' }
      });
    }

    await fs.writeFile('.commitlintrc.js', commitlintConfig);

    // Add VS Code settings for better developer experience
    mainSpinner.text = "Adding VS Code settings...";
    const vscodePath = path.join(process.cwd(), '.vscode');
    await fs.mkdir(vscodePath, { recursive: true });
    await fs.writeFile(
      path.join(vscodePath, 'settings.json'),
      JSON.stringify({
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        "[javascript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[typescript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[typescriptreact]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
      }, null, 2)
    );

    await fs.writeFile(
      'README.md',
      `# ${projectName}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build production bundle
- \`npm run start\`: Start production server
- \`npm run test\`: Run tests
- \`npm run lint\`: Check linting



## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

## Code Quality Tools

- ESLint for linting
- Prettier for code formatting
- Husky for git hooks
- Commitlint for commit message linting
- Jest for testing
- TypeScript for type checking

## VS Code Extensions

Recommended extensions are:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Jest
- GitLens
`
    );
    mainSpinner.succeed('Project setup complete!');

    console.log('Project setup complete! Next steps:');
    console.log('1. cd', projectName);
    console.log('2. npm install');
    console.log('3. npm run dev');
    console.log('\nUse npm run commit to create conventional commits');
  } catch (error: any) {
    mainSpinner.fail('Project setup failed.');
    console.error(error.message);
    process.exit(1);
  }

};

export const generateComponent = async (
  name: string,
  componentPath = "src/components/common",
) =>
{
  const mainSpinner = ora('Creating component...').start();
  try {
    const fullPath = path.join(process.cwd(), componentPath, name);

    // Create component directory
    await fs.mkdir(fullPath, { recursive: true });

    // Generate component files
    mainSpinner.text = "Creating component files...";
    await fs.writeFile(
      path.join(fullPath, `${name}.tsx`),
      componentTemplate(name),
    );

    mainSpinner.text = "Creating tests files...";
    await fs.writeFile(
      path.join(fullPath, `${name}.test.tsx`),
      componentTestTemplate(name),
    );
    mainSpinner.succeed('Component created!');
  } catch (error) {
    mainSpinner.fail('Component creation failed.');
    console.error(error);

  }
};

export const generatePage = async (route: string) =>
{
  const fullPath = path.join(process.cwd(), "src/app", route);

  // Create page directory
  await fs.mkdir(fullPath, { recursive: true });

  // Generate page files
  await fs.writeFile(
    path.join(fullPath, "page.tsx"),
    `
interface Props{
  // Add custom props here
}

export default function ${route.split("/").pop()?.charAt(0).toUpperCase()}${route.split("/").pop()?.slice(1)}Page({}: Props) {
  return (
    <div>
      <h1>${route} Page</h1>
    </div>
  );
}
`,
  );

  await fs.writeFile(
    path.join(fullPath, "page.test.tsx"),
    `
import { render, screen} from '@testing-library/react';
import ${route.split("/").pop()?.charAt(0).toUpperCase()}${route.split("/").pop()?.slice(1)}Page from './page';

describe('${route} Page', () => {
  it('renders page content', () => {
    render(<${route.split("/").pop()?.charAt(0).toUpperCase()}${route.split("/").pop()?.slice(1)}Page />);
    expect(screen.getByText('${route} Page')).toBeInTheDocument();
  });
});
`,
  );
};


const themeProvider = `
"use client";
import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
} from "next-themes";

export default function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
`;

// src/templates/project/app/layout.tsx
export const layoutTemplate = `
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Enterprise App',
  description: 'Generated with create-nextjs-enterprise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
`;

// src/templates/component/component.tsx
export const componentTemplate = (name: string) => `
'use client';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface ${name}Props extends ComponentProps<'div'> {
  // Add custom props here
}

export const ${name} = ({ className, ...props }: ${name}Props) => {
  return (
    <div className={cn('', className)} {...props}>
      {/* Component content */}
    </div>
  );
};
`;

// src/templates/component/component.test.tsx
export const componentTestTemplate = (name: string) => `
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />);
    // Add your test cases here
  });
});
`;

// src/templates/project/jest.config.js
export const jestConfigTemplate = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/lib/registry.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
`;
