import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class ViteReactTemplate extends BaseTemplate {
  constructor(framework: FrameworkConfig, context: TemplateContext) {
    super(framework, context);
  }

  async generateFiles(): Promise<TemplateFile[]> {
    const files: TemplateFile[] = [];
    const { hasTypeScript } = this.context;

    // Package.json
    files.push({
      path: 'package.json',
      content: JSON.stringify(this.generatePackageJson(), null, 2)
    });

    // Vite config
    files.push({
      path: 'vite.config.ts',
      content: this.generateViteConfig()
    });

    // TypeScript config
    if (hasTypeScript) {
      files.push({
        path: 'tsconfig.json',
        content: this.generateTsConfig()
      });

      files.push({
        path: 'tsconfig.node.json',
        content: this.generateTsConfigNode()
      });
    }

    // ESLint config
    files.push({
      path: '.eslintrc.cjs',
      content: this.generateEslintConfig()
    });

    // Prettier config
    files.push({
      path: '.prettierrc',
      content: this.generatePrettierConfig()
    });

    // Main entry
    files.push({
      path: 'src/main.tsx',
      content: this.generateMain()
    });

    // App component
    files.push({
      path: 'src/App.tsx',
      content: this.generateApp()
    });

    // Index CSS
    files.push({
      path: 'src/index.css',
      content: this.generateIndexCss()
    });

    // Page CSS files
    files.push({
      path: 'src/pages/Home.css',
      content: this.generateHomePageCss()
    });

    files.push({
      path: 'src/pages/About.css',
      content: this.generateAboutPageCss()
    });

    files.push({
      path: 'src/pages/Dashboard.css',
      content: this.generateDashboardPageCss()
    });

    files.push({
      path: 'src/pages/Counter.css',
      content: this.generateCounterPageCss()
    });

    files.push({
      path: 'src/pages/NotFound.css',
      content: this.generateNotFoundPageCss()
    });

    // Components
    files.push({
      path: 'src/components/Header.tsx',
      content: this.generateHeader()
    });

    files.push({
      path: 'src/components/Footer.tsx',
      content: this.generateFooter()
    });

    files.push({
      path: 'src/components/FeatureCard.tsx',
      content: this.generateFeatureCard()
    });

    // Pages
    files.push({
      path: 'src/pages/Home.tsx',
      content: this.generateHomePage()
    });

    files.push({
      path: 'src/pages/About.tsx',
      content: this.generateAboutPage()
    });

    files.push({
      path: 'src/pages/Dashboard.tsx',
      content: this.generateDashboardPage()
    });

    files.push({
      path: 'src/pages/Counter.tsx',
      content: this.generateCounterPage()
    });

    files.push({
      path: 'src/pages/NotFound.tsx',
      content: this.generateNotFoundPage()
    });

    // Hooks
    files.push({
      path: 'src/hooks/useCounter.ts',
      content: this.generateUseCounter()
    });

    files.push({
      path: 'src/hooks/useFetch.ts',
      content: this.generateUseFetch()
    });

    // Utils
    files.push({
      path: 'src/utils/api.ts',
      content: this.generateApi()
    });

    files.push({
      path: 'src/utils/format.ts',
      content: this.generateFormat()
    });

    // Types
    if (hasTypeScript) {
      files.push({
        path: 'src/types/index.ts',
        content: this.generateTypes()
      });
    }

    // Assets
    files.push({
      path: 'public/vite.svg',
      content: this.generateViteSvg()
    });

    // Environment
    files.push({
      path: '.env.example',
      content: this.generateEnvExample()
    });

    // README
    files.push({
      path: 'README.md',
      content: this.generateReadme()
    });

    // Dockerfile
    files.push({
      path: 'Dockerfile',
      content: this.generateDockerfile()
    });

    // Docker Compose
    files.push({
      path: 'docker-compose.yml',
      content: this.generateDockerCompose()
    });

    return files;
  }

  protected generatePackageJson() {
    return {
      name: this.context.normalizedName,
      private: true,
      version: '0.1.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
        preview: 'vite preview',
        format: 'prettier --write "src/**/*.{ts,tsx,css,md}"'
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        'react-router-dom': '^6.22.0'
      },
      devDependencies: {
        '@types/react': '^18.2.48',
        '@types/react-dom': '^18.2.18',
        '@typescript-eslint/eslint-plugin': '^6.19.0',
        '@typescript-eslint/parser': '^6.19.0',
        '@vitejs/plugin-react': '^4.2.1',
        eslint: '^8.56.0',
        'eslint-plugin-react-hooks': '^4.6.0',
        'eslint-plugin-react-refresh': '^0.4.5',
        prettier: '^3.2.4',
        typescript: '^5.3.3',
        vite: '^5.0.12'
      }
    };
  }

  protected generateViteConfig() {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: ${this.context.port || 5173},
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // React Router chunk
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          // Other node_modules go to vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
`;
  }

  protected generateTsConfig() {
    return JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,

          /* Bundler mode */
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',

          /* Linting */
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,

          /* Path Mapping */
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*'],
            '@components/*': ['./src/components/*'],
            '@hooks/*': ['./src/hooks/*'],
            '@utils/*': ['./src/utils/*'],
            '@types/*': ['./src/types/*'],
          },
        },
        include: ['src'],
        references: [{ path: './tsconfig.node.json' }],
      },
      null,
      2
    );
  }

  protected generateTsConfigNode() {
    return JSON.stringify(
      {
        compilerOptions: {
          composite: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'bundler',
          allowSyntheticDefaultImports: true,
        },
        include: ['vite.config.ts'],
      },
      null,
      2
    );
  }

  protected generateEslintConfig() {
    return `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
`;
  }

  protected generatePrettierConfig() {
    return JSON.stringify(
      {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
      },
      null,
      2
    );
  }

  protected generateMain() {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  }

  protected generateApp() {
    return `import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import './App.css';

// Lazy load route components for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Counter = lazy(() => import('./pages/Counter'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for Suspense fallback
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

// Error boundary for route errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <Link to="/">Go Home</Link>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
`;
  }

  protected generateIndexCss() {
    return `:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}

a {
  color: #646cff;
  text-decoration: none;
}

a:hover {
  color: #535bf2;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

/* Button variants */
.btn {
  display: inline-block;
  padding: 0.75em 1.5em;
  border-radius: 8px;
  border: none;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-tertiary {
  background-color: transparent;
  border: 1px solid #667eea;
  color: #667eea;
}

.btn-tertiary:hover {
  background-color: #667eea;
  color: white;
}

/* Page loader */
.page-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-loader p {
  margin-top: 1rem;
  color: #666;
}

/* Error boundary */
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
  text-align: center;
}

.error-boundary h1 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.error-boundary a {
  margin-top: 1rem;
  color: #667eea;
  text-decoration: none;
}

.error-boundary a:hover {
  text-decoration: underline;
}
`;
  }

  protected generateHeader() {
    return `import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: FunctionComponent<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">⚛️</span>
            <span className="logo-text">${this.context.name}</span>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/counter" className="nav-link">Counter</Link>
          {onToggleTheme && (
            <button onClick={onToggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
`;
  }

  protected generateFooter() {
    return `import { FunctionComponent } from 'react';
import './Footer.css';

export const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} ${this.context.name}. Built with React + Vite.</p>
        <div className="footer-links">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            Vite Docs
          </a>
          <span>•</span>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            React Docs
          </a>
        </div>
      </div>
    </footer>
  );
};
`;
  }

  protected generateFeatureCard() {
    return `import { FunctionComponent } from 'react';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: FunctionComponent<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};
`;
  }

  protected generateUseCounter() {
    return `import { useState, useCallback } from 'react';

export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
`;
  }

  protected generateUseFetch() {
    return `import { useState, useEffect, useCallback } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
`;
  }

  protected generateApi() {
    return `const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  },

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
  },
};
`;
  }

  protected generateFormat() {
    return `export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
`;
  }

  protected generateTypes() {
    return `export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
`;
  }

  protected generateViteSvg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>`;
  }

  protected generateEnvExample() {
    return `# Vite Environment Variables
# https://vitejs.dev/guide/env-and-mode.html

# API Configuration
VITE_API_URL=https://jsonplaceholder.typicode.com
VITE_API_KEY=your-api-key-here

# Feature Flags
VITE_ENABLE_DARKMODE=true
VITE_ENABLE_ANALYTICS=false

# Build Configuration
NODE_ENV=development
`;
  }

  protected generateReadme() {
    return `# ${this.context.name}

${this.context.description}

Built with React 18, Vite 5, TypeScript, and modern tooling for lightning-fast development experience.

## Features

- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Vite 5** - Lightning-fast HMR and optimized builds
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Path Aliases** - Clean imports with @, @components, @hooks, @utils
- **Hooks** - Custom React hooks (useCounter, useFetch)
- **Code Splitting** - Optimized bundle size
- **Hot Module Replacement** - Instant feedback during development

## Getting Started

### Installation

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### Development

\`\`\`bash
npm run dev
# or
vite
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

\`\`\`bash
npm run build
# or
tsc && vite build
\`\`\`

The build artifacts will be stored in the \`dist/\` directory.

### Preview

\`\`\`bash
npm run preview
# or
vite preview
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

### Formatting

\`\`\`bash
npm run format
\`\`\`

## Project Structure

\`\`\`
src/
├── components/         # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── FeatureCard.tsx
├── hooks/             # Custom React hooks
│   ├── useCounter.ts
│   └── useFetch.ts
├── utils/             # Utility functions
│   ├── api.ts
│   └── format.ts
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Root component
├── App.css            # App styles
├── main.tsx           # Entry point
└── index.css          # Global styles
\`\`\`

## Path Aliases

Clean imports with path mapping:

\`\`\`typescript
// Instead of:
import { Header } from '../../../components/Header';

// Use:
import { Header } from '@components/Header';
\`\`\`

Available aliases:
- \`@\` → \`src/*\`
- \`@components\` → \`src/components/*\`
- \`@hooks\` → \`src/hooks/*\`
- \`@utils\` → \`src/utils/*\`
- \`@types\` → \`src/types/*\`

## Custom Hooks

### useCounter

\`\`\`typescript
import { useCounter } from '@hooks/useCounter';

function MyComponent() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

### useFetch

\`\`\`typescript
import { useFetch } from '@hooks/useFetch';

function Posts() {
  const { data, loading, error } = useFetch<Post[]>('/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-key-here
\`\`\`

Access in code:

\`\`\`typescript
const apiUrl = import.meta.env.VITE_API_URL;
\`\`\`

## TypeScript Configuration

- **Strict mode** enabled
- **Path aliases** configured
- **JSX** set to react-jsx
- **No unused locals/parameters**

## Vite Configuration

- **React plugin** with fast refresh
- **Path aliases** for clean imports
- **Code splitting** for vendor chunks
- **Source maps** for debugging
- **Development server** on port 5173

## Docker

### Build

\`\`\`bash
docker build -t ${this.context.normalizedName} .
\`\`\`

### Run

\`\`\`bash
docker run -p 80:80 ${this.context.normalizedName}
\`\`\`

### Docker Compose

\`\`\`bash
docker-compose up
\`\`\`

## Deployment

Deploy to any hosting service:

- **Vercel**: Zero-config deployment
- **Netlify**: Full-stack support
- **AWS**: S3, CloudFront, Amplify
- **Google Cloud**: Firebase, App Engine
- **Azure**: Static Web Apps
- **GitHub Pages**: Static hosting

\`\`\`bash
# Build for production
npm run build

# Output in dist/ directory
# Deploy dist/ folder to your hosting service
\`\`\`

## Documentation

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

MIT
`;
  }

  protected generateDockerfile() {
    return `# Multi-stage Dockerfile for Vite React SPA

# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
`;
  }

  protected generateDockerCompose() {
    return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
`;
  }

  protected generateHomePage() {
    return `import { Link } from 'react-router-dom';
import { FeatureCard } from '@components/FeatureCard';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to ${this.context.name}</h1>
        <p>A modern React application with Vite, TypeScript, and React Router</p>
        <div className="cta-buttons">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <FeatureCard
            icon="⚡"
            title="Lightning Fast HMR"
            description="Hot Module Replacement with Vite for instant feedback"
          />
          <FeatureCard
            icon="🔧"
            title="TypeScript"
            description="Type-safe development with full IntelliSense support"
          />
          <FeatureCard
            icon="🚀"
            title="React Router"
            description="Client-side routing with lazy loading and code splitting"
          />
          <FeatureCard
            icon="📦"
            title="Optimized Builds"
            description="Production-optimized bundles with automatic code splitting"
          />
        </div>
      </section>

      <section className="tech-stack">
        <h2>Tech Stack</h2>
        <ul>
          <li><strong>React 18</strong> - Latest React with concurrent features</li>
          <li><strong>TypeScript</strong> - Type-safe development</li>
          <li><strong>React Router 6</strong> - Client-side routing with lazy loading</li>
          <li><strong>Vite 5</strong> - Lightning-fast build tool</li>
          <li><strong>ESLint</strong> - Code linting and quality</li>
          <li><strong>Prettier</strong> - Code formatting</li>
        </ul>
      </section>
    </div>
  );
}
`;
  }

  protected generateAboutPage() {
    return `import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About This Project</h1>
        <p>A modern React application built with best practices and cutting-edge tools</p>
      </section>

      <section className="about-content">
        <h2>Project Overview</h2>
        <p>
          This is a React application built with Vite for fast development and optimized production builds.
          It includes React Router for navigation with lazy-loaded route components for optimal performance.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Client-side Routing:</strong> React Router with lazy loading for code splitting</li>
          <li><strong>TypeScript:</strong> Full type safety and excellent IDE support</li>
          <li><strong>Fast HMR:</strong> Vite provides instant hot module replacement</li>
          <li><strong>Code Splitting:</strong> Automatic route-based code splitting</li>
          <li><strong>Error Boundaries:</strong> Graceful error handling</li>
          <li><strong>Loading States:</strong> Suspense with loading fallbacks</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          The project includes several example routes demonstrating different features:
        </p>
        <ul>
          <li><Link to="/">Home</Link> - Landing page with feature overview</li>
          <li><Link to="/dashboard">Dashboard</Link> - Protected route example</li>
          <li><Link to="/counter">Counter</Link> - State management demo</li>
        </ul>

        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
`;
  }

  protected generateDashboardPage() {
    return `import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface DashboardData {
  users: number;
  revenue: number;
  orders: number;
  conversion: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    users: 0,
    revenue: 0,
    orders: 0,
    conversion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({
        users: 1234,
        revenue: 45678,
        orders: 789,
        conversion: 3.2
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-loader">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/" className="back-link">← Back</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{data.users.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-value">\${data.revenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-value">{data.orders.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <p className="stat-value">{data.conversion}%</p>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Recent Activity</h2>
        <p className="placeholder-text">
          Dashboard functionality with real-time data updates coming soon.
        </p>
      </div>
    </div>
  );
}
`;
  }

  protected generateCounterPage() {
    return `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCounter } from '@hooks/useCounter';
import './Counter.css';

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="counter-page">
      <div className="counter-header">
        <h1>Counter Demo</h1>
        <Link to="/" className="back-link">← Back</Link>
      </div>

      <div className="counter-content">
        <div className="counter-display">
          <h2>Count: {count}</h2>
        </div>

        <div className="counter-controls">
          <button onClick={decrement} className="btn btn-secondary">
            Decrease
          </button>
          <button onClick={reset} className="btn btn-tertiary">
            Reset
          </button>
          <button onClick={increment} className="btn btn-primary">
            Increase
          </button>
        </div>

        <div className="counter-info">
          <h3>About This Demo</h3>
          <p>
            This demonstrates a custom React hook (\`useCounter\`) that manages counter state
            with increment, decrement, and reset functionality. The state is preserved
            during navigation thanks to React Router's component lifecycle.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
  }

  protected generateNotFoundPage() {
    return `import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
`;
  }

  protected generateHomePageCss() {
    return `.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.home-page .hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;
  margin-bottom: 3rem;
}

.home-page .hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.home-page .hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.home-page .cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.home-page .features {
  margin-bottom: 3rem;
}

.home-page .features h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.home-page .feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.home-page .tech-stack {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
}

.home-page .tech-stack h2 {
  margin-bottom: 1rem;
}

.home-page .tech-stack ul {
  list-style: none;
  padding: 0;
}

.home-page .tech-stack li {
  padding: 0.5rem 0;
}

.home-page .tech-stack strong {
  color: #667eea;
}
`;
  }

  protected generateAboutPageCss() {
    return `.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.about-page .about-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.about-page .about-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.about-page .about-hero p {
  font-size: 1.25rem;
  color: #666;
}

.about-page .about-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.about-page .about-content p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
}

.about-page .about-content ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.about-page .about-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.about-page .back-link {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.about-page a {
  color: #667eea;
  text-decoration: none;
}

.about-page a:hover {
  text-decoration: underline;
}
`;
  }

  protected generateDashboardPageCss() {
    return `.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-page .dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-page .back-link {
  color: #667eea;
  text-decoration: none;
}

.dashboard-page .dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dashboard-page .stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.dashboard-page .stat-card:hover {
  transform: translateY(-2px);
}

.dashboard-page .stat-card h3 {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dashboard-page .stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.dashboard-page .dashboard-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-page .placeholder-text {
  color: #666;
  font-style: italic;
}
`;
  }

  protected generateCounterPageCss() {
    return `.counter-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.counter-page .counter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.counter-page .back-link {
  color: #667eea;
  text-decoration: none;
}

.counter-page .counter-content {
  text-align: center;
}

.counter-page .counter-display {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.counter-page .counter-display h2 {
  font-size: 3rem;
  margin: 0;
}

.counter-page .counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.counter-page .counter-info {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: left;
}

.counter-page .counter-info h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.counter-page .counter-info p {
  line-height: 1.6;
  color: #666;
}
`;
  }

  protected generateNotFoundPageCss() {
    return `.not-found-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.not-found-content h1 {
  font-size: 6rem;
  margin: 0;
  color: #667eea;
}

.not-found-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.not-found-content p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}
`;
  }
}
