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
    return `import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
