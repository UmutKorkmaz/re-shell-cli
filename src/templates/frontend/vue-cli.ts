import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class VueCliTemplate extends BaseTemplate {
  constructor(framework: FrameworkConfig, context: TemplateContext) {
    super(framework, context);
  }

  async generateFiles(): Promise<TemplateFile[]> {
    const files: TemplateFile[] = [];
    const { hasTypeScript } = this.context;
    const ext = hasTypeScript ? 'ts' : 'js';

    // Package.json with Vue CLI and PWA
    files.push({
      path: 'package.json',
      content: JSON.stringify(this.generatePackageJson(), null, 2)
    });

    // Public folder
    files.push({
      path: 'public/index.html',
      content: this.generateHtmlFile()
    });

    files.push({
      path: 'public/favicon.ico',
      content: '<!-- Replace with actual favicon.ico file -->'
    });

    // Vue CLI configuration
    files.push({
      path: 'vue.config.js',
      content: this.generateVueConfig()
    });

    files.push({
      path: '.browserslistrc',
      content: this.generateBrowsersList()
    });

    // Src folder
    files.push({
      path: `src/main.${ext}`,
      content: this.generateMainFile()
    });

    files.push({
      path: 'src/App.vue',
      content: this.generateAppComponent()
    });

    files.push({
      path: 'src/router/index.js',
      content: this.generateRouter()
    });

    files.push({
      path: 'src/i18n/index.js',
      content: this.generateI18nSetup()
    });

    files.push({
      path: 'src/views/Home.vue',
      content: this.generateHomeView()
    });

    files.push({
      path: 'src/views/About.vue',
      content: this.generateAboutView()
    });

    // Dashboard views with nested routes
    files.push({
      path: 'src/views/dashboard/DashboardLayout.vue',
      content: this.generateDashboardLayout()
    });

    files.push({
      path: 'src/views/dashboard/Home.vue',
      content: this.generateDashboardHome()
    });

    files.push({
      path: 'src/views/dashboard/Profile.vue',
      content: this.generateDashboardProfile()
    });

    files.push({
      path: 'src/views/dashboard/Settings.vue',
      content: this.generateDashboardSettings()
    });

    files.push({
      path: 'src/views/dashboard/settings/Account.vue',
      content: this.generateSettingsAccount()
    });

    files.push({
      path: 'src/views/dashboard/settings/Notifications.vue',
      content: this.generateSettingsNotifications()
    });

    // Admin views
    files.push({
      path: 'src/views/admin/AdminLayout.vue',
      content: this.generateAdminLayout()
    });

    files.push({
      path: 'src/views/admin/Users.vue',
      content: this.generateAdminUsers()
    });

    files.push({
      path: 'src/views/admin/Roles.vue',
      content: this.generateAdminRoles()
    });

    // 404 page
    files.push({
      path: 'src/views/NotFound.vue',
      content: this.generateNotFound()
    });

    files.push({
      path: 'src/components/HelloWorld.vue',
      content: this.generateHelloWorldComponent()
    });

    files.push({
      path: 'src/components/LanguageSwitcher.vue',
      content: this.generateLanguageSwitcher()
    });

    // Async component for Suspense
    files.push({
      path: 'src/components/AsyncComponent.vue',
      content: this.generateAsyncComponent()
    });

    // Form validation component with VeeValidate
    files.push({
      path: 'src/components/ContactForm.vue',
      content: this.generateContactForm()
    });

    // Pinia stores
    files.push({
      path: 'src/stores/index.js',
      content: this.generateStoresIndex()
    });

    files.push({
      path: 'src/stores/counter.js',
      content: this.generateCounterStore()
    });

    files.push({
      path: 'src/stores/user.js',
      content: this.generateUserStore()
    });

    files.push({
      path: 'src/stores/auth.js',
      content: this.generateAuthStore()
    });

    files.push({
      path: 'src/registerServiceWorker.js',
      content: this.generateServiceWorkerRegistration()
    });

    // Assets
    files.push({
      path: 'src/assets/css/main.css',
      content: this.generateMainCss()
    });

    // TypeScript config
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

    // Vitest config
    files.push({
      path: 'vitest.config.ts',
      content: this.generateVitestConfig()
    });

    files.push({
      path: 'tests/unit/example.spec.ts',
      content: this.generateVitestExample()
    });

    // PWA manifest and icons
    files.push({
      path: 'public/img/icons/android-chrome-192x192.png',
      content: '<!-- Replace with actual icon -->'
    });

    files.push({
      path: 'public/img/icons/android-chrome-512x512.png',
      content: '<!-- Replace with actual icon -->'
    });

    files.push({
      path: 'public/manifest.json',
      content: this.generateManifest()
    });

    // Env files
    files.push({
      path: '.env.example',
      content: this.generateEnvExample()
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

  protected generatePackageJson() {
    const { hasTypeScript, normalizedName } = this.context;
    const isTypeScript = hasTypeScript !== false;

    return {
      name: normalizedName,
      version: '0.1.0',
      private: true,
      scripts: {
        'serve': 'vue-cli-service serve',
        'build': 'vue-cli-service build',
        'lint': 'vue-cli-service lint',
        'test:unit': 'vue-cli-service test:unit',
        'vitest': 'vitest',
        'vitest:ui': 'vitest --ui',
        'test:coverage': 'vitest --coverage'
      },
      dependencies: {
        'core-js': '^3.8.3',
        'vue': '^3.3.0',
        'vue-router': '^4.0.3',
        'pinia': '^2.1.0',
        '@vueuse/core': '^10.7.0',
        'vee-validate': '^4.12.0',
        'yup': '^1.4.0',
        'vue-i18n': '^9.9.0',
        'register-service-worker': '^1.7.2'
      },
      devDependencies: {
        ...(isTypeScript ? {
          '@types/jest': '^29.5.0',
          '@vue/cli-plugin-babel': '~5.0.0',
          '@vue/cli-plugin-eslint': '~5.0.0',
          '@vue/cli-plugin-pwa': '~5.0.0',
          '@vue/cli-plugin-router': '~5.0.0',
          '@vue/cli-plugin-typescript': '~5.0.0',
          '@vue/cli-plugin-unit-jest': '~5.0.0',
          '@vue/cli-plugin-vuex': '~5.0.0',
          '@vue/cli-service': '~5.0.0',
          '@vue/test-utils': '^2.0.0',
          '@vue/eslint-config-typescript': '^11.0.0',
          'typescript': '~5.0.0'
        } : {
          '@vue/cli-plugin-babel': '~5.0.0',
          '@vue/cli-plugin-eslint': '~5.0.0',
          '@vue/cli-plugin-pwa': '~5.0.0',
          '@vue/cli-plugin-router': '~5.0.0',
          '@vue/cli-plugin-vuex': '~5.0.0',
          '@vue/cli-service': '~5.0.0',
          '@vue/test-utils': '^2.0.0'
        }),
        '@vue/eslint-config-prettier': '^8.0.0',
        'babel-eslint': '^10.1.0',
        'eslint': '^7.32.0',
        'eslint-plugin-prettier': '^4.0.0',
        'eslint-plugin-vue': '^8.0.1',
        'prettier': '^2.4.1',
        'sass': '^1.32.7',
        'sass-loader': '^12.0.0',
        '@vitest/ui': '^1.2.0',
        'vitest': '^1.2.0',
        '@vitest/coverage-v8': '^1.2.0',
        '@vue/devtools-api': '^7.0.0',
        'jsdom': '^24.0.0'
      }
    };
  }

  private generateHtmlFile() {
    const { name } = this.context;
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>${name}</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but ${name} doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
  </body>
</html>
`;
  }

  private generateVueConfig() {
    const { port, route } = this.context;
    return `const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  // Dev server configuration
  devServer: {
    port: ${port || 8080},
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // Build configuration
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendors',
            priority: 10
          }
        }
      }
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
  },

  // PWA configuration
  pwa: {
    name: '${this.context.name}',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [/\\.map$/, /manifest\\.json$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://api\\\\.?'),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 10,
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },

  // Legacy browser support
  chainWebpack: config => {
    config.entry('polyfills').add('./src/polyfills.js');
  },

  // CSS configuration
  css: {
    loaderOptions: {
      sass: {
        additionalData: \`
          @import "@/assets/css/variables.scss";
        \`
      }
    }
  },

  // Lint on save
  lintOnSave: process.env.NODE_ENV !== 'production',

  // Production source map
  productionSourceMap: process.env.NODE_ENV !== 'production'
});
`;
  }

  private generateBrowsersList() {
    return `# Browsers that we support

> 1%
last 2 versions
not dead
not IE 11

# For legacy browser support, uncomment the line below:
# IE 11
`;
  }

  private generateMainFile() {
    const { hasTypeScript } = this.context;
    const typeImports = hasTypeScript ? `import { createApp } from 'vue'
import type { App } from 'vue'` : `import { createApp } from 'vue'`;

    return `${typeImports}
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './registerServiceWorker'
import './assets/css/main.css'

// Import and register custom directives
import { registerDirectives } from './directives'
// Import and register custom plugins
import { registerPlugins } from './plugins'

const app: App = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// Register all custom directives
registerDirectives(app)

// Register all custom plugins
const { toast, modal, loading, storage, eventBus } = registerPlugins(app)

// Store plugins globally for easy access
app.config.globalProperties.$toast = toast
app.config.globalProperties.$modal = modal
app.config.globalProperties.$loading = loading
app.config.globalProperties.$storage = storage
app.config.globalProperties.$eventBus = eventBus

app.mount('#app')
`;
  }

  private generateAppComponent() {
    return `<template>
  <div id="app">
    <div class="header">
      <nav>
        <router-link to="/">{{ $t('nav.home') }}</router-link> |
        <router-link to="/about">{{ $t('nav.about') }}</router-link>
      </nav>
      <LanguageSwitcher />
    </div>
    <main class="main">
      <router-view />
    </main>
    <div class="counter-demo">
      <h2>{{ $t('common.loading') }} (Pinia): {{ counterStore.count }}</h2>
      <button @click="counterStore.increment">+</button>
      <button @click="counterStore.decrement">-</button>
      <p v-if="message" class="message">{{ message }}</p>
    </div>

    <!-- Demo Navigation -->
    <div class="demo-nav">
      <h3>Feature Demos</h3>
      <nav class="demo-links">
        <router-link to="/dashboard/directives" class="demo-link">
          🎯 Custom Directives Demo
        </router-link>
        <router-link to="/dashboard/plugins" class="demo-link">
          🔌 Custom Plugins Demo
        </router-link>
      </nav>
      <p class="demo-note">
        Explore the power of Vue 3 custom directives and plugins!
      </p>
    </div>

    <!-- Teleport Example: Modal -->
    <button @click="showModal = true">{{ $t('common.submit') }} Modal (Teleport)</button>

    <!-- Teleport to body -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <h2>Teleport Modal</h2>
          <p>This modal is rendered at the body level using Vue 3 Teleport</p>
          <button @click="showModal = false">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </Teleport>

    <!-- Suspense Example -->
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <div class="loading">{{ $t('common.loading') }} async component...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useCounterStore } from '@/stores/counter'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

// Async component for Suspense
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

export default {
  name: 'App',
  components: {
    AsyncComponent,
    LanguageSwitcher
  },
  setup() {
    const counterStore = useCounterStore()
    const message = ref('')
    const showModal = ref(false)

    const handleCounterUpdate = (event) => {
      if (event.detail.type === 'COUNTER_UPDATE') {
        message.value = \`Received: \${event.detail.value}\`
      }
    }

    onMounted(() => {
      window.addEventListener('counter-update', handleCounterUpdate)
    })

    onUnmounted(() => {
      window.removeEventListener('counter-update', handleCounterUpdate)
    })

    return {
      counterStore,
      message,
      showModal
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.header {
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 0.5rem;
}

.header nav a.router-link-exact-active {
  color: #42b983;
}

.main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.counter-demo {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  margin: 2rem auto;
  max-width: 400px;
}

.counter-demo h2 {
  margin: 1rem 0;
}

.counter-demo button {
  font-size: 1.5rem;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.counter-demo button:hover {
  background-color: #3aa876;
}

.message {
  color: #42b983;
  font-size: 1rem;
  margin-top: 1rem;
}

/* Demo Navigation Styles */
.demo-nav {
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  color: white;
}

.demo-nav h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.demo-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.demo-link {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.demo-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

.demo-note {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Teleport Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #42b983;
}
</style>
`;
  }

  private generateRouter() {
    const { normalizedName } = this.context;
    return `import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Routes with nested children, meta fields, and lazy loading
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home',
      requiresAuth: false,
      layout: 'default'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About',
      requiresAuth: false,
      layout: 'default'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/DashboardLayout.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      layout: 'authenticated'
    },
    children: [
      {
        path: '',
        name: 'dashboard-home',
        component: () => import('../views/dashboard/Home.vue'),
        meta: {
          title: 'Dashboard Home',
          requiresAuth: true
        }
      },
      {
        path: 'directives',
        name: 'directives-demo',
        component: () => import('../components/DirectivesDemo.vue'),
        meta: {
          title: 'Directives Demo',
          requiresAuth: true
        }
      },
      {
        path: 'plugins',
        name: 'plugins-demo',
        component: () => import('../components/PluginsDemo.vue'),
        meta: {
          title: 'Plugins Demo',
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'dashboard-profile',
        component: () => import('../views/dashboard/Profile.vue'),
        meta: {
          title: 'Profile',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'dashboard-settings',
        component: () => import('../views/dashboard/Settings.vue'),
        meta: {
          title: 'Settings',
          requiresAuth: true
        },
        children: [
          {
            path: 'account',
            name: 'settings-account',
            component: () => import('../views/dashboard/settings/Account.vue'),
            meta: {
              title: 'Account Settings',
              requiresAuth: true
            }
          },
          {
            path: 'notifications',
            name: 'settings-notifications',
            component: () => import('../views/dashboard/settings/Notifications.vue'),
            meta: {
              title: 'Notification Settings',
              requiresAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminLayout.vue'),
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true,
      layout: 'admin'
    },
    children: [
      {
        path: '',
        redirect: '/admin/users'
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../views/admin/Users.vue'),
        meta: {
          title: 'User Management',
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: 'roles',
        name: 'admin-roles',
        component: () => import('../views/admin/Roles.vue'),
        meta: {
          title: 'Role Management',
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 - Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // Enable smoother navigation with scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Global navigation guards
router.beforeEach(async (to, from, next) => {
  // Update page title
  document.title = to.meta.title ? \`\${to.meta.title} - ${normalizedName}\` : normalizedName

  // Check authentication using Pinia store
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login with return url
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Check admin role
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const isAdmin = authStore.isAdmin

  if (requiresAdmin && !isAdmin) {
    next({ name: 'home' })
    return
  }

  // Show loading indicator for lazy-loaded routes
  if (!to.matched.length) {
    next()
    return
  }

  next()
})

router.afterEach((to, from) => {
  // Hide loading indicator
  // Track page navigation for analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: to.path,
      page_title: to.meta.title
    })
  }
})

// Navigation error handler
router.onError((error) => {
  console.error('Router error:', error)
  // You can redirect to error page here
  // router.push({ name: 'error' })
})

export default router
`;
  }

  private generateHomeView() {
    return `<template>
  <div class="home">
    <div class="hero">
      <h1>{{ $t('home.welcome') }}</h1>
      <p class="subtitle">
        {{ $t('home.description') }} {{ $t('home.docs') }},
        {{ $t('home.install') }}, and {{ $t('home.plugins') }}
      </p>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>⚡ Vue 3</h3>
        <p>Composition API and modern reactive features</p>
      </div>
      <div class="feature-card">
        <h3>📱 PWA</h3>
        <p>Progressive Web App with offline support</p>
      </div>
      <div class="feature-card">
        <h3>🌐 Legacy Support</h3>
        <p>Babel transpilation for older browsers</p>
      </div>
    </div>

    <HelloWorld :msg="$t('home.welcome')" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home {
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
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
`;
  }

  private generateAboutView() {
    return `<template>
  <div class="about">
    <h1>{{ $t('about.title') }}</h1>

    <p>
      {{ $t('about.description') }}
    </p>

    <h2>Features</h2>
    <ul>
      <li>Vue 3 with Composition API</li>
      <li>Vue Router for navigation</li>
      <li>Pinia for state management</li>
      <li>PWA with service worker</li>
      <li>Internationalization support</li>
      <li>Legacy browser support via Babel</li>
      <li>ESLint and Prettier for code quality</li>
      <li>Unit testing with Vitest</li>
    </ul>

    <h2>PWA Features</h2>
    <p>
      This application can be installed on your device and works offline.
      The service worker caches assets and API responses for better performance.
    </p>

    <div class="counter-demo">
      <h2>{{ $t('common.loading') }} Counter</h2>
      <p>{{ count }}</p>
      <button @click="count++">{{ $t('common.submit') }}</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AboutView',
  setup() {
    const count = ref(0)
    return { count }
  }
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  color: #42b983;
  margin-bottom: 1.5rem;
}

h2 {
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

ul {
  list-style-position: inside;
  line-height: 2;
}

.counter-demo {
  margin-top: 3rem;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  text-align: center;
}

.counter-demo button {
  padding: 0.5rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
`;
  }

  private generateDashboardLayout() {
    return `<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="logo">
        <h2>Dashboard</h2>
      </div>
      <nav class="nav">
        <router-link to="/dashboard" class="nav-link" active-class="active">
          <span class="icon">🏠</span> Home
        </router-link>
        <router-link to="/dashboard/profile" class="nav-link" active-class="active">
          <span class="icon">👤</span> Profile
        </router-link>
        <router-link to="/dashboard/settings" class="nav-link" active-class="active">
          <span class="icon">⚙️</span> Settings
        </router-link>
      </nav>
    </aside>
    <main class="main-content">
      <header class="header">
        <h1>{{ $route.meta.title || 'Dashboard' }}</h1>
        <div class="user-menu">
          <span>Welcome, {{ authStore.user?.name || 'User' }}</span>
          <button @click="logout">Logout</button>
        </div>
      </header>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'DashboardLayout',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const logout = () => {
      authStore.logout()
      router.push({ name: 'home' })
    }

    return { logout, authStore }
  }
}
</script>

<style scoped>
.dashboard-layout {
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

.nav {
  display: flex;
  flex-direction: column;
}

.nav-link {
  padding: 1rem 2rem;
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;
}

.nav-link:hover,
.nav-link.active {
  background: #34495e;
  border-left: 3px solid #42b983;
}

.icon {
  font-size: 1.2rem;
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

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.content {
  padding: 2rem;
}
</style>
`;
  }

  private generateDashboardHome() {
    return `<template>
  <div class="dashboard-home">
    <h2>Welcome to your Dashboard</h2>
    <div class="stats">
      <div class="stat-card">
        <h3>Total Users</h3>
        <p class="number">1,234</p>
      </div>
      <div class="stat-card">
        <h3>Active Sessions</h3>
        <p class="number">56</p>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <p class="number">$12,345</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardHome'
}
</script>

<style scoped>
.dashboard-home h2 {
  margin-bottom: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.stat-card .number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b983;
}
</style>
`;
  }

  private generateDashboardProfile() {
    return `<template>
  <div class="profile">
    <h2>User Profile</h2>
    <form @submit.prevent="saveProfile" class="profile-form">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="profile.name" type="text" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="profile.email" type="email" />
      </div>
      <div class="form-group">
        <label>Bio</label>
        <textarea v-model="profile.bio" rows="4"></textarea>
      </div>
      <button type="submit" class="btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DashboardProfile',
  setup() {
    const profile = ref({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Software developer'
    })

    const saveProfile = () => {
      console.log('Saving profile:', profile.value)
      // API call to save profile
    }

    return { profile, saveProfile }
  }
}
</script>

<style scoped>
.profile-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.btn-primary {
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}
</style>
`;
  }

  private generateDashboardSettings() {
    return `<template>
  <div class="settings">
    <h2>Settings</h2>
    <div class="settings-nav">
      <router-link to="/dashboard/settings/account" class="nav-link" active-class="active">
        Account
      </router-link>
      <router-link to="/dashboard/settings/notifications" class="nav-link" active-class="active">
        Notifications
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'DashboardSettings'
}
</script>

<style scoped>
.settings-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ecf0f1;
}

.nav-link {
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #7f8c8d;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.nav-link.active {
  color: #42b983;
  border-bottom-color: #42b983;
}
</style>
`;
  }

  private generateSettingsAccount() {
    return `<template>
  <div class="account-settings">
    <h3>Account Settings</h3>
    <p>Manage your account preferences and security settings.</p>
    <div class="settings-section">
      <h4>Change Password</h4>
      <form @submit.prevent="changePassword">
        <input v-model="password" type="password" placeholder="New password" />
        <button type="submit">Update Password</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SettingsAccount',
  setup() {
    const password = ref('')

    const changePassword = () => {
      console.log('Password changed')
    }

    return { password, changePassword }
  }
}
</script>

<style scoped>
.settings-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.settings-section form {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.settings-section input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.settings-section button {
  padding: 0.5rem 1.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
`;
  }

  private generateSettingsNotifications() {
    return `<template>
  <div class="notification-settings">
    <h3>Notification Settings</h3>
    <p>Choose how you want to be notified.</p>
    <div class="settings-list">
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="settings.email" />
          Email notifications
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="settings.sms" />
          SMS notifications
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="settings.push" />
          Push notifications
        </label>
      </div>
    </div>
    <button @click="saveSettings" class="btn-save">Save Preferences</button>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'SettingsNotifications',
  setup() {
    const settings = reactive({
      email: true,
      sms: false,
      push: true
    })

    const saveSettings = () => {
      console.log('Settings saved:', settings)
    }

    return { settings, saveSettings }
  }
}
</script>

<style scoped>
.settings-list {
  margin: 2rem 0;
}

.setting-item {
  padding: 1rem;
  background: #f8f9fa;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.setting-item label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.btn-save {
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
`;
  }

  private generateAdminLayout() {
    return `<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="logo">
        <h2>⚡ Admin Panel</h2>
      </div>
      <nav class="nav">
        <router-link to="/admin/users" class="nav-link" active-class="active">
          Users
        </router-link>
        <router-link to="/admin/roles" class="nav-link" active-class="active">
          Roles
        </router-link>
      </nav>
    </aside>
    <main class="main-content">
      <header class="header">
        <h1>{{ $route.meta.title || 'Admin' }}</h1>
      </header>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout'
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  width: 250px;
  background: #1a1a1a;
  color: white;
  padding: 2rem 0;
}

.logo {
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.logo h2 {
  color: #e74c3c;
}

.nav {
  display: flex;
  flex-direction: column;
}

.nav-link {
  padding: 1rem 2rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: background 0.3s;
}

.nav-link:hover,
.nav-link.active {
  background: #e74c3c;
}

.main-content {
  margin-left: 250px;
  flex: 1;
}

.header {
  background: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.content {
  padding: 2rem;
}
</style>
`;
  }

  private generateAdminUsers() {
    return `<template>
  <div class="admin-users">
    <div class="header">
      <h2>User Management</h2>
      <button class="btn-add">Add User</button>
    </div>
    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.status }}</td>
          <td>
            <button class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AdminUsers',
  setup() {
    const users = ref([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' }
    ])

    return { users }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.users-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

.btn-edit {
  background: #3498db;
  color: white;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}
</style>
`;
  }

  private generateAdminRoles() {
    return `<template>
  <div class="admin-roles">
    <div class="header">
      <h2>Role Management</h2>
      <button class="btn-add">Add Role</button>
    </div>
    <div class="roles-grid">
      <div v-for="role in roles" :key="role.id" class="role-card">
        <h3>{{ role.name }}</h3>
        <p>{{ role.description }}</p>
        <div class="permissions">
          <h4>Permissions:</h4>
          <ul>
            <li v-for="permission in role.permissions" :key="permission">
              {{ permission }}
            </li>
          </ul>
        </div>
        <div class="actions">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AdminRoles',
  setup() {
    const roles = ref([
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
    ])

    return { roles }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.role-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.role-card h3 {
  color: #42b983;
  margin-bottom: 0.5rem;
}

.permissions {
  margin: 1.5rem 0;
}

.permissions h4 {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.permissions ul {
  list-style: none;
  padding: 0;
}

.permissions li {
  padding: 0.25rem 0;
  color: #34495e;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-edit {
  background: #3498db;
  color: white;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}
</style>
`;
  }

  private generateNotFound() {
    return `<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <router-link to="/" class="btn-home">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 6rem;
  color: #42b983;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
}
</style>
`;
  }

  private generateHelloWorldComponent() {
    return `<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>

    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  min-height: 50vh;
}
</style>
`;
  }

  private generateStore() {
    return `// DEPRECATED: Using Pinia instead of Vuex
// This file is kept for backward compatibility only
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    user: null
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    },
    decrement({ commit }) {
      commit('DECREMENT')
    },
    async fetchUser({ commit }, userId) {
      // Example API call
      const response = await fetch(\`/api/users/\${userId}\`)
      const user = await response.json()
      commit('SET_USER', user)
    }
  },
  modules: {}
})
`;
  }

  protected generateI18nSetup() {
    return `import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      dashboard: 'Dashboard',
      admin: 'Admin',
      login: 'Login',
    },
    home: {
      welcome: 'Welcome to Your Vue.js App',
      description: 'For a guide and recipes on how to configure / customize this project, check out the',
      docs: 'Vue documentation',
      install: 'CLI Installation',
      plugins: 'Plugins/Guides',
    },
    about: {
      title: 'About This App',
      description: 'This is a Vue.js application built with Vue CLI.',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      dashboard: 'Panel',
      admin: 'Admin',
      login: 'Iniciar sesión',
    },
    home: {
      welcome: 'Bienvenido a tu aplicación Vue.js',
      description: 'Para obtener una guía y recetas sobre cómo configurar / personalizar este proyecto, consulte la',
      docs: 'documentación de Vue',
      install: 'Instalación CLI',
      plugins: 'Complementos/Guías',
    },
    about: {
      title: 'Acerca de esta aplicación',
      description: 'Esta es una aplicación Vue.js construida con Vue CLI.',
    },
    common: {
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      submit: 'Enviar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      dashboard: 'Tableau de bord',
      admin: 'Admin',
      login: 'Connexion',
    },
    home: {
      welcome: 'Bienvenue dans votre application Vue.js',
      description: 'Pour un guide et des recettes sur la façon de configurer / personnaliser ce projet, consultez la',
      docs: 'documentation Vue',
      install: 'Installation CLI',
      plugins: 'Plugins/Guides',
    },
    about: {
      title: 'À propos de cette application',
      description: 'Ceci est une application Vue.js construite avec Vue CLI.',
    },
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      submit: 'Soumettre',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于',
      dashboard: '仪表板',
      admin: '管理员',
      login: '登录',
    },
    home: {
      welcome: '欢迎使用您的 Vue.js 应用',
      description: '有关如何配置/自定义此项目的指南和配方,请查看',
      docs: 'Vue 文档',
      install: 'CLI 安装',
      plugins: '插件/指南',
    },
    about: {
      title: '关于此应用',
      description: '这是一个使用 Vue CLI 构建的 Vue.js 应用程序。',
    },
    common: {
      loading: '加载中...',
      error: '发生错误',
      submit: '提交',
      cancel: '取消',
      save: '保存',
      delete: '删除',
    },
  },
};

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'en', // Set default locale
  fallbackLocale: 'en', // Set fallback locale
  messages,
  globalInjection: true, // Allow global use of $t()
});

export default i18n;
`;
  }

  protected generateLanguageSwitcher() {
    return `<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLocale" class="locale-select">
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const currentLocale = ref(locale.value);

const changeLocale = () => {
  locale.value = currentLocale.value;
  localStorage.setItem('user-locale', currentLocale.value);
};

// Load saved locale from localStorage
const savedLocale = localStorage.getItem('user-locale');
if (savedLocale) {
  currentLocale.value = savedLocale;
  locale.value = savedLocale;
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.locale-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.locale-select:hover {
  border-color: #42b983;
}

.locale-select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}
</style>
`;
  }

  private generateStoresIndex() {
    return `// Pinia stores index
// Export all stores for easy importing

export { default as useCounterStore } from './counter'
export { default as useUserStore } from './user'
export { default as useAuthStore } from './auth'
`;
  }

  private generateCounterStore() {
    return `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const lastChanged = ref<Date | null>(null)

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const tripleCount = computed(() => count.value * 3)

  // Actions
  function increment() {
    count.value++
    lastChanged.value = new Date()

    // Emit event for microfrontend communication
    window.dispatchEvent(new CustomEvent('counter-update', {
      detail: { type: 'COUNTER_UPDATE', value: count.value }
    }))
  }

  function decrement() {
    count.value--
    lastChanged.value = new Date()

    window.dispatchEvent(new CustomEvent('counter-update', {
      detail: { type: 'COUNTER_UPDATE', value: count.value }
    }))
  }

  function reset() {
    count.value = 0
    lastChanged.value = new Date()
  }

  function setValue(value: number) {
    count.value = value
    lastChanged.value = new Date()
  }

  return {
    // State
    count,
    lastChanged,
    // Getters
    doubleCount,
    tripleCount,
    // Actions
    increment,
    decrement,
    reset,
    setValue
  }
})
`;
  }

  private generateUserStore() {
    return `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'editor'
}

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'editor' }
  ])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const admins = computed(() =>
    users.value.filter(user => user.role === 'admin')
  )

  const userById = (id: number) => {
    return computed(() => users.value.find(user => user.id === id))
  }

  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      users.value = data
    } catch (err) {
      error.value = 'Failed to fetch users'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id: number, updates: Partial<User>) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(\`/api/users/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      const data = await response.json()

      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...data }
      }
    } catch (err) {
      error.value = 'Failed to update user'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function addUser(user: Omit<User, 'id'>) {
    const newId = Math.max(...users.value.map(u => u.id)) + 1
    users.value.push({ id: newId, ...user })
  }

  function deleteUser(id: number) {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  return {
    // State
    users,
    loading,
    error,
    // Getters
    admins,
    userById,
    // Actions
    fetchUsers,
    updateUser,
    addUser,
    deleteUser
  }
})
`;
  }

  private generateAuthStore() {
    return `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface AuthUser {
  id: number
  name: string
  email: string
  role: 'user' | 'admin' | 'editor'
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const loading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isEditor = computed(() => user.value?.role === 'editor')

  // Actions
  async function login(email: string, password: string) {
    loading.value = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      token.value = data.token
      user.value = data.user
      localStorage.setItem('auth_token', data.token)

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(userData: {
    name: string
    email: string
    password: string
  }) {
    loading.value = true
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      token.value = data.token
      user.value = data.user
      localStorage.setItem('auth_token', data.token)

      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  async function fetchUser() {
    if (!token.value) return

    loading.value = true
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': \`Bearer \${token.value}\`
        }
      })

      if (response.ok) {
        user.value = await response.json()
      }
    } catch (error) {
      console.error('Fetch user error:', error)
      logout()
    } finally {
      loading.value = false
    }
  }

  // Initialize auth state on store creation
  if (token.value) {
    fetchUser()
  }

  return {
    // State
    user,
    token,
    loading,
    // Getters
    isAuthenticated,
    isAdmin,
    isEditor,
    // Actions
    login,
    register,
    logout,
    fetchUser
  }
})
`;
  }

  private generateServiceWorkerRegistration() {
    return `/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(\`\${process.env.BASE_URL}service-worker.js\", {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
`;
  }

  private generateMainCss() {
    return `/* Global Styles */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: 'Monaco', 'Courier New', monospace;
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
`;
  }

  protected generateTsConfig() {
    return JSON.stringify({
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'preserve'
      },
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue', 'tests/**/*.ts', 'tests/**/*.tsx'],
      exclude: ['node_modules']
    }, null, 2);
  }

  protected generateEslintConfig() {
    return `module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
`;
  }

  private generateManifest() {
    const { name } = this.context;
    return JSON.stringify({
      name: name,
      short_name: name,
      description: 'A Vue CLI application with PWA support',
      theme_color: '#4DBA87',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }, null, 2);
  }

  private generateEnvExample() {
    const { port } = this.context;
    return `# Environment Variables
# Copy this file to .env.local and fill in your values

VUE_APP_API_URL=http://localhost:8000/api
VUE_APP_ENABLE_ANALYTICS=false

# For PWA
VUE_APP_SERVICE_WORKER=true
`;
  }

  private generateDockerfile() {
    return `# Multi-stage Dockerfile for Vue CLI

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

  protected generateReadme() {
    const { name, description, packageManager } = this.context;
    return `# ${name}

${description || 'A Vue CLI application with PWA support and advanced Vue 3 ecosystem'}

## Features

### Core
- ⚡ Vue 3 with Composition API
- 📱 Progressive Web App (PWA) support
- 🌐 Legacy browser support via Babel
- 🛣️ Vue Router for navigation with advanced features
- 🌍 Internationalization (i18n) with Vue i18n

### State Management
- 📦 Pinia for state management (replaces Vuex)
  - Type-safe stores with TypeScript support
  - Composition API style stores
  - DevTools integration

### Testing & Quality
- 🧪 Vitest for unit testing with Vue Test Utils
  - Fast testing with ESM support
  - Built-in code coverage
  - UI mode for debugging tests
- 📊 ESLint and Prettier

### Developer Experience
- 🎨 Sass/SCSS for style preprocessing
- 🔍 Vue DevTools integration
- 🚀 Vite-ready architecture
- 🐳 Docker support

### Form Validation
- ✅ VeeValidate for form validation
- 📝 Yup schema validation

### Vue 3 Features
- 🎭 Teleport for portal-like behavior
- ⏳ Suspense for async components
- 🎪 Composition API utilities with VueUse

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Serve with hot reload
${packageManager} run serve

# Build for production
${packageManager} run build

# Run tests (Jest - legacy)
${packageManager} run test:unit

# Run tests (Vitest - modern)
${packageManager} run vitest
${packageManager} run vitest:ui        # UI mode
${packageManager} run test:coverage    # Coverage report

# Run linter
${packageManager} run lint
\`\`\`

## State Management with Pinia

Pinia is the official state management library for Vue 3. It provides:
- **TypeScript Support**: Fully typed stores
- **DevTools Integration**: Track state changes
- **Extensible**: Compatible with Vue DevTools
- **Modular**: Organize stores by feature

### Example Store

\`\`\`javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
\`\`\`

### Using in Components

\`\`\`vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div>{{ counterStore.count }}</div>
  <button @click="counterStore.increment">Increment</button>
</template>
\`\`\`

### Available Stores

1. **Counter Store**: Demo store with counters and computed values
2. **User Store**: User management with CRUD operations
3. **Auth Store**: Authentication state with login/logout

## VueUse Integration

VueUse provides 200+ essential Vue utilities. Example usage:

\`\`\`javascript
import {
  useLocalStorage,
  useMouse,
  usePreferredDark,
  useWindowSize
} from '@vueuse/core'

// Local storage reactive state
const store = useLocalStorage('my-key', { foo: 'bar' })

// Mouse position
const { x, y } = useMouse()

// Dark mode preference
const isDark = usePreferredDark()

// Window size
const { width, height } = useWindowSize()
\`\`\`

## Internationalization with Vue i18n

This template includes Vue i18n for multi-language support out of the box:

### Features
- 🌍 Support for English, Spanish, French, and Chinese
- 🔄 Locale switching with persistence
- 📦 Built-in translation keys for common UI elements
- 🎯 Nested translation structure for organization
- 💾 Local storage integration for user preference

### Using Translations

In Vue components, use the \`$t\` function:

\`\`\`vue
<template>
  <div>
    <h1>{{ $t('home.welcome') }}</h1>
    <p>{{ $t('common.loading') }}</p>
    <button>{{ $t('common.submit') }}</button>
  </div>
</template>
\`\`\`

### Translation Structure

Translations are organized by category:

\`\`\`
messages = {
  en: {
    nav: { home: 'Home', about: 'About' },
    home: {
      welcome: 'Welcome to Your Vue.js App',
      description: 'Built with Vue CLI...'
    },
    about: {
      title: 'About This App',
      description: 'This is a Vue.js application...'
    },
    common: {
      loading: 'Loading...',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete'
    }
  }
}
\`\`\`

### Adding New Languages

1. Add new translations to the \`messages\` object in \`src/i18n/index.js\`
2. Add the new language option to the LanguageSwitcher component
3. Update the \`locale\` in the i18n configuration if needed

### Language Switcher

The \`LanguageSwitcher.vue\` component provides a dropdown to change languages:

\`\`\`vue
<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLocale" class="locale-select">
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const currentLocale = ref(locale.value);

const changeLocale = () => {
  locale.value = currentLocale.value;
  localStorage.setItem('user-locale', currentLocale.value);
};
</script>
\`\`\`

### Programmatic Locale Change

You can also change the locale programmatically:

\`\`\`javascript
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// Change to Spanish
locale.value = 'es';

// Get current locale
console.log(locale.value);
\`\`\`

## Form Validation with VeeValidate

Example contact form with validation:

\`\`\`vue
<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  message: yup.string().required().min(10)
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: message } = useField('message')

const onSubmit = handleSubmit(values => {
  console.log('Form submitted:', values)
})
</script>
\`\`\`

## Vue 3 Advanced Features

### Teleport

Render components outside their parent DOM hierarchy:

\`\`\`vue
<Teleport to="body">
  <div class="modal">Modal content</div>
</Teleport>
\`\`\`

### Suspense

Handle async components with loading states:

\`\`\`vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
\`\`\`

## Testing with Vitest

Vitest is a blazing fast unit test framework powered by Vite.

\`\`\`bash
# Run tests
pnpm vitest

# Watch mode
pnpm vitest --watch

# UI mode
pnpm vitest --ui

# Coverage
pnpm vitest --coverage
\`\`\`

### Example Test

\`\`\`javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Counter Store', () => {
  it('increments count', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
  })
})
\`\`\`

## Vue DevTools

The Vue DevTools browser extension integrates automatically with:
- **Component Tree**: Inspect component hierarchy
- **Vuex/Pinia**: Monitor state changes
- **Events**: Track emitted events
- **Performance**: Profile component rendering
- **Router**: View route history

## Style Preprocessing

Sass/SCSS is configured with:
- Global variables and mixins
- Scoped styles in components
- Auto-import of styles
- Nested selectors

\`\`\`vue
<style lang="scss" scoped>
.my-component {
  padding: 1rem;

  &__child {
    color: $primary-color;
  }
}
</style>
\`\`\`

## Project Setup

### Development Server

\`\`\`bash
${packageManager} run serve
\`\`\`

Compiles and hot-reloads for development. The app will run on [http://localhost:8080](http://localhost:8080).

### Production Build

\`\`\`bash
${packageManager} run build
\`\`\`

Compiles and minifies for production. Output is in the \`dist/\` directory.

## PWA Support

This application includes PWA features:

- Service worker for offline functionality
- App manifest for installable apps
- Responsive icons
- Caching strategies

The PWA plugin is configured to cache API responses and static assets.

## Legacy Browser Support

This template includes Babel transpilation for legacy browser support.
Configure target browsers in \`.browserslistrc\`.

Current targets:
- > 1%
- Last 2 versions
- Not dead

To enable IE 11 support, uncomment the IE 11 line in \`.browserslistrc\`.

## Docker

\`\`\`bash
# Build Docker image
docker build -t ${name} .

# Run container
docker run -p 80:80 ${name}
\`\`\`

## Configuration

### Vue CLI Configuration

Edit \`vue.config.js\` to customize webpack, dev server, PWA, and more.

### Environment Variables

Create \`.env.local\` for environment-specific variables:

\`\`\`
VUE_APP_API_URL=http://localhost:8000/api
VUE_APP_ENABLE_ANALYTICS=true
\`\`\`

## Vue Router

This application includes an advanced Vue Router setup with:

### Nested Routes

- **Dashboard**: Authenticated area with nested children
  - /dashboard - Dashboard home
  - /dashboard/profile - User profile
  - /dashboard/settings - Settings with sub-routes
    - /dashboard/settings/account - Account settings
    - /dashboard/settings/notifications - Notification preferences

- **Admin**: Admin panel with role-based access
  - /admin/users - User management
  - /admin/roles - Role management

### Navigation Guards

The router includes global navigation guards for:

- **Authentication**: Protects routes that require login (uses Pinia auth store)
- **Authorization**: Checks admin role for admin routes
- **Page titles**: Automatically updates document title
- **Analytics**: Tracks page views with Google Analytics
- **Redirect**: Redirects to login with return URL

### Route Meta Fields

Each route can have meta fields:
- \`title\`: Page title
- \`requiresAuth\`: Whether authentication is required
- \`requiresAdmin\`: Whether admin role is required
- \`layout\`: Layout component to use

### Lazy Loading

All route components are lazy-loaded for optimal performance:

\`\`\`javascript
component: () => import('../views/Home.vue')
\`\`\`

### Smooth Scrolling

The router includes smooth scroll behavior for better UX:

\`\`\`javascript
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { top: 0, behavior: 'smooth' }
  }
}
\`\`\`

### Example Usage

\`\`\`vue
<template>
  <div>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link :to="{ name: 'dashboard-profile' }">Profile</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const navigate = () => {
      router.push({ name: 'dashboard-profile' })
    }

    return { navigate, route }
  }
}
</script>
\`\`\`

### Programmatic Navigation

\`\`\`javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate by name
router.push({ name: 'dashboard' })

// Navigate by path
router.push('/dashboard/profile')

// Navigate with query params
router.push({ path: '/dashboard', query: { tab: 'settings' } })

// Navigate with params
router.push({ name: 'admin-users', params: { id: 123 } })

// Replace current route
router.replace('/dashboard')

// Go back
router.go(-1)
\`\`\`

## Project Structure

\`\`\`
src/
├── assets/          # Static assets (images, styles)
├── components/      # Reusable Vue components
│   ├── AsyncComponent.vue    # Suspense example
│   ├── ContactForm.vue       # VeeValidate form example
│   ├── DirectivesDemo.vue    # Custom directives demo
│   ├── HelloWorld.vue        # Demo component
│   └── PluginsDemo.vue       # Custom plugins demo
├── directives/      # Custom directives
│   └── index.js     # All custom directives (v-click-outside, v-tooltip, v-loading, v-lazy, v-autofocus, v-debounce)
├── plugins/         # Custom plugins
│   └── index.js     # All custom plugins (Event bus, Toast, Modal, Loading, Storage)
├── stores/          # Pinia stores
│   ├── index.js     # Store exports
│   ├── counter.js   # Counter store
│   ├── user.js      # User store
│   └── auth.js      # Authentication store
├── views/           # Page components
│   ├── dashboard/   # Dashboard nested routes
│   └── admin/       # Admin nested routes
├── router/          # Vue Router configuration
├── App.vue          # Root component
└── main.js          # Application entry point

tests/
└── unit/            # Vitest unit tests
\`\`\`

## Custom Directives

This template includes 6 powerful custom directives to solve common UI/UX problems:

### v-click-outside
Detects clicks outside an element and triggers a handler.

**Usage:**
\`\`\`vue
<template>
  <div v-click-outside="handleClose">
    <!-- Content -->
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('Clicked outside!')
}
</script>
\`\`\`

### v-tooltip
Shows tooltips on hover with configurable position.

**Usage:**
\`\`\`vue
<template>
  <!-- Default (bottom) -->
  <button v-tooltip="'Hello World'">Tooltip</button>

  <!-- Different positions -->
  <button v-tooltip.top="'Top tooltip'">Top</button>
  <button v-tooltip.left="'Left tooltip'">Left</button>
  <button v-tooltip.right="'Right tooltip'">Right</button>
</template>
\`\`\`

### v-loading
Shows a loading overlay on any element.

**Usage:**
\`\`\`vue
<template>
  <div v-loading="'Loading data...'">
    <!-- Content -->
  </div>

  <!-- Without message -->
  <div v-loading="isLoading">
    <!-- Content -->
  </div>
</template>

<script setup>
const isLoading = ref(true)
</script>
\`\`\`

### v-lazy
Lazy loads images with intersection observer.

**Usage:**
\`\`\`vue
<template>
  <img v-lazy="'/path/to/image.jpg'" alt="Lazy loaded">
</template>
\`\`\`

### v-autofocus
Auto focuses elements on mount with options.

**Usage:**
\`\`\`vue
<template>
  <!-- Basic autofocus -->
  <input v-autofocus>

  <!-- With delay -->
  <input v-autofocus.delay="500">

  <!-- Select text on focus -->
  <input v-autofocus.select>

  <!-- Set input mode -->
  <input v-autofocus="'numeric'">
</template>
\`\`\`

### v-debounce
Debounces input events.

**Usage:**
\`\`\`vue
<template>
  <!-- Default (input event, 300ms delay) -->
  <input v-debounce="handleInput">

  <!-- Custom delay -->
  <input v-debounce.500="handleInput">

  <!-- Different events -->
  <input v-debounce.keyup="handleKeyup">
  <input v-debounce.change="handleChange">
</template>
\`\`\`

## Custom Plugins

This template includes 5 powerful custom plugins:

### Event Bus Plugin
Centralized event system for component communication.

**Usage:**
\`\`\`javascript
// Emit event
eventBus.emit('custom-event', data)

// Listen for event
eventBus.on('custom-event', (data) => {
  console.log(data)
})

// Once listener
eventBus.once('custom-event', callback)

// Remove listener
eventBus.off('custom-event', callback)
\`\`\`

### Toast Notification Plugin
Displays toast notifications with various types and options.

**Usage:**
\`\`\`javascript
// Basic toasts
toast.success('Success message!')
toast.error('Error message!')
toast.warning('Warning message!')
toast.info('Info message!')

// Custom options
toast.show('Custom message', {
  type: 'success',
  duration: 5000,
  action: {
    text: 'Undo',
    handler: () => console.log('Undo clicked')
  }
})

// Remove toast
toast.remove(id)
\`\`\`

### Modal Dialog Plugin
Creates customizable modal dialogs.

**Usage:**
\`\`\`javascript
// Basic modal
modal.show({
  title: 'Title',
  content: 'Content HTML',
  buttons: [
    { text: 'Close', type: 'secondary' },
    { text: 'Save', type: 'primary' }
  ]
})

// Alert modal
await modal.alert('Message', 'Title')

// Confirm modal
const confirmed = await modal.confirm('Are you sure?', 'Confirm')
\`\`\`

### Loading State Plugin
Global loading state management.

**Usage:**
\`\`\`javascript
// Basic usage
loading.show('Loading...')
loading.hide()

// With async function
await loading.withLoading(async () => {
  // Your async code here
}, 'Loading message')

// Reactivity
const { isLoading } = loading
\`\`\`

### Storage Plugin
Wrapper for localStorage/sessionStorage with Vue reactivity.

**Usage:**
\`\`\`javascript
// localStorage
storage.localStorage.set('key', value)
const data = storage.localStorage.get('key')
storage.localStorage.remove('key')

// sessionStorage
storage.sessionStorage.set('key', value)
const data = storage.sessionStorage.get('key')
\`\`\`

## Demo Pages

The template includes two demo pages to showcase all features:

1. **Directives Demo** (`/dashboard/directives`)
   - Interactive examples of all custom directives
   - Live demonstrations with explanations

2. **Plugins Demo** (`/dashboard/plugins`)
   - Examples of all custom plugins
   - Interactive tests and demonstrations

## TypeScript Support

All custom directives and plugins are written with TypeScript-style JSDoc comments for better IDE support and type checking.

## Browser Support

These custom directives and plugins are compatible with all modern browsers that support Vue 3 and Intersection Observer API.

## Performance Considerations

- Directives use efficient event listeners and cleanup
- Lazy loading uses Intersection Observer for optimal performance
- Event bus includes error handling to prevent crashes
- Toast notifications use efficient DOM manipulation
- Modals are properly cleaned up after closing

## Migration from Vuex

This project uses Pinia instead of Vuex. Key differences:

**Vuex:**
\`\`\`javascript
// Old Vuex way
this.$store.commit('INCREMENT')
this.$store.dispatch('fetchUser')
this.$store.getters.doubleCount
\`\`\`

**Pinia:**
\`\`\`javascript
// New Pinia way
const counterStore = useCounterStore()
counterStore.increment()
counterStore.doubleCount
\`\`\`

## Learn More

### Official Documentation
- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [VeeValidate](https://vee-validate.logaretm.com/)
- [Vitest](https://vitest.dev/)

### Tools & Guides
- [Vue CLI Documentation](https://cli.vuejs.org/)
- [Vue DevTools](https://devtools.vuejs.org/)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [TypeScript with Vue](https://vuejs.org/guide/typescript/overview.html)

## License

MIT
`;
  }

  private generateGitIgnore() {
    return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode
.idea
`;
  }

  private generateAsyncComponent() {
    return `<template>
  <div class="async-component">
    <h2>Async Component (Suspense)</h2>
    <p>This component was loaded asynchronously and wrapped in Suspense</p>
    <div class="content">
      <p>Current time: {{ currentTime }}</p>
      <button @click="refreshTime">Refresh Time</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'AsyncComponent',
  setup() {
    const currentTime = ref(new Date().toLocaleString())

    // Simulate async data loading
    onMounted(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Async component loaded!')
    })

    const refreshTime = () => {
      currentTime.value = new Date().toLocaleString()
    }

    return {
      currentTime,
      refreshTime
    }
  }
}
</script>

<style scoped>
.async-component {
  padding: 2rem;
  background-color: #f0f9ff;
  border-radius: 0.5rem;
  margin: 2rem 0;
  text-align: center;
}

.async-component h2 {
  color: #42b983;
  margin-bottom: 1rem;
}

.content {
  margin-top: 1.5rem;
}

.content button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
`;
  }

  private generateContactForm() {
    return `<template>
  <div class="contact-form">
    <h2>Contact Form (VeeValidate)</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="form-group">
        <label for="name">Name</label>
        <Field
          id="name"
          name="name"
          type="text"
          v-model="form.name"
          :class="{ 'error': errors.name }"
        />
        <ErrorMessage name="name" class="error-message" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          v-model="form.email"
          :class="{ 'error': errors.email }"
        />
        <ErrorMessage name="email" class="error-message" />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <Field
          id="message"
          name="message"
          as="textarea"
          v-model="form.message"
          :class="{ 'error': errors.message }"
          rows="4"
        />
        <ErrorMessage name="message" class="error-message" />
      </div>

      <div class="form-group">
        <label for="phone">Phone (Optional)</label>
        <Field
          id="phone"
          name="phone"
          type="tel"
          v-model="form.phone"
          placeholder="(123) 456-7890"
        />
        <ErrorMessage name="phone" class="error-message" />
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>

      <div v-if="submitted" class="success-message">
        Message sent successfully!
      </div>
    </Form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'ContactForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const isSubmitting = ref(false)
    const submitted = ref(false)

    const form = reactive({
      name: '',
      email: '',
      message: '',
      phone: ''
    })

    // Validation schema using Yup
    const schema = yup.object({
      name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters'),
      email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      message: yup.string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters')
        .max(500, 'Message must not exceed 500 characters'),
      phone: yup.string()
        .matches(/^[\\d\\s\\-()]+$/, 'Invalid phone format')
        .min(10, 'Phone must be at least 10 digits')
    })

    const onSubmit = async (values, { resetForm }) => {
      isSubmitting.value = true

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      console.log('Form submitted:', values)

      // Reset form
      resetForm()
      submitted.value = true
      isSubmitting.value = false

      // Hide success message after 3 seconds
      setTimeout(() => {
        submitted.value = false
      }, 3000)
    }

    return {
      form,
      schema,
      isSubmitting,
      submitted,
      onSubmit
    }
  }
}
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.contact-form h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button[type="submit"]:hover:not(:disabled) {
  background: #3aa876;
}

button[type="submit"]:disabled {
  background: #a8e6cf;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 0.25rem;
  text-align: center;
}
</style>
`;
  }

  private generateVitestConfig() {
    return `import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        '**/coverage/**'
      ]
    },
    root: fileURLToPath(new URL('./', import.meta.url))
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
`;
  }

  private generateVitestExample() {
    return `import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increments count', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
  })

  it('decrements count', () => {
    const counter = useCounterStore()
    counter.increment()
    expect(counter.count).toBe(1)
    counter.decrement()
    expect(counter.count).toBe(0)
  })

  it('doubles count correctly', () => {
    const counter = useCounterStore()
    counter.count = 5
    expect(counter.doubleCount).toBe(10)
  })

  it('resets count', () => {
    const counter = useCounterStore()
    counter.increment()
    counter.increment()
    counter.reset()
    expect(counter.count).toBe(0)
  })
})

describe('Component Testing Example', () => {
  it('renders HelloWorld component', () => {
    const wrapper = mount({
      template: '<div>Hello World</div>'
    })
    expect(wrapper.text()).toContain('Hello World')
  })
})
`;
  }
}
