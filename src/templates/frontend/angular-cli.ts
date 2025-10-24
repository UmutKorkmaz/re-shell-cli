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

    files.push({
      path: 'tsconfig.server.json',
      content: this.generateTsConfigServer()
    });

    // PWA Service Worker Configuration
    files.push({
      path: 'src/ngsw-config.json',
      content: this.generateNgswConfig()
    });

    // Angular application files
    files.push({
      path: 'src/main.ts',
      content: this.generateMain()
    });

    // PWA Manifest
    files.push({
      path: 'src/manifest.webmanifest',
      content: this.generateManifest()
    });

    files.push({
      path: 'src/index.html',
      content: this.generateIndexHtml()
    });

    files.push({
      path: 'src/styles.scss',
      content: this.generateStyles()
    });

    // Angular Material theme
    files.push({
      path: 'src/theme.scss',
      content: this.generateMaterialTheme()
    });

    // Custom Material styles
    files.push({
      path: 'src/app/material.styles.scss',
      content: this.generateMaterialStyles()
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

    // Auth Guard
    files.push({
      path: 'src/app/guards/auth.guard.ts',
      content: this.generateAuthGuard()
    });

    // Admin Guard
    files.push({
      path: 'src/app/guards/admin.guard.ts',
      content: this.generateAdminGuard()
    });

    // User Resolver
    files.push({
      path: 'src/app/resolvers/user.resolver.ts',
      content: this.generateUserResolver()
    });

    // Dashboard components
    files.push({
      path: 'src/app/dashboard/dashboard.component.ts',
      content: this.generateDashboardComponent()
    });

    files.push({
      path: 'src/app/dashboard/dashboard.component.html',
      content: this.generateDashboardComponentHtml()
    });

    files.push({
      path: 'src/app/dashboard/dashboard.component.scss',
      content: this.generateDashboardComponentStyles()
    });

    files.push({
      path: 'src/app/dashboard/home/home.component.ts',
      content: this.generateDashboardHomeComponent()
    });

    files.push({
      path: 'src/app/dashboard/home/home.component.html',
      content: this.generateDashboardHomeComponentHtml()
    });

    files.push({
      path: 'src/app/dashboard/profile/profile.component.ts',
      content: this.generateDashboardProfileComponent()
    });

    files.push({
      path: 'src/app/dashboard/profile/profile.component.html',
      content: this.generateDashboardProfileComponentHtml()
    });

    // Settings lazy-loaded routes
    files.push({
      path: 'src/app/dashboard/settings/settings.routes.ts',
      content: this.generateSettingsRoutes()
    });

    files.push({
      path: 'src/app/dashboard/settings/settings.component.ts',
      content: this.generateSettingsComponent()
    });

    files.push({
      path: 'src/app/dashboard/settings/settings.component.html',
      content: this.generateSettingsComponentHtml()
    });

    // Admin components
    files.push({
      path: 'src/app/admin/admin.component.ts',
      content: this.generateAdminComponent()
    });

    files.push({
      path: 'src/app/admin/admin.component.html',
      content: this.generateAdminComponentHtml()
    });

    files.push({
      path: 'src/app/admin/users/users.component.ts',
      content: this.generateAdminUsersComponent()
    });

    files.push({
      path: 'src/app/admin/users/users.component.html',
      content: this.generateAdminUsersComponentHtml()
    });

    files.push({
      path: 'src/app/admin/roles/roles.component.ts',
      content: this.generateAdminRolesComponent()
    });

    files.push({
      path: 'src/app/admin/roles/roles.component.html',
      content: this.generateAdminRolesComponentHtml()
    });

    // 404 Not Found component
    files.push({
      path: 'src/app/not-found/not-found.component.ts',
      content: this.generateNotFoundComponent()
    });

    files.push({
      path: 'src/app/not-found/not-found.component.html',
      content: this.generateNotFoundComponentHtml()
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

    // Theme service for Material
    files.push({
      path: 'src/app/services/theme.service.ts',
      content: this.generateThemeService()
    });

    // Theme toggle component
    files.push({
      path: 'src/app/core/theme-toggle/theme-toggle.component.ts',
      content: this.generateThemeToggleComponent()
    });

    files.push({
      path: 'src/app/core/theme-toggle/theme-toggle.component.html',
      content: this.generateThemeToggleComponentHtml()
    });

    // Models
    files.push({
      path: 'src/app/models/counter.model.ts',
      content: this.generateCounterModel()
    });

    // NgRx State Management
    files.push({
      path: 'src/app/store/actions/counter.actions.ts',
      content: this.generateCounterActions()
    });

    files.push({
      path: 'src/app/store/reducers/counter.reducer.ts',
      content: this.generateCounterReducer()
    });

    files.push({
      path: 'src/app/store/reducers/index.ts',
      content: this.generateStoreReducers()
    });

    files.push({
      path: 'src/app/store/selectors/counter.selectors.ts',
      content: this.generateCounterSelectors()
    });

    files.push({
      path: 'src/app/store/effects/counter.effects.ts',
      content: this.generateCounterEffects()
    });

    files.push({
      path: 'src/app/store/index.ts',
      content: this.generateStoreIndex()
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

    // Test setup and utilities
    files.push({
      path: 'src/test-setup.ts',
      content: this.generateTestSetup()
    });

    files.push({
      path: 'src/testing/test-helpers.ts',
      content: this.generateTestHelpers()
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

    // Server file for SSR
    files.push({
      path: 'server.ts',
      content: this.generateServer()
    });

    // Server-side main file
    files.push({
      path: 'src/main.server.ts',
      content: this.generateMainServer()
    });

    // Server app module
    files.push({
      path: 'src/app/app.server.module.ts',
      content: this.generateAppServerModule()
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

    // App Shell Component
    files.push({
      path: 'src/app/app-shell.component.ts',
      content: this.generateAppShell()
    });

    // Offline Service
    files.push({
      path: 'src/app/services/offline.service.ts',
      content: this.generateOfflineService()
    });

    // Custom Validators
    files.push({
      path: 'src/app/validators/custom.validators.ts',
      content: this.generateCustomValidators()
    });

    // Form Utilities
    files.push({
      path: 'src/app/utils/form-utils.ts',
      content: this.generateFormUtils()
    });

    // Dynamic Form Service
    files.push({
      path: 'src/app/services/dynamic-form.service.ts',
      content: this.generateDynamicFormService()
    });

    // User Form Component
    files.push({
      path: 'src/app/components/user-form/user-form.component.ts',
      content: this.generateUserFormComponent()
    });

    // Login Form Component
    files.push({
      path: 'src/app/components/login-form/login-form.component.ts',
      content: this.generateLoginFormComponent()
    });

    // Search Form Component
    files.push({
      path: 'src/app/components/search-form/search-form.component.ts',
      content: this.generateSearchFormComponent()
    });

    // Form Components HTML Templates
    files.push({
      path: 'src/app/components/user-form/user-form.component.html',
      content: this.generateUserFormTemplate()
    });

    files.push({
      path: 'src/app/components/user-form/user-form.component.scss',
      content: this.generateUserFormStyles()
    });

    files.push({
      path: 'src/app/components/login-form/login-form.component.html',
      content: this.generateLoginFormTemplate()
    });

    files.push({
      path: 'src/app/components/login-form/login-form.component.scss',
      content: this.generateLoginFormStyles()
    });

    files.push({
      path: 'src/app/components/search-form/search-form.component.html',
      content: this.generateSearchFormTemplate()
    });

    files.push({
      path: 'src/app/components/search-form/search-form.component.scss',
      content: this.generateSearchFormStyles()
    });

    // Form Examples Module
    files.push({
      path: 'src/app/form-examples.module.ts',
      content: this.generateFormExamplesModule()
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
        'build:ssr': 'ng build --configuration production && ng run ${normalizedName}:server:production',
        'serve:ssr': 'node dist/${normalizedName}/server/main.js',
        'dev:ssr': 'ng run ${normalizedName}:serve-ssr',
        'prerender': 'ng run ${normalizedName}:prerender',
        'watch': 'ng build --watch --configuration development',
        'install:pwa': 'ng add @angular/pwa',
        'pwainit': 'ng add @angular/pwa',
        'test': 'ng test',
        'test:ci': 'ng test --watch=false --browsers=ChromeHeadlessCI',
        'test:coverage': 'ng test --watch=false --code-coverage',
        'test:watch': 'ng test --watch',
        'test:headless': 'ng test --watch=false --browsers=ChromeHeadless',
        'lint': 'ng lint',
        'lint:fix': 'ng lint --fix',
        'e2e': 'ng e2e'
      },
      private: true,
      dependencies: {
        '@angular/animations': '^17.0.0',
        '@angular/cdk': '^17.0.0',
        '@angular/common': '^17.0.0',
        '@angular/compiler': '^17.0.0',
        '@angular/core': '^17.0.0',
        '@angular/forms': '^17.0.0',
        '@angular/material': '^17.0.0',
        '@angular/platform-browser': '^17.0.0',
        '@angular/platform-browser-dynamic': '^17.0.0',
        '@angular/platform-server': '^17.0.0',
        '@angular/router': '^17.0.0',
        '@angular/pwa': '^17.0.0',
        '@angular/service-worker': '^17.0.0',
        '@nguniversal/express-engine': '^17.0.0',
        '@nguniversal/common': '^17.0.0',
        '@nguniversal/builders': '^17.0.0',
        '@ngrx/effects': '^17.0.0',
        '@ngrx/entity': '^17.0.0',
        '@ngrx/operators': '^17.0.0',
        '@ngrx/router-store': '^17.0.0',
        '@ngrx/store': '^17.0.0',
        '@ngrx/store-devtools': '^17.0.0',
        'express': '^4.18.0',
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
        '@types/express': '^4.17.17',
        'jasmine-core': '^5.1.0',
        'jasmine-spec-reporter': '^7.0.0',
        'karma': '^6.4.0',
        'karma-chrome-launcher': '^3.2.0',
        'karma-coverage': '^2.2.0',
        'karma-coverage-istanbul-reporter': '^3.0.3',
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
        },
        '@schematics/angular:application': {
          serviceWorker: true
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
              'src/manifest.webmanifest',
              {
                'glob': '**/*',
                'input': './src/assets/icons',
                'output': './assets/icons'
              }
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
        server: {
          builder: '@angular-devkit/build-angular:server',
          options: {
            outputPath: `dist/${normalizedName}/server`,
            main: 'src/main.server.ts',
            tsConfig: 'tsconfig.server.json',
            inlineStyleLanguage: 'scss'
          },
          configurations: {
            development: {
              outputHashing: 'none',
              sourceMap: true,
            },
            production: {
              outputHashing: 'all',
              sourceMap: false,
            }
          }
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
            scripts: [],
            codeCoverage: true,
            coverageThreshold: {
              global: {
                statements: 70,
                branches: 70,
                functions: 70,
                lines: 70
              }
            }
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

    // Add server project configuration
    projects[normalizedName + '-server'] = {
      root: '',
      sourceRoot: 'src',
      projectType: 'application',
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:server',
          options: {
            outputPath: `dist/${normalizedName}/server`,
            main: 'src/main.server.ts',
            tsConfig: 'tsconfig.server.json',
            inlineStyleLanguage: 'scss'
          },
          configurations: {
            development: {
              outputHashing: 'none',
              sourceMap: true,
            },
            production: {
              outputHashing: 'all',
              sourceMap: false,
            }
          }
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          options: {
            outputPath: `dist/${normalizedName}/server`,
            main: 'src/main.server.ts',
            tsConfig: 'tsconfig.server.json',
            inlineStyleLanguage: 'scss'
          },
          configurations: {
            development: {
              buildTarget: `${normalizedName}-server:build:development`
            },
            production: {
              buildTarget: `${normalizedName}-server:build:production`
            }
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

  private generateTsConfigServer() {
    return JSON.stringify({
      extends: './tsconfig.json',
      compilerOptions: {
        outDir: './out-tsc/server',
        types: ['node']
      },
      files: ['src/main.server.ts'],
      include: ['src/**/*.ts']
    }, null, 2);
  }

  private generateServer() {
    const { normalizedName } = this.context;
    return `import 'zone.js/node';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { BASE_URL, APP_BASE_HREF } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';

// Import the server module
import { AppServerModule } from './src/app/app.server.module';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = path.join(process.cwd(), 'dist/${normalizedName}');

  // Our Universal express-engine (found in @nguniversal/express-engine)
  // It will render the Angular app to HTML on the server, using the
  // 'server.ts' file located in the 'src' folder as the entry point.
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [
      provideClientHydration(),
      { provide: BASE_URL, useValue: '/' },
      { provide: APP_BASE_HREF, useValue: '/' }
    ]
  }));

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render('index.html', { req });
  });

  return server;
}

// The following code is for deploying to serverless environments
// See: https://angular.io/guide/universal/deployment
const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app().listen(port, () => {
    console.log(\`Node server listening on http://localhost:\${port}\`);
  });
}`;

  }

  private generateMainServer() {
    return `import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';

enableProdMode();

// The browser platform with server rendering
bootstrapApplication(AppModule, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideServerRendering()
  ]
})
.then(() => console.log('Server rendering app complete'))
.catch(err => console.error(err));
`;

  }

  private generateAppServerModule() {
    return `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app/app.routes';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ThemeToggleComponent } from './core/theme-toggle/theme-toggle.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition(),
    ServerModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemeToggleComponent
  ],
  providers: [
    // Add server-specific providers here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

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

// Register service worker for PWA with update handling
if ('serviceWorker' in navigator && environment.production) {
  // Register service worker
  navigator.serviceWorker.register('/ngsw-worker.js')
    .then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      // Check for service worker updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;

        installingWorker?.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, please refresh
            console.log('New content is available, please refresh the page.');

            // Show update notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Update Available', {
                body: 'New content is available. Click to update now.',
                icon: '/assets/icons/icon-192x192.png',
                tag: 'update-notification'
              }).onclick = () => {
                window.location.reload();
                registration.update();
              };
            }

            // Optionally trigger a banner in the UI
            const updateEvent = new CustomEvent('swupdate', {
              detail: { waitingWorker: installingWorker }
            });
            window.dispatchEvent(updateEvent);
          }
        });
      });
    })
    .catch((error) => {
      console.error('ServiceWorker registration failed: ', error);
    });

  // Listen for controller change (when service worker activates)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service worker has been updated');
  });

  // Listen for message from service worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_UPDATED') {
      console.log('Content has been updated and cached');
    }
  });
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

  <!-- Apple touch icon -->
  <link rel="apple-touch-icon" href="assets/icons/icon-192x192.png">

  <!-- Apple mobile web app capable -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="${name}">

  <!-- Microsoft tile -->
  <meta name="msapplication-TileColor" content="#1976d2">
  <meta name="msapplication-config" content="assets/icons/browserconfig.xml">

  <!-- SEO meta tags -->
  <link rel="canonical" href="/">

  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- PWA splash screen -->
  <link rel="apple-touch-startup-image" href="assets/icons/splash-screen.png">

  <!-- Fallback for older browsers -->
  <link rel="icon" href="favicon.ico">

  <!-- Prevent zooming on iOS -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

  <!-- Additional meta tags for better PWA experience -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="${name}">
</head>
<body>
  <app-root></app-root>
  <noscript>Please enable JavaScript to continue using this application.</noscript>

  <!-- Fallback service worker registration for production -->
  <script>
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ngsw-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  </script>
</body>
</html>
`;
  }

  private generateStyles() {
    return `/* Global Styles */

// Import Angular Material theme
@import './theme.scss';

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  font-family: Roboto, 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: Roboto, 'Helvetica Neue', sans-serif;
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
import { provideRouter, withPreloading, PreloadAllModules, withViewTransitions, withDebugTracing } from '@angular/router';
import { provideStore, provideState, provideEffects } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { appRoutes } from './app.routes';
import { reducers } from './store/reducers/index';
import * as fromCounter from './store/reducers/counter.reducer';
import { CounterEffects } from './store/effects/counter.effects';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withDebugTracing()
    ),
    provideStore(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionTypeUniqueness: true,
      },
    }),
    provideState(fromCounter.counterFeatureKey, fromCounter.reducer),
    provideEffects(CounterEffects),
    provideRouterStore(),
    !environment.production ? provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }) : [],
  ]
};
`;
  }

  private generateAppComponent() {
    return `import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import * as CounterActions from './store/actions/counter.actions';
import { selectCount } from './store/selectors/counter.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '${this.context.name}';
  private store = inject(Store);

  // Using NgRx store with signals (Angular 16+)
  readonly count$ = this.store.select(selectCount);
  readonly doubleCount = computed(() => {
    let count = 0;
    this.count$.subscribe(c => count = c);
    return count * 2;
  });

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
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
      <p class="subtitle">Angular CLI with NgRx State Management</p>
    </div>

    <div class="counter-section">
      <h2>Reactive Counter (NgRx)</h2>
      <div class="counter-display">
        <span class="count">{{ count$ | async }}</span>
        <span class="double-count">Double: {{ doubleCount() }}</span>
      </div>
      <div class="counter-controls">
        <button (click)="decrement()">-</button>
        <button (click)="reset()">Reset</button>
        <button (click)="increment()">+</button>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>⚡ NgRx State Management</h3>
        <p>Predictable state with actions, reducers, and effects</p>
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

  private generateAuthGuard() {
    return `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  return true;
};

// Injectable version for use in components
export class AuthGuard {
  canActivate() {
    return authGuard();
  }
}
`;
  }

  private generateAdminGuard() {
    return `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  // Check if user has admin role
  const userRole = localStorage.getItem('userRole');
  if (userRole !== 'admin') {
    router.navigate(['/dashboard']); // Redirect to dashboard for non-admins
    return false;
  }

  return true;
};

// Injectable version for use in components
export class AdminGuard {
  canActivate() {
    return adminGuard();
  }
}
`;
  }

  private generateUserResolver() {
    return `import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map, of } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const userResolver: ResolveFn<User> = (route, state) => {
  // In a real app, this would make an HTTP request to your API
  // Example: return inject(HttpClient).get('/api/user').pipe(map(res => res.data));

  // Mock data for demonstration
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  };

  // Simulate async operation
  return of(mockUser).pipe(
    map(user => user)
  );
};
`;
  }

  private generateDashboardComponent() {
    return `import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
`;
  }

  private generateDashboardComponentHtml() {
    return `<div class="dashboard-layout">
  <aside class="sidebar">
    <div class="logo">
      <h2>Dashboard</h2>
    </div>
    <nav class="nav">
      <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
        <span class="icon">🏠</span> Home
      </a>
      <a routerLink="/dashboard/profile" routerLinkActive="active" class="nav-link">
        <span class="icon">👤</span> Profile
      </a>
      <a routerLink="/dashboard/settings" routerLinkActive="active" class="nav-link">
        <span class="icon">⚙️</span> Settings
      </a>
    </nav>
  </aside>
  <main class="main-content">
    <header class="header">
      <h1>{{ 'Dashboard' | title }}</h1>
      <div class="user-menu">
        <span>Welcome, User</span>
        <button (click)="logout()">Logout</button>
      </div>
    </header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  </main>
</div>

<!-- Title pipe for dynamic page titles -->
<script>
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Pipe({ name: 'title', standalone: true })
export class TitlePipe implements PipeTransform {
  constructor(private title: Title) {}

  transform(value: string): string {
    this.title.setTitle(value);
    return value;
  }
}
</script>
`;
  }

  private generateDashboardComponentStyles() {
    return `.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
  position: fixed;
  height: 100vh;
}

.logo {
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.logo h2 {
  color: #1976d2;
  margin: 0;
}

.nav {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover,
.nav-link.active {
  background: #34495e;
  border-left-color: #1976d2;
}

.icon {
  font-size: 1.25rem;
}

.main-content {
  margin-left: 250px;
  flex: 1;
}

.header {
  background: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu button {
  padding: 0.5rem 1.5rem;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.3s;
}

.user-menu button:hover {
  background: #1565c0;
}

.content {
  padding: 2rem;
}
`;
  }

  private generateDashboardHomeComponent() {
    return `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './home.component.html'
})
export class DashboardHomeComponent {
  stats = signal([
    { label: 'Total Users', value: '1,234', icon: '👥' },
    { label: 'Active Sessions', value: '56', icon: '⚡' },
    { label: 'Revenue', value: '$12,345', icon: '💰' }
  ]);
}
`;
  }

  private generateDashboardHomeComponentHtml() {
    return `<div class="dashboard-home">
  <h2>Welcome to your Dashboard</h2>
  <div class="stats-grid">
    @for (stat of stats(); track stat.label) {
      <div class="stat-card">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <h3>{{ stat.label }}</h3>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </div>
    }
  </div>
</div>
`;
  }

  private generateDashboardProfileComponent() {
    return `import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { User, userResolver } from '../../resolvers/user.resolver';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);

  // Get resolved data from route
  user = toSignal(this.route.data.pipe(
    map(data => data['user'])
  ), { initialValue: {} as User });

  ngOnInit() {
    console.log('User data resolved:', this.user());
  }
}
`;
  }

  private generateDashboardProfileComponentHtml() {
    return `<div class="profile">
  <h2>User Profile</h2>
  <div class="profile-card" *ngIf="user; else loading">
    <div class="profile-header">
      <div class="avatar">{{ user?.name?.charAt(0) || '?' }}</div>
      <div class="user-info">
        <h3>{{ user?.name }}</h3>
        <p>{{ user?.email }}</p>
        <span class="badge">{{ user?.role }}</span>
      </div>
    </div>
  </div>
  <ng-template #loading>Loading user data...</ng-template>
</div>
`;
  }

  private generateSettingsRoutes() {
    return `import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((m) => m.SettingsComponent),
    children: [
      {
        path: 'account',
        loadComponent: () =>
          import('./account/account.component').then((m) => m.AccountComponent),
        title: 'Account Settings'
      },
      {
        path: 'preferences',
        loadComponent: () =>
          import('./preferences/preferences.component').then((m) => m.PreferencesComponent),
        title: 'Preferences'
      }
    ]
  }
];
`;
  }

  private generateSettingsComponent() {
    return `import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {}
`;
  }

  private generateSettingsComponentHtml() {
    return `<div class="settings">
  <h2>Settings</h2>
  <div class="settings-nav">
    <a routerLink="account" routerLinkActive="active" class="nav-link">Account</a>
    <a routerLink="preferences" routerLinkActive="active" class="nav-link">Preferences</a>
  </div>
  <router-outlet></router-outlet>
</div>
`;
  }

  private generateAdminComponent() {
    return `import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html'
})
export class AdminComponent {}
`;
  }

  private generateAdminComponentHtml() {
    return `<div class="admin-layout">
  <aside class="sidebar">
    <div class="logo">
      <h2>⚡ Admin Panel</h2>
    </div>
    <nav class="nav">
      <a routerLink="/admin/users" routerLinkActive="active" class="nav-link">Users</a>
      <a routerLink="/admin/roles" routerLinkActive="active" class="nav-link">Roles</a>
    </nav>
  </aside>
  <main class="main-content">
    <header class="header">
      <h1>{{ 'Admin' | title }}</h1>
    </header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  </main>
</div>
`;
  }

  private generateAdminUsersComponent() {
    return `import { Component, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-users',
  standalone: true,
  template: \`
    <div class="users-page">
      <div class="header">
        <h2>User Management</h2>
        <button class="btn-add">Add User</button>
      </div>
      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users(); track user.id) {
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span [class]="['status-badge', user.status === 'Active' ? 'active' : 'inactive']">
                  {{ user.status }}
                </span>
              </td>
              <td>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`
})
export class UsersComponent {
  users = signal<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' }
  ]);
}
`;
  }

  private generateAdminUsersComponentHtml() {
    return ``; // Template is inline in the component
  }

  private generateAdminRolesComponent() {
    return `import { Component, signal } from '@angular/core';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

@Component({
  selector: 'app-roles',
  standalone: true,
  template: \`
    <div class="roles-page">
      <div class="header">
        <h2>Role Management</h2>
        <button class="btn-add">Add Role</button>
      </div>
      <div class="roles-grid">
        @for (role of roles(); track role.id) {
          <div class="role-card">
            <h3>{{ role.name }}</h3>
            <p>{{ role.description }}</p>
            <div class="permissions">
              <h4>Permissions:</h4>
              <ul>
                @for (perm of role.permissions; track perm) {
                  <li>{{ perm }}</li>
                }
              </ul>
            </div>
            <div class="actions">
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Delete</button>
            </div>
          </div>
        }
      </div>
    </div>
  \`
})
export class RolesComponent {
  roles = signal<Role[]>([
    {
      id: 1,
      name: 'Administrator',
      description: 'Full system access',
      permissions: ['Create', 'Read', 'Update', 'Delete', 'Manage Users']
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Content management',
      permissions: ['Create', 'Read', 'Update']
    },
    {
      id: 3,
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['Read']
    }
  ]);
}
`;
  }

  private generateAdminRolesComponentHtml() {
    return ``; // Template is inline in the component
  }

  private generateNotFoundComponent() {
    return `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styles: [\`
    .not-found {
      text-align: center;
      padding: 4rem 2rem;
    }

    .not-found h1 {
      font-size: 6rem;
      color: #1976d2;
      margin-bottom: 1rem;
    }

    .not-found p {
      font-size: 1.5rem;
      color: #7f8c8d;
      margin-bottom: 2rem;
    }

    .not-found a {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 0.25rem;
      transition: background 0.3s;
    }

    .not-found a:hover {
      background: #1565c0;
    }
  \`]
})
export class NotFoundComponent {}
`;
  }

  private generateNotFoundComponentHtml() {
    return `<div class="not-found">
  <h1>404</h1>
  <p>Page not found</p>
  <a routerLink="/">Go Home</a>
</div>
`;
  }

  private generateHeaderComponent() {
    return `import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
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
      <app-theme-toggle></app-theme-toggle>
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
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard',
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/home/home.component').then((m) => m.DashboardHomeComponent),
        title: 'Dashboard Home'
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./dashboard/profile/profile.component').then((m) => m.ProfileComponent),
        title: 'Profile',
        resolve: {
          user: () => inject(userResolver).resolve()
        }
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./dashboard/settings/settings.routes').then((m) => m.settingsRoutes)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    title: 'Admin Panel',
    canActivate: [() => inject(AuthGuard).canActivate(), () => inject(AdminGuard).canActivate()],
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./admin/users/users.component').then((m) => m.UsersComponent),
        title: 'User Management'
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./admin/roles/roles.component').then((m) => m.RolesComponent),
        title: 'Role Management'
      }
    ]
  },
  {
    path: 'forms',
    title: 'Form Examples',
    children: [
      {
        path: 'user-form',
        loadComponent: () =>
          import('./components/user-form/user-form.component').then((m) => m.UserFormComponent),
        title: 'User Registration Form'
      },
      {
        path: 'login-form',
        loadComponent: () =>
          import('./components/login-form/login-form.component').then((m) => m.LoginFormComponent),
        title: 'Login Form'
      },
      {
        path: 'search-form',
        loadComponent: () =>
          import('./components/search-form/search-form.component').then((m) => m.SearchFormComponent),
        title: 'Search Form'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: '404 - Page Not Found'
  }
];

// Enable preloading strategy for better performance
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withDebugTracing()
    )
  ]
};
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
        // Disable random execution for consistent test runs
        random: false,
        // Set seed for reproducible test order
        seed: '4321',
        // Increased timeout for async operations
        timeoutInterval: 10000,
        // Show specs in the console
        displaySpecDuration: true,
        // Print failures to the console
        print: function() {
          return process.stdout.write.bind(process.stdout);
        }
      },
      clearContext: false, // Leave Jasmine Spec Runner output visible in browser
      // Capture console output
      captureConsole: true
    },
    jasmineHtmlReporter: {
      suppressAll: false, // Show full stack traces
      showFailedMessages: true,
      showSpecDuration: true
    },
    // Code coverage configuration
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/${this.context.normalizedName}'),
      reports: ['html', 'lcovonly', 'text-summary', 'json'],
      fixWebpackSourcePaths: true,
      thresholds: {
        emitWarning: false, // Warn but don't fail on thresholds
        global: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70
        }
      }
    },
    // Karma coverage reporter
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/${this.context.normalizedName}'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
    // Custom launchers for different environments
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ]
      }
    },
    // Single run mode for CI
    singleRun: false,
    // Colors in output
    colors: true,
    // Log level
    logLevel: config.LOG_INFO,
    // Watch configuration
    autoWatch: true,
    // Concurrency
    concurrency: Infinity
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
    return `# Multi-stage Dockerfile for Angular CLI with SSR

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
RUN npm run build:ssr

# Production stage - use Node.js for SSR
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built assets from build stage
COPY --from=build /app/dist /app/dist

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000 || exit 1

# Start the SSR server
CMD ["node", "dist/server/main.js"]
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

${description || 'Angular CLI application with Angular Material and NgRx state management'}

## Features

- ⚡ Angular 17 with standalone components
- 🎨 Angular Material UI components
- 🎯 NgRx for state management
- 🌙 Dark mode with theme toggle (light/dark/auto)
- 🔧 Angular CLI for best practices
- 🚀 Angular Universal for Server-Side Rendering (SSR)
- ♿ Accessibility-first design (WCAG 2.1 AA)
- 📱 Progressive Web App (PWA) support with service workers and offline capabilities
- 🧪 Testing with Jasmine and Karma
- 🎨 SCSS for styling
- 🐳 Docker support
- 📝 Angular Forms with reactive forms and custom validators
- 🔐 Form validation with async validation support
- 🎯 Dynamic form generation from JSON configuration
- 💾 Auto-save functionality with debouncing
- 📊 Search forms with pagination and debouncing

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Initialize PWA features
${packageManager} run pwainit

# Serve with hot reload
${packageManager} start

# Build for production (with PWA)
${packageManager} run build

# Run tests
${packageManager} test

# Run linter
${packageManager} run lint

# Test PWA with Lighthouse
npx lighthouse http://localhost:4200 --output=html --output-path=./lighthouse-report.html
\`\`\`

## Development Server

Run \`ng serve\` for a dev server. Navigate to \`http://localhost:4200/\`.

## Code Scaffolding

Run \`ng generate component component-name\` to generate a new component.

## Build

Run \`ng build\` to build the project. The build artifacts will be stored in the \`dist/\` directory.

## Running Unit Tests

This application is configured for unit testing with Jasmine and Karma.

### Test Scripts

\`\`\`bash
# Run tests in watch mode (interactive)
${packageManager} test

# Run tests once with coverage report
${packageManager} run test:coverage

# Run tests in CI mode (no watch, headless)
${packageManager} run test:ci

# Run tests in headless Chrome
${packageManager} run test:headless

# Run tests with watch mode
${packageManager} run test:watch
\`\`\`

### Code Coverage

Coverage reports are generated in the \`coverage/\` directory:

\`\`\`bash
# View HTML coverage report
open coverage/${this.context.normalizedName}/index.html

# CLI coverage summary
${packageManager} run test:coverage
\`\`\`

Coverage thresholds are configured at 70% for:
- Statements
- Branches
- Functions
- Lines

### Test Configuration

- **Test Runner**: Karma with Jasmine
- **Browser**: Chrome Headless
- **Coverage Tool**: Istanbul
- **Test Location**: \`**/*.spec.ts\`

### Test Utilities

Helper functions available in \`src/testing/test-helpers.ts\`:

\`\`\`typescript
import {
  createComponent,
  queryByCss,
  clickElement,
  setInputValue,
  waitFor,
  MockData,
  createMockService
} from './testing/test-helpers';

// Create component fixture
const fixture = createComponent(MyComponent);

// Query elements
const button = queryByCss(fixture, 'button');

// Simulate user interactions
clickElement(fixture, button);
setInputValue(inputElement, 'test value');

// Wait for async operations
await waitFor(1000);

// Use mock data
const user = MockData.user({ name: 'Custom User' });

// Create mock service
const mockService = createMockService<MyService>(['getData', 'saveData']);
\`\`\`

### Custom Matchers

Additional Jasmine matchers:

\`\`\`typescript
// Check if number is in range
expect(value).toBeInRange(min, max);

// Check element text content
expect(element).toHaveText('expected text');
\`\`\`

## Angular Material

This application uses Angular Material for UI components with comprehensive theming and accessibility.

### Theme System

The app includes a complete theme system with light/dark/auto modes:

\`\`\`typescript
import { ThemeService } from './services/theme.service';

// Use in component
constructor(private themeService: ThemeService) {
  // Set theme
  this.themeService.setTheme('dark');

  // Get current theme
  const isDark = this.themeService.isDarkMode();
}
\`\`\`

### Material Components

Available components:
- **Buttons**: mat-button, mat-raised-button, mat-icon-button, mat-stroked-button
- **Form Fields**: mat-form-field with inputs and selects
- **Cards**: mat-card with headers, titles, and actions
- **Navigation**: mat-menu, mat-toolbar, mat-sidenav
- **Layout**: mat-grid-list, mat-divider, mat-progress-spinner
- **Feedback**: mat-snack-bar, mat-dialog, mat-tooltip

### Customization

Theme customization in \`src/theme.scss\`:

\`\`\`scss
// Define custom palettes
$primary-palette: mat.define-palette(mat.$indigo-palette);
$accent-palette: mat.define-palette(mat.$pink-palette, A200, A100, A400);

// Create custom theme
$custom-theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
  ),
  density: 0,
));
\`\`\`

### Accessibility

Angular Material is configured for WCAG 2.1 AA compliance:

- Color contrast ratios meet AA standards (4.5:1 for text)
- Keyboard navigation support for all interactive elements
- ARIA labels and roles properly defined
- Focus indicators visible on all components
- High contrast mode support
- Reduced motion support for users with vestibular disorders

## NgRx State Management

This application uses NgRx for predictable state management.

### Store Structure
\`\`\`
src/app/store/
├── actions/         # Action definitions
├── reducers/        # Reducer functions
├── selectors/       # Memoized selectors
├── effects/         # Side effects
└── index.ts         # Store configuration
\`\`\`

### Actions
\`\`\`typescript
import { increment, decrement, reset } from './store/actions/counter.actions';

// Dispatch actions
this.store.dispatch(increment());
this.store.dispatch(decrement());
this.store.dispatch(reset());
\`\`\`

### Selectors
\`\`\`typescript
import { selectCount, selectDoubleCount } from './store/selectors/counter.selectors';

// Select state
this.count$ = this.store.select(selectCount);
this.doubleCount$ = this.store.select(selectDoubleCount);
\`\`\`

### Effects
Effects handle side effects like API calls:
\`\`\`typescript
loadCounter$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CounterActions.loadCounter),
    mergeMap(() =>
      this.apiService.getCounter().pipe(
        map(count => CounterActions.loadCounterSuccess({ count })),
        catchError(error => of(CounterActions.loadCounterFailure({ error })))
      )
    )
  )
);
\`\`\`

### Runtime Checks
NgRx is configured with strict runtime checks for development:
- Strict state immutability
- Strict action immutability
- Strict state serializability
- Strict action type uniqueness

## Angular Features

### Standalone Components
This application uses standalone components - no NgModules needed!
Components are self-contained and tree-shakable.

### New Control Flow
Uses \`@if\`, \`@for\`, and \`@switch\` instead of structural directives.

### Functional Guards
Router guards use functional approach with \`CanActivateFn\` instead of classes.

## Angular Forms

This application includes comprehensive Angular Forms with reactive forms, custom validators, and form utilities.

### Form Features

#### 1. Reactive Forms
Uses Angular's reactive forms with:
- FormGroup, FormControl, and FormArray for form structure
- Synchronous and asynchronous validation
- Dynamic form controls
- Form state management

#### 2. Custom Validators
Located in \`src/app/validators/custom.validators.ts\`:

- **Password Strength Validator** - Ensures strong passwords with uppercase, lowercase, numbers, and special characters
- **Email Domain Validator** - Validates email addresses against allowed domains
- **Username Availability Validator** - Async validator to check username availability
- **File Type Validator** - Validates file extensions for uploads
- **Phone Number Validator** - Validates phone number format
- **Date Range Validator** - Validates that end date is after start date

#### 3. Form Components

##### User Form Component (\`/user-form\`)
- Complete user registration form
- Password strength indicator
- Async username validation
- Email domain restriction
- Form utilities integration

##### Login Form Component (\`/login-form\`)
- Authentication with login attempts tracking
- Account lockout after 3 failed attempts
- Remember me functionality
- Loading states and error handling

##### Search Form Component (\`/search-form\`)
- Real-time search with debouncing
- Recent searches tracking
- Pagination support
- Export search results to CSV
- Category and sorting filters

#### 4. Form Utilities
Located in \`src/app/utils/form-utils.ts\`:

- **FormStateHelper** - Mark forms as touched/pristine, reset forms, check form state
- **FormValidationHelper** - Validate on submit, get invalid fields, manage field errors
- **AutoSaveService** - Auto-save form data with configurable debounce

#### 5. Dynamic Form Service
The \`DynamicFormService\` allows creating forms from JSON configuration:

\`\`\`typescript
const formConfig: FormConfig = {
  title: 'Contact Form',
  fields: [
    {
      key: 'name',
      type: 'input',
      label: 'Full Name',
      required: true,
      minLength: 2,
      maxLength: 50
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      validators: [Validators.email]
    }
  ]
};
\`\`\`

### Best Practices

#### Form Validation
- Use both synchronous and asynchronous validators
- Provide clear error messages
- Validate on blur for better UX
- Show loading states during async validation

#### Form State Management
- Track form state (dirty, pristine, touched, valid)
- Use signals for reactive form state
- Implement form reset confirmation
- Handle form submission states properly

#### Performance Optimization
- Use debouncing for search inputs
- Implement lazy loading for forms
- Cache form data when appropriate
- Use memoization for expensive operations

### Form Testing

The forms are designed to be easily testable:

\`\`\`typescript
describe('UserFormComponent', () => {
  it('should create form with validators', () => {
    const form = component.userForm;
    expect(form.get('username')?.valid).toBeFalsy();
    form.get('username')?.setValue('testuser');
    expect(form.get('username')?.valid).toBeTruthy();
  });
});
\`\`\`

## Docker

\`\`\`bash
# Build Docker image for SSR
docker build -t ${name}-ssr .

# Run container (SSR server runs on port 4000)
docker run -p 4000:4000 ${name}-ssr
\`\`\`

## Angular Universal Server-Side Rendering

This application is configured with Angular Universal for server-side rendering (SSR), providing SEO benefits and improved performance for users.

### What is Angular Universal?

Angular Universal allows Angular applications to be rendered on the server (SSR) instead of only on the client-side. This approach:

- **Improves SEO**: Search engines can crawl the fully rendered HTML
- **Faster First Paint**: Users see content immediately without waiting for JavaScript to load and execute
- **Better Performance**: Reduced client-side JavaScript processing
- **Improved Accessibility**: Content is available to screen readers immediately

### SSR Build Commands

\`\`\`bash
# Build for SSR (production)
npm run build:ssr

# Serve the SSR application
npm run serve:ssr

# Development SSR mode
npm run dev:ssr

# Pre-render static pages
npm run prerender
\`\`\`

### Development with SSR

The SSR server runs on port 4000 by default:

\`\`\`bash
# Start SSR development server
npm run dev:ssr

# Navigate to http://localhost:4000
\`\`\`

### SSR Architecture

The SSR implementation includes:

1. **server.ts** - Express server configuration
2. **src/main.server.ts** - Server-side application entry point
3. **src/app/app.server.module.ts** - Server-specific module configuration
4. **angular.json** - SSR build configurations
5. **tsconfig.server.json** - TypeScript configuration for server builds

### Deployment Considerations

When deploying with SSR:

1. **Node.js Environment**: Ensure your deployment environment supports Node.js
2. **Port Configuration**: The SSR server runs on PORT 4000 by default
3. **Static Files**: Static assets are served from the dist folder
4. **Environment Variables**: Set NODE_ENV appropriately

### Common SSR Issues

**SSR vs Browser APIs**
- Avoid using browser-only APIs directly in components
- Use Angular's `isPlatformServer()` to check platform context
- Move browser-specific code to `ngAfterViewInit()` or use dependency injection

**Styling Considerations**
- CSS is scoped to the server context
- Use global styles in `styles.scss` for SSR compatibility
- Angular Material styles work seamlessly with SSR

**Performance Optimization**
- Implement route preloading for better user experience
- Use lazy loading for routes that don't require SSR
- Consider static site generation for marketing pages

### Platform-Specific Code Handling

Example of platform-specific code:

\`\`\`typescript
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Component({
  // ...
})
export class MyComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformServer(this.platformId)) {
      // Server-side code
      console.log('Running on server');
    } else {
      // Client-side code
      console.log('Running in browser');
    }
  }
}
\`\`\`

For more information on Angular Universal, visit the [official guide](https://angular.io/guide/universal).

## Progressive Web App (PWA)

This application is configured as a Progressive Web App (PWA), providing a native app-like experience with offline capabilities and installable on supported devices.

### What is a PWA?

A Progressive Web App is a web application that uses modern web capabilities to deliver an app-like experience to users. PWAs are:

- **Reliable** - Load instantly and never show the down page
- **Fast** - Respond quickly to user interactions
- **Engaging** - Feel like a natural app on the device

### Key PWA Features

#### 1. Service Worker
The application includes a service worker (`ngsw-worker.js`) that:
- Caches application assets for offline use
- Manages background sync
- Handles push notifications
- Provides update management

#### 2. App Shell
The `AppShellComponent` provides:
- Loading states with spinner
- Skeleton screens during content loading
- Offline detection and notifications
- Retry functionality for failed requests

#### 3. Offline Support
The `OfflineService` monitors network connectivity and:
- Tracks online/offline status
- Queues requests when offline
- Shows offline notifications
- Retries failed requests when back online

### Service Worker Configuration

The service worker is configured in `src/ngsw-config.json`:

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/*.css", "/*.js", "/index.html"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch"
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1d"
      }
    }
  ]
}
```

### PWA Manifest

The `manifest.webmanifest` file defines the PWA metadata:
- Application name and icons
- Start URL and display mode
- Theme colors
- Orientation and background color

### Offline Detection and Management

The application automatically detects offline status and:

1. Shows a warning banner
2. Prevents API calls when offline
3. Queues requests for later execution
4. Notifies users when returning online

```typescript
// Usage in components
constructor(private offlineService: OfflineService) {}

// Check online status
const isOnline = this.offlineService.isOnline();

// Make requests with retry
this.offlineService.requestWithRetry('/api/data')
  .then(response => {
    // Handle success
  })
  .catch(error => {
    // Handle failure
  });
```

### Installation

Users can install the PWA by:
1. Clicking the install button in supported browsers
2. Using the "Add to Home Screen" option
3. Selecting the install prompt when available

### Update Management

The PWA automatically:
- Checks for updates in the background
- Shows notifications when new content is available
- Allows users to refresh to get updates
- Maintains offline functionality during updates

### Lighthouse Testing

To test PWA quality, run Lighthouse:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:4200 --output=html --output-path=./lighthouse-report.html
```

### Deployment Considerations

#### HTTPS Required
- PWAs require HTTPS in production
- Ensure your deployment supports HTTPS
- Service workers won't register on HTTP localhost

#### Cache Strategy
- Critical assets are prefetched
- Large assets are lazy-loaded
- API responses are cached for 1 day
- Cache is updated on application updates

#### Icons
- Multiple icon sizes are included (72x72 to 512x512)
- Icons should be provided in `/src/assets/icons/`
- Missing icons will fallback to generic placeholders

### Troubleshooting

#### Service Worker Not Registering
- Check that the site is served over HTTPS
- Verify the service worker file exists
- Check browser console for errors

#### Offline Not Working
- Ensure service worker is properly installed
- Check cache configuration in ngsw-config.json
- Verify network requests are being cached

#### Update Issues
- Clear browser cache and try again
- Check service worker version updates
- Verify the manifest file has the latest version

### Browsers Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Workers | ✅ | ✅ | ✅ | ✅ |
| Installable PWA | ✅ | ✅ | ✅ | ✅ |
| Background Sync | ✅ | ❌ | ❌ | ✅ |
| Push Notifications | ✅ | ✅ | ❌ | ✅ |

### Future Enhancements

Additional PWA features that can be implemented:
- Push notifications
- Background sync
- Payment processing
- Camera access
- Geolocation services

For more information on PWAs, visit the [Google Developers PWA Guide](https://developers.google.com/web/fundamentals/progressive-web-apps/).

## Further Help

To get more help on the Angular CLI use \`ng help\` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

For NgRx documentation, visit [ngrx.io](https://ngrx.io).

## License

MIT
`;
  }

  private generateCounterActions() {
    return `import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const setValue = createAction('[Counter] SetValue', props<{ value: number }>());
export const incrementBy = createAction('[Counter] IncrementBy', props<{ value: number }>());
export const loadCounter = createAction('[Counter] Load');
export const loadCounterSuccess = createAction('[Counter] Load Success', props<{ count: number }>());
export const loadCounterFailure = createAction('[Counter] Load Failure', props<{ error: string }>());
`;
  }

  private generateCounterReducer() {
    return `import { createReducer, on } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

export const counterFeatureKey = 'counter';

export interface State {
  count: number;
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  count: 0,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1
  })),

  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1
  })),

  on(CounterActions.reset, (state) => ({
    ...state,
    count: 0
  })),

  on(CounterActions.setValue, (state, { value }) => ({
    ...state,
    count: value
  })),

  on(CounterActions.incrementBy, (state, { value }) => ({
    ...state,
    count: state.count + value
  })),

  on(CounterActions.loadCounter, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CounterActions.loadCounterSuccess, (state, { count }) => ({
    ...state,
    count,
    loading: false,
    error: null
  })),

  on(CounterActions.loadCounterFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
`;
  }

  private generateStoreReducers() {
    return `import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';

export interface State {
  [fromCounter.counterFeatureKey]: fromCounter.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromCounter.counterFeatureKey]: fromCounter.reducer
};
`;
  }

  private generateCounterSelectors() {
    return `import { createFeatureSelector, createSelector } from '@ngrx/store';
import { counterFeatureKey, State } from '../reducers/counter.reducer';

export const selectCounterState = createFeatureSelector<State>(counterFeatureKey);

export const selectCount = createSelector(
  selectCounterState,
  (state) => state.count
);

export const selectDoubleCount = createSelector(
  selectCount,
  (count) => count * 2
);

export const selectLoading = createSelector(
  selectCounterState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCounterState,
  (state) => state.error
);

export const selectCounterViewModel = createSelector(
  selectCount,
  selectLoading,
  selectError,
  (count, loading, error) => ({
    count,
    loading,
    error,
    canDecrement: count > 0
  })
);
`;
  }

  private generateCounterEffects() {
    return `import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, delay } from 'rxjs/operators';
import * as CounterActions from '../actions/counter.actions';

@Injectable()
export class CounterEffects {
  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.loadCounter),
      tap(() => console.log('[CounterEffects] Loading counter...')),
      delay(1000), // Simulate API call
      mergeMap(() =>
        of({ count: 42 }).pipe(
          map(({ count }) => CounterActions.loadCounterSuccess({ count })),
          catchError((error) => of(CounterActions.loadCounterFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
`;
  }

  private generateStoreIndex() {
    return `import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { reducers } from './reducers/index';
import { CounterEffects } from './effects/counter.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([CounterEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class AppStoreModule {}
`;
  }

  private generateMaterialTheme() {
    return `// Custom Angular Material Theme

@use '@angular/material' as mat;
@use '@angular/material/theming' as *;

// Define theme palettes
$primary-palette: mat.define-palette(mat.$indigo-palette);
$accent-palette: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$warn-palette: mat.define-palette(mat.$red-palette);

// Create theme (light)
$light-theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Create theme (dark)
$dark-theme: mat.define-dark-theme((
  color: (
    primary: mat.define-palette(mat.$blue-palette),
    accent: mat.define-palette(mat.$amber-palette, A200, A100, A400),
  ),
  density: 0,
));

// Apply theme
@include mat.core-theme($light-theme);
@include mat.button-theme($light-theme);
@include mat.checkbox-theme($light-theme);
@include mat.form-field-theme($light-theme);
@include mat.icon-theme($light-theme);
@include mat.input-theme($light-theme);
@include mat.progress-spinner-theme($light-theme);
@include mat.slide-toggle-theme($light-theme);
@include mat.slider-theme($light-theme);
@include mat.tabs-theme($light-theme);

// Dark theme class
.dark-theme {
  @include mat.all-component-colors($dark-theme);
  @include mat.button-colors($dark-theme);
  @include mat.checkbox-colors($dark-theme);
  @include mat.form-field-colors($dark-theme);
  @include mat.icon-colors($dark-theme);
  @include mat.input-colors($dark-theme);
  @include mat.progress-spinner-colors($dark-theme);
  @include mat.slide-toggle-colors($dark-theme);
  @include mat.slider-colors($dark-theme);
  @include mat.tabs-colors($dark-theme);
}

// Custom density overrides
.mat-dense-button {
  @include mat.button-density(0);
}

// Custom typography
$custom-typography: mat.define-typography-config(
  $font-family: 'Roboto, sans-serif',
  $headline-1: mat.define-typography-level(112px, 112px, 300, 'Roboto', -0.0134em),
  $headline-2: mat.define-typography-level(56px, 56px, 400, 'Roboto', -0.007em),
  $headline-3: mat.define-typography-level(45px, 48px, 400, 'Roboto', 0em),
  $headline-4: mat.define-typography-level(34px, 40px, 400, 'Roboto', 0.0074em),
  $headline-5: mat.define-typography-level(24px, 32px, 400, 'Roboto', 0em),
  $headline-6: mat.define-typography-level(20px, 32px, 500, 'Roboto', 0.0015em),
  $subtitle-1: mat.define-typography-level(16px, 28px, 400, 'Roboto', 0.0094em),
  $subtitle-2: mat.define-typography-level(14px, 24px, 500, 'Roboto', 0.0063em),
  $body-1: mat.define-typography-level(16px, 24px, 400, 'Roboto', 0.005em),
  $body-2: mat.define-typography-level(14px, 24px, 400, 'Roboto', 0.0107em),
  $button: mat.define-typography-level(14px, 14px, 500, 'Roboto', 0.0893em),
  $caption: mat.define-typography-level(12px, 20px, 400, 'Roboto', 0.0333em),
  $overline: mat.define-typography-level(10px, 20px, 400, 'Roboto', 0.1667em),
);

@include mat.typography-hierarchy($custom-typography);
`;
  }

  private generateMaterialStyles() {
    return `// Custom Material component styles

// Override default Material styles
.mat-mdc-form-field {
  width: 100%;
}

.mat-mdc-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mat-mdc-button-base {
  border-radius: 4px;
}

.mat-mdc-raised-button {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.mat-mdc-raised-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

// Accessibility improvements
.mat-mdc-button-focus-overlay {
  background-color: rgba(0, 0, 0, 0.12);
}

// High contrast mode support
@media (prefers-contrast: high) {
  .mat-mdc-button {
    border: 2px solid currentColor;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .mat-mdc-menu-panel {
    transition: none !important;
  }

  .mat-mdc-slide-toggle {
    transition: none !important;
  }
}

// Dark mode toggle styles
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

// Custom elevation overrides
.mat-mdc-elevated-card {
  @include mat.elevation(2);
}

.mat-mdc-elevated-card:hover {
  @include mat.elevation(4);
}

// RTL support
[dir='rtl'] {
  .mat-mdc-icon-button {
    margin-left: 8px;
    margin-right: 0;
  }
}
`;
  }

  private generateThemeService() {
    return `import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  private readonly THEME_KEY = 'theme';
  private readonly storage = localStorage;

  // Current theme signal
  private currentTheme = signal<Theme>(this.getStoredTheme());

  // Computed theme (resolves 'auto' to system preference)
  readonly activeTheme = computed<'light' | 'dark'>(() => {
    const theme = this.currentTheme();
    if (theme === 'auto') {
      return this.getSystemTheme();
    }
    return theme;
  });

  // Computed observable for template binding
  readonly isDarkMode = computed(() => this.activeTheme() === 'dark');

  constructor() {
    this.applyTheme(this.activeTheme());
    this.listenForSystemChanges();
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    this.storage.setItem(this.THEME_KEY, theme);
    this.applyTheme(this.activeTheme());
  }

  toggleTheme() {
    const current = this.currentTheme();
    const themes: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(current);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
  }

  private getStoredTheme(): Theme {
    const stored = this.storage.getItem(this.THEME_KEY);
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      return stored as Theme;
    }
    return 'auto';
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: 'light' | 'dark') {
    const body = this.document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  private listenForSystemChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      if (this.currentTheme() === 'auto') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handler);

    this.destroyRef.onDestroy(() => {
      mediaQuery.removeEventListener('change', handler);
    });
  }
}
`;
  }

  private generateThemeToggleComponent() {
    return `import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  currentTheme = toSignal(this.themeService.currentTheme, { initialValue: 'auto' as const });
  isDarkMode = this.themeService.isDarkMode;

  setTheme(theme: 'light' | 'dark' | 'auto') {
    this.themeService.setTheme(theme);
  }

  getThemeIcon(): string {
    switch (this.currentTheme()) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      default:
        return 'brightness_auto';
    }
  }
}
`;
  }

  private generateThemeToggleComponentHtml() {
    return `<button mat-icon-button [matMenuTriggerFor]="themeMenu" aria-label="Toggle theme">
  <mat-icon>{{ getThemeIcon() }}</mat-icon>
</button>

<mat-menu #themeMenu="matMenu">
  <button mat-menu-item (click)="setTheme('light')">
    <mat-icon>light_mode</mat-icon>
    <span>Light</span>
  </button>
  <button mat-menu-item (click)="setTheme('dark')">
    <mat-icon>dark_mode</mat-icon>
    <span>Dark</span>
  </button>
  <button mat-menu-item (click)="setTheme('auto')">
    <mat-icon>brightness_auto</mat-icon>
    <span>Auto</span>
  </button>
</mat-menu>
`;
  }

  private generateTestSetup() {
    return `import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialize test environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Additional test configuration
declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// Jasmine custom matchers
beforeEach(() => {
  jasmine.addMatchers({
    toBeInRange: () => {
      return {
        compare: (actual: number, min: number, max: number) => {
          const pass = actual >= min && actual <= max;
          return {
            pass,
            message: \`Expected \${actual} to be in range [\${min}, \${max}]\`
          };
        }
      };
    },
    toHaveText: () => {
      return {
        compare: (actual: HTMLElement, text: string) => {
          const pass = actual.textContent?.trim() === text;
          return {
            pass,
            message: \`Expected "\${actual.textContent?.trim()}" to equal "\${text}"\`
          };
        }
      };
    }
  });
});

// Global test utilities
(global as any).waitForAsync = (fn: () => void) => {
  return fn();
};
`;
  }

  private generateTestHelpers() {
    return `import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Enhanced test utilities for Angular components
 */

// Helper to create component with async detection
export function createComponent<T>(
  componentType: Type<T>,
  declarations?: Type<any>[],
  providers?: any[],
  imports?: any[]
  ): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: declarations || [],
    providers: providers || [],
    imports: imports || []
  });

  const fixture = TestBed.createComponent(componentType);
  fixture.detectChanges();
  return fixture;
}

// Helper to query by CSS selector
export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): HTMLElement | null {
  return fixture.nativeElement.querySelector(selector);
}

// Helper to query all by CSS selector
export function queryAllByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll(selector));
}

// Helper to query by debug element
export function queryByDebug<T>(
  fixture: ComponentFixture<T>,
  selector: string
): any {
  return fixture.debugElement.query(By.css(selector));
}

// Helper to dispatch event
export function dispatchEvent<T>(
  fixture: ComponentFixture<T>,
  element: HTMLElement,
  eventType: string
): void {
  const event = new Event(eventType, { bubbles: true });
  element.dispatchEvent(event);
  fixture.detectChanges();
}

// Helper to set input value
export function setInputValue(
  element: HTMLInputElement,
  value: string
): void {
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

// Helper to click element
export function clickElement(
  fixture: ComponentFixture<any>,
  element: HTMLElement
): void {
  element.click();
  fixture.detectChanges();
}

// Helper to wait for async
export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to check if element has class
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

// Helper to get component instance
export function getComponentInstance<T>(
  fixture: ComponentFixture<T>
): T {
  return fixture.componentInstance;
}

// Helper to get debug element
export function getDebugElement<T>(
  fixture: ComponentFixture<T>,
  selector: string
): any {
  return fixture.debugElement.query(By.css(selector));
}

// Mock data helpers
export class MockData {
  static user(overrides = {}) {
    return {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      ...overrides
    };
  }

  static product(overrides = {}) {
    return {
      id: 1,
      name: 'Test Product',
      price: 99.99,
      description: 'Test description',
      ...overrides
    };
  }
}

// Mock service helpers
export function createMockService<T>(methods: string[]): T {
  const mock = {} as T;
  methods.forEach(method => {
    (mock as any)[method] = jasmine.createSpy(method);
  });
  return mock;
}

// Helper to test reactive forms
export function updateFormField(
  fixture: ComponentFixture<any>,
  controlName: string,
  value: any
): void {
  const input = fixture.debugElement.query(By.css(\`[formControlName="\${controlName}"]\`))
    || fixture.debugElement.query(By.css(\`[name="\${controlName}"]\`));

  if (input) {
    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  }
}
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

  private generateManifest() {
    const { name, description } = this.context;
    return `{
  "name": "${name}",
  "short_name": "${name.replace(/\s+/g, '')}",
  "description": "${description || 'Angular CLI application'}",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1976d2",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "screenshots": [
    {
      "src": "assets/screenshots/desktop-screenshot.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "assets/screenshots/mobile-screenshot.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}`;
  }

  private generateNgswConfig() {
    return `{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|jpeg|png|gif|webp|ico|woff2?|ttf|otf)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1d",
        "strategy": "freshness"
      }
    }
  ],
  "hsts": {
    "max-age": 31536000,
    "includeSubdomains": true,
    "preload": true
  },
  "navigationUrls": [
    "/",
    "/home",
    "/about"
  ],
  "customHeaders": [
    {
      "source": "**/*.?(eot|otf|ttf|woff|woff2)",
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ]
}`;
  }

  private generateAppShell() {
    return `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { OfflineService } from '../services/offline.service';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  template: \`
    <div class="app-shell-container">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <mat-progress-spinner
          [diameter]="100"
          [strokeWidth]="4"
          mode="indeterminate"
        ></mat-progress-spinner>
        <p class="loading-text">Loading application...</p>
      </div>

      <!-- Skeleton Screens -->
      <div *ngIf="!loading && !isOnline" class="skeleton-container">
        <mat-card class="skeleton-card">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          <div class="skeleton-content">
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </mat-card>

        <div class="offline-banner">
          <mat-icon>wifi_off</mat-icon>
          <span>You're offline. Some features may not be available.</span>
          <button mat-raised-button color="primary" (click)="retry()">
            Retry
          </button>
        </div>
      </div>

      <!-- Actual Content -->
      <div *ngIf="!loading" class="app-content">
        <ng-content></ng-content>
      </div>
    </div>
  \`,
  styles: [\`
    .app-shell-container {
      min-height: 100vh;
      position: relative;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .loading-text {
      margin-top: 16px;
      color: #666;
      font-size: 16px;
    }

    .skeleton-container {
      padding: 20px;
      background-color: #f9f9f9;
    }

    .skeleton-card {
      margin-bottom: 20px;
    }

    .skeleton-content {
      padding: 16px;
    }

    .skeleton-text {
      height: 16px;
      background-color: #e0e0e0;
      margin-bottom: 8px;
      border-radius: 4px;
      animation: skeleton-loading 1s infinite ease-in-out;
    }

    .skeleton-text:nth-child(1) {
      width: 60%;
    }

    .skeleton-text:nth-child(2) {
      width: 80%;
    }

    .skeleton-text:nth-child(3) {
      width: 40%;
    }

    @keyframes skeleton-loading {
      0% {
        background-color: #e0e0e0;
      }
      50% {
        background-color: #f0f0f0;
      }
      100% {
        background-color: #e0e0e0;
      }
    }

    .offline-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .offline-banner mat-icon {
      color: #e67e22;
    }

    .offline-banner span {
      flex: 1;
      color: #856404;
    }

    .app-content {
      min-height: 100vh;
    }
  \`]
})
export class AppShellComponent implements OnInit {
  loading = true;
  isOnline = true;

  constructor(private offlineService: OfflineService) {}

  ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.loading = false;
    }, 1500);

    // Listen to online/offline status
    this.offlineService.online$.subscribe(status => {
      this.isOnline = status;
    });
  }

  retry(): void {
    this.loading = true;
    window.location.reload();
  }
}
`;
  }

  private generateOfflineService() {
    return `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  private requestsQueue: Array<{
    url: string;
    options: RequestInit;
    resolve: (value: Response | PromiseLike<Response>) => void;
    reject: (reason?: any) => void;
  }> = [];

  online$: Observable<boolean> = this.onlineSubject.asObservable();
  offline$: Observable<boolean> = this.online$.pipe(map(isOnline => !isOnline));

  constructor() {
    // Listen to online/offline events
    window.addEventListener('online', () => {
      this.handleOnline();
    });

    window.addEventListener('offline', () => {
      this.handleOffline();
    });

    // Check initial status
    this.checkConnection();
  }

  private checkConnection(): void {
    if (!navigator.onLine) {
      this.handleOffline();
    } else {
      this.handleOnline();
    }
  }

  private handleOnline(): void {
    this.onlineSubject.next(true);
    console.log('App is online');

    // Process queued requests
    this.processQueue();
  }

  private handleOffline(): void {
    this.onlineSubject.next(false);
    console.log('App is offline');

    // Show offline notification if implemented
    this.showOfflineNotification();
  }

  isOnline(): boolean {
    return this.onlineSubject.value;
  }

  isOffline(): boolean {
    return !this.onlineSubject.value;
  }

  showOfflineNotification(): void {
    // Create and show offline notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('You\'re offline', {
        body: 'Some features may not be available until you reconnect.',
        icon: '/assets/icons/icon-192x192.png'
      });
    }
  }

  requestWithRetry(url: string, options: RequestInit = {}): Promise<Response> {
    if (this.isOnline()) {
      return this.fetchWithTimeout(url, options);
    } else {
      return new Promise((resolve, reject) => {
        this.requestsQueue.push({
          url,
          options,
          resolve,
          reject
        });
      });
    }
  }

  private fetchWithTimeout(url: string, options: RequestInit, timeout = 5000): Promise<Response> {
    return Promise.race([
      fetch(url, options),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      })
    ]);
  }

  private async processQueue(): Promise<void> {
    const queue = [...this.requestsQueue];
    this.requestsQueue = [];

    for (const request of queue) {
      try {
        const response = await this.fetchWithTimeout(request.url, request.options);
        request.resolve(response);
      } catch (error) {
        request.reject(error);

        // If request fails, re-queue it
        if (this.isOffline()) {
          this.requestsQueue.push(request);
        }
      }
    }
  }

  getQueuedRequestsCount(): number {
    return this.requestsQueue.length;
  }

  clearQueue(): void {
    this.requestsQueue = [];
  }
}
`;

  private generateCustomValidators() {
    return `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

/**
 * Password strength validator
 * Checks for at least 8 characters, one uppercase, one lowercase, one number, and one special character
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumber = /[0-9]/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isValidLength = control.value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

    return passwordValid ? null : {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isValidLength
      }
    };
  };
}

/**
 * Email domain validator
 * Validates that email is from a specific domain
 */
export function emailDomainValidator(allowedDomains: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const email = control.value;
    const domain = email.split('@')[1];

    if (!domain) return null;

    const isValidDomain = allowedDomains.some(allowed =>
      domain.toLowerCase() === allowed.toLowerCase()
    );

    return isValidDomain ? null : {
      emailDomain: {
        allowedDomains,
        actualDomain: domain
      }
    };
  };
}

/**
 * Username availability async validator
 * Checks if username is available (mock implementation)
 */
export function usernameAvailabilityValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    // Simulate API call with debounce
    return of(control.value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(username => {
        // Mock API check - replace with actual API call
        const isAvailable = username !== 'admin' && username !== 'user' && username.length >= 3;
        return of(isAvailable ? null : { usernameTaken: true });
      })
    );
  };
}

/**
 * Confirm password validator
 * Ensures password and confirm password match
 */
export function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  return (confirmControl: AbstractControl): ValidationErrors | null => {
    if (!confirmControl.value) return null;

    const password = passwordControl.value;
    const confirmPassword = confirmControl.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

/**
 * File type validator
 * Validates file type based on allowed extensions
 */
export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    if (control.value instanceof File) {
      const file = control.value as File;
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (!extension || !allowedTypes.includes(extension)) {
        return { invalidFileType: { allowedTypes, actualType: extension } };
      }
    }

    return null;
  };
}

/**
 * Phone number format validator
 * Validates phone number format (supports various formats)
 */
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    // Remove all non-digit characters
    const phoneNumber = control.value.replace(/\\D/g, '');

    // Basic validation: must be 10 digits (US format)
    const isValidLength = phoneNumber.length === 10;
    const isValidPattern = /^\\d{10}$/.test(phoneNumber);

    return isValidLength && isValidPattern ? null : { invalidPhoneNumber: true };
  };
}

/**
 * Date range validator
 * Validates that end date is after start date
 */
export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return end > start ? null : { invalidDateRange: true };
  };
}

/**
 * Custom async validator that combines multiple validators
 */
export function composeAsyncValidators(validators: ValidatorFn[]): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!validators.length) return of(null);

    const observables = validators.map(validator => {
      const result = validator(control);
      return result instanceof Observable ? result : of(result);
    });

    // Combine all async validator results
    return of(observables).pipe(
      switchMap(validatorObs => {
        // This is a simplified implementation
        // In a real app, you might want to use forkJoin or combineLatest
        return of(null);
      })
    );
  };
}

/**
 * Required field validator with custom message
 */
export function requiredValidator(message: string = 'This field is required'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value ? null : { required: message };
  };
}

/**
 * Minimum length validator
 */
export function minLengthValidator(min: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length >= min
      ? null
      : {
          minLength: {
            requiredLength: min,
            actualLength: control.value?.length || 0,
            message: message || \`Minimum length is \${min} characters\`
          }
        };
  };
}

/**
 * Maximum length validator
 */
export function maxLengthValidator(max: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length <= max
      ? null
      : {
          maxLength: {
            requiredLength: max,
            actualLength: control.value?.length || 0,
            message: message || \`Maximum length is \${max} characters\`
          }
        };
  };
}

/**
 * Pattern validator
 */
export function patternValidator(pattern: RegExp, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    return pattern.test(control.value)
      ? null
      : {
          pattern: {
            requiredPattern: pattern.toString(),
            actualValue: control.value,
            message: message || 'Invalid format'
          }
        };
  };
}`;
  }

  private generateFormUtils() {
    return `import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

/**
 * Form state helper functions
 */
export class FormStateHelper {
  static markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }

      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      }
    });
  }

  static markFormGroupPristine(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsPristine();

      if (control instanceof FormGroup) {
        this.markFormGroupPristine(control);
      }

      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupPristine(arrayControl);
          } else {
            arrayControl.markAsPristine();
          }
        });
      }
    });
  }

  static resetForm(formGroup: FormGroup, confirmCallback?: () => void): void {
    if (confirmCallback) {
      confirmCallback();
    }
    formGroup.reset();
    this.markFormGroupPristine(formGroup);
  }

  static hasError(formControl: AbstractControl, errorType: string): boolean {
    return formControl.invalid && formControl.errors && formControl.errors[errorType];
  }

  static isDirtyAndValid(formControl: AbstractControl): boolean {
    return formControl.dirty && formControl.valid;
  }

  static isDirtyAndInvalid(formControl: AbstractControl): boolean {
    return formControl.dirty && formControl.invalid;
  }

  static isTouchedAndInvalid(formControl: AbstractControl): boolean {
    return formControl.touched && formControl.invalid;
  }

  static getErrorMessage(formControl: AbstractControl, customMessages?: { [key: string]: string }): string {
    if (!formControl.errors || formControl.pristine) return '';

    const errors = formControl.errors;
    const firstErrorKey = Object.keys(errors)[0];

    // Custom messages take precedence
    if (customMessages && customMessages[firstErrorKey]) {
      return customMessages[firstErrorKey];
    }

    // Default error messages
    switch (firstErrorKey) {
      case 'required':
        return 'This field is required';
      case 'email':
        return 'Please enter a valid email address';
      case 'minlength':
        return \`Minimum length is \${errors['minlength'].requiredLength} characters\`;
      case 'maxlength':
        return \`Maximum length is \${errors['maxlength'].requiredLength} characters\`;
      case 'pattern':
        return 'Invalid format';
      case 'passwordStrength':
        const strength = errors['passwordStrength'];
        const messages = [];
        if (!strength.hasUpperCase) messages.push('one uppercase letter');
        if (!strength.hasLowerCase) messages.push('one lowercase letter');
        if (!strength.hasNumber) messages.push('one number');
        if (!strength.hasSpecialChar) messages.push('one special character');
        if (!strength.isValidLength) messages.push('at least 8 characters');
        return \`Password must contain: \${messages.join(', ')}\`;
      case 'emailDomain':
        return \`Email domain must be one of: \${errors['emailDomain'].allowedDomains.join(', ')}\`;
      case 'usernameTaken':
        return 'This username is already taken';
      case 'passwordMismatch':
        return 'Passwords do not match';
      case 'invalidFileType':
        return \`Invalid file type. Allowed types: \${errors['invalidFileType'].allowedTypes.join(', ')}\`;
      case 'invalidPhoneNumber':
        return 'Please enter a valid phone number';
      case 'invalidDateRange':
        return 'End date must be after start date';
      default:
        return 'Invalid value';
    }
  }
}

/**
 * Auto-save functionality
 */
export class AutoSaveService {
  private subscription: Subscription | null = null;
  private debounceTime = 2000; // 2 seconds

  constructor(private saveCallback: (formValue: any) => void) {}

  setupAutoSave(formGroup: FormGroup): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = formGroup.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe(value => {
        if (formGroup.valid) {
          this.saveCallback(value);
        }
      });
  }

  updateDebounceTime(time: number): void {
    this.debounceTime = time;
  }

  cleanup(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

/**
 * Form validation helper
 */
export class FormValidationHelper {
  static validateOnSubmit(formGroup: FormGroup): boolean {
    FormStateHelper.markFormGroupTouched(formGroup);
    return formGroup.valid;
  }

  static validateField(control: AbstractControl): void {
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  static getInvalidFields(formGroup: FormGroup): string[] {
    const invalidFields: string[] = [];

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        if (control.invalid && control.touched) {
          invalidFields.push(key);
        }
      } else if (control instanceof FormGroup) {
        const nestedInvalidFields = this.getInvalidFields(control);
        nestedInvalidFields.forEach(field => invalidFields.push(\`\${key}.\${field}\`));
      }
    });

    return invalidFields;
  }

  static getFieldControl(formGroup: FormGroup, path: string): AbstractControl | null {
    try {
      return formGroup.get(path);
    } catch (e) {
      console.warn(\`Invalid form path: \${path}\`);
      return null;
    }
  }

  static setFieldError(control: AbstractControl, errorType: string, errorValue: any = true): void {
    control.setErrors({ ...control.errors, [errorType]: errorValue });
    control.markAsDirty();
    control.markAsTouched();
  }

  static clearFieldError(control: AbstractControl, errorType: string): void {
    if (control.errors && control.errors[errorType]) {
      const errors = { ...control.errors };
      delete errors[errorType];

      if (Object.keys(errors).length === 0) {
        control.setErrors(null);
      } else {
        control.setErrors(errors);
      }
    }
  }
}

/**
 * Form utilities export
 */
export const FormUtils = {
  ...FormStateHelper,
  ...FormValidationHelper,
  AutoSaveService
};`;
  }

  private generateDynamicFormService() {
    return `import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FormField {
  key: string;
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'password';
  label: string;
  placeholder?: string;
  required?: boolean;
  validators?: any[];
  asyncValidators?: any[];
  options?: { value: any; label: string }[];
  defaultValue?: any;
  hidden?: boolean;
  disabled?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  helpText?: string;
  order?: number;
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  cancelText?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private fb = inject(FormBuilder);

  /**
   * Create form group from JSON configuration
   */
  createForm(config: FormConfig): FormGroup {
    const group: { [key: string]: AbstractControl } = {};

    config.fields
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .forEach(field => {
        if (!field.hidden) {
          const validators = this.buildValidators(field);
          const asyncValidators = this.buildAsyncValidators(field);

          group[field.key] = new FormControl(
            field.defaultValue || '',
            { validators, asyncValidators }
          );
        }
      });

    return this.fb.group(group);
  }

  /**
   * Build validators for a field
   */
  private buildValidators(field: FormField): any[] {
    const validators: any[] = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }

    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }

    if (field.min !== undefined) {
      validators.push(Validators.min(field.min));
    }

    if (field.max !== undefined) {
      validators.push(Validators.max(field.max));
    }

    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }

    // Add custom validators
    if (field.validators) {
      validators.push(...field.validators);
    }

    return validators;
  }

  /**
   * Build async validators for a field
   */
  private buildAsyncValidators(field: FormField): any[] {
    if (!field.asyncValidators) return [];

    return field.asyncValidators.map(validator => {
      if (typeof validator === 'function') {
        return validator;
      }
      return validator;
    });
  }

  /**
   * Get form field configuration
   */
  getFieldConfig(field: FormField, control: AbstractControl): any {
    const hasError = control.invalid && control.touched;
    const errors = control.errors || {};

    return {
      ...field,
      control,
      hasError,
      errors,
      value: control.value
    };
  }

  /**
   * Update form fields dynamically
   */
  updateFields(formGroup: FormGroup, fields: FormField[]): void {
    // Remove fields that are no longer in the config
    Object.keys(formGroup.controls).forEach(key => {
      if (!fields.find(f => f.key === key && !f.hidden)) {
        formGroup.removeControl(key);
      }
    });

    // Add or update fields
    fields.forEach(field => {
      if (!field.hidden) {
        if (!formGroup.get(field.key)) {
          const validators = this.buildValidators(field);
          const asyncValidators = this.buildAsyncValidators(field);

          formGroup.addControl(field.key, new FormControl(
            field.defaultValue || '',
            { validators, asyncValidators }
          ));
        } else {
          // Update existing field
          const control = formGroup.get(field.key) as FormControl;
          control.setValue(field.defaultValue || '');

          // Update validators
          this.updateValidators(control, field);
        }
      } else {
        // Hide field by removing it
        formGroup.removeControl(field.key);
      }
    });
  }

  /**
   * Update field validators
   */
  private updateValidators(control: FormControl, field: FormField): void {
    const validators = this.buildValidators(field);
    const asyncValidators = this.buildAsyncValidators(field);

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  /**
   * Validate form
   */
  validateForm(formGroup: FormGroup): boolean {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
    return formGroup.valid;
  }

  /**
   * Reset form
   */
  resetForm(formGroup: FormGroup, config?: FormConfig): void {
    if (config) {
      config.fields.forEach(field => {
        const control = formGroup.get(field.key);
        if (control) {
          control.setValue(field.defaultValue || '');
        }
      });
    } else {
      formGroup.reset();
    }

    Object.values(formGroup.controls).forEach(control => {
      control.markAsPristine();
      control.markAsUntouched();
    });
  }

  /**
   * Get form data as object
   */
  getFormData(formGroup: FormGroup): any {
    return formGroup.value;
  }

  /**
   * Set form data
   */
  setFormData(formGroup: FormGroup, data: any): void {
    formGroup.patchValue(data);
    formGroup.markAsPristine();
  }

  /**
   * Create form template configuration
   */
  createFormTemplate(config: FormConfig): { [key: string]: any } {
    const template: { [key: string]: any } = {
      title: config.title,
      description: config.description,
      layout: config.layout || 'vertical',
      fields: [],
      submitText: config.submitText || 'Submit',
      cancelText: config.cancelText || 'Cancel'
    };

    config.fields
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .forEach(field => {
        if (!field.hidden) {
          template.fields.push({
            ...field,
            type: field.type,
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
            options: field.options,
            helpText: field.helpText
          });
        }
      });

    return template;
  }

  /**
   * Transform form data before submission
   */
  transformFormData(formGroup: FormGroup, transformers?: { [key: string]: (value: any) => any }): any {
    const formData = this.getFormData(formGroup);

    if (transformers) {
      Object.keys(transformers).forEach(key => {
        if (formData.hasOwnProperty(key)) {
          formData[key] = transformers[key](formData[key]);
        }
      });
    }

    return formData;
  }

  /**
   * Validate conditional fields
   */
  validateConditionalFields(formGroup: FormGroup, conditions: { [key: string]: (value: any) => boolean }): void {
    Object.keys(conditions).forEach(fieldKey => {
      const condition = conditions[fieldKey];
      const control = formGroup.get(fieldKey);

      if (control) {
        // Update visibility based on condition
        const shouldShow = condition(control.value);

        if (shouldShow && !formGroup.get(fieldKey)) {
          // Add field if it doesn't exist
          formGroup.addControl(fieldKey, new FormControl(''));
        } else if (!shouldShow && formGroup.get(fieldKey)) {
          // Remove field if it exists
          formGroup.removeControl(fieldKey);
        }
      }
    });
  }

  /**
   * Create validation schema from form config
   */
  createValidationSchema(config: FormConfig): { [key: string]: any } {
    const schema: { [key: string]: any } = {};

    config.fields.forEach(field => {
      if (!field.hidden) {
        schema[field.key] = {};

        if (field.required) {
          schema[field.key].required = true;
        }

        if (field.minLength) {
          schema[field.key].minLength = field.minLength;
        }

        if (field.maxLength) {
          schema[field.key].maxLength = field.maxLength;
        }

        if (field.pattern) {
          schema[field.key].pattern = field.pattern;
        }

        if (field.validators) {
          schema[field.key].custom = field.validators;
        }
      }
    });

    return schema;
  }
}`;
  }

  private generateUserFormComponent() {
    return `import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordStrengthValidator } from '../../validators/custom.validators';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isSubmitting = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  passwordStrength = signal(0);
  supportedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$')
      ], [
        // Async validator for username availability
        this.usernameAvailabilityValidator.bind(this)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$')
      ]],
      emailDomain: ['', [
        Validators.required,
        this.emailDomainValidator(this.supportedDomains)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        PasswordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [
        Validators.required,
        this.phoneNumberValidator()
      ]],
      birthDate: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });

    // Subscribe to password changes for strength indicator
    this.userForm.get('password')?.valueChanges.subscribe(() => {
      this.updatePasswordStrength();
    });
  }

  ngOnInit(): void {
    // Initialize with default values if needed
    this.resetForm();
  }

  /**
   * Username availability async validator
   */
  usernameAvailabilityValidator(control: AbstractControl) {
    if (!control.value) return of(null);

    // Simulate API call
    return of(control.value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(username => {
        const isAvailable = username !== 'admin' && username !== 'user';
        return isAvailable ? null : { usernameTaken: true };
      })
    );
  }

  /**
   * Email domain validator
   */
  emailDomainValidator(allowedDomains: string[]) {
    return (control: AbstractControl) => {
      if (!control.value) return null;

      const email = control.value;
      const domain = email.split('@')[1];

      if (!domain) return null;

      const isValid = allowedDomains.some(allowed =>
        domain.toLowerCase() === allowed.toLowerCase()
      );

      return isValid ? null : { emailDomain: { allowedDomains, actualDomain: domain } };
    };
  }

  /**
   * Phone number validator
   */
  phoneNumberValidator() {
    return (control: AbstractControl) => {
      if (!control.value) return null;

      const phone = control.value.replace(/\\\\D/g, '');
      const isValid = /^\\\\d{10}$/.test(phone);

      return isValid ? null : { invalidPhone: true };
    };
  }

  /**
   * Password match validator
   */
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Update password strength
   */
  updatePasswordStrength(): void {
    const password = this.userForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    this.passwordStrength.set(strength);
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    if (!FormUtils.validateOnSubmit(this.userForm)) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      const formData = this.userForm.value;

      // Process form data
      const userData = {
        ...formData,
        fullName: \`\${formData.firstName} \${formData.lastName}\`,
        registeredAt: new Date().toISOString()
      };

      console.log('User submitted data:', userData);

      // Show success message
      this.snackBar.open('User created successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      // Redirect or navigate
      this.router.navigate(['/dashboard']);

      this.isSubmitting.set(false);
    }, 2000);
  }

  /**
   * Reset form
   */
  resetForm(): void {
    const confirmed = window.confirm('Are you sure you want to reset all form data?');
    if (confirmed) {
      FormUtils.resetForm(this.userForm);
      this.passwordStrength.set(0);
    }
  }

  /**
   * Cancel form
   */
  cancel(): void {
    this.router.navigate(['/']);
  }

  /**
   * Get field error message
   */
  getFieldError(fieldName: string): string {
    const control = this.userForm.get(fieldName);
    return FormUtils.getErrorMessage(control);
  }

  /**
   * Check if field has specific error
   */
  hasFieldError(fieldName: string, errorType: string): boolean {
    const control = this.userForm.get(fieldName);
    return FormUtils.hasError(control, errorType);
  }

  /**
   * Check if form field is dirty and valid
   */
  isFieldValid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return control?.valid && control?.dirty;
  }

  /**
   * Get password strength text
   */
  getPasswordStrengthText(): string {
    const strength = this.passwordStrength();
    if (strength <= 20) return 'Very Weak';
    if (strength <= 40) return 'Weak';
    if (strength <= 60) return 'Fair';
    if (strength <= 80) return 'Good';
    return 'Strong';
  }

  /**
   * Get password strength color
   */
  getPasswordStrengthColor(): string {
    const strength = this.passwordStrength();
    if (strength <= 20) return '#f44336';
    if (strength <= 40) return '#ff9800';
    if (strength <= 60) return '#ffc107';
    if (strength <= 80) return '#4caf50';
    return '#4caf50';
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }
}`;
  }

  private generateLoginFormComponent() {
    return `import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, timer, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = signal(false);
  isLoading = signal(false);
  loginFailed = signal(false);
  errorMessage = signal('');
  rememberMe = signal(false);
  showPassword = signal(false);
  loginAttempts = signal(0);
  lockoutTime = signal(0);
  isLockedOut = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }

    // Load saved credentials if remember me is checked
    const savedUsername = localStorage.getItem('remembered_username');
    if (savedUsername) {
      this.loginForm.patchValue({
        username: savedUsername,
        rememberMe: true
      });
      this.rememberMe.set(true);
    }

    // Set up login attempts counter
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginFailed()) {
        this.loginFailed.set(false);
        this.errorMessage.set('');
      }
    });
  }

  /**
   * Submit login form
   */
  onSubmit(): void {
    if (!FormUtils.validateOnSubmit(this.loginForm)) {
      return;
    }

    // Check if account is locked out
    if (this.isLockedOut()) {
      const remainingTime = Math.ceil(this.lockoutTime() / 1000);
      this.errorMessage.set(\`Account locked. Try again in \${remainingTime} seconds.\`);
      return;
    }

    this.isSubmitting.set(true);
    this.isLoading.set(true);

    // Simulate API call with loading state
    timer(1000).pipe(
      switchMap(() => this.authenticateUser(this.loginForm.value)),
      catchError(error => {
        this.isSubmitting.set(false);
        this.isLoading.set(false);
        return of(null);
      })
    ).subscribe(result => {
      this.isSubmitting.set(false);
      this.isLoading.set(false);

      if (result) {
        // Authentication successful
        this.handleSuccessfulLogin(result);
      } else {
        // Authentication failed
        this.handleFailedLogin();
      }
    });
  }

  /**
   * Simulate user authentication
   */
  private authenticateUser(credentials: any): Observable<any> {
    return timer(1500).pipe(
      switchMap(() => {
        // Mock authentication logic
        const { username, password } = credentials;

        // Mock valid credentials
        const validCredentials = [
          { username: 'admin', password: 'admin123' },
          { username: 'user', password: 'user123' },
          { username: 'demo', password: 'demo123' }
        ];

        const isValid = validCredentials.some(cred =>
          cred.username === username && cred.password === password
        );

        if (isValid) {
          return of({
            username,
            token: 'mock-jwt-token-' + Date.now(),
            expiresIn: 3600, // 1 hour
            role: username === 'admin' ? 'admin' : 'user'
          });
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(error => {
        this.handleFailedLogin();
        throw error;
      })
    );
  }

  /**
   * Handle successful login
   */
  private handleSuccessfulLogin(authResult: any): void {
    // Store token
    localStorage.setItem('auth_token', authResult.token);
    localStorage.setItem('user_role', authResult.role);

    // Handle remember me
    if (this.rememberMe()) {
      localStorage.setItem('remembered_username', this.loginForm.get('username')?.value);
    } else {
      localStorage.removeItem('remembered_username');
    }

    // Reset login attempts
    this.loginAttempts.set(0);
    this.isLockedOut.set(false);
    this.lockoutTime.set(0);

    // Show success message
    this.snackBar.open('Login successful!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });

    // Redirect to dashboard
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handle failed login
   */
  private handleFailedLogin(): void {
    this.loginAttempts.update(attempts => attempts + 1);

    if (this.loginAttempts() >= 3) {
      // Lock account for 30 seconds
      this.isLockedOut.set(true);
      this.lockoutTime.set(Date.now() + 30000);

      // Start countdown
      this.startLockoutCountdown();

      this.errorMessage.set('Too many failed attempts. Account locked for 30 seconds.');
    } else {
      this.errorMessage.set(\`Invalid credentials. \${3 - this.loginAttempts()} attempts remaining.\`);
      this.loginFailed.set(true);
    }
  }

  /**
   * Start lockout countdown
   */
  private startLockoutCountdown(): void {
    const checkLockout = () => {
      const remaining = 30000 - (Date.now() - this.lockoutTime());

      if (remaining <= 0) {
        this.isLockedOut.set(false);
        this.lockoutTime.set(0);
        this.loginAttempts.set(0);
      } else {
        setTimeout(checkLockout, 1000);
      }
    };

    checkLockout();
  }

  /**
   * Check if form is ready for submission
   */
  canSubmit(): boolean {
    return this.loginForm.valid &&
           !this.isSubmitting() &&
           !this.isLockedOut() &&
           !this.isLoading();
  }

  /**
   * Get form field control
   */
  getField(fieldName: string): AbstractControl | null {
    return this.loginForm.get(fieldName);
  }

  /**
   * Get field error message
   */
  getFieldError(fieldName: string): string {
    const control = this.getField(fieldName);
    return FormUtils.getErrorMessage(control);
  }

  /**
   * Check if field has specific error
   */
  hasFieldError(fieldName: string, errorType: string): boolean {
    const control = this.getField(fieldName);
    return FormUtils.hasError(control, errorType);
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  /**
   * Navigate to forgot password
   */
  forgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  /**
   * Navigate to register
   */
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.loginForm.reset();
    this.rememberMe.set(false);
    this.loginFailed.set(false);
    this.errorMessage.set('');
  }
}`;
  }

  private generateSearchFormComponent() {
    return `import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  searchResults = signal<any[]>([]);
  isLoading = signal(false);
  searchQuery = signal('');
  selectedCategory = signal('all');
  sortBy = signal('relevance');
  currentPage = signal(1);
  totalPages = signal(0);
  totalResults = signal(0);
  recentSearches = signal<string[]>([]);

  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'articles', label: 'Articles' },
    { value: 'videos', label: 'Videos' },
    { value: 'products', label: 'Products' },
    { value: 'users', label: 'Users' }
  ];

  sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' }
  ];

  searchResults$ = new Observable<any>();

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      category: ['all'],
      sortBy: ['relevance'],
      useFilters: [true],
      dateRange: [null],
      priceRange: [null]
    });

    // Initialize with recent searches
    this.loadRecentSearches();
  }

  ngOnInit(): void {
    // Set up search subscription with debouncing
    this.searchResults$ = this.searchForm.get('query')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(query => {
        this.searchQuery.set(query);
        this.currentPage.set(1);

        // Add to recent searches if query is not empty
        if (query && query.length >= 2) {
          this.addToRecentSearches(query);
        }
      }),
      switchMap(query => {
        if (!query || query.length < 2) {
          this.searchResults.set([]);
          this.totalResults.set(0);
          return of([]);
        }

        this.isLoading.set(true);
        return this.performSearch(query, this.currentPage(), this.selectedCategory(), this.sortBy());
      })
    ) as Observable<any>;
  }

  /**
   * Perform search with API call
   */
  performSearch(query: string, page: number = 1, category: string = 'all', sort: string = 'relevance'): Observable<any[]> {
    // Simulate API call
    return of(query).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(() => {
        // Mock search results
        return timer(500).pipe(
          map(() => {
            const mockResults = this.generateMockResults(query, page, category);
            return {
              results: mockResults,
              total: this.calculateTotalResults(query, category),
              page,
              totalPages: Math.ceil(this.calculateTotalResults(query, category) / 10)
            };
          })
        );
      }),
      tap(result => {
        this.isLoading.set(false);
        this.searchResults.set(result.results);
        this.totalResults.set(result.total);
        this.totalPages.set(result.totalPages);
        this.currentPage.set(page);
      })
    );
  }

  /**
   * Generate mock search results
   */
  private generateMockResults(query: string, page: number, category: string): any[] {
    const results = [];
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    for (let i = startIndex; i < endIndex; i++) {
      results.push({
        id: i + 1,
        title: \`\${query} Result #\${i + 1}\`,
        description: \`This is a mock result for search query "\${query}". It demonstrates how search results would appear in a real application.\`,
        category: category !== 'all' ? category : 'article',
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        relevance: Math.random() * 100,
        thumbnail: \`https://picsum.photos/200/150?random=\${i}\`,
        url: \`/result/\${i + 1}\`,
        author: \`Author \${i % 5 + 1}\`,
        tags: [query, 'mock', 'search', 'angular']
      });
    }

    return results;
  }

  /**
   * Calculate total results (mock)
   */
  private calculateTotalResults(query: string, category: string): number {
    const baseCount = Math.floor(Math.random() * 1000) + 100;
    const categoryMultiplier = category !== 'all' ? 0.7 : 1;
    return Math.floor(baseCount * categoryMultiplier);
  }

  /**
   * Handle search form submission
   */
  onSearchSubmit(): void {
    if (!FormUtils.validateOnSubmit(this.searchForm)) {
      return;
    }

    const query = this.searchForm.get('query')?.value;
    const category = this.searchForm.get('category')?.value;
    const sort = this.searchForm.get('sortBy')?.value;

    this.performSearch(query, 1, category, sort).subscribe();
  }

  /**
   * Handle pagination
   */
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }

    this.currentPage.set(page);
    const query = this.searchQuery();
    const category = this.selectedCategory();
    const sort = this.sortBy();

    this.performSearch(query, page, category, sort).subscribe();
  }

  /**
   * Change category
   */
  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);

    // Re-search with new category
    if (this.searchQuery()) {
      this.performSearch(this.searchQuery(), 1, category, this.sortBy()).subscribe();
    }
  }

  /**
   * Change sort option
   */
  onSortChange(sort: string): void {
    this.sortBy.set(sort);

    // Re-search with new sort option
    if (this.searchQuery()) {
      this.performSearch(this.searchQuery(), this.currentPage(), this.selectedCategory(), sort).subscribe();
    }
  }

  /**
   * Load recent searches from localStorage
   */
  private loadRecentSearches(): void {
    const searches = localStorage.getItem('recent_searches');
    if (searches) {
      this.recentSearches.set(JSON.parse(searches));
    }
  }

  /**
   * Add to recent searches
   */
  private addToRecentSearches(query: string): void {
    const searches = [...this.recentSearches()];

    // Remove if already exists
    const index = searches.indexOf(query);
    if (index > -1) {
      searches.splice(index, 1);
    }

    // Add to beginning
    searches.unshift(query);

    // Keep only last 10 searches
    if (searches.length > 10) {
      searches.pop();
    }

    this.recentSearches.set(searches);
    localStorage.setItem('recent_searches', JSON.stringify(searches));
  }

  /**
   * Clear recent searches
   */
  clearRecentSearches(): void {
    this.recentSearches.set([]);
    localStorage.removeItem('recent_searches');
  }

  /**
   * Use recent search
   */
  useRecentSearch(query: string): void {
    this.searchForm.patchValue({
      query
    });

    // Trigger search
    this.onSearchSubmit();
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchForm.patchValue({
      query: '',
      category: 'all',
      sortBy: 'relevance'
    });

    this.searchResults.set([]);
    this.totalResults.set(0);
    this.currentPage.set(1);
  }

  /**
   * Export search results
   */
  exportResults(): void {
    const results = this.searchResults();

    // Create CSV content
    const headers = ['ID', 'Title', 'Category', 'Date', 'Author'];
    const csvContent = [
      headers.join(','),
      ...results.map(result => [
        result.id,
        \`"\${result.title}"\`,
        result.category,
        result.date.toISOString().split('T')[0],
        \`"\${result.author}"\`
      ].join(','))
    ].join('\\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', \`search-results-\${new Date().toISOString().split('T')[0]}.csv\`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Share search results
   */
  shareResults(): void {
    const results = this.searchResults();
    const query = this.searchQuery();

    if (navigator.share) {
      navigator.share({
        title: \`Search Results for "\${query}"\`,
        text: \`Found \${results.length} results for "\${query}"\`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      const shareText = \`Search Results for "\${query}": \${window.location.href}\`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Search results link copied to clipboard!');
      });
    }
  }

  /**
   * Get field control
   */
  getField(fieldName: string): FormControl | null {
    return this.searchForm.get(fieldName) as FormControl;
  }

  /**
   * Check if field is valid
   */
  isFieldValid(fieldName: string): boolean {
    const control = this.getField(fieldName);
    return control?.valid && control?.dirty;
  }

  /**
   * Get field error message
   */
  getFieldError(fieldName: string): string {
    const control = this.getField(fieldName);
    return FormUtils.getErrorMessage(control);
  }
}`;
  }

  private generateFormExamplesModule() {
    return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserFormComponent } from '../components/user-form/user-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SearchFormComponent } from '../components/search-form/search-form.component';

const ROUTES = [
  {
    path: 'user-form',
    component: UserFormComponent,
    data: {
      title: 'User Registration Form',
      description: 'Comprehensive form with validation, async validation, and password strength indicator'
    }
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    data: {
      title: 'Login Form',
      description: 'Login form with authentication, error handling, and account lockout protection'
    }
  },
  {
    path: 'search-form',
    component: SearchFormComponent,
    data: {
      title: 'Search Form',
      description: 'Search form with debouncing, pagination, and recent searches'
    }
  }
];

@NgModule({
  declarations: [
    UserFormComponent,
    LoginFormComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  exports: [
    UserFormComponent,
    LoginFormComponent,
    SearchFormComponent
  ]
})
export class FormExamplesModule { }
`;
  }

  private generateUserFormTemplate() {
    return `<div class="user-form-container">
  <mat-card class="form-card">
    <mat-card-header>
      <mat-card-title>User Registration</mat-card-title>
      <mat-card-subtitle>Create a new account</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="user-form">

        <!-- Username Field -->
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" placeholder="Enter username">
          <mat-icon matSuffix>person</mat-icon>
          <mat-error *ngIf="hasFieldError('username', 'required')">Username is required</mat-error>
          <mat-error *ngIf="hasFieldError('username', 'minlength')">Username must be at least 3 characters</mat-error>
          <mat-error *ngIf="hasFieldError('username', 'maxlength')">Username must be no more than 20 characters</mat-error>
          <mat-error *ngIf="hasFieldError('username', 'pattern')">Username can only contain letters, numbers, and underscores</mat-error>
          <mat-error *ngIf="hasFieldError('username', 'usernameTaken')">This username is already taken</mat-error>
        </mat-form-field>

        <!-- Email Fields -->
        <div class="email-fields">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email Address</mat-label>
            <input matInput formControlName="email" type="email" placeholder="Enter email">
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="hasFieldError('email', 'required')">Email is required</mat-error>
            <mat-error *ngIf="hasFieldError('email', 'email')">Please enter a valid email address</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email Domain (Work)</mat-label>
            <input matInput formControlName="emailDomain" placeholder="@company.com">
            <mat-icon matSuffix>business</mat-icon>
            <mat-error *ngIf="hasFieldError('emailDomain', 'required')">Work email is required</mat-error>
            <mat-error *ngIf="hasFieldError('emailDomain', 'emailDomain')">
              Email domain must be one of: {{ supportedDomains.join(', ') }}
            </mat-error>
          </mat-form-field>
        </div>

        <!-- Password Fields -->
        <div class="password-fields">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" [type]="showPassword() ? 'text' : 'password'"
                   (keyup)="updatePasswordStrength()">
            <mat-icon matSuffix (click)="togglePasswordVisibility()" class="password-toggle">
              {{ showPassword() ? 'visibility_off' : 'visibility' }}
            </mat-icon>
            <mat-hint align="end">
              <mat-progress-bar mode="determinate" [value]="passwordStrength()"
                               [color]="passwordStrength() > 80 ? 'primary' : 'warn'"
                               [class.weak]="passwordStrength() <= 40"
                               [class.medium]="passwordStrength() > 40 && passwordStrength() <= 80">
              </mat-progress-bar>
              <span class="password-strength-text" [ngStyle]="{ color: getPasswordStrengthColor() }">
                {{ getPasswordStrengthText() }}
              </span>
            </mat-hint>
            <mat-error *ngIf="hasFieldError('password', 'required')">Password is required</mat-error>
            <mat-error *ngIf="hasFieldError('password', 'minlength')">Password must be at least 8 characters</mat-error>
            <mat-error *ngIf="hasFieldError('password', 'passwordStrength')">
              Password must contain: uppercase, lowercase, number, special character
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Confirm Password</mat-label>
            <input matInput formControlName="confirmPassword" [type]="showConfirmPassword() ? 'text' : 'password'">
            <mat-icon matSuffix (click)="toggleConfirmPasswordVisibility()" class="password-toggle">
              {{ showConfirmPassword() ? 'visibility_off' : 'visibility' }}
            </mat-icon>
            <mat-error *ngIf="hasFieldError('confirmPassword', 'required')">Please confirm your password</mat-error>
            <mat-error *ngIf="hasFieldError('confirmPassword', 'passwordMismatch')">
              Passwords do not match
            </mat-error>
          </mat-form-field>
        </div>

        <!-- Personal Information -->
        <div class="personal-info">
          <h3>Personal Information</h3>

          <div class="name-fields">
            <mat-form-field appearance="fill" class="half-width">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName">
              <mat-error *ngIf="hasFieldError('firstName', 'required')">First name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="half-width">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName">
              <mat-error *ngIf="hasFieldError('lastName', 'required')">Last name is required</mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="(555) 123-4567">
            <mat-icon matSuffix>phone</mat-icon>
            <mat-error *ngIf="hasFieldError('phone', 'required')">Phone number is required</mat-error>
            <mat-error *ngIf="hasFieldError('phone', 'invalidPhone')">
              Please enter a valid 10-digit phone number
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Birth Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="birthDate">
            <mat-icon matSuffix matDatepickerToggle [for]="picker">event</mat-icon>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="hasFieldError('birthDate', 'required')">Birth date is required</mat-error>
          </mat-form-field>
        </div>

        <!-- Terms and Conditions -->
        <mat-checkbox formControlName="acceptTerms" class="terms-checkbox">
          I agree to the terms and conditions
        </mat-checkbox>
        <mat-error *ngIf="hasFieldError('acceptTerms', 'requiredTrue')">
          You must accept the terms and conditions
        </mat-error>

      </form>
    </mat-card-content>

    <mat-card-actions>
      <button mat-raised-button color="primary" (click)="onSubmit()"
              [disabled]="userForm.invalid || isSubmitting()">
        <mat-icon class="button-icon">person_add</mat-icon>
        Register
      </button>

      <button mat-raised-button color="warn" (click)="resetForm()"
              [disabled]="isSubmitting()">
        <mat-icon class="button-icon">refresh</mat-icon>
        Reset
      </button>

      <button mat-raised-button (click)="cancel()">
        <mat-icon class="button-icon">close</mat-icon>
        Cancel
      </button>
    </mat-card-actions>
  </mat-card>

  <!-- Loading Indicator -->
  <div *ngIf="isSubmitting()" class="loading-overlay">
    <mat-spinner diameter="50" class="loading-spinner"></mat-spinner>
  </div>
</div>`;
  }

  private generateUserFormStyles() {
    return `.user-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--background-color);
}

.form-card {
  max-width: 600px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.half-width {
  width: 50%;
}

.email-fields,
.password-fields {
  margin-bottom: 20px;
}

.name-fields {
  display: flex;
  gap: 16px;
}

.name-fields .half-width:first-child {
  margin-right: 16px;
}

.personal-info {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.personal-info h3 {
  margin-bottom: 16px;
  color: var(--text-color);
}

.password-toggle {
  cursor: pointer;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: var(--accent-color);
}

.mat-progress-bar {
  margin-top: 8px;
}

.password-strength-text {
  margin-left: 8px;
  font-size: 0.875rem;
  font-weight: 500;
}

.terms-checkbox {
  margin: 16px 0;
}

.button-icon {
  margin-right: 8px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  background-color: white;
  padding: 20px;
  border-radius: 50%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .name-fields {
    flex-direction: column;
  }

  .half-width {
    width: 100%;
  }

  .name-fields .half-width:first-child {
    margin-right: 0;
    margin-bottom: 16px;
  }
}`;
  }

  private generateLoginFormTemplate() {
    return `<div class="login-form-container">
  <mat-card class="form-card">
    <mat-card-header>
      <mat-card-title>Login</mat-card-title>
      <mat-card-subtitle>Sign in to your account</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">

        <!-- Username Field -->
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" placeholder="Enter username">
          <mat-icon matSuffix>person</mat-icon>
          <mat-error *ngIf="hasFieldError('username', 'required')">Username is required</mat-error>
          <mat-error *ngIf="hasFieldError('username', 'minlength')">Username must be at least 3 characters</mat-error>
        </mat-form-field>

        <!-- Password Field -->
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput formControlName="password" [type]="showPassword() ? 'text' : 'password'">
          <mat-icon matSuffix (click)="togglePasswordVisibility()" class="password-toggle">
            {{ showPassword() ? 'visibility_off' : 'visibility' }}
          </mat-icon>
          <mat-error *ngIf="hasFieldError('password', 'required')">Password is required</mat-error>
          <mat-error *ngIf="hasFieldError('password', 'minlength')">Password must be at least 6 characters</mat-error>
        </mat-form-field>

        <!-- Remember Me -->
        <div class="form-options">
          <mat-checkbox formControlName="rememberMe">
            Remember me
          </mat-checkbox>

          <a mat-button color="primary" (click)="forgotPassword()" class="forgot-password">
            Forgot Password?
          </a>
        </div>

        <!-- Login Button -->
        <button mat-raised-button color="primary" type="submit"
                [disabled]="!canSubmit()"
                class="login-button">
          <mat-icon *ngIf="!isLoading()">login</mat-icon>
          <mat-spinner *ngIf="isLoading()" diameter="20" class="button-spinner"></mat-spinner>
          {{ isSubmitting() ? 'Logging in...' : 'Login' }}
        </button>

        <!-- Error Message -->
        <div *ngIf="loginFailed()" class="error-message">
          <mat-error-icon class="error-icon">error</mat-error-icon>
          {{ errorMessage() }}
        </div>

        <!-- Account Locked Message -->
        <div *ngIf="isLockedOut()" class="lockout-message">
          <mat-icon class="lockout-icon">lock</mat-icon>
          <p>{{ errorMessage() }}</p>
        </div>

        <!-- Register Link -->
        <div class="register-link">
          Don't have an account?
          <a mat-button color="primary" (click)="goToRegister()">Register</a>
        </div>
      </form>
    </mat-card-content>
  </mat-card>

  <!-- Demo Credentials -->
  <mat-card class="demo-credentials">
    <mat-card-header>
      <mat-card-title>Demo Accounts</mat-card-title>
      <mat-card-subtitle>Try these credentials to see the login in action</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <div class="demo-list">
        <div class="demo-item">
          <strong>Admin:</strong> admin / admin123
        </div>
        <div class="demo-item">
          <strong>User:</strong> user / user123
        </div>
        <div class="demo-item">
          <strong>Demo:</strong> demo / demo123
        </div>
      </div>

      <p class="demo-note">
        After 3 failed attempts, your account will be locked for 30 seconds.
      </p>
    </mat-card-content>
  </mat-card>
</div>`;
  }

  private generateLoginFormStyles() {
    return `.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--background-color);
}

.form-card {
  max-width: 400px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.demo-credentials {
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
  border-radius: 12px;
  background-color: rgba(33, 150, 243, 0.05);
}

.full-width {
  width: 100%;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
}

.forgot-password {
  text-decoration: none;
  font-size: 0.875rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 1rem;
  margin-top: 16px;
}

.button-spinner {
  margin-right: 8px;
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(244, 67, 54, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon {
  color: #f44336;
}

.lockout-message {
  margin-top: 16px;
  padding: 16px;
  border-radius: 4px;
  background-color: rgba(255, 152, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.lockout-icon {
  color: #ff9800;
  font-size: 24px;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.register-link a {
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

.demo-list {
  margin-bottom: 16px;
}

.demo-item {
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.demo-item:last-child {
  border-bottom: none;
}

.demo-note {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .demo-credentials {
    margin-top: 40px;
  }
}`;
  }

  private generateSearchFormTemplate() {
    return `<div class="search-form-container">
  <mat-card class="form-card">
    <mat-card-header>
      <mat-card-title>Search</mat-card-title>
      <mat-card-subtitle>Find what you're looking for</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <!-- Search Form -->
      <form [formGroup]="searchForm" (ngSubmit)="onSearchSubmit()" class="search-form">

        <!-- Search Input -->
        <mat-form-field appearance="fill" class="search-input-field">
          <mat-label>Search</mat-label>
          <input matInput formControlName="query" placeholder="Enter search term...">
          <mat-icon matSuffix>search</mat-icon>
          <mat-hint align="start">
            Press Enter or type to search
          </mat-hint>
          <mat-error *ngIf="hasFieldError('query', 'required')">Search term is required</mat-error>
          <mat-error *ngIf="hasFieldError('query', 'minlength')">Search term must be at least 2 characters</mat-error>
        </mat-form-field>

        <!-- Filters -->
        <div class="filters-row">
          <mat-form-field appearance="fill" class="filter-field">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" (selectionChange)="onCategoryChange($event.value)">
              <mat-option *ngFor="let category of categories" [value]="category.value">
                {{ category.label }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill" class="filter-field">
            <mat-label>Sort By</mat-label>
            <mat-select formControlName="sortBy" (selectionChange)="onSortChange($event.value)">
              <mat-option *ngFor="let option of sortOptions" [value]="option.value">
                {{ option.label }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <button mat-icon-button (click)="clearSearch()" class="clear-button"
                  *ngIf="searchQuery()">
            <mat-icon>clear</mat-icon>
          </button>
        </div>

        <!-- Advanced Filters (Toggle) -->
        <div *ngIf="searchForm.get('useFilters')?.value" class="advanced-filters">
          <mat-form-field appearance="fill" class="filter-field">
            <mat-label>Date Range</mat-label>
            <input matInput [matDatepicker]="datePicker" formControlName="dateRange">
            <mat-icon matSuffix matDatepickerToggle [for]="datePicker">event</mat-icon>
            <mat-datepicker #datePicker></mat-datepicker>
          </mat-form-field>
        </div>
      </form>

      <!-- Recent Searches -->
      <div *ngIf="recentSearches().length > 0" class="recent-searches">
        <h3>Recent Searches</h3>
        <div class="recent-search-tags">
          <mat-chip *ngFor="let search of recentSearches(); let i = index"
                    (click)="useRecentSearch(search)"
                    [removable]="true"
                    (removed)="removeRecentSearch(i)">
            {{ search }}
            <mat-icon matChipRemove>close</mat-icon>
          </mat-chip>
        </div>
        <button mat-button color="warn" (click)="clearRecentSearches()">
          <mat-icon>delete</mat-icon>
          Clear All
        </button>
      </div>
    </mat-card-content>
  </mat-card>

  <!-- Search Results -->
  <div *ngIf="searchResults().length > 0" class="search-results-container">
    <div class="results-header">
      <h2>Search Results</h2>
      <div class="results-meta">
        Found {{ totalResults() }} results for "{{ searchQuery() }}"
        <span *ngIf="totalPages() > 1">- Page {{ currentPage() }} of {{ totalPages() }}</span>
      </div>

      <!-- Export and Share Buttons -->
      <div class="result-actions">
        <button mat-raised-button color="primary" (click)="exportResults()">
          <mat-icon class="button-icon">download</mat-icon>
          Export CSV
        </button>

        <button mat-raised-button color="accent" (click)="shareResults()">
          <mat-icon class="button-icon">share</mat-icon>
          Share
        </button>
      </div>
    </div>

    <!-- Results Grid -->
    <div class="results-grid">
      <div *ngFor="let result of searchResults()" class="result-card">
        <img [src]="result.thumbnail" alt="{{ result.title }}" class="result-thumbnail">
        <div class="result-content">
          <h3 class="result-title">
            <a [href]="result.url">{{ result.title }}</a>
          </h3>
          <p class="result-description">{{ result.description }}</p>
          <div class="result-meta">
            <span class="result-category">{{ result.category }}</span>
            <span class="result-date">{{ result.date | date: 'shortDate' }}</span>
            <span class="result-author">by {{ result.author }}</span>
          </div>
          <div class="result-tags">
            <mat-chip *ngFor="let tag of result.tags" color="secondary" size="small">
              {{ tag }}
            </mat-chip>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <mat-paginator [length]="totalResults()"
                  [pageSize]="10"
                  [pageSizeOptions]="[5, 10, 25, 50]"
                  (page)="onPageChange($event.pageIndex + 1)"
                  showFirstLastButtons>
    </mat-paginator>
  </div>

  <!-- Loading Indicator -->
  <div *ngIf="isLoading()" class="loading-overlay">
    <mat-spinner diameter="50" class="loading-spinner"></mat-spinner>
    <p>Searching...</p>
  </div>

  <!-- No Results -->
  <div *ngIf="searchResults().length === 0 && searchQuery() && !isLoading()" class="no-results">
    <mat-icon class="no-results-icon">search_off</mat-icon>
    <h3>No Results Found</h3>
    <p>Try adjusting your search terms or filters.</p>
  </div>
</div>`;
  }

  private generateSearchFormStyles() {
    return `.search-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: var(--background-color);
  min-height: 100vh;
}

.form-card {
  max-width: 800px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-input-field {
  font-size: 1.2rem;
}

.filters-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.filter-field {
  flex: 1;
}

.clear-button {
  margin-left: auto;
}

.advanced-filters {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.recent-searches {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.recent-searches h3 {
  margin-bottom: 12px;
  color: var(--text-color);
}

.recent-search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.mat-chip {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.mat-chip:hover {
  transform: scale(1.05);
}

.search-results-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.results-header h2 {
  margin: 0;
  color: var(--text-color);
}

.results-meta {
  color: #666;
  font-size: 0.875rem;
}

.result-actions {
  display: flex;
  gap: 12px;
}

.button-icon {
  margin-right: 8px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.result-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.result-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.result-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.result-content {
  padding: 16px;
}

.result-title {
  margin: 0 0 8px 0;
}

.result-title a {
  color: var(--accent-color);
  text-decoration: none;
}

.result-title a:hover {
  text-decoration: underline;
}

.result-description {
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 0.875rem;
}

.result-category {
  color: #2196f3;
  font-weight: 500;
}

.result-date {
  color: #999;
}

.result-author {
  color: #666;
  font-style: italic;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.mat-chip {
  font-size: 0.75rem;
  height: 24px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
}

.loading-spinner {
  margin-bottom: 16px;
}

.no-results {
  text-align: center;
  padding: 48px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-results-icon {
  font-size: 64px;
  color: #999;
  margin-bottom: 16px;
}

.no-results h3 {
  margin: 0 0 8px 0;
  color: var(--text-color);
}

.no-results p {
  color: #666;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-input-field {
    font-size: 1rem;
  }

  .filters-row {
    flex-direction: column;
  }

  .filter-field {
    width: 100%;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .result-actions {
    width: 100%;
    justify-content: stretch;
  }

  .result-actions button {
    flex: 1;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }
}`;
  }
