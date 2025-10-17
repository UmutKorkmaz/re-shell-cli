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

    files.push({
      path: 'src/pages/Contact.css',
      content: this.generateContactPageCss()
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

    files.push({
      path: 'src/components/ContactForm.tsx',
      content: this.generateContactForm()
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
      path: 'src/pages/Contact.tsx',
      content: this.generateContactPage()
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

    files.push({
      path: 'src/hooks/useUsers.ts',
      content: this.generateUseUsers()
    });

    files.push({
      path: 'src/hooks/useProducts.ts',
      content: this.generateUseProducts()
    });

    // Zustand stores
    files.push({
      path: 'src/store/useAppStore.ts',
      content: this.generateAppStore()
    });

    files.push({
      path: 'src/store/useAuthStore.ts',
      content: this.generateAuthStore()
    });

    files.push({
      path: 'src/store/useUIStore.ts',
      content: this.generateUIStore()
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

    // Test setup
    files.push({
      path: 'src/test-setup.ts',
      content: this.generateTestSetup()
    });

    // Test files
    files.push({
      path: 'src/components/__tests__/Header.test.tsx',
      content: this.generateHeaderTest()
    });

    files.push({
      path: 'src/hooks/__tests__/useCounter.test.ts',
      content: this.generateCounterTest()
    });

    files.push({
      path: 'src/pages/__tests__/Home.test.tsx',
      content: this.generateHomeTest()
    });

    // Storybook config
    files.push({
      path: '.storybook/main.ts',
      content: this.generateStorybookMain()
    });

    files.push({
      path: '.storybook/preview.ts',
      content: this.generateStorybookPreview()
    });

    // Story files
    files.push({
      path: 'src/stories/Header.stories.tsx',
      content: this.generateHeaderStories()
    });

    files.push({
      path: 'src/stories/FeatureCard.stories.tsx',
      content: this.generateFeatureCardStories()
    });

    files.push({
      path: 'src/stories/Button.stories.tsx',
      content: this.generateButtonStories()
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
        'build:analyze': 'vite build --mode analyze',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
        preview: 'vite preview',
        format: 'prettier --write "src/**/*.{ts,tsx,css,md}"',
        test: 'vitest',
        'test:ui': 'vitest --ui',
        'test:run': 'vitest run',
        storybook: 'storybook dev -p 6006',
        'build-storybook': 'storybook build'
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        'react-router-dom': '^6.22.0',
        '@tanstack/react-query': '^5.17.0',
        'zustand': '^4.5.0',
        'react-hook-form': '^7.49.0'
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
        vite: '^5.0.12',
        'rollup-plugin-visualizer': '^5.11.0',
        '@testing-library/react': '^14.1.0',
        '@testing-library/jest-dom': '^6.1.5',
        '@testing-library/user-event': '^14.5.1',
        vitest: '^1.2.0',
        '@vitest/ui': '^1.2.0',
        jsdom: '^23.0.1',
        msw: '^2.0.0',
        '@storybook/react': '^7.10.0',
        '@storybook/react-vite': '^7.10.0',
        '@storybook/addon-essentials': '^7.10.0',
        '@storybook/addon-interactions': '^7.10.0',
        '@storybook/addon-links': '^7.10.0',
        '@storybook/addon-themes': '^7.10.0',
        '@storybook/testing-library': '^0.2.0',
        storybook: '^7.10.0',
        '@tanstack/react-query-devtools': '^5.17.0' 
      }
    };
  }

  protected generateViteConfig() {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
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
    // Bundle analyzer - generates stats.html and stats.json in dist/analyze
    visualizer({
      filename: 'dist/analyze/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@store': path.resolve(__dirname, './src/store'),
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    css: true,
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
            '@store/*': ['./src/store/*'],
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
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
const Contact = lazy(() => import('./pages/Contact'));
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
                <Route path="/contact" element={<Contact />} />
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
          <Link to="/contact" className="nav-link">Contact</Link>
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
- **React Router 6** - Client-side routing with lazy loading
- **TanStack Query** - Powerful server state management with caching and synchronization
- **Zustand** - Lightweight client state management with persistence
- **React Hook Form** - Performant form management with validation
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Bundle Analysis** - Visualize bundle composition with rollup-plugin-visualizer
- **Path Aliases** - Clean imports with @, @components, @hooks, @utils, @store
- **Hooks** - Custom React hooks (useCounter, useFetch, useUsers, useProducts)
- **Stores** - Zustand stores (useAppStore, useAuthStore, useUIStore)
- **Code Splitting** - Optimized bundle size with route-based splitting
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

### Bundle Analysis

Analyze your bundle size and composition:

\`\`\`bash
npm run build:analyze
\`\`\`

This will generate:
- \`dist/analyze/stats.html\` - Interactive treemap visualization
- \`dist/analyze/stats.json\` - Detailed bundle statistics

Open \`dist/analyze/stats.html\` in your browser to explore:
- Module dependencies and sizes
- Gzip and Brotli compression sizes
- Code splitting effectiveness
- Large dependencies that may need optimization

The visualizer helps you:
- Identify bloated dependencies
- Verify code splitting is working
- Find opportunities to reduce bundle size
- Track bundle size changes over time

## Project Structure

\`\`\`
src/
├── components/         # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FeatureCard.tsx
│   └── ContactForm.tsx
├── hooks/             # Custom React hooks
│   ├── useCounter.ts
│   ├── useFetch.ts
│   ├── useUsers.ts
│   └── useProducts.ts
├── store/             # Zustand state stores
│   ├── useAppStore.ts
│   ├── useAuthStore.ts
│   └── useUIStore.ts
├── pages/             # Route components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Dashboard.tsx
│   ├── Counter.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
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

## TanStack Query (React Query)

TanStack Query provides powerful server state management with automatic caching, background updates, and request deduplication.

### React Query DevTools

This template includes React Query DevTools for debugging and inspecting your queries during development. The DevTools panel can be toggled by clicking the React Query icon in the browser or by pressing the keyboard shortcut.

Features:
- **Query Inspector**: View all active queries, their states, and cached data
- **Mutation Inspector**: Monitor mutations and their status
- **Query Explorer**: Browse query keys and inspect query details
- **DevTools Settings**: Customize the DevTools behavior and appearance

The DevTools are only included in development mode and automatically excluded from production builds.



### useUsers Hook

\`\`\`typescript
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@hooks/useUsers';

function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={() => deleteUser.mutate(user.id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => createUser.mutate({
        name: 'New User',
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
      })}>
        Add User
      </button>
    </div>
  );
}
\`\`\`

### useProducts Hook

\`\`\`typescript
import { useProducts, useCreateProduct } from '@hooks/useProducts';

function ProductList() {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>\${product.price}</p>
        </div>
      ))}
      <button onClick={() => createProduct.mutate({
        name: 'New Product',
        description: 'Product description',
        price: 99.99
      })}>
        Add Product
      </button>
    </div>
  );
}
\`\`\`

### Query Configuration

The QueryClient is configured in \`main.tsx\` with sensible defaults:

- **staleTime**: 5 minutes - Data remains fresh for 5 minutes
- **gcTime**: 10 minutes - Inactive queries are cached for 10 minutes
- **retry**: 1 - Failed requests retry once
- **refetchOnWindowFocus**: false - No automatic refetch on window focus

You can customize these defaults per query:

\`\`\`typescript
const { data } = useQuery({
  queryKey: ['custom', 'key'],
  queryFn: () => fetch('/api').then(r => r.json()),
  staleTime: 1000 * 60, // 1 minute
  refetchInterval: 2000, // Refetch every 2 seconds
});
\`\`\`

## Zustand State Management

Zustand provides a simple and type-safe way to manage client-side state with minimal boilerplate.

### useAppStore

Global application state with persistence:

\`\`\`typescript
import { useAppStore } from '@store/useAppStore';

function UserProfile() {
  const { user, setUser, clearUser } = useAppStore();
  const { notifications, addNotification } = useAppStore();

  const handleLogin = (userData) => {
    setUser(userData);
    addNotification({
      message: 'Welcome back!',
      type: 'success',
    });
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <button onClick={() => handleLogin({ id: '1', name: 'John', email: 'john@example.com', role: 'user' })}>
          Login
        </button>
      )}
    </div>
  );
}
\`\`\`

### useAuthStore

Authentication state with automatic token management:

\`\`\`typescript
import { useAuthStore } from '@store/useAuthStore';

function LoginForm() {
  const { login, logout, isAuthenticated, user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await login(email, password);
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

### useUIStore

UI state for theme, language, loading, and modals:

\`\`\`typescript
import { useUIStore } from '@store/useUIStore';

function Settings() {
  const { theme, setTheme, language, setLanguage, openModal } = useUIStore();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <button onClick={() => openModal('Help', 'This is help content')}>
        Show Help
      </button>
    </div>
  );
}
\`\`\`

### Store Persistence

The \`useAppStore\` and \`useAuthStore\` use Zustand's persist middleware to automatically save state to localStorage:

\`\`\`typescript
persist(
  (set, get) => ({
    // store state
  }),
  {
    name: 'app-storage', // localStorage key
    partialize: (state) => ({  // Optional: pick specific state to persist
      user: state.user,
      sidebarOpen: state.sidebarOpen,
    }),
  }
)
\`\`\`

## React Hook Form

React Hook Form provides performant form management with minimal re-renders and easy validation.

### ContactForm Component

The template includes a pre-built ContactForm component with validation:

\`\`\`typescript
import { ContactForm } from '@components/ContactForm';

function ContactPage() {
  const handleSubmit = async (data) => {
    // Send data to API
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return <ContactForm onSubmit={handleSubmit} />;
}
\`\`\`

### Form Validation

The ContactForm includes built-in validation:

- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Subject**: Required, minimum 5 characters
- **Message**: Required, minimum 10 characters

### Creating Custom Forms

Use React Hook Form to create your own forms:

\`\`\`typescript
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  username: string;
  email: string;
  age: number;
}

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', { required: 'Username is required' })}
        placeholder="Username"
      />
      {errors.username && <span>{errors.username.message}</span>}

      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="number"
        {...register('age', {
          required: 'Age is required',
          min: { value: 18, message: 'Must be 18 or older' },
        })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

### Form State Management

Access form state and control submission:

\`\`\`typescript
const {
  register,
  handleSubmit,
  formState: {
    errors,
    isSubmitting,
    isValid,
    isDirty,
    touchedFields,
  },
  reset,
  setValue,
  watch,
} = useForm<FormData>();

// Watch field changes
const emailValue = watch('email');

// Set field value programmatically
setValue('username', 'johndoe');

// Reset form
reset();

// Check if form is valid
if (isValid) {
  // Form is valid
}
\`\`\`

### Advanced Validation

Use schema validation with Zod or Yup:

\`\`\`bash
npm install zod @hookform/resolvers
\`\`\`

\`\`\`typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
});

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ... rest of component
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
- **Bundle analyzer** with rollup-plugin-visualizer
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

  protected generateUseUsers() {
    return `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

// Fetch all users
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('/api/v1/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data.data;
    },
  });
}

// Fetch single user
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async (): Promise<User> => {
      const response = await fetch(\`/api/v1/users/\${id}\`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData): Promise<User> => {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...userData }: UpdateUserData): Promise<User> => {
      const response = await fetch(\`/api/v1/users/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(\`/api/v1/users/\${id}\`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
`;
  }

  protected generateUseProducts() {
    return `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CreateProductData {
  name: string;
  description: string;
  price: number;
}

interface UpdateProductData {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

// Fetch all products
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch('/api/v1/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.data;
    },
  });
}

// Fetch single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async (): Promise<Product> => {
      const response = await fetch(\`/api/v1/products/\${id}\`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

// Create product mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: CreateProductData): Promise<Product> => {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Update product mutation
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...productData }: UpdateProductData): Promise<Product> => {
      const response = await fetch(\`/api/v1/products/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
    },
  });
}

// Delete product mutation
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(\`/api/v1/products/\${id}\`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
`;
  }

  protected generateAppStore() {
    return `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
  }>;
  sidebarOpen: boolean;
  setUser: (user: AppState['user']) => void;
  clearUser: () => void;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      notifications: [],
      sidebarOpen: true,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      addNotification: (notification) => set((state) => ({
        notifications: [
          ...state.notifications,
          {
            ...notification,
            id: crypto.randomUUID(),
            read: false,
          },
        ],
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),
      clearNotifications: () => set({ notifications: [] }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        user: state.user,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
`;
  }

  protected generateAuthStore() {
    return `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: async (email, password) => {
        try {
          const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          if (!response.ok) {
            throw new Error('Login failed');
          }
          const data = await response.json();
          set({
            isAuthenticated: true,
            token: data.token,
            user: data.user,
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },
      refreshToken: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const response = await fetch('/api/v1/auth/refresh', {
            headers: { Authorization: \`Bearer \${token}\` },
          });
          if (!response.ok) {
            throw new Error('Token refresh failed');
          }
          const data = await response.json();
          set({ token: data.token });
        } catch (error) {
          console.error('Token refresh error:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
`;
  }

  protected generateUIStore() {
    return `import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'es' | 'fr' | 'de';
  loading: boolean;
  modal: {
    open: boolean;
    title: string;
    content: string;
  } | null;
  setTheme: (theme: UIState['theme']) => void;
  setLanguage: (language: UIState['language']) => void;
  setLoading: (loading: boolean) => void;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'system',
  language: 'en',
  loading: false,
  modal: null,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setLoading: (loading) => set({ loading }),
  openModal: (title, content) => set({ modal: { open: true, title, content } }),
  closeModal: () => set({ modal: null }),
}));
`;
  }

  protected generateTestSetup() {
    return `import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
`;
  }

  protected generateHeaderTest() {
    const name = this.context.name;
    return `import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('renders logo text', () => {
    render(<Header theme="light" />);
    expect(screen.getByText('${name}')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header theme="light" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Counter')).toBeInTheDocument();
  });

  it('calls onToggleTheme when theme toggle button is clicked', () => {
    const mockToggle = vi.fn();
    render(<Header theme="light" onToggleTheme={mockToggle} />);

    const themeButton = screen.getByRole('button', { name: /🌙/ });
    themeButton.click();

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('does not render theme toggle when onToggleTheme is not provided', () => {
    render(<Header />);

    const themeButton = screen.queryRole('button', { name: /🌙/ });
    expect(themeButton).not.toBeInTheDocument();
  });
});
`;
  }

  protected generateCounterTest() {
    return `import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it('should reset count to initial value', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  it('should handle multiple increments', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);
  });
});
`;
  }

  protected generateHomeTest() {
    const name = this.context.name;
    return `import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

// Mock FeatureCard component
vi.mock('@components/FeatureCard', () => ({
  FeatureCard: ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div data-testid="feature-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

describe('Home Page', () => {
  const renderWithRouter = () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  it('renders hero section', () => {
    renderWithRouter();
    expect(screen.getByText('Welcome to ${name}')).toBeInTheDocument();
    expect(screen.getByText(/A modern React application/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    renderWithRouter();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    renderWithRouter();
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards).toHaveLength(4);
  });

  it('renders tech stack section', () => {
    renderWithRouter();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('React 18')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React Router 6')).toBeInTheDocument();
  });
});
`;
  }

  protected generateStorybookMain() {
    return `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
`;
  }

  protected generateStorybookPreview() {
    return `import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
`;
  }

  protected generateHeaderStories() {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    onToggleTheme: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const WithToggle: Story = {
  args: {
    theme: 'light',
    onToggleTheme: () => console.log('Theme toggled'),
  },
};
`;
  }

  protected generateFeatureCardStories() {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from '../FeatureCard';

const meta: Meta<typeof FeatureCard> = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
  args: {
    icon: '⚡',
    title: 'Lightning Fast HMR',
    description: 'Hot Module Replacement with Vite for instant feedback',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
    </div>
  ),
};
`;
  }

  protected generateButtonStories() {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    onClick: { action: 'clicked' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
};
`;
  }

  protected generateContactForm() {
    return `import { FunctionComponent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ContactForm.css';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormInputs) => void | Promise<void>;
}

export const ContactForm: FunctionComponent<ContactFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleFormSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      // Default behavior: log to console
      console.log('Form submitted:', data);
      alert('Thank you for your message! We will get back to you soon.');
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          className={errors.name ? 'error' : ''}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
          placeholder="John Doe"
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          className={errors.email ? 'error' : ''}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="john@example.com"
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject *</label>
        <input
          id="subject"
          type="text"
          className={errors.subject ? 'error' : ''}
          {...register('subject', {
            required: 'Subject is required',
            minLength: {
              value: 5,
              message: 'Subject must be at least 5 characters',
            },
          })}
          placeholder="How can we help?"
        />
        {errors.subject && <span className="error-message">{errors.subject.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          rows={6}
          className={errors.message ? 'error' : ''}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters',
            },
          })}
          placeholder="Tell us more about your inquiry..."
        />
        {errors.message && <span className="error-message">{errors.message.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
`;
  }

  protected generateContactPage() {
    return `import { Link } from 'react-router-dom';
import { ContactForm } from '@components/ContactForm';
import './Contact.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const handleSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    alert(\`Thank you \${data.name}! We have received your message and will respond soon.\`);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>contact@${this.context.normalizedName}.com</p>
          </div>
          <div className="info-item">
            <h3>📱 Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>123 Business Street<br />San Francisco, CA 94102</p>
          </div>
          <div className="info-item">
            <h3>⏰ Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
`;
  }

  protected generateContactPageCss() {
    return `.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.contact-page .contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-page .contact-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.contact-page .contact-header p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.contact-page .back-link {
  color: #667eea;
  text-decoration: none;
  display: inline-block;
}

.contact-page .back-link:hover {
  text-decoration: underline;
}

.contact-page .contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 768px) {
  .contact-page .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.contact-page .contact-info {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
}

.contact-page .contact-info h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
}

.contact-page .info-item {
  margin-bottom: 2rem;
}

.contact-page .info-item:last-child {
  margin-bottom: 0;
}

.contact-page .info-item h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.contact-page .info-item p {
  color: #666;
  line-height: 1.6;
}

.contact-page .contact-form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-page .contact-form-wrapper h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
}
`;
  }

  protected generateContactFormCss() {
    return `.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-form label {
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.contact-form input.error,
.contact-form textarea.error {
  border-color: #e74c3c;
}

.contact-form input.error:focus,
.contact-form textarea.error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form .error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.contact-form button {
  margin-top: 0.5rem;
  width: 100%;
}

.contact-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
  }
}

