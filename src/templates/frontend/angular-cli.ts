import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class AngularCliTemplate extends BaseTemplate {
  constructor(framework: FrameworkConfig, context: TemplateContext) {
    super(framework, context);
  }

  async generateFiles(): Promise<TemplateFile[]> {
    const files: TemplateFile[] = [];
    const { normalizedName, name } = this.context;

    // Package.json with Angular CLI and latest dependencies
    files.push({
      path: 'package.json',
      content: JSON.stringify(this.generatePackageJson(), null, 2)
    });

    // Angular CLI configuration
    files.push({
      path: 'angular.json',
      content: this.generateAngularJson()
    });

    // TypeScript configs
    files.push({
      path: 'tsconfig.json',
      content: this.generateTsConfig()
    });

    files.push({
      path: 'tsconfig.app.json',
      content: this.generateTsConfigApp()
    });

    files.push({
      path: 'tsconfig.spec.json',
      content: this.generateTsConfigSpec()
    });

    files.push({
      path: 'tsconfig.worker.json',
      content: this.generateTsConfigWorker()
    });

    // Angular application files
    files.push({
      path: 'src/main.ts',
      content: this.generateMain()
    });

    files.push({
      path: 'src/index.html',
      content: this.generateIndexHtml()
    });

    files.push({
      path: 'src/styles.scss',
      content: this.generateStyles()
    });

    // App component with standalone and signals
    files.push({
      path: 'src/app/app.config.ts',
      content: this.generateAppConfig()
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
      path: 'src/app/app.component.scss',
      content: this.generateAppComponentStyles()
    });

    // Home component with signals
    files.push({
      path: 'src/app/home/home.component.ts',
      content: this.generateHomeComponent()
    });

    files.push({
      path: 'src/app/home/home.component.html',
      content: this.generateHomeComponentHtml()
    });

    files.push({
      path: 'src/app/home/home.component.scss',
      content: this.generateHomeComponentStyles()
    });

    // About component with signals
    files.push({
      path: 'src/app/about/about.component.ts',
      content: this.generateAboutComponent()
    });

    files.push({
      path: 'src/app/about/about.component.html',
      content: this.generateAboutComponentHtml()
    });

    files.push({
      path: 'src/app/about/about.component.scss',
      content: this.generateAboutComponentStyles()
    });

    // Core components (standalone)
    files.push({
      path: 'src/app/core/header/header.component.ts',
      content: this.generateHeaderComponent()
    });

    files.push({
      path: 'src/app/core/header/header.component.html',
      content: this.generateHeaderComponentHtml()
    });

    files.push({
      path: 'src/app/core/footer/footer.component.ts',
      content: this.generateFooterComponent()
    });

    files.push({
      path: 'src/app/core/footer/footer.component.html',
      content: this.generateFooterComponentHtml()
    });

    // Services with signals
    files.push({
      path: 'src/app/services/counter.service.ts',
      content: this.generateCounterService()
    });

    files.push({
      path: 'src/app/services/api.service.ts',
      content: this.generateApiService()
    });

    // Interceptors
    files.push({
      path: 'src/app/interceptors/auth.interceptor.ts',
      content: this.generateAuthInterceptor()
    });

    // Models
    files.push({
      path: 'src/app/models/counter.model.ts',
      content: this.generateCounterModel()
    });

    // Routing
    files.push({
      path: 'src/app/app.routes.ts',
      content: this.generateRoutes()
    });

    // Environment files
    files.push({
      path: 'src/environments/environment.ts',
      content: this.generateEnvironment()
    });

    files.push({
      path: 'src/environments/environment.prod.ts',
      content: this.generateEnvironmentProd()
    });

    // Specs
    files.push({
      path: 'src/app/app.component.spec.ts',
      content: this.generateAppComponentSpec()
    });

    files.push({
      path: 'src/app/home/home.component.spec.ts',
      content: this.generateHomeComponentSpec()
    });

    // Karma config
    files.push({
      path: 'karma.conf.js',
      content: this.generateKarmaConf()
    });

    // ESLint config
    files.push({
      path: '.eslintrc.json',
      content: this.generateEslintConfig()
    });

    // PWA manifest (if PWA enabled)
    files.push({
      path: 'src/manifest.webmanifest',
      content: this.generateManifest()
    });

    // Docker support
    files.push({
      path: 'Dockerfile',
      content: this.generateDockerfile()
    });

    files.push({
      path: '.dockerignore',
      content: this.generateDockerIgnore()
    });

    files.push({
      path: 'nginx.conf',
      content: this.generateNginxConf()
    });

    // README
    files.push({
      path: 'README.md',
      content: this.generateReadme()
    });

    // Git ignore
    files.push({
      path: '.gitignore',
      content: this.generateGitIgnore()
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
        '@angular/animations': '^17.0.0',
        '@angular/common': '^17.0.0',
        '@angular/compiler': '^17.0.0',
        '@angular/core': '^17.0.0',
        '@angular/forms': '^17.0.0',
        '@angular/platform-browser': '^17.0.0',
        '@angular/platform-browser-dynamic': '^17.0.0',
        '@angular/router': '^17.0.0',
        '@angular/service-worker': '^17.0.0',
        'rxjs': '^7.8.0',
        'tslib': '^2.6.0',
        'zone.js': '^0.14.0'
      },
      devDependencies: {
        '@angular-devkit/build-angular': '^17.0.0',
        '@angular/cli': '^17.0.0',
        '@angular/compiler-cli': '^17.0.0',
        '@types/jasmine': '^5.1.0',
        '@types/node': '^20.0.0',
        'jasmine-core': '^5.1.0',
        'jasmine-spec-reporter': '^7.0.0',
        'karma': '^6.4.0',
        'karma-chrome-launcher': '^3.2.0',
        'karma-coverage': '^2.2.0',
        'karma-jasmine': '^5.1.0',
        'karma-jasmine-html-reporter': '^2.1.0',
        'typescript': '~5.2.0',
        '@angular-eslint/builder': '^17.0.0',
        '@angular-eslint/eslint-plugin': '^17.0.0',
        '@angular-eslint/eslint-plugin-template': '^17.0.0',
        '@angular-eslint/schematics': '^17.0.0',
        '@angular-eslint/template-parser': '^17.0.0',
        '@typescript-eslint/eslint-plugin': '^6.0.0',
        '@typescript-eslint/parser': '^6.0.0',
        'eslint': '^8.50.0'
      }
    };
  }

  private generateAngularJson() {
    const { normalizedName } = this.context;
    const projects: any = {};
    projects[normalizedName] = {
      projectType: 'application',
      schematics: {
        '@schematics/angular:component': {
          standalone: true,
          changeDetection: 'OnPush'
        },
        '@schematics/angular:directive': {
          standalone: true
        },
        '@schematics/angular:pipe': {
          standalone: true
        }
      },
      root: '',
      sourceRoot: 'src',
      prefix: 'app',
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:application',
          options: {
            outputPath: `dist/${normalizedName}`,
            index: 'src/index.html',
            browser: 'src/main.ts',
            polyfills: ['zone.js'],
            tsConfig: 'tsconfig.app.json',
            inlineStyleLanguage: 'scss',
            assets: [
              'src/favicon.ico',
              'src/assets',
              'src/manifest.webmanifest'
            ],
            styles: ['src/styles.scss'],
            scripts: [],
            serviceWorker: 'src/ngsw-config.json'
          },
          configurations: {
            production: {
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '500kb',
                  maximumError: '1mb'
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '2kb',
                  maximumError: '4kb'
                }
              ],
              outputHashing: 'all'
            },
            development: {
              buildOptimizer: false,
              optimization: false,
              vendorChunk: true,
              extractLicenses: false,
              sourceMap: true,
              namedChunks: true
            }
          },
          defaultConfiguration: 'production'
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          configurations: {
            production: {
              buildTarget: `${normalizedName}:build:production`
            },
            development: {
              buildTarget: `${normalizedName}:build:development`
            }
          },
          defaultConfiguration: 'development'
        },
        extracti18n: {
          builder: '@angular-devkit/build-angular:extract-i18n',
          options: {
            buildTarget: `${normalizedName}:build`
          }
        },
        test: {
          builder: '@angular-devkit/build-angular:karma',
          options: {
            polyfills: ['zone.js', 'zone.js/testing'],
            tsConfig: 'tsconfig.spec.json',
            inlineStyleLanguage: 'scss',
            assets: [
              'src/favicon.ico',
              'src/assets'
            ],
            styles: ['src/styles.scss'],
            scripts: []
          }
        },
        lint: {
          builder: '@angular-eslint/builder:lint',
          options: {
            lintFilePatterns: ['src/**/*.ts', 'src/**/*.html']
          }
        }
      }
    };

    return JSON.stringify({
      '$schema': './node_modules/@angular/cli/lib/config/schema.json',
      version: 1,
      newProjectRoot: 'projects',
      projects: projects
    }, null, 2);
  }

  private generateTsConfig() {
    return JSON.stringify({
      compileOnSave: false,
      compilerOptions: {
        baseUrl: './',
        outDir: './dist/out-tsc',
        forceConsistentCasingInFileNames: true,
        strict: true,
        noImplicitOverride: true,
        noPropertyAccessFromIndexSignature: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        sourceMap: true,
        declaration: false,
        experimentalDecorators: true,
        moduleResolution: 'node',
        importHelpers: true,
        target: 'ES2022',
        module: 'ES2022',
        useDefineForClassFields: false,
        lib: ['ES2022', 'dom']
      },
      angularCompilerOptions: {
        enableI18nLegacyMessageIdFormat: false,
        strictInjectionParameters: true,
        strictInputAccessModifiers: true,
        strictTemplates: true
      }
    }, null, 2);
  }

  private generateTsConfigApp() {
    return JSON.stringify({
      extends: './tsconfig.json',
      compilerOptions: {
        outDir: './out-tsc/app',
        types: []
      },
      files: ['src/main.ts'],
      include: ['src/**/*.d.ts']
    }, null, 2);
  }

  private generateTsConfigSpec() {
    return JSON.stringify({
      extends: './tsconfig.json',
      compilerOptions: {
        outDir: './out-tsc/spec',
        types: ['jasmine', 'node']
      },
      files: ['src/main.ts', 'src/polyfills.ts'],
      include: ['src/**/*.spec.ts', 'src/**/*.d.ts']
    }, null, 2);
  }

  private generateTsConfigWorker() {
    return JSON.stringify({
      extends: './tsconfig.json',
      compilerOptions: {
        outDir: './out-tsc/worker',
        types: []
      },
      include: ['src/**/*.worker.ts', 'src/**/*.worker.ts']
    }, null, 2);
  }

  private generateMain() {
    return `import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimationsAsync(),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));

// Register service worker for PWA
if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.register('/ngsw-worker.js');
}

// Import environment
import { environment } from './environments/environment';
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
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="manifest" href="manifest.webmanifest">
  <meta name="theme-color" content="#1976d2">
  <meta name="description" content="Angular CLI application with standalone components and signals">
</head>
<body>
  <app-root></app-root>
  <noscript>Please enable JavaScript to continue using this application.</noscript>
</body>
</html>
`;
  }

  private generateStyles() {
    return `/* Global Styles */

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

/* Utility Classes */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

/* Material Design Colors */

.primary {
  color: #1976d2;
}

.accent {
  color: #ff4081;
}

.warn {
  color: #f44336;
}
`;
  }

  private generateAppConfig() {
    return `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes)
  ]
};
`;
  }

  private generateAppComponent() {
    return `import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '${this.context.name}';

  // Signals for reactive state
  readonly count = signal(0);
  readonly doubleCount = computed(() => this.count() * 2);

  // Service integration with signals
  private message = signal('');

  constructor(private counterService: CounterService) {
    // Effect to react to count changes
    effect(() => {
      const currentCount = this.count();
      console.log(\`Count changed to: \${currentCount}\`);
      this.counterService.updateCount(currentCount);
    });

    // Listen for events from other microfrontends
    window.addEventListener('counter-update', this.handleCounterUpdate.bind(this));
  }

  increment() {
    this.count.update(value => value + 1);
    this.emitCounterUpdate(this.count());
  }

  decrement() {
    this.count.update(value => value - 1);
    this.emitCounterUpdate(this.count());
  }

  private emitCounterUpdate(value: number) {
    window.dispatchEvent(new CustomEvent('counter-update', {
      detail: { type: 'COUNTER_UPDATE', value }
    }));
  }

  private handleCounterUpdate(event: any) {
    if (event.detail && event.detail.type === 'COUNTER_UPDATE') {
      this.message.set(\`Received: \${event.detail.value}\`);
    }
  }
}
`;
  }

  private generateAppComponentHtml() {
    return `<app-header></app-header>

<main class="main-container">
  <div class="container">
    <div class="hero">
      <h1>{{ title }}</h1>
      <p class="subtitle">Angular CLI with Standalone Components and Signals</p>
    </div>

    <div class="counter-section">
      <h2>Reactive Counter (Signals)</h2>
      <div class="counter-display">
        <span class="count">{{ count() }}</span>
        <span class="double-count">Double: {{ doubleCount() }}</span>
      </div>
      <div class="counter-controls">
        <button (click)="decrement()">-</button>
        <button (click)="increment()">+</button>
      </div>
      @if (message()) {
        <p class="message">{{ message() }}</p>
      }
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>⚡ Angular Signals</h3>
        <p>Reactive state management with signals and computed values</p>
      </div>
      <div class="feature-card">
        <h3>🎯 Standalone Components</h3>
        <p>No NgModules needed - truly independent components</p>
      </div>
      <div class="feature-card">
        <h3>🔧 Angular CLI</h3>
        <p>Full-featured CLI with best practices built-in</p>
      </div>
    </div>

    <router-outlet></router-outlet>
  </div>
</main>

<app-footer></app-footer>
`;
  }

  private generateAppComponentStyles() {
    return `.main-container {
  min-height: calc(100vh - 120px);
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.counter-section {
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.counter-display {
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.count {
  color: #1976d2;
}

.double-count {
  color: #ff4081;
  font-size: 1.5rem;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.counter-controls button {
  font-size: 1.5rem;
  padding: 0.5rem 1.5rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.counter-controls button:hover {
  background-color: #1565c0;
}

.message {
  margin-top: 1rem;
  color: #1976d2;
  font-size: 1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1976d2;
}
`;
  }

  private generateHomeComponent() {
    return `import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly welcomeMessage = signal('Welcome to Angular CLI!');
  readonly features = signal([
    { icon: '⚡', title: 'Signals', description: 'Fine-grained reactivity' },
    { icon: '🎯', title: 'Standalone', description: 'No NgModules required' },
    { icon: '🔧', title: 'CLI', description: 'Powerful tooling' },
    { icon: '📱', title: 'PWA', description: 'Progressive Web App' }
  ]);

  readonly featureCount = computed(() => this.features().length);

  constructor() {
    effect(() => {
      console.log(\`Home has \${this.featureCount()} features\`);
    });
  }
}
`;
  }

  private generateHomeComponentHtml() {
    return `<div class="home">
  <div class="hero-section">
    <h1>{{ welcomeMessage() }}</h1>
    <p class="subtitle">
      Built with Angular 17, standalone components, and signals
    </p>
    <div class="cta-buttons">
      <a routerLink="/about" class="btn btn-primary">Learn More</a>
      <a href="https://angular.io" target="_blank" class="btn btn-secondary">
        Angular Docs
      </a>
    </div>
  </div>

  <section class="features-section">
    <h2>Key Features</h2>
    <div class="features-grid">
      @for (feature of features(); track feature.title) {
        <div class="feature-card">
          <span class="feature-icon">{{ feature.icon }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      }
    </div>
    <p class="feature-count">
      Total Features: {{ featureCount() }}
    </p>
  </section>

  <section class="demo-section">
    <h2>Interactive Demo</h2>
    <p>Try the reactive counter on the main page!</p>
    <div class="info-box">
      <h4>Why Signals?</h4>
      <ul>
        <li>Fine-grained reactivity</li>
        <li>Better performance</li>
        <li>Simpler mental model</li>
        <li>No Zone.js needed in the future</li>
      </ul>
    </div>
  </section>
</div>
`;
  }

  private generateHomeComponentStyles() {
    return `.home {
  padding: 2rem 0;
}

.hero-section {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: white;
  color: #667eea;
}

.btn-primary:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #667eea;
}

.features-section {
  margin-bottom: 3rem;
}

.features-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1976d2;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature-card {
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  color: #1976d2;
}

.feature-count {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
}

.demo-section {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 0.5rem;
}

.demo-section h2 {
  color: #1976d2;
  margin-bottom: 1rem;
}

.info-box {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-left: 4px solid #1976d2;
}

.info-box h4 {
  color: #1976d2;
  margin-bottom: 0.5rem;
}

.info-box ul {
  margin: 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin-bottom: 0.5rem;
}
`;
  }

  private generateAboutComponent() {
    return `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly technologies = signal([
    'Angular 17',
    'TypeScript 5.2',
    'Signals API',
    'Standalone Components',
    'Angular CLI',
    'RxJS 7'
  ]);

  readonly showDetails = signal(false);

  toggleDetails() {
    this.showDetails.update(value => !value);
  }
}
`;
  }

  private generateAboutComponentHtml() {
    return `<div class="about">
  <h1>About This Application</h1>

  <p class="intro">
    This is an Angular CLI application showcasing the latest Angular features
    including standalone components and signals.
  </p>

  <section class="tech-stack">
    <h2>Tech Stack</h2>
    <div class="tech-list">
      @for (tech of technologies(); track tech) {
        <div class="tech-item">
          <span class="tech-name">{{ tech }}</span>
        </div>
      }
    </div>
  </section>

  <section class="details">
    <h2>Angular Features</h2>
    <button (click)="toggleDetails()" class="toggle-btn">
      {{ showDetails() ? 'Hide' : 'Show' }} Details
    </button>

    @if (showDetails()) {
      <div class="details-content">
        <h3>Standalone Components</h3>
        <p>
          No need for NgModules! Components can be self-contained with their own
          dependencies and are tree-shakable by default.
        </p>

        <h3>Signals</h3>
        <p>
          Fine-grained reactivity system that provides better performance and
          a simpler mental model for managing state.
        </p>

        <h3>New Control Flow Syntax</h3>
        <p>
          Use @if, @for, and @switch instead of ngIf, ngFor, and ngSwitch.
          Better type checking and performance!
        </p>
      </div>
    }
  </section>

  <section class="links">
    <h2>Learn More</h2>
    <div class="link-grid">
      <a href="https://angular.io/guide/signals" target="_blank" class="link-card">
        <h3>📚 Signals Guide</h3>
        <p>Official Angular signals documentation</p>
      </a>
      <a href="https://angular.io/guide/standalone-components" target="_blank" class="link-card">
        <h3>🎯 Standalone</h3>
        <p>Learn about standalone components</p>
      </a>
    </div>
  </section>
</div>
`;
  }

  private generateAboutComponentStyles() {
    return `.about {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about h1 {
  color: #1976d2;
  margin-bottom: 1.5rem;
}

.intro {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 3rem;
}

.tech-stack {
  margin-bottom: 3rem;
}

.tech-stack h2 {
  margin-bottom: 1.5rem;
  color: #1976d2;
}

.tech-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tech-item {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 0.25rem;
  text-align: center;
}

.tech-name {
  font-weight: 500;
  color: #1976d2;
}

.details {
  margin-bottom: 3rem;
}

.details h2 {
  margin-bottom: 1rem;
  color: #1976d2;
}

.toggle-btn {
  padding: 0.5rem 1.5rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
}

.toggle-btn:hover {
  background-color: #1565c0;
}

.details-content {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.details-content h3 {
  color: #1976d2;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.details-content p {
  line-height: 1.6;
  color: #555;
}

.links {
  margin-bottom: 2rem;
}

.links h2 {
  margin-bottom: 1.5rem;
  color: #1976d2;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.link-card {
  display: block;
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.link-card:hover {
  background-color: #1976d2;
  color: white;
  transform: translateY(-2px);
}

.link-card h3 {
  margin-bottom: 0.5rem;
}

.link-card p {
  font-size: 0.9rem;
  opacity: 0.8;
}
`;
  }

  private generateHeaderComponent() {
    return `import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly title = '${this.context.name}';
}
`;
  }

  private generateHeaderComponentHtml() {
    return `<header class="header">
  <div class="container">
    <div class="header-content">
      <a routerLink="/" class="logo">{{ title }}</a>
      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          Home
        </a>
        <a routerLink="/about" routerLinkActive="active">
          About
        </a>
      </nav>
    </div>
  </div>
</header>
`;
  }

  private generateFooterComponent() {
    return `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly currentYear = signal(new Date().getFullYear());
}
`;
  }

  private generateFooterComponentHtml() {
    return `<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <p class="copyright">
        &copy; {{ currentYear() }} {{ '${this.context.name}' }}. Built with Angular CLI.
      </p>
      <div class="footer-links">
        <a href="https://angular.io" target="_blank">Angular</a>
        <a href="https://github.com/angular/angular" target="_blank">GitHub</a>
      </div>
    </div>
  </div>
</footer>
`;
  }

  private generateCounterService() {
    return `import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = signal(0);
  readonly doubleCount = computed(() => this.count() * 2);

  constructor() {
    console.log('CounterService initialized');
  }

  updateCount(value: number) {
    this.count.set(value);
  }

  getCount(): number {
    return this.count();
  }

  getDoubleCount(): number {
    return this.doubleCount();
  }

  // Simulate API call
  fetchCount(): Observable<number> {
    return of(this.count());
  }
}
`;
  }

  private generateApiService() {
    return `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {
    console.log('ApiService initialized');
  }

  getData<T>(): Observable<T> {
    return this.http.get<T>(\`\${this.apiUrl}/data\`);
  }

  postData<T>(data: T): Observable<T> {
    return this.http.post<T>(\`\${this.apiUrl}/data\`, data);
  }
}
`;
  }

  private generateAuthInterceptor() {
    return `import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Add auth token to requests
    const token = localStorage.getItem('auth_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: \`Bearer \${token}\`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized
          console.error('Unauthorized request');
        }
        return throwError(() => error);
      })
    );
  }
}
`;
  }

  private generateCounterModel() {
    return `export interface CounterState {
  count: number;
  lastUpdated: Date;
}

export interface CounterEvent {
  type: string;
  value: number;
  timestamp: Date;
}
`;
  }

  private generateRoutes() {
    return `import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    title: '${this.context.name}'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
    title: 'About - ${this.context.name}'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
`;
  }

  private generateEnvironment() {
    return `export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  enableAnalytics: false
};
`;
  }

  private generateEnvironmentProd() {
    return `export const environment = {
  production: true,
  apiUrl: '/api',
  enableAnalytics: true
};
`;
  }

  private generateAppComponentSpec() {
    return `import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(\`should have title '${this.context.name}'\`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('${this.context.name}');
  });

  it('should increment count', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const initialCount = app.count();
    app.increment();
    expect(app.count()).toBe(initialCount + 1);
  });
});
`;
  }

  private generateHomeComponentSpec() {
    return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have welcome message', () => {
    expect(component.welcomeMessage()).toContain('Welcome');
  });

  it('should have features', () => {
    expect(component.features().length).toBeGreaterThan(0);
  });
});
`;
  }

  private generateKarmaConf() {
    return `module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with 'random: false'
        // or set a specific seed with 'seed: 4321'
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/${this.context.normalizedName}'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true
  });
};
`;
  }

  private generateEslintConfig() {
    return JSON.stringify({
      root: true,
      ignorePatterns: ['dist', 'node_modules'],
      overrides: [
        {
          files: ['*.ts'],
          parserOptions: {
            project: ['tsconfig.*?.json'],
            createDefaultProgram: true
          },
          extends: [
            'plugin:@angular-eslint/recommended',
            'plugin:@angular-eslint/template/process-inline-templates'
          ],
          rules: {
            '@angular-eslint/directive-selector': [
              'error',
              { type: 'attribute', prefix: 'app', style: 'kebab-case' }
            ],
            '@angular-eslint/component-selector': [
              'error',
              { type: 'element', prefix: 'app', style: 'kebab-case' }
            ]
          }
        },
        {
          files: ['*.html'],
          extends: ['plugin:@angular-eslint/template/recommended'],
          rules: {}
        }
      ]
    }, null, 2);
  }

  private generateManifest() {
    const { name } = this.context;
    return JSON.stringify({
      name: name,
      short_name: name,
      theme_color: '#1976d2',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      icons: [
        {
          src: 'assets/icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'assets/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }, null, 2);
  }

  private generateDockerfile() {
    return `# Multi-stage Dockerfile for Angular CLI

# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
`;
  }

  private generateDockerIgnore() {
    return `node_modules
npm-debug.log
dist
.env.local
.env.development.local
.env.test.local
.env.production.local
.git
.gitignore
README.md
.DS_Store
.vscode
.idea
coverage
`;
  }

  private generateNginxConf() {
    return `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
`;
  }

  private generateReadme() {
    const { name, description, packageManager } = this.context;
    return `# ${name}

${description || 'Angular CLI application with standalone components and signals'}

## Features

- ⚡ Angular 17 with standalone components
- 🎯 Signals for fine-grained reactivity
- 🔧 Angular CLI for best practices
- 📱 Progressive Web App (PWA) support
- 🧪 Testing with Jasmine and Karma
- 🎨 SCSS for styling
- 🐳 Docker support

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Serve with hot reload
${packageManager} start

# Build for production
${packageManager} run build

# Run tests
${packageManager} test

# Run linter
${packageManager} run lint
\`\`\`

## Development Server

Run \`ng serve\` for a dev server. Navigate to \`http://localhost:4200/\`.

## Code Scaffolding

Run \`ng generate component component-name\` to generate a new component.

## Build

Run \`ng build\` to build the project. The build artifacts will be stored in the \`dist/\` directory.

## Running Unit Tests

Run \`ng test\` to execute the unit tests via [Karma](https://karma-runner.github.io/).

## Angular Features

### Standalone Components
This application uses standalone components - no NgModules needed!
Components are self-contained and tree-shakable.

### Signals
Fine-grained reactivity with signals, computed values, and effects.

### New Control Flow
Uses \`@if\`, \`@for\`, and \`@switch\` instead of structural directives.

## Docker

\`\`\`bash
# Build Docker image
docker build -t ${name} .

# Run container
docker run -p 80:80 ${name}
\`\`\`

## Further Help

To get more help on the Angular CLI use \`ng help\` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

MIT
`;
  }

  private generateGitIgnore() {
    return `# See http://help.github.com/ignore-files/ for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace
.vscode/*

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db
`;
  }
}
