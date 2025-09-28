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
      path: 'src/store/index.js',
      content: this.generateStore()
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

  private generatePackageJson() {
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
        'test:unit': 'vue-cli-service test:unit'
      },
      dependencies: {
        'core-js': '^3.8.3',
        'vue': '^3.3.0',
        'vue-router': '^4.0.3',
        'vuex': '^4.0.0',
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
        'sass-loader': '^12.0.0'
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
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/css/main.css'

const app: App = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
`;
  }

  private generateAppComponent() {
    return `<template>
  <div id="app">
    <div class="header">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </div>
    <main class="main">
      <router-view />
    </main>
    <div class="counter-demo">
      <h2>Counter: {{ count }}</h2>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const count = ref(0)
    const message = ref('')

    const increment = () => {
      count.value++
      // Emit event for other microfrontends
      window.dispatchEvent(new CustomEvent('counter-update', {
        detail: { type: 'COUNTER_UPDATE', value: count.value }
      }))
    }

    const decrement = () => {
      count.value--
      window.dispatchEvent(new CustomEvent('counter-update', {
        detail: { type: 'COUNTER_UPDATE', value: count.value }
      }))
    }

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
      count,
      message,
      increment,
      decrement
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
</style>
`;
  }

  private generateRouter() {
    const { normalizedName } = this.context;
    return `import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store'

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

  // Check authentication
  const isAuthenticated = store.getters['auth/isAuthenticated']
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
  const isAdmin = store.getters['auth/isAdmin']

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
      <h1>Welcome to Your Vue.js App</h1>
      <p class="subtitle">
        Built with Vue CLI 3, PWA support, and legacy browser compatibility
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

    <HelloWorld msg="Welcome to Your Vue.js App" />
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
    <h1>About This Application</h1>

    <p>
      This is a Vue CLI 3 application with Progressive Web App (PWA) support
      and legacy browser compatibility.
    </p>

    <h2>Features</h2>
    <ul>
      <li>Vue 3 with Composition API</li>
      <li>Vue Router for navigation</li>
      <li>Vuex for state management</li>
      <li>PWA with service worker</li>
      <li>Legacy browser support via Babel</li>
      <li>ESLint and Prettier for code quality</li>
      <li>Unit testing with Jest</li>
    </ul>

    <h2>PWA Features</h2>
    <p>
      This application can be installed on your device and works offline.
      The service worker caches assets and API responses for better performance.
    </p>

    <div class="counter-demo">
      <h2>Interactive Counter</h2>
      <p>{{ count }}</p>
      <button @click="count++">Increment</button>
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
          <span>Welcome, User</span>
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
import { useStore } from 'vuex'

export default {
  name: 'DashboardLayout',
  setup() {
    const router = useRouter()
    const store = useStore()

    const logout = () => {
      store.dispatch('auth/logout')
      router.push({ name: 'home' })
    }

    return { logout }
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
    return `import { createStore } from 'vuex'

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

  private generateTsConfig() {
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

  private generateEslintConfig() {
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

  private generateReadme() {
    const { name, description, packageManager } = this.context;
    return `# ${name}

${description || 'A Vue CLI application with PWA support and legacy browser compatibility'}

## Features

- ⚡ Vue 3 with Composition API
- 📱 Progressive Web App (PWA) support
- 🌐 Legacy browser support via Babel
- 🛣️ Vue Router for navigation
- 📦 Vuex for state management
- 🧪 Unit testing with Jest
- 🎨 Sass for styling
- 📊 ESLint and Prettier
- 🐳 Docker support

## Quick Start

\`\`\`bash
# Install dependencies
${packageManager} install

# Serve with hot reload
${packageManager} run serve

# Build for production
${packageManager} run build

# Run tests
${packageManager} run test:unit

# Run linter
${packageManager} run lint
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

- **Authentication**: Protects routes that require login
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

## Learn More

- [Vue CLI Documentation](https://cli.vuejs.org/)
- [Vue Documentation](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

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
}
