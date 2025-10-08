import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class SvelteKitTemplate extends BaseTemplate {
  constructor(framework: FrameworkConfig, context: TemplateContext) {
    super(framework, context);
  }

  async generateFiles(): Promise<TemplateFile[]> {
    const files: TemplateFile[] = [];

    // Package.json
    files.push({
      path: 'package.json',
      content: JSON.stringify(this.generatePackageJson(), null, 2)
    });

    // Svelte config
    files.push({
      path: 'svelte.config.js',
      content: this.generateSvelteConfig()
    });

    // Vite config
    files.push({
      path: 'vite.config.ts',
      content: this.generateViteConfig()
    });

    // TypeScript configs
    files.push({
      path: 'tsconfig.json',
      content: this.generateTsConfig()
    });

    // App HTML
    files.push({
      path: 'src/app.html',
      content: this.generateAppHtml()
    });

    // Layouts
    files.push({
      path: 'src/routes/+layout.svelte',
      content: this.generateLayout()
    });

    files.push({
      path: 'src/routes/+layout.ts',
      content: this.generateLayoutServer()
    });

    // Pages
    files.push({
      path: 'src/routes/+page.svelte',
      content: this.generateIndexPage()
    });

    files.push({
      path: 'src/routes/+page.ts',
      content: this.generateIndexPageServer()
    });

    files.push({
      path: 'src/routes/+page.server.ts',
      content: this.generateIndexPageServerLoad()
    });

    // About page
    files.push({
      path: 'src/routes/about/+page.svelte',
      content: this.generateAboutPage()
    });

    files.push({
      path: 'src/routes/about/+page.ts',
      content: this.generateAboutPageServer()
    });

    // Dynamic routes
    files.push({
      path: 'src/routes/posts/[id]/+page.svelte',
      content: this.generatePostDetailPage()
    });

    files.push({
      path: 'src/routes/posts/[id]/+page.server.ts',
      content: this.generatePostDetailServer()
    });

    // API routes
    files.push({
      path: 'src/routes/api/hello/+server.ts',
      content: this.generateHelloApi()
    });

    files.push({
      path: 'src/routes/api/posts/+server.ts',
      content: this.generatePostsApi()
    });

    // Components
    files.push({
      path: 'src/lib/components/Header.svelte',
      content: this.generateHeader()
    });

    files.push({
      path: 'src/lib/components/Footer.svelte',
      content: this.generateFooter()
    });

    files.push({
      path: 'src/lib/components/FeatureCard.svelte',
      content: this.generateFeatureCard()
    });

    // Stores
    files.push({
      path: 'src/lib/stores/counter.ts',
      content: this.generateCounterStore()
    });

    files.push({
      path: 'src/lib/stores/theme.ts',
      content: this.generateThemeStore()
    });

    // Utils
    files.push({
      path: 'src/lib/utils/api.ts',
      content: this.generateApi()
    });

    files.push({
      path: 'src/lib/utils/format.ts',
      content: this.generateFormat()
    });

    // Types
    files.push({
      path: 'src/lib/types/index.ts',
      content: this.generateTypes()
    });

    // Error page
    files.push({
      path: 'src/routes/+error.svelte',
      content: this.generateErrorPage()
    });

    // CSS
    files.push({
      path: 'src/app.css',
      content: this.generateAppCss()
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
      version: '0.0.1',
      private: true,
      scripts: {
        dev: 'vite dev',
        build: 'vite build',
        preview: 'vite preview',
        check: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
        'check:watch': 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch',
        test: 'playwright test',
        lint: 'prettier --check . && eslint .',
        format: 'prettier --write .'
      },
      devDependencies: {
        '@playwright/test': '^1.41.2',
        '@sveltejs/adapter-auto': '^3.1.1',
        '@sveltejs/adapter-node': '^5.0.1',
        '@sveltejs/kit': '^2.5.0',
        '@typescript-eslint/eslint-plugin': '^6.19.0',
        '@typescript-eslint/parser': '^6.19.0',
        eslint: '^8.56.0',
        'eslint-config-prettier': '^9.1.0',
        'eslint-plugin-svelte': '^2.35.1',
        prettier: '^3.2.4',
        'prettier-plugin-svelte': '^3.2.2',
        'svelte-check': '^3.6.3',
        svelte: '^4.2.9',
        'tslib': '^2.6.2',
        typescript: '^5.3.3',
        vite: '^5.1.0',
        'vitest': '^1.2.2'
      },
      type: 'module'
    };
  }

  protected generateSvelteConfig() {
    return `import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
      $types: 'src/lib/types'
    }
  }
};

export default config;
`;
  }

  protected generateViteConfig() {
    return `import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: ${this.context.port || 5173},
    host: true
  }
});
`;
  }

  protected generateTsConfig() {
    return JSON.stringify(
      {
        extends: './.svelte-kit/tsconfig.json',
        compilerOptions: {
          allowJs: true,
          checkJs: true,
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          sourceMap: true,
          strict: true,
          moduleResolution: 'bundler',
          paths: {
            $components: ['./src/lib/components'],
            $stores: ['./src/lib/stores'],
            $utils: ['./src/lib/utils'],
            $types: ['./src/lib/types']
          }
        }
      },
      null,
      2
    );
  }

  protected generateAppHtml() {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
`;
  }

  protected generateLayout() {
    return `<script lang="ts">
  import { theme } from '$stores/theme';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
</script>

<svelte:head>
  <title>${this.context.name}</title>
  <meta name="description" content="${this.context.description}" />
</svelte:head>

<div class="app" class:dark={$theme === 'dark'}>
  <Header />

  <main class="main-content">
    <slot />
  </main>

  <Footer />
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #ffffff;
    color: #1a1a1a;
    transition: background-color 0.3s, color 0.3s;
  }

  .app.dark {
    background-color: #1a1a1a;
    color: #f5f5f5;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1rem;
    }
  }
</style>
`;
  }

  protected generateLayoutServer() {
    return `export const prerender = true;
export const ssr = true;
export const trailingSlash = 'always';
`;
  }

  protected generateIndexPage() {
    return `<script lang="ts">
  import { counter } from '$stores/counter';
  import FeatureCard from '$components/FeatureCard.svelte';

  let count = $counter;
</script>

<svelte:head>
  <title>Home - ${this.context.name}</title>
</svelte:head>

<div class="home">
  <section class="hero">
    <h1>Welcome to ${this.context.name}</h1>
    <p>A modern SvelteKit application with SSR, SSG, and file-based routing</p>

    <div class="counter-demo">
      <h2>Counter: {count}</h2>
      <div class="counter-buttons">
        <button on:click={() => counter.decrement()}>-</button>
        <button on:click={() => counter.reset()}>Reset</button>
        <button on:click={() => counter.increment()}>+</button>
      </div>
    </div>
  </section>

  <section class="features">
    <h2>SvelteKit Features</h2>
    <div class="feature-grid">
      <FeatureCard
        icon="⚡"
        title="Lightning Fast"
        description="No virtual DOM, direct DOM manipulation for maximum performance"
      />
      <FeatureCard
        icon="🔄"
        title="Server-Side Rendering"
        description="Built-in SSR and static site generation for optimal SEO"
      />
      <FeatureCard
        icon="📁"
        title="File-Based Routing"
        description="Intuitive routing based on file structure"
      />
      <FeatureCard
        icon="🎨"
        title="Reactive Stores"
        description="Simple and powerful state management with Svelte stores"
      />
    </div>
  </section>

  <section class="tech-stack">
    <h2>Tech Stack</h2>
    <ul>
      <li><strong>SvelteKit 2</strong> - Full-stack web framework</li>
      <li><strong>Svelte 4</strong> - UI framework with compile-time optimizations</li>
      <li><strong>TypeScript</strong> - Type-safe development</li>
      <li><strong>Vite</strong> - Lightning-fast build tool</li>
      <li><strong>Playwright</strong> - End-to-end testing</li>
    </ul>
  </section>
</div>

<style>
  .hero {
    text-align: center;
    padding: 3rem 0;
  }

  .hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ff3e00;
  }

  .hero p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

  :global(.dark) .hero p {
    color: #aaa;
  }

  .counter-demo {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  :global(.dark) .counter-demo {
    background: #2a2a2a;
  }

  .counter-demo h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .counter-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .counter-buttons button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background: #ff3e00;
    color: white;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .counter-buttons button:hover {
    opacity: 0.8;
  }

  .features {
    margin: 3rem 0;
  }

  .features h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .tech-stack {
    margin: 3rem 0;
  }

  .tech-stack h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .tech-stack ul {
    list-style: none;
    padding: 0;
  }

  .tech-stack li {
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }
</style>
`;
  }

  protected generateIndexPageServer() {
    return `export const prerender = true;
`;
  }

  protected generateIndexPageServerLoad() {
    return `import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Server-side data loading
  return {
    props: {
      timestamp: new Date().toISOString()
    }
  };
};
`;
  }

  protected generateAboutPage() {
    return `<script lang="ts">
  import { theme } from '$stores/theme';
</script>

<svelte:head>
  <title>About - ${this.context.name}</title>
</svelte:head>

<div class="about">
  <div class="about-header">
    <h1>About ${this.context.name}</h1>
    <p>${this.context.description}</p>
  </div>

  <section class="features-list">
    <h2>Key Features</h2>

    <div class="feature-item">
      <h3>🎯 File-Based Routing</h3>
      <p>Routing is based on the file structure in the src/routes directory. No manual configuration needed.</p>
      <pre><code>src/routes/
  +page.svelte       # /
  about/
    +page.svelte     # /about
  posts/
    [id]/
      +page.svelte   # /posts/:id</code></pre>
    </div>

    <div class="feature-item">
      <h3>⚡ Svelte Stores</h3>
      <p>Simple and powerful reactive state management with writable, readable, and derived stores.</p>
      <pre><code>import { writable } from 'svelte/store';

export const count = writable(0);

// Usage
count.update(n => n + 1);
count.set(0);
</code></pre>
    </div>

    <div class="feature-item">
      <h3>🔄 Server-Side Rendering</h3>
      <p>Built-in SSR for optimal SEO and performance. Render pages on the server or statically.</p>
      <pre><code>// +page.server.ts
export const load = async () => {
  const data = await fetch('https://api.example.com/data');
  return { data };
};
</code></pre>
    </div>

    <div class="feature-item">
      <h3>💾 Form Actions</h3>
      <p>Handle form submissions with progressive enhancement and validation.</p>
      <pre><code>// +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    // Process form data
  }
};
</code></pre>
    </div>

    <div class="feature-item">
      <h3>🎨 Scoped Styles</h3>
      <p>CSS is scoped to components by default. No global namespace pollution.</p>
      <pre><code>&lt;style&gt;
  .container {
    padding: 1rem;
  }
&lt;/style&gt;</code></pre>
    </div>

    <div class="feature-item">
      <h3>🌍 Adapters</h3>
      <p>Deploy to any platform with built-in adapters for Node, Vercel, Netlify, and more.</p>
      <pre><code>import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter()
  }
};
</code></pre>
    </div>
  </section>

  <section class="cta-section">
    <p>
      <a href="/" class="btn">Back to Home</a>
    </p>
  </section>
</div>

<style>
  .about-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .about-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .features-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .features-list h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .feature-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
  }

  :global(.dark) .feature-item {
    background: #2a2a2a;
  }

  .feature-item h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #ff3e00;
  }

  .feature-item p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .feature-item pre {
    background: #1a1a1a;
    color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  .feature-item code {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }

  .cta-section {
    text-align: center;
    margin: 3rem 0;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #ff3e00;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: opacity 0.2s;
  }

  .btn:hover {
    opacity: 0.8;
  }
</style>
`;
  }

  protected generateAboutPageServer() {
    return `export const prerender = true;
`;
  }

  protected generatePostDetailPage() {
    return `<script lang="ts">
  export let data: {
    post: {
      id: number;
      title: string;
      body: string;
    };
  };
</script>

<svelte:head>
  <title>{data.post.title} - ${this.context.name}</title>
</svelte:head>

<div class="post-detail">
  <a href="/posts" class="back-link">← Back to Posts</a>

  <article class="post">
    <h1>{data.post.title}</h1>
    <div class="post-body">
      {@html data.post.body}
    </div>
  </article>
</div>

<style>
  .post-detail {
    max-width: 800px;
    margin: 0 auto;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: #ff3e00;
    text-decoration: none;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .post {
    padding: 2rem 0;
  }

  .post h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .post-body {
    line-height: 1.8;
    font-size: 1.1rem;
  }
</style>
`;
  }

  protected generatePostDetailServer() {
    return `import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${params.id}\`);
  const post = await response.json();

  return {
    post
  };
};
`;
  }

  protected generateHelloApi() {
    return `import { json } from '@sveltejs/kit';

export async function GET() {
  return json({
    message: 'Hello from SvelteKit API!',
    timestamp: new Date().toISOString(),
    framework: 'SvelteKit'
  });
}
`;
  }

  protected generatePostsApi() {
    return `import { json } from '@sveltejs/kit';

export async function GET() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = await response.json();

  return json(posts);
}

export async function POST({ request }) {
  const data = await request.json();

  // Create a new post
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const post = await response.json();

  return json(post, { status: 201 });
}
`;
  }

  protected generateHeader() {
    return `<script lang="ts">
  import { theme } from '$stores/theme';

  function toggleTheme() {
    theme.update(t => t === 'light' ? 'dark' : 'light');
  }
</script>

<header class="header">
  <div class="header-container">
    <div class="logo">
      <span class="logo-icon">🔥</span>
      <a href="/" class="logo-link">${this.context.name}</a>
    </div>

    <nav class="nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/posts">Posts</a>
      <button on:click={toggleTheme} class="theme-toggle" aria-label="Toggle theme">
        {#if $theme === 'light'}
          🌙
        {:else}
          ☀️
        {/if}
      </button>
    </nav>
  </div>
</header>

<style>
  .header {
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  :global(.dark) .header {
    background: #1a1a1a;
    border-bottom-color: #333;
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .logo-link {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a1a1a;
    text-decoration: none;
  }

  :global(.dark) .logo-link {
    color: #f5f5f5;
  }

  .nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .nav a {
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.2s;
  }

  :global(.dark) .nav a {
    color: #f5f5f5;
  }

  .nav a:hover {
    color: #ff3e00;
  }

  .theme-toggle {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    transition: transform 0.2s;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
  }
</style>
`;
  }

  protected generateFooter() {
    return `<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-container">
    <p>&copy; {currentYear} ${this.context.name}. Built with SvelteKit.</p>
    <div class="footer-links">
      <a href="https://kit.svelte.dev" target="_blank" rel="noopener">SvelteKit Docs</a>
      <span>•</span>
      <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte Docs</a>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    padding: 2rem 0;
    margin-top: auto;
  }

  :global(.dark) .footer {
    background: #1a1a1a;
    border-top-color: #333;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    text-align: center;
  }

  .footer-links {
    margin-top: 0.5rem;
  }

  .footer-links a {
    color: #1a1a1a;
    text-decoration: none;
  }

  :global(.dark) .footer-links a {
    color: #f5f5f5;
  }

  .footer-links a:hover {
    color: #ff3e00;
  }
</style>
`;
  }

  protected generateFeatureCard() {
    return `<script lang="ts">
  export let icon: string;
  export let title: string;
  export let description: string;
</script>

<div class="feature-card">
  <div class="feature-icon">{icon}</div>
  <h3 class="feature-title">{title}</h3>
  <p class="feature-description">{description}</p>
</div>

<style>
  .feature-card {
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
    transition: transform 0.2s;
  }

  :global(.dark) .feature-card {
    background: #2a2a2a;
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .feature-description {
    color: #666;
    line-height: 1.5;
  }

  :global(.dark) .feature-description {
    color: #aaa;
  }
</style>
`;
  }

  protected generateCounterStore() {
    return `import { writable } from 'svelte/store';

function createCounter() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0)
  };
}

export const counter = createCounter();
`;
  }

  protected generateThemeStore() {
    return `import { writable } from 'svelte/store';

const THEME_KEY = 'theme';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
const initialTheme: Theme = (typeof localStorage !== 'undefined' && localStorage.getItem(THEME_KEY) as Theme) || 'light';

export const theme = writable<Theme>(initialTheme);

// Subscribe to theme changes and persist to localStorage
if (typeof localStorage !== 'undefined') {
  theme.subscribe((value) => {
    localStorage.setItem(THEME_KEY, value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  });
}
`;
  }

  protected generateApi() {
    return `const API_BASE = 'https://jsonplaceholder.typicode.com';

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${API_BASE}\${endpoint}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
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
    const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
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
    const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
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

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
`;
  }

  protected generateTypes() {
    return `export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
`;
  }

  protected generateErrorPage() {
    return `<script lang="ts">
  import { page } from '$app/stores';

  $: error = $page.error;
</script>

{svelte:head}
  <title>Error - ${this.context.name}</title>
{/svelte:head}

<div class="error">
  <h1>{error?.message || 'An error occurred'}</h1>
  {#if error?.stack}
    <pre>{error.stack}</pre>
  {/if}
  <a href="/">Go back home</a>
</div>

<style>
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
  }

  .error h1 {
    font-size: 2rem;
    color: #ff3e00;
    margin-bottom: 1rem;
  }

  .error pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    max-width: 600px;
  }

  :global(.dark) .error pre {
    background: #2a2a2a;
  }

  .error a {
    margin-top: 1rem;
    color: #ff3e00;
    text-decoration: none;
  }

  .error a:hover {
    text-decoration: underline;
  }
</style>
`;
  }

  protected generateAppCss() {
    return `/* Global CSS */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Dark mode styles */
:global(.dark) {
  color-scheme: dark;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;
  }

  protected generateEnvExample() {
    return `# SvelteKit Environment Variables
# https://kit.svelte.dev/docs/configuration#environment-variables

# Private variables (only available server-side)
PRIVATE_API_KEY=your-private-api-key
DATABASE_URL=your-database-url

# Public variables (available to client)
PUBLIC_API_URL=https://api.example.com
PUBLIC_SITE_URL=https://yourdomain.com
`;
  }

  protected generateReadme() {
    return `# ${this.context.name}

${this.context.description}

Built with SvelteKit 2 - the fastest way to build web applications with Svelte.

## Features

- **SvelteKit 2** - Full-stack web framework
- **Svelte 4** - UI framework with compile-time optimizations
- **TypeScript** - Full type safety
- **File-Based Routing** - Intuitive routing based on file structure
- **Server-Side Rendering** - Built-in SSR and static site generation
- **API Routes** - Built-in API endpoints
- **Svelte Stores** - Reactive state management
- **Scoped Styles** - CSS scoped to components
- **Adapters** - Deploy to any platform (Node, Vercel, Netlify)

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
vite dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

\`\`\`bash
npm run build
# or
vite build
\`\`\`

### Preview

\`\`\`bash
npm run preview
# or
vite preview
\`\`\`

### Type Checking

\`\`\`bash
npm run check
# or
svelte-kit sync && svelte-check --tsconfig ./tsconfig.json
\`\`\`

## Project Structure

\`\`\`
src/
├── routes/              # File-based routing
│   ├── +page.svelte     # Home page
│   ├── +layout.svelte   # Root layout
│   ├── about/
│   │   └── +page.svelte # About page
│   ├── posts/
│   │   └── [id]/
│   │       └── +page.svelte # Dynamic route
│   └── api/             # API routes
│       ├── hello/
│       │   └── +server.ts
│       └── posts/
│           └── +server.ts
├── lib/                # Utility code
│   ├── components/      # Reusable components
│   ├── stores/          # Svelte stores
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
├── app.html            # HTML template
└── app.css             # Global styles
\`\`\`

## File-Based Routing

Routes are defined by files in the \`src/routes\` directory:

\`\`\`
src/routes/
+page.svelte           # /
+page.svelte           # /
about/
  +page.svelte         # /about
posts/
  [id]/
    +page.svelte       # /posts/:id
\`\`\`

## Server-Side Data Loading

Load data on the server with \`+page.server.ts\`:

\`\`\`typescript
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  return { data };
};
\`\`\`

Access in component:

\`\`\`svelte
<script lang="ts">
  export let data;
</script>

<h1>{data.title}</h1>
\`\`\`

## API Routes

Create API endpoints in \`src/routes/api\`:

\`\`\`typescript
// src/routes/api/hello/+server.ts
import { json } from '@sveltejs/kit';

export async function GET() {
  return json({
    message: 'Hello from SvelteKit API!'
  });
}

export async function POST({ request }) {
  const data = await request.json();
  return json({ success: true }, { status: 201 });
}
\`\`\`

## Svelte Stores

Reactive state management:

\`\`\`typescript
// src/lib/stores/counter.ts
import { writable } from 'svelte/store';

export const counter = writable(0);
\`\`\`

Use in component:

\`\`\`svelte
<script lang="ts">
  import { counter } from '$stores/counter';

  function increment() {
    counter.update(n => n + 1);
  }
</script>

<h1>{$counter}</h1>
<button on:click={increment}>+</button>
\`\`\`

## Form Actions

Handle form submissions:

\`\`\`svelte
<!-- +page.svelte -->
<form method="POST">
  <input name="email" type="email" />
  <button type="submit">Submit</button>
</form>
\`\`\`

\`\`\`typescript
// +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    // Process form data
    return { success: true };
  }
};
\`\`\`

## Layouts

Create reusable layouts:

\`\`\`svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
</script>

<Header />
<slot />
<Footer />
\`\`\`

## Adapters

Deploy to different platforms:

\`\`\`javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter()
  }
};
\`\`\`

Available adapters:
- \`@sveltejs/adapter-node\` - Node.js server
- \`@sveltejs/adapter-vercel\` - Vercel
- \`@sveltejs/adapter-netlify\` - Netlify
- \`@sveltejs/adapter-cloudflare\` - Cloudflare Pages
- \`@sveltejs/adapter-static\` - Static site generation

## Docker

### Build

\`\`\`bash
docker build -t ${this.context.normalizedName} .
\`\`\`

### Run

\`\`\`bash
docker run -p 3000:3000 ${this.context.normalizedName}
\`\`\`

### Docker Compose

\`\`\`bash
docker-compose up
\`\`\`

## Deployment

Deploy to any hosting service:

- **Vercel**: Zero-config deployment
- **Netlify**: Full-stack support
- **AWS**: Lambda, EC2, ECS
- **Google Cloud**: Cloud Run, Firebase
- **Azure**: App Service, Container Instances
- **Node.js**: Traditional server deployment

\`\`\`bash
# Build for production
npm run build

# Start production server
node build/index.js
\`\`\`

## Documentation

- [SvelteKit Documentation](https://kit.svelte.dev)
- [Svelte Documentation](https://svelte.dev/docs)
- [Learn Svelte](https://svelte.dev/learn)

## License

MIT
`;
  }

  protected generateDockerfile() {
    return `# Multi-stage Dockerfile for SvelteKit with Node adapter

# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "build/index.js"]
`;
  }

  protected generateDockerCompose() {
    return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - HOST=0.0.0.0
    restart: unless-stopped
`;
  }
}
