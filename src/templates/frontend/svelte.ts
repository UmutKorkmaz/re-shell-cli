import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class SvelteTemplate extends BaseTemplate {
  constructor(framework: FrameworkConfig, context: TemplateContext) {
    super(framework, context);
  }

  async generateFiles(): Promise<TemplateFile[]> {
    const files: TemplateFile[] = [];
    const { hasTypeScript } = this.context;
    const ext = hasTypeScript ? 'ts' : 'js';
    const configExt = hasTypeScript ? 'ts' : 'js';

    // Package.json
    files.push({
      path: 'package.json',
      content: JSON.stringify(this.generatePackageJson(), null, 2)
    });

    // Vite config
    files.push({
      path: `vite.config.${configExt}`,
      content: this.generateViteConfig()
    });

    // Svelte config
    files.push({
      path: 'svelte.config.js',
      content: this.generateSvelteConfig()
    });

    // TypeScript config (if TypeScript)
    if (hasTypeScript) {
      files.push({
        path: 'tsconfig.json',
        content: this.generateTsConfig()
      });
    }

    // ESLint config
    files.push({
      path: '.eslintrc.js',
      content: this.generateEslintConfig()
    });

    // Main entry file
    files.push({
      path: `src/main.${ext}`,
      content: this.generateMainFile()
    });

    // App component
    files.push({
      path: 'src/App.svelte',
      content: this.generateAppComponent()
    });

    // Event bus
    files.push({
      path: `src/eventBus.${ext}`,
      content: this.generateEventBus()
    });

    // Stores directory
    files.push({
      path: 'src/stores',
      content: '',
      isDirectory: true
    });

    // Writable stores
    files.push({
      path: `src/stores/writable.${ext}`,
      content: this.generateWritableStores()
    });

    // Readable stores
    files.push({
      path: `src/stores/readable.${ext}`,
      content: this.generateReadableStores()
    });

    // Derived stores
    files.push({
      path: `src/stores/derived.${ext}`,
      content: this.generateDerivedStores()
    });

    // Custom stores
    files.push({
      path: `src/stores/custom.${ext}`,
      content: this.generateCustomStores()
    });

    // Components directory
    files.push({
      path: 'src/components',
      content: '',
      isDirectory: true
    });

    // Store components
    files.push({
      path: 'src/components/Counter.svelte',
      content: this.generateCounterComponent()
    });

    files.push({
      path: 'src/components/TodoList.svelte',
      content: this.generateTodoListComponent()
    });

    files.push({
      path: 'src/components/ThemeToggle.svelte',
      content: this.generateThemeToggleComponent()
    });

    files.push({
      path: 'src/components/TimeDisplay.svelte',
      content: this.generateTimeDisplayComponent()
    });

    // HTML file for development
    files.push({
      path: 'public/index.html',
      content: this.generateHtmlFile()
    });

    // README
    files.push({
      path: 'README.md',
      content: this.generateReadme()
    });

    // Dockerfile for containerization
    files.push({
      path: 'Dockerfile',
      content: this.generateDockerfile()
    });

    // Docker Compose for development
    files.push({
      path: 'docker-compose.yml',
      content: this.generateDockerCompose()
    });

    // Docker ignore
    files.push({
      path: '.dockerignore',
      content: this.generateDockerIgnore()
    });

    // Environment configuration
    files.push({
      path: '.env.example',
      content: this.generateEnvExample()
    });

    // Nginx configuration for production
    files.push({
      path: 'nginx.conf',
      content: this.generateNginxConfig()
    });

    return files;
  }

  private generateSvelteConfig(): string {
    return `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
};`;
  }

  private generateMainFile(): string {
    const { normalizedName, hasTypeScript } = this.context;
    const componentName = normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1).replace(/-./g, x => x[1].toUpperCase());

    if (hasTypeScript) {
      return `import App from './App.svelte';
import { eventBus } from './eventBus';

// Extend window interface for TypeScript
declare global {
  interface Window {
    ${componentName}: {
      mount: (containerId: string) => void;
      unmount: () => void;
      app?: App;
    };
  }
}

// Entry point for the microfrontend
window.${componentName} = {
  mount: (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(\`Container element with ID "\${containerId}" not found\`);
      return;
    }

    // Create Svelte app instance
    const app = new App({
      target: container
    });
    
    // Notify shell that microfrontend is loaded
    eventBus.emit('microfrontend:loaded', { id: '${normalizedName}' });
    
    // Store app instance for unmounting
    window.${componentName}.app = app;
  },

  unmount: () => {
    if (window.${componentName}.app) {
      window.${componentName}.app.$destroy();
      eventBus.emit('microfrontend:unloaded', { id: '${normalizedName}' });
    }
  }
};

// For development mode
if (import.meta.env.DEV) {
  const devContainer = document.getElementById('app');
  if (devContainer) {
    window.${componentName}.mount('app');
  }
}`;
    } else {
      return `import App from './App.svelte';
import { eventBus } from './eventBus';

// Entry point for the microfrontend
window.${componentName} = {
  mount: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(\`Container element with ID "\${containerId}" not found\`);
      return;
    }

    // Create Svelte app instance
    const app = new App({
      target: container
    });
    
    // Notify shell that microfrontend is loaded
    eventBus.emit('microfrontend:loaded', { id: '${normalizedName}' });
    
    // Store app instance for unmounting
    window.${componentName}.app = app;
  },

  unmount: () => {
    if (window.${componentName}.app) {
      window.${componentName}.app.$destroy();
      eventBus.emit('microfrontend:unloaded', { id: '${normalizedName}' });
    }
  }
};

// For development mode
if (import.meta.env.DEV) {
  const devContainer = document.getElementById('app');
  if (devContainer) {
    window.${componentName}.mount('app');
  }
}`;
    }
  }

  private generateAppComponent(): string {
    const { normalizedName, name, hasTypeScript } = this.context;
    const scriptLang = hasTypeScript ? ' lang="ts"' : '';

    return `<script${scriptLang}>
  // Component logic here
</script>

<div class="${normalizedName}-app">
  <header class="${normalizedName}-header">
    <h1>${name}</h1>
    <p>A Svelte microfrontend built with Re-Shell CLI</p>
  </header>
  <main class="${normalizedName}-main">
    <section class="${normalizedName}-content">
      <h2>Welcome to ${name}</h2>
      <p>This microfrontend is ready for development!</p>
      <div class="${normalizedName}-features">
        <div class="feature-card">
          <h3>🚀 Fast Development</h3>
          <p>Hot module replacement and fast refresh</p>
        </div>
        <div class="feature-card">
          <h3>📦 Modular Architecture</h3>
          <p>Independent deployment and development</p>
        </div>
        <div class="feature-card">
          <h3>${hasTypeScript ? '🔧 TypeScript Support' : '⚡ Modern Tooling'}</h3>
          <p>${hasTypeScript ? 'Type-safe development experience' : 'Vite-powered build system'}</p>
        </div>
      </div>
    </section>
  </main>
</div>

<style>
  .${normalizedName}-app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .${normalizedName}-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: linear-gradient(135deg, #ff3e00 0%, #ff8a00 100%);
    color: white;
    border-radius: 8px;
  }

  .${normalizedName}-header h1 {
    margin: 0 0 10px 0;
    font-size: 2.5rem;
    font-weight: 600;
  }

  .${normalizedName}-header p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .${normalizedName}-main {
    margin-top: 20px;
  }

  .${normalizedName}-content h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2rem;
    text-align: center;
  }

  .${normalizedName}-content > p {
    text-align: center;
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 40px;
  }

  .${normalizedName}-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .feature-card {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .feature-card h3 {
    margin: 0 0 15px 0;
    color: #495057;
    font-size: 1.3rem;
  }

  .feature-card p {
    margin: 0;
    color: #6c757d;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .${normalizedName}-app {
      padding: 10px;
    }
    
    .${normalizedName}-header h1 {
      font-size: 2rem;
    }
    
    .${normalizedName}-features {
      grid-template-columns: 1fr;
    }
  }
</style>`;
  }

  private generateEventBus(): string {
    const { hasTypeScript } = this.context;

    if (hasTypeScript) {
      return `// Simple event bus for microfrontend communication
interface EventBusEvents {
  'microfrontend:loaded': { id: string };
  'microfrontend:unloaded': { id: string };
  [key: string]: any;
}

type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  emit<K extends keyof EventBusEvents>(event: K, data: EventBusEvents[K]): void {
    const callbacks = this.events.get(event as string);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  on<K extends keyof EventBusEvents>(event: K, callback: EventCallback<EventBusEvents[K]>): void {
    if (!this.events.has(event as string)) {
      this.events.set(event as string, []);
    }
    this.events.get(event as string)!.push(callback);
  }

  off<K extends keyof EventBusEvents>(event: K, callback: EventCallback<EventBusEvents[K]>): void {
    const callbacks = this.events.get(event as string);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

export const eventBus = new EventBus();`;
    } else {
      return `// Simple event bus for microfrontend communication
class EventBus {
  constructor() {
    this.events = new Map();
  }

  emit(event, data) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }

  off(event, callback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

export const eventBus = new EventBus();`;
    }
  }

  private generateHtmlFile(): string {
    const { name } = this.context;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Re-Shell Microfrontend</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.${this.context.hasTypeScript ? 'ts' : 'js'}"></script>
</body>
</html>`;
  }

  private generateDockerfile(): string {
    return `# Multi-stage build for Svelte microfrontend
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]`;
  }

  private generateDockerCompose(): string {
    const { normalizedName, name } = this.context;
    const port = 3002;
    
    return `services:
  ${normalizedName}:
    build: .
    ports:
      - "${port}:${port}"
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:8000
      - VITE_APP_NAME=${name}
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0 --port ${port}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:${port}"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s`;
  }

  private generateDockerIgnore(): string {
    return `node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.git
.gitignore
README.md
.env
.nyc_output
coverage
.idea
.vscode
.DS_Store
dist
build`;
  }

  private generateEnvExample(): string {
    const { normalizedName, name } = this.context;
    
    return `# Application Configuration
VITE_APP_NAME=${name}
VITE_APP_VERSION=1.0.0

# API Configuration
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=5000

# Microfrontend Configuration
VITE_MF_ID=${normalizedName}
VITE_MF_PORT=3002

# Environment
NODE_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_MONITORING=false`;
  }

  private generateNginxConfig(): string {
    return `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\\n";
        add_header Content-Type text/plain;
    }

    # Disable access to hidden files
    location ~ /\\. {
        deny all;
    }
}`;
  }

  private generateWritableStores(): string {
    const { hasTypeScript } = this.context;
    const types = hasTypeScript ? `
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
}
` : '';

    return `import { writable } from 'svelte/store';

${types}
// Counter Store - Basic writable store example
export const counter = writable(0);

// Todo Store - CRUD operations example
${hasTypeScript ? 'export const todos = writable<Todo[]>([]);' : 'export const todos = writable([]);'}

export const addTodo = (text: string) => {
  ${hasTypeScript ? 'const newTodo: Todo = ' : 'const newTodo = '}
    {
      id: Date.now().toString(),
      text,
      completed: false,
      ${hasTypeScript ? 'createdAt: new Date()' : "createdAt: new Date()"}
    };
  ${hasTypeScript ? 'todos.update(t => [...t, newTodo]);' : 'todos.update(t => [...t, newTodo]);'}
};

export const toggleTodo = (id: string) => {
  ${hasTypeScript ? 'todos.update(t => t.map(todo => ' : 'todos.update(t => t.map(todo => '}
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

export const deleteTodo = (id: string) => {
  ${hasTypeScript ? 'todos.update(t => t.filter(todo => todo.id !== id));' : 'todos.update(t => t.filter(todo => todo.id !== id));'}
};

export const updateTodo = (id: string, text: string) => {
  ${hasTypeScript ? 'todos.update(t => t.map(todo => ' : 'todos.update(t => t.map(todo => '}
    todo.id === id ? { ...todo, text } : todo
  ));
};

// User Store - Authentication state example
${hasTypeScript ? 'export const user = writable<User>(' : 'export const user = writable('}
  {
    id: '',
    username: '',
    email: '',
    isAuthenticated: false
  }
);

export const login = (username: string, email: string) => {
  ${hasTypeScript ? 'user.set({' : 'user.set({'}
    id: Date.now().toString(),
    username,
    email,
    isAuthenticated: true
  });
};

export const logout = () => {
  ${hasTypeScript ? 'user.set({' : 'user.set({'}
    id: '',
    username: '',
    email: '',
    isAuthenticated: false
  });
};

// Reset stores
export const resetCounter = () => counter.set(0);
export const resetTodos = () => todos.set([]);
export const resetUser = () => logout();
`;
  }

  private generateReadableStores(): string {
    const { hasTypeScript } = this.context;

    return `import { readable } from 'svelte/store';
import { derived } from 'svelte/store';

// Time Store - Updates every second
export const time = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return () => clearInterval(interval);
});

// Window Size Store - Reacts to resize events
interface WindowSize {
  width: number;
  height: number;
}

export const windowSize = readable<WindowSize>(
  { width: window.innerWidth, height: window.innerHeight },
  (set) => {
    const handleResize = () => {
      set({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }
);

// Media Query Store - Responsive breakpoints
export const isMobile = derived(windowSize, ($windowSize) => $windowSize.width < 768);
export const isTablet = derived(
  windowSize,
  ($windowSize) => $windowSize.width >= 768 && $windowSize.width < 1024
);
export const isDesktop = derived(windowSize, ($windowSize) => $windowSize.width >= 1024);

// Network Status Store
const networkStatus = readable(
  navigator.onLine,
  (set) => {
    const handleOnline = () => set(true);
    const handleOffline = () => set(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
);

export const isConnected = networkStatus;

// Cursor Position Store
interface CursorPosition {
  x: number;
  y: number;
}

export const cursorPosition = readable<CursorPosition>(
  { x: 0, y: 0 },
  (set) => {
    const handleMouseMove = (e: MouseEvent) => {
      set({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }
);

// Scroll Position Store
interface ScrollPosition {
  x: number;
  y: number;
}

export const scrollPosition = readable<ScrollPosition>(
  { x: window.pageXOffset, y: window.pageYOffset },
  (set) => {
    const handleScroll = () => {
      set({ x: window.pageXOffset, y: window.pageYOffset });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }
);
`;
  }

  private generateDerivedStores(): string {
    const { hasTypeScript } = this.context;
    const types = hasTypeScript ? `
interface FilteredTodo extends Todo {
  filterText: string;
}
` : '';

    return `import { derived } from 'svelte/store';
import { todos, user } from './writable';
import { isMobile } from './readable';

${types}
// Filtered Todos - Derived store from todo store
${hasTypeScript ? 'export const filteredTodos = derived(todos, ($todos) => $todos);' : 'export const filteredTodos = derived(todos, ($todos) => $todos);'}

export const activeTodos = derived(todos, ($todos) =>
  $todos.filter(todo => !todo.completed)
);

export const completedTodos = derived(todos, ($todos) =>
  $todos.filter(todo => todo.completed)
);

${hasTypeScript ? 'export const filteredTodosByText = derived([todos, filteredTodos], ([$todos, $filteredTodos], set) => {' : 'export const filteredTodosByText = derived([todos, filteredTodos], ([$todos, $filteredTodos], set) => {'}
  let searchText = '';

  const filter = () => {
    set($todos.filter(todo =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    ));
  };

  return {
    subscribe: derived(filteredTodos).subscribe,
    updateText: (text: string) => {
      searchText = text;
      filter();
    }
  };
});

// Todo Statistics - Computed values
export const todoStats = derived(todos, ($todos) => ({
  total: $todos.length,
  completed: $todos.filter(todo => todo.completed).length,
  active: $todos.filter(todo => !todo.completed).length,
  completionRate: $todos.length > 0
    ? Math.round(($todos.filter(todo => todo.completed).length / $todos.length) * 100)
    : 0
}));

// Auth Status - Derived from user store
export const authStatus = derived(user, ($user) => ({
  isAuthenticated: $user.isAuthenticated,
  userName: $user.username,
  userId: $user.id,
  authMessage: $user.isAuthenticated
    ? \`Welcome back, \${$user.username}!\`
    : 'Please log in'
}));

// Is Mobile Derived - Combine with other stores
${hasTypeScript ? 'export const mobileTodoStats = derived([todoStats, isMobile], ([$todoStats, $isMobile]) => (' : 'export const mobileTodoStats = derived([todoStats, isMobile], ([$todoStats, $isMobile]) => ('}
  {
    ...$todoStats,
    isMobile: $isMobile,
    displayText: $isMobile
      ? \`Mobile: \${$todoStats.active} active, \${$todoStats.completed} completed\`
      : \`Total: \${$todoStats.total}, Active: \${$todoStats.active}\`
  }
));

// Search functionality
${hasTypeScript ? 'export const searchResults = derived([todos, filteredTodosByText], ([$todos, $searchResults]) => ' : 'export const searchResults = derived([todos, filteredTodosByText], ([$todos, $searchResults]) => '}
  ({
    allTodos: $todos,
    filteredResults: $searchResults,
    hasResults: $searchResults.length > 0
  }
));

// Keyboard Shortcuts Helper
export const keyboardShortcut = derived(
  [isMobile],
  ([$isMobile]) => ({
    isMobileShortcuts: $isMobile,
    primaryAction: $isMobile ? 'Tap' : 'Click',
    secondaryAction: $isMobile ? 'Long press' : 'Right click'
  })
);
`;
  }

  private generateCustomStores(): string {
    const { hasTypeScript } = this.context;
    const types = hasTypeScript ? `
interface LocalStorageStore<T> {
  subscribe: (run: (value: T) => void, invalidate?: (value?: unknown) => void) => () => void;
  update: (updater: (value: T) => T) => void;
  set: (value: T) => void;
  load: () => void;
  save: () => void;
  clear: () => void;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
` : '';

    return `import { writable, readable, derived } from 'svelte/store';
import { writable as derivedWritable } from 'svelte/store';

${types}
// Local Storage Store - Persistent state
export function localStorageStore<T>(key: string, initialValue: T) {
  const storedValue = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable<T>(initial);

  // Subscribe to store changes and save to localStorage
  store.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
}

// Example usage:
// export const theme = localStorageStore<'light' | 'dark'>('theme', 'light');
// export const userPreferences = localStorageStore('userPreferences', { notifications: true });

// API Store - Fetch with loading/error states
export function apiStore<T>(url: string, options: RequestInit = {}) {
  const state = readable<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  }, (set) => {
    let abortController: AbortController | null = null;

    const fetchData = async () => {
      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();

      try {
        set({ data: null, loading: true, error: null });

        const response = await fetch(url, {
          ...options,
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const data = await response.json();
        set({ data, loading: false, error: null });
      } catch (error) {
        if (error.name !== 'AbortError') {
          set({ data: null, loading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  });

  return {
    ...state,
    refetch: () => {
      state.update(current => ({ ...current, loading: true }));
      fetchData();
    }
  };
}

// Pagination Store - Custom paginated data store
export function paginationStore<T>(
  fetchFn: (page: number, pageSize: number) => Promise<{ items: T[]; total: number }>
) {
  const page = writable(1);
  const pageSize = writable(10);

  const paginatedData = derivedWritable<[number, number], PaginatedData<T>>(
    [page, pageSize],
    ([$page, $pageSize], set) => {
      let loading = true;
      let error: string | null = null;
      let items: T[] = [];
      let total = 0;

      const fetchData = async () => {
        try {
          const result = await fetchFn($page, $pageSize);
          items = result.items;
          total = result.total;
          loading = false;
          error = null;
          set({
            items,
            total,
            page: $page,
            pageSize: $pageSize,
            totalPages: Math.ceil(total / $pageSize)
          });
        } catch (err) {
          error = err.message;
          loading = false;
          set({
            items: [],
            total: 0,
            page: $page,
            pageSize: $pageSize,
            totalPages: 0
          });
        }
      };

      fetchData();
    },
    {
      items: [],
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0
    }
  );

  const nextPage = () => {
    page.update(current => current + 1);
  };

  const prevPage = () => {
    page.update(current => Math.max(1, current - 1));
  };

  const goToPage = (newPage: number) => {
    page.update(() => Math.max(1, newPage));
  };

  const setPageSize = (newSize: number) => {
    pageSize.update(() => newSize);
  };

  return {
    subscribe: paginatedData.subscribe,
    page,
    pageSize,
    nextPage,
    prevPage,
    goToPage,
    setPageSize
  };
}

// Debounced Store - Custom store with debouncing
export function debouncedStore<T>(sourceStore: T, delay: number) {
  let timeoutId: number;
  const debounced = writable(sourceStore);

  sourceStore.subscribe((value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debounced.set(value);
    }, delay);
  });

  return debounced;
}

// Throttle Store - Custom store with throttling
export function throttleStore<T>(sourceStore: T, limit: number) {
  let last = 0;
  const throttled = writable(sourceStore);

  sourceStore.subscribe((value) => {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      throttled.set(value);
    }
  });

  return throttled;
}

// Undo/Redo Store - Custom store with history
export function undoRedoStore<T>(initialState: T) {
  const history = writable<T[]>([initialState]);
  const currentIndex = writable<number>(0);
  const canUndo = derived(currentIndex, ($currentIndex) => $currentIndex > 0);
  const canRedo = derived(
    currentIndex,
    ($currentIndex) => $currentIndex < history.get().length - 1
  );

  const updateState = (newState: T) => {
    history.update($history => {
      const newHistory = $history.slice(0, $currentIndex + 1);
      newHistory.push(newState);
      return newHistory;
    });
    currentIndex.update($index => $index + 1);
  };

  const undo = () => {
    currentIndex.update($index => Math.max(0, $index - 1));
  };

  const redo = () => {
    currentIndex.update($index =>
      Math.min(history.get().length - 1, $index + 1)
    );
  };

  const currentState = derived(
    [history, currentIndex],
    ([$history, $currentIndex]) => $history[$currentIndex]
  );

  return {
    subscribe: currentState.subscribe,
    update: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: () => {
      history.set([initialState]);
      currentIndex.set(0);
    }
  };
}

// Form Validation Store - Custom validation store
export function validationStore(initialValues: Record<string, any>) {
  const values = writable(initialValues);
  const errors = writable<Record<string, string>>({});
  const touched = writable<Record<string, boolean>>({});
  const isValid = derived(errors, ($errors) => Object.keys($errors).length === 0);

  const setValue = (field: string, value: any) => {
    values.update($values => ({ ...$values, [field]: value }));
  };

  const setError = (field: string, error: string) => {
    errors.update($errors => ({ ...$errors, [field]: error }));
  };

  const clearError = (field: string) => {
    errors.update($errors => {
      const newErrors = { ...$errors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setTouched = (field: string, isTouched = true) => {
    touched.update($touched => ({ ...$touched, [field]: isTouched }));
  };

  const validateField = (field: string, validator: (value: any) => string | null) => {
    const currentValue = values.get()[field];
    const error = validator(currentValue);

    if (error) {
      setError(field, error);
    } else {
      clearError(field);
    }
  };

  const reset = () => {
    values.set(initialValues);
    errors.set({});
    touched.set({});
  };

  return {
    subscribe: values.subscribe,
    values,
    errors,
    touched,
    isValid,
    setValue,
    setError,
    clearError,
    setTouched,
    validateField,
    reset
  };
}
`;
  }

  private generateCounterComponent(): string {
    return `<script>
  import { counter, resetCounter } from '../stores/writable';

  let count = 0;

  // Subscribe to counter store
  counter.subscribe(value => {
    count = value;
  });

  function increment() {
    counter.update(value => value + 1);
  }

  function decrement() {
    counter.update(value => value - 1);
  }

  function incrementBy(amount) {
    counter.update(value => value + amount);
  }
</script>

<div class="counter-container">
  <h2>Counter Example</h2>

  <div class="counter-display">
    <span class="count">{count}</span>
  </div>

  <div class="counter-controls">
    <button on:click={decrement} class="btn btn-secondary">-</button>
    <button on:click={increment} class="btn btn-primary">+</button>
    <button on:click={() => incrementBy(5)} class="btn btn-accent">+5</button>
  </div>

  <div class="counter-actions">
    <button on:click={resetCounter} class="btn btn-outline">Reset</button>
  </div>

  <div class="counter-info">
    <p>This demonstrates a simple writable store with bidirectional binding.</p>
    <p>The counter value is stored in the counter store and reactive across all components.</p>
  </div>
</div>

<style>
  .counter-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
  }

  .counter-display {
    text-align: center;
    margin: 2rem 0;
  }

  .count {
    font-size: 4rem;
    font-weight: bold;
    color: #2c3e50;
    display: inline-block;
    min-width: 80px;
  }

  .counter-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .counter-actions {
    text-align: center;
    margin-top: 1rem;
  }

  .counter-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
  }
</style>
`;
  }

  private generateTodoListComponent(): string {
    return `<script>
  import { todos, addTodo, toggleTodo, deleteTodo } from '../stores/writable';
  import { activeTodos, completedTodos, todoStats } from '../stores/derived';

  let newTodoText = '';

  function handleAddTodo() {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      newTodoText = '';
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && newTodoText.trim()) {
      handleAddTodo();
    }
  }
</script>

<div class="todo-container">
  <h2>Todo List Example</h2>

  <div class="todo-stats">
    <p>Total: {todoStats.total} | Active: {todoStats.active} | Completed: {todoStats.completed}</p>
    <p>Completion Rate: {todoStats.completionRate}%</p>
  </div>

  <div class="todo-form">
    <input
      type="text"
      bind:value={newTodoText}
      on:keydown={handleKeyPress}
      placeholder="What needs to be done?"
      class="todo-input"
    />
    <button on:click={handleAddTodo} class="btn btn-primary">Add Todo</button>
  </div>

  <div class="todo-filters">
    <button class="btn-filter active">All</button>
    <button class="btn-filter">Active</button>
    <button class="btn-filter">Completed</button>
  </div>

  <div class="todo-list">
    {#each $todos as todo (todo.id)}
      <div class="todo-item" class:completed={todo.completed}>
        <input
          type="checkbox"
          bind:checked={todo.completed}
          on:change={() => toggleTodo(todo.id)}
          class="todo-checkbox"
        />
        <span class="todo-text">{todo.text}</span>
        <button on:click={() => deleteTodo(todo.id)} class="btn-delete">×</button>
      </div>
    {:else}
      <p class="empty-state">No todos yet. Add one above!</p>
    {/each}
  </div>

  <div class="todo-info">
    <p>This demonstrates a CRUD store with derived stores for filtering and statistics.</p>
    <p>Each todo has reactive properties that update automatically.</p>
  </div>
</div>

<style>
  .todo-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
  }

  .todo-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
  }

  .todo-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .todo-input {
    flex: 1;
    padding: 0.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
  }

  .todo-input:focus {
    outline: none;
    border-color: #3498db;
  }

  .todo-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .btn-filter {
    padding: 0.25rem 0.75rem;
    border: 1px solid #e0e0e0;
    background: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-filter.active {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }

  .todo-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .todo-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;
  }

  .todo-item:hover {
    background-color: #f9f9f9;
  }

  .todo-item.completed {
    opacity: 0.6;
  }

  .todo-item.completed .todo-text {
    text-decoration: line-through;
  }

  .todo-checkbox {
    margin-right: 0.75rem;
  }

  .todo-text {
    flex: 1;
    margin: 0;
  }

  .btn-delete {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0 0.25rem;
    line-height: 1;
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #999;
  }

  .todo-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
  }
</style>
`;
  }

  private generateThemeToggleComponent(): string {
    return `<script>
  import { localStorageStore } from '../stores/custom';

  // Theme store using localStorage for persistence
  export const theme = localStorageStore<'light' | 'dark'>('theme', 'light');

  let currentTheme = 'light';

  theme.subscribe(value => {
    currentTheme = value;
    updateTheme();
  });

  function toggleTheme() {
    theme.update(value => value === 'light' ? 'dark' : 'light');
  }

  function updateTheme() {
    if (typeof document !== 'undefined') {
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }
</script>

<div class="theme-container">
  <h2>Theme Toggle Example</h2>

  <div class="theme-display">
    <div class="theme-icon {currentTheme}">
      {#if currentTheme === 'light'}
        <span>☀️</span>
      {:else}
        <span>🌙</span>
      {/if}
    </div>
    <p>Current theme: <strong>{currentTheme}</strong></p>
  </div>

  <button on:click={toggleTheme} class="btn-primary">
    {#if currentTheme === 'light'}
      Switch to Dark Mode
    {:else}
      Switch to Light Mode
    {/if}
  </button>

  <div class="theme-info">
    <p>This demonstrates a custom localStorage store for persistent theme preferences.</p>
    <p>The theme preference is saved to localStorage and persists across page reloads.</p>
  </div>
</div>

<style>
  .theme-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
  }

  .theme-display {
    text-align: center;
    margin-bottom: 2rem;
  }

  .theme-icon {
    font-size: 3rem;
    display: inline-block;
    padding: 1rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  .theme-icon:hover {
    transform: scale(1.1);
  }

  .theme-icon.light {
    background: #fff3cd;
    color: #856404;
  }

  .theme-icon.dark {
    background: #343a40;
    color: #f8f9fa;
  }

  .theme-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
  }

  /* Dark mode styles */
  .dark {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
  }
</style>
`;
  }

  private generateTimeDisplayComponent(): string {
    return `<script>
  import { time, isMobile } from '../stores/readable';

  let currentTime = new Date();
  let isMobileDevice = false;

  // Subscribe to time store
  time.subscribe(value => {
    currentTime = value;
  });

  // Subscribe to mobile detection
  isMobile.subscribe(value => {
    isMobileDevice = value;
  });

  // Format time based on mobile/desktop
  $: formattedTime = isMobileDevice
    ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

  $: formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
</script>

<div class="time-container">
  <h2>Time Display Example</h2>

  <div class="time-display">
    <div class="time-value">{formattedTime}</div>
    <div class="date-value">{formattedDate}</div>
    {#if isMobileDevice}
      <div class="device-info">Mobile Device</div>
    {:else}
      <div class="device-info">Desktop Device</div>
    {/if}
  </div>

  <div class="time-info">
    <p>This demonstrates readable stores that react to system events.</p>
    <p>The time updates every second, and the display adapts to screen size.</p>
  </div>
</div>

<style>
  .time-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .time-display {
    margin-bottom: 2rem;
  }

  .time-value {
    font-size: 3rem;
    font-weight: 300;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-variant-numeric: tabular-nums;
  }

  .date-value {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-bottom: 1rem;
  }

  .device-info {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #ecf0f1;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #34495e;
  }

  .time-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
  }

  /* Animation for time updates */
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }

  .time-value {
    animation: pulse 1s ease-in-out;
  }
</style>
`;
  }

  private generateAppComponent(): string {
    const { normalizedName, name, hasTypeScript } = this.context;
    const scriptLang = hasTypeScript ? ' lang="ts"' : '';

    return `<script${scriptLang}>
  import Counter from './components/Counter.svelte';
  import TodoList from './components/TodoList.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import TimeDisplay from './components/TimeDisplay.svelte';

  import { user, login, logout } from './stores/writable';

  let showDemo = true;
  $: isLoggedIn = $user.isAuthenticated;

  function handleLogin() {
    login('Demo User', 'demo@example.com');
  }

  function handleLogout() {
    logout();
  }
</script>

<div class="${normalizedName}-app">
  <header class="${normalizedName}-header">
    <div class="header-content">
      <h1>${name}</h1>
      <p>A Svelte microfrontend with reactive state management</p>

      {#if isLoggedIn}
        <div class="auth-info">
          <span>👤 Welcome, {$user.username}!</span>
          <button on:click={handleLogout} class="btn btn-secondary btn-sm">Logout</button>
        </div>
      {:else}
        <button on:click={handleLogin} class="btn btn-primary btn-sm">Demo Login</button>
      {/if}
    </div>
  </header>

  <main class="${normalizedName}-main">
    {#if showDemo}
      <section class="${normalizedName}-intro">
        <h2>Store Examples</h2>
        <p>This template demonstrates various Svelte 5 store patterns for reactive state management.</p>

        <div class="demo-grid">
          <div class="demo-card">
            <h3>⏰ Time Display</h3>
            <p>Readable store that updates every second</p>
          </div>
          <div class="demo-card">
            <h3>🎯 Counter</h3>
            <p>Writable store with basic state management</p>
          </div>
          <div class="demo-card">
            <h3>📝 Todo List</h3>
            <p>CRUD operations with derived stores</p>
          </div>
          <div class="demo-card">
            <h3>🎨 Theme Toggle</h3>
            <p>Custom persistent store example</p>
          </div>
        </div>
      </section>

      <section class="${normalizedName}-demos">
        <div class="demo-section">
          <h3>Time & Device Detection</h3>
          <TimeDisplay />
        </div>

        <div class="demo-section">
          <h3>Interactive Counter</h3>
          <Counter />
        </div>

        <div class="demo-section">
          <h3>Todo Application</h3>
          <TodoList />
        </div>

        <div class="demo-section">
          <h3>Theme Persistence</h3>
          <ThemeToggle />
        </div>
      </section>
    {:else}
      <section class="${normalizedName}-placeholder">
        <h2>Welcome to ${name}</h2>
        <p>The demo components are hidden. Toggle them using the button above.</p>
      </section>
    {/if}
  </main>

  <footer class="${normalizedName}-footer">
    <button
      on:click={() => showDemo = !showDemo}
      class="btn btn-outline"
    >
      {#if showDemo}
        Hide Demos
      {:else}
        Show Demos
      {/if}
    </button>
    <p class="footer-text">
      Built with Svelte, Vite, and Re-Shell
    </p>
  </footer>
</div>

<style>
  .${normalizedName}-app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .${normalizedName}-header {
    margin-bottom: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    padding: 2rem;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .${normalizedName}-header h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 600;
  }

  .${normalizedName}-header p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .auth-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .${normalizedName}-main {
    flex: 1;
  }

  .${normalizedName}-intro {
    text-align: center;
    margin-bottom: 3rem;
  }

  .${normalizedName}-intro h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .${normalizedName}-intro > p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .demo-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .demo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .demo-card h3 {
    margin: 0 0 0.5rem 0;
    color: #495057;
    font-size: 1.2rem;
  }

  .demo-card p {
    margin: 0;
    color: #6c757d;
    font-size: 0.95rem;
  }

  .${normalizedName}-demos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .demo-section {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .demo-section h3 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    text-align: center;
  }

  .${normalizedName}-placeholder {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .${normalizedName}-placeholder h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  .${normalizedName}-placeholder p {
    color: #666;
  }

  .${normalizedName}-footer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-text {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: #3498db;
    color: white;
  }

  .btn-primary:hover {
    background: #2980b9;
  }

  .btn-secondary {
    background: #95a5a6;
    color: white;
  }

  .btn-secondary:hover {
    background: #7f8c8d;
  }

  .btn-outline {
    background: white;
    color: #3498db;
    border: 1px solid #3498db;
  }

  .btn-outline:hover {
    background: #3498db;
    color: white;
  }

  .btn-sm {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .${normalizedName}-app {
      padding: 10px;
    }

    .${normalizedName}-header h1 {
      font-size: 2rem;
    }

    .${normalizedName}-header {
      padding: 1.5rem;
    }

    .header-content {
      flex-direction: column;
      text-align: center;
    }

    .${normalizedName}-demos {
      grid-template-columns: 1fr;
    }

    .demo-grid {
      grid-template-columns: 1fr;
    }

    .${normalizedName}-footer {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
`;
  }

  private generateReadme(): string {
    const { name, hasTypeScript } = this.context;

    return `# ${name}

A Svelte microfrontend template with Vite, featuring comprehensive reactive state management with Svelte 5 stores, built with Re-Shell CLI.

## Features

- ⚡ **Fast Refresh** - Instant HMR (Hot Module Replacement)
- 📦 **Modular** - Designed as a self-contained microfrontend
- 🎯 **TypeScript Support${hasTypeScript ? ' Enabled' : ' Optional'}**
- 🚀 **Production Ready** - Optimized builds and deployment ready
- 🐳 **Docker Support** - Containerized with multi-stage builds
- 🌐 **Microfrontend Ready** - Integrated with Re-Shell shell
- 🔄 **Reactive State Management** - Complete Svelte 5 store implementation

## Store Examples

This template includes comprehensive examples of Svelte 5 store patterns:

### 1. Writable Stores (\`src/stores/writable.${hasTypeScript ? 'ts' : 'js'}\`)
- **Counter Store** - Basic state management with increment/decrement
- **Todo Store** - Full CRUD operations (Create, Read, Update, Delete)
- **User Store** - Authentication state management

### 2. Readable Stores (\`src/stores/readable.${hasTypeScript ? 'ts' : 'js'}\`)
- **Time Store** - Updates every second using intervals
- **Window Size Store** - Reacts to browser resize events
- **Network Status Store** - Tracks online/offline status
- **Cursor Position Store** - Mouse position tracking
- **Scroll Position Store** - Scroll position monitoring

### 3. Derived Stores (\`src/stores/derived.${hasTypeScript ? 'ts' : 'js'}\`)
- **Filtered Todos** - Derived from todo store with filtering
- **Todo Statistics** - Computed values (total, active, completed)
- **Auth Status** - Derived from user store with computed messages
- **Mobile Detection** - Combines multiple stores for responsive behavior

### 4. Custom Stores (\`src/stores/custom.${hasTypeScript ? 'ts' : 'js'}\`)
- **LocalStorage Store** - Persistent state with automatic sync
- **API Store** - Fetch with loading/error states and abort support
- **Pagination Store** - Custom paginated data management
- **Debounced Store** - Input debouncing for performance
- **Throttle Store** - Event throttling for performance
- **Undo/Redo Store** - History management with undo/redo functionality
- **Form Validation Store** - Client-side form validation

### 5. Example Components
- **Counter.svelte** - Demonstrates writable store usage
- **TodoList.svelte** - Shows CRUD operations with derived stores
- **ThemeToggle.svelte** - Persistent theme with localStorage
- **TimeDisplay.svelte** - Real-time updates with responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

\`\`\`bash
# Clone this repository
git clone <repository-url>
cd ${name}

# Install dependencies
npm install
# or
pnpm install
\`\`\`

### Development

\`\`\`bash
# Start development server
npm run dev
# or
pnpm dev
\`\`\`

Your microfrontend will be available at \`http://localhost:5173\`.

## Store Patterns and Usage

### Writable Stores

Writable stores are the most common type of store, used for state that can be both read and written:

\`\`\`javascript
import { writable } from 'svelte/store';

// Create a writable store
const count = writable(0);

// Subscribe to changes
count.subscribe(value => {
  console.log('Count changed:', value);
});

// Update the value
count.set(5);
count.update(value => value + 1);
\`\`\`

### Readable Stores

Readable stores are used for state that can only be read, typically for external data sources:

\`\`\`javascript
import { readable } from 'svelte/store';

// Create a readable store with initial value and subscription
const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  // Cleanup function
  return () => clearInterval(interval);
});
\`\`\`

### Derived Stores

Derived stores compute their values from other stores:

\`\`\`javascript
import { derived } from 'svelte/store';

// Create a derived store
const doubled = derived(count, \$count => \$count * 2);
\`\`\`

### Custom Stores

Custom stores provide advanced functionality like persistence, API integration, and complex state management:

\`\`\`javascript
// LocalStorage persistence
export function localStorageStore(key, initialValue) {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : initialValue;

  const store = writable(initial);

  store.subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}
\`\`\`

## Store Best Practices

### 1. Organization
- Group related stores together
- Use index files for cleaner imports
- Consider feature-based organization

### 2. TypeScript Support
- Define interfaces for store states
- Use generic types for reusable store functions
- Leverage Svelte's type inference

### 3. Performance
- Avoid excessive re-renders by using derived stores
- Debounce rapid updates (e.g., search inputs)
- Use selective subscriptions in components

### 4. Persistence
- Use localStorage for user preferences
- Implement proper fallbacks for SSR
- Consider IndexedDB for large datasets

### 5. Error Handling
- Add error boundaries around store operations
- Implement loading states for async operations
- Provide fallback values for failed API calls

### 6. Testing
- Test store mutations in isolation
- Mock external dependencies for unit tests
- Test derived values and computed properties

## Building for Production

\`\`\`bash
# Build for production
npm run build
# or
pnpm build
\`\`\`

The built files will be in the \`dist\` directory.

## Deployment

### Docker Deployment

\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build

# Or build Docker image directly
docker build -t ${name} .
\`\`\`

### Manual Deployment

1. Build the application: \`npm run build\`
2. Deploy the \`dist\` directory to your web server
3. Ensure the server is configured for SPA routing

## Configuration

### Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
VITE_APP_NAME=${name}
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:8000
NODE_ENV=development
\`\`\`

### TypeScript

${hasTypeScript ? 'TypeScript is already configured in this template.' : 'To enable TypeScript, rename \`.js\` files to \`.ts\` and install TypeScript dependencies.'}

## Microfrontend Integration

This template is designed to work as a microfrontend within the Re-Shell framework. The main entry point is configured to mount/unmount from a container element.

### Mounting

\`\`\`javascript
// Shell application code
${name}.mount('container-id');
\`\`\`

### Unmounting

\`\`\`javascript
// Shell application code
${name}.unmount();
\`\`\`

## Project Structure

\`\`\`
${name}/
├── src/
│   ├── components/     # Svelte components demonstrating store usage
│   │   ├── Counter.svelte
│   │   ├── TodoList.svelte
│   │   ├── ThemeToggle.svelte
│   │   └── TimeDisplay.svelte
│   ├── stores/        # Svelte stores implementation
│   │   ├── writable.${hasTypeScript ? 'ts' : 'js'}    # Writable stores
│   │   ├── readable.${hasTypeScript ? 'ts' : 'js'}    # Readable stores
│   │   ├── derived.${hasTypeScript ? 'ts' : 'js'}     # Derived stores
│   │   └── custom.${hasTypeScript ? 'ts' : 'js'}      # Custom stores
│   ├── App.svelte     # Main application component
│   └── main.${hasTypeScript ? 'ts' : 'js'} # Entry point
├── public/            # Static assets
├── package.json       # Project dependencies and scripts
└── vite.config.${hasTypeScript ? 'ts' : 'js'}      # Vite configuration
\`\`\`

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run test\` - Run tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Additional Resources

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Stores Documentation](https://svelte.dev/docs#svelte-stores)
- [Re-Shell CLI Documentation](https://github.com/kadotus/re-shell)
`;
  }
}
