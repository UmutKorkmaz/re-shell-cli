import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class AnalogTemplate extends BaseTemplate {
  constructor(framework: FrameworkConfig, context: TemplateContext) {
    super(framework, context);
  }

  async generateFiles(): Promise<TemplateFile[]> {
    const files: TemplateFile[] = [];
    const { normalizedName, name } = this.context;

    // Package.json with Analog and Vite
    files.push({
      path: 'package.json',
      content: JSON.stringify(this.generatePackageJson(), null, 2)
    });

    // Vite config with Analog plugin
    files.push({
      path: 'vite.config.ts',
      content: this.generateViteConfig()
    });

    // Analog configuration
    files.push({
      path: 'analog.config.ts',
      content: this.generateAnalogConfig()
    });

    // TypeScript configs
    files.push({
      path: 'tsconfig.json',
      content: this.generateTsConfig()
    });

    files.push({
      path: 'tsconfig.spec.json',
      content: this.generateTsConfigSpec()
    });

    files.push({
      path: 'tsconfig.app.json',
      content: this.generateTsConfigApp()
    });

    // Nitro configuration for API routes
    files.push({
      path: 'nitro.config.ts',
      content: this.generateNitroConfig()
    });

    // Tailwind configuration
    files.push({
      path: 'tailwind.config.js',
      content: this.generateTailwindConfig()
    });

    files.push({
      path: 'postcss.config.js',
      content: this.generatePostcssConfig()
    });

    // Application files
    files.push({
      path: 'src/index.html',
      content: this.generateIndexHtml()
    });

    files.push({
      path: 'src/main.ts',
      content: this.generateMain()
    });

    files.push({
      path: 'src/app/app.component.ts',
      content: this.generateAppComponent()
    });

    files.push({
      path: 'src/app/app.component.html',
      content: this.generateAppComponentHtml()
    });

    files.push({
      path: 'src/app/app.component.css',
      content: this.generateAppComponentStyles()
    });

    // Home page with file-based routing
    files.push({
      path: 'src/app/pages/index.component.ts',
      content: this.generateIndexPage()
    });

    files.push({
      path: 'src/app/pages/index.component.html',
      content: this.generateIndexPageHtml()
    });

    // API route example
    files.push({
      path: 'src/server/routes/hello.ts',
      content: this.generateApiRoute()
    });

    // Global styles
    files.push({
      path: 'src/styles.css',
      content: this.generateStyles()
    });

    // Vitest config
    files.push({
      path: 'vitest.config.ts',
      content: this.generateVitestConfig()
    });

    // Git ignore
    files.push({
      path: '.gitignore',
      content: this.generateGitIgnore()
    });

    // README
    files.push({
      path: 'README.md',
      content: this.generateReadme()
    });

    // Env example
    files.push({
      path: '.env.example',
      content: this.generateEnvExample()
    });

    return files;
  }

  private generatePackageJson() {
    const { normalizedName } = this.context;
    return {
      name: normalizedName,
      version: '0.0.0',
      scripts: {
        'ng': 'ng',
        'start': 'ng serve',
        'build': 'ng build',
        'watch': 'ng build --watch --configuration development',
        'test': 'ng test',
        'lint': 'ng lint'
      },
      private: true,
      dependencies: {
        '@analogjs/content': '^1.0.0',
        '@analogjs/router': '^1.0.0',
        '@angular/animations': '^17.0.0',
        '@angular/common': '^17.0.0',
        '@angular/core': '^17.0.0',
        '@angular/forms': '^17.0.0',
        '@angular/platform-browser': '^17.0.0',
        '@angular/platform-browser-dynamic': '^17.0.0',
        '@angular/platform-server': '^17.0.0',
        '@angular/router': '^17.0.0',
        'front-matter': '^4.0.2',
        'marked': '^11.0.0',
        'rxjs': '^7.8.0',
        'tslib': '^2.6.0',
        'zone.js': '^0.14.0'
      },
      devDependencies: {
        '@analogjs/platform': '^1.0.0',
        '@analogjs/vite-plugin-angular': '^1.0.0',
        '@angular-devkit/build-angular': '^17.0.0',
        '@angular/cli': '^17.0.0',
        '@angular/compiler-cli': '^17.0.0',
        '@nx/vite': '^17.0.0',
        '@types/marked': '^6.0.0',
        '@vitest/ui': '^1.0.0',
        'autoprefixer': '^10.4.0',
        'cssnano': '^6.0.0',
        'jsdom': '^23.0.0',
        'postcss': '^8.4.0',
        'postcss-nesting': '^12.0.0',
        'tailwindcss': '^3.4.0',
        'typescript': '^5.3.0',
        'vite': '^5.0.0',
        'vitest': '^1.0.0'
      }
    };
  }

  private generateViteConfig() {
    return `import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  build: {
    target: ['es2020']
  },
  resolve: {
    mainFields: ['module']
  },
  server: {
    port: 4200
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    coverage: {
      reportsDirectory: './coverage'
    }
  }
});
`;
  }

  private generateAnalogConfig() {
    return `import { defineConfig } from '@analogjs/platform';

export default defineConfig({
  prerender: {
    static: true
  },
  vite: {
    build: {
      target: ['es2020']
    }
  }
});
`;
  }

  private generateTsConfig() {
    return JSON.stringify({
      'compileOnSave': false,
      'compilerOptions': {
        'baseUrl': '.',
        'outDir': './dist/out-tsc',
        'forceConsistentCasingInFileNames': true,
        'strict': true,
        'noImplicitOverride': true,
        'noPropertyAccessFromIndexSignature': true,
        'noImplicitReturns': true,
        'noFallthroughCasesInSwitch': true,
        'esModuleInterop': true,
        'sourceMap': true,
        'declaration': false,
        'experimentalDecorators': true,
        'moduleResolution': 'node',
        'importHelpers': true,
        'target': 'ES2022',
        'module': 'ES2022',
        'useDefineForClassFields': false,
        'lib': ['ES2022', 'dom'],
        'skipLibCheck': true,
        'paths': {
          '@analogjs/router': ['./node_modules/@analogjs/router/src'],
          '@app/*': ['./src/app/*']
        }
      },
      'angularCompilerOptions': {
        'enableI18nLegacyMessageIdFormat': false,
        'strictInjectionParameters': true,
        'strictInputAccessModifiers': true,
        'strictTemplates': true
      },
      'files': ['src/main.ts'],
      'include': ['src/**/*.d.ts']
    }, null, 2);
  }

  private generateTsConfigSpec() {
    return JSON.stringify({
      'extends': './tsconfig.json',
      'compilerOptions': {
        'outDir': './out-tsc/spec',
        'types': ['node', 'vitest/globals', 'vitest/importMeta']
      },
      'files': ['src/test-setup.ts', 'src/main.ts'],
      'include': ['src/**/*.spec.ts', 'src/**/*.d.ts']
    }, null, 2);
  }

  private generateTsConfigApp() {
    return JSON.stringify({
      'extends': './tsconfig.json',
      'compilerOptions': {
        'outDir': './out-tsc/app'
      },
      'include': ['src/**/*.ts'],
      'exclude': ['src/**/*.spec.ts']
    }, null, 2);
  }

  private generateNitroConfig() {
    return `import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  srcDir: 'src/server',
  handlers: []
});
`;
  }

  private generateTailwindConfig() {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,css,scss,md}',
    './analog/**/*.{html,ts,css,scss,md}'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
`;
  }

  private generatePostcssConfig() {
    return `module.exports = {
  plugins: {
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
};
`;
  }

  private generateIndexHtml() {
    const { name } = this.context;
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${name}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`;
  }

  private generateMain() {
    return `import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(),
    provideFileRouter()
  ]
});
`;
  }

  private generateAppComponent() {
    return `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '${this.context.name}';
}
`;
  }

  private generateAppComponentHtml() {
    return `<header class="header">
  <div class="header-content">
    <h1>🚀 {{ title }}</h1>
    <p>Analog - Full-Stack Angular with Vite and SSR</p>
  </div>
</header>

<main class="main">
  <router-outlet></router-outlet>
</main>

<footer class="footer">
  <p>Built with Analog, Vite, and Angular 17</p>
</footer>
`;
  }

  private generateAppComponentStyles() {
    return `.header {
  background: linear-gradient(135deg, #dd0031 0%, #c3002f 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
}

.footer {
  background: #1976d2;
  color: white;
  padding: 1.5rem;
  text-align: center;
}
`;
  }

  private generateIndexPage() {
    return `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectPayload } from '@analogjs/router';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Home'
};

interface HomePayload {
  message: string;
}

@Component({
  selector: 'analog-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html'
})
export default class HomeComponent {
  readonly message = injectPayload<HomePayload>();
}
`;
  }

  private generateIndexPageHtml() {
    return `<div class="home">
  <section class="features">
    <div class="feature-card">
      <h2>⚡ Vite-powered</h2>
      <p>Lightning-fast builds with Vite</p>
    </div>
    <div class="feature-card">
      <h2>🔄 Server-Side Rendering</h2>
      <p>SEO-friendly with built-in SSR</p>
    </div>
    <div class="feature-card">
      <h2>📝 File-based Routing</h2>
      <p>Intuitive routing based on file structure</p>
    </div>
    <div class="feature-card">
      <h2>🔌 API Routes</h2>
      <p>Build backend endpoints alongside frontend</p>
    </div>
  </section>

  <section class="info-section">
    <h2>Full-Stack Angular</h2>
    <p>Analog provides a meta-framework for Angular that combines:</p>
    <ul>
      <li>Vite for fast builds</li>
      <li>Server-Side Rendering for SEO</li>
      <li>File-based routing for better DX</li>
      <li>API routes for backend functionality</li>
      <li>Angular 17 with latest features</li>
    </ul>
  </section>

  <section class="api-demo">
    <h2>API Route Example</h2>
    <p>Try the API route: <code>/api/hello</code></p>
  </section>
</div>
`;
  }

  private generateApiRoute() {
    return `export default defineEventHandler((event) => {
  return {
    message: 'Hello from Analog API!',
    timestamp: new Date().toISOString()
  };
});
`;
  }

  private generateStyles() {
    return `/* Global Styles */

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

.home {
  max-width: 1200px;
  margin: 0 auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.info-section,
.api-demo {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.info-section ul {
  margin-top: 1rem;
  margin-left: 2rem;
}

code {
  background: #e0e0e0;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}
`;
  }

  private generateVitestConfig() {
    return `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    coverage: {
      reportsDirectory: './coverage'
    }
  }
});
`;
  }

  private generateGitIgnore() {
    return `# Compiled output
dist
out-tsc
.analog
.nitro

# Dependencies
node_modules

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store

# Logs
*.log

# Environment
.env
.env.local
.env.*.local

# Testing
coverage
.nyc_output

# Vite
.vite
`;
  }

  private generateReadme() {
    const { name, description, packageManager } = this.context;
    return `# ${name}

${description || 'Full-Stack Angular with Analog, Vite, and SSR'}

## Features

- ⚡ **Vite-powered** - Lightning-fast HMR and builds
- 🔄 **Server-Side Rendering** - SEO-friendly out of the box
- 📝 **File-based Routing** - Intuitive routing based on file structure
- 🔌 **API Routes** - Build backend endpoints alongside frontend
- 🎯 **Angular 17** - Latest Angular with standalone components
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- ✅ **Vitest** - Fast unit testing framework

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Start development server
${packageManager} start

# Build for production
${packageManager} run build

# Run tests
${packageManager} run test
\`\`\`

## File-based Routing

Analog uses file-based routing. Create pages in \`src/app/pages/\`:

\`\`\`
src/app/pages/
├── index.component.ts           # /
├── about.component.ts            # /about
└── blog/
    ├── index.component.ts        # /blog
    └── [slug].component.ts       # /blog/:slug
\`\`\`

## API Routes

Create API endpoints in \`src/server/routes/\`:

\`\`\`typescript
// src/server/routes/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from API!' };
});
\`\`\`

Access at: \`http://localhost:4200/api/hello\`

## Page Metadata

Define route metadata using the \`routeMeta\` export:

\`\`\`typescript
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'My Page',
  description: 'Page description'
};
\`\`\`

## Data Fetching

Use \`injectPayload\` for data fetching:

\`\`\`typescript
import { injectPayload } from '@analogjs/router';

interface PagePayload {
  data: any;
}

export default function HomeComponent() {
  const payload = injectPayload<PagePayload>();
  // Use payload.data
}
\`\`\`

## SSR and Hydration

Analog provides server-side rendering and client-side hydration:

- Static site generation (pre-rendering)
- Server-side rendering for dynamic content
- Client-side hydration for interactivity

## Deployment

\`\`\`bash
# Build for production
${packageManager} run build

# Output is in dist/ and dist/server/
# Deploy to any hosting provider
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Deploy to Netlify

\`\`\`bash
npm i -g netlify-cli
netlify deploy --prod
\`\`\`

## Project Structure

\`\`\`
${name}/
├── src/
│   ├── app/
│   │   ├── pages/           # File-based routing
│   │   └── *.component.*    # Components
│   ├── server/
│   │   └── routes/          # API routes
│   ├── main.ts
│   └── styles.css
├── analog.config.ts
├── vite.config.ts
└── package.json
\`\`\`

## Resources

- [Analog Documentation](https://analogjs.org)
- [Analog GitHub](https://github.com/analogjs/analog)
- [Vite Documentation](https://vitejs.dev)
- [Angular Documentation](https://angular.io)

## License

MIT
`;
  }

  private generateEnvExample() {
    return `# Environment Configuration

# API Configuration
# VITE_API_URL=https://api.example.com

# Analytics
# VITE_GA_ID=your-ga-id

# Feature Flags
# VITE_FEATURE_X=true
`;
  }
}
