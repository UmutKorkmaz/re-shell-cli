import * as fs from 'fs-extra';
import * as path from 'path';

export interface FrameworkConfig {
  name: string;
  displayName: string;
  buildTool: 'vite' | 'webpack' | 'rollup' | 'esbuild';
  packageManager: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  configFiles: string[];
  entryFile: string;
  extensions: string[];
  hasTypeScript?: boolean;
}

export const SUPPORTED_FRAMEWORKS: Record<string, FrameworkConfig> = {
  'react': {
    name: 'react',
    displayName: 'React',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      'vite': '^4.4.0',
      '@vitejs/plugin-react': '^4.0.0',
      'eslint': '^8.44.0',
      'vitest': '^0.34.3'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext js,jsx',
      'test': 'vitest'
    },
    configFiles: ['vite.config.js', '.eslintrc.js'],
    entryFile: 'src/index.jsx',
    extensions: ['.js', '.jsx']
  },
  'react-ts': {
    name: 'react-ts',
    displayName: 'React with TypeScript',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      'vite': '^4.4.0',
      '@vitejs/plugin-react': '^4.0.0',
      'typescript': '^5.0.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      'eslint': '^8.44.0',
      'vitest': '^0.34.3'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext ts,tsx',
      'test': 'vitest',
      'type-check': 'tsc --noEmit'
    },
    configFiles: ['vite.config.ts', 'tsconfig.json', '.eslintrc.js'],
    entryFile: 'src/index.tsx',
    extensions: ['.ts', '.tsx'],
    hasTypeScript: true
  },
  'vue': {
    name: 'vue',
    displayName: 'Vue 3',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'vue': '^3.3.0'
    },
    devDependencies: {
      'vite': '^4.4.0',
      '@vitejs/plugin-vue': '^4.0.0',
      'eslint': '^8.44.0',
      'vitest': '^0.34.3'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext js,vue',
      'test': 'vitest'
    },
    configFiles: ['vite.config.js', '.eslintrc.js'],
    entryFile: 'src/main.js',
    extensions: ['.js', '.vue']
  },
  'vue-ts': {
    name: 'vue-ts',
    displayName: 'Vue 3 with TypeScript',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'vue': '^3.3.0'
    },
    devDependencies: {
      'vite': '^4.4.0',
      '@vitejs/plugin-vue': '^4.0.0',
      'typescript': '^5.0.0',
      'vue-tsc': '^1.8.0',
      'eslint': '^8.44.0',
      'vitest': '^0.34.3'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vue-tsc && vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext ts,vue',
      'test': 'vitest',
      'type-check': 'vue-tsc --noEmit'
    },
    configFiles: ['vite.config.ts', 'tsconfig.json', '.eslintrc.js'],
    entryFile: 'src/main.ts',
    extensions: ['.ts', '.vue'],
    hasTypeScript: true
  },
  'svelte': {
    name: 'svelte',
    displayName: 'Svelte',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {},
    devDependencies: {
      'svelte': '^4.0.0',
      'vite': '^4.4.0',
      '@sveltejs/vite-plugin-svelte': '^2.4.0',
      'eslint': '^8.44.0',
      'vitest': '^0.34.3'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext js,svelte',
      'test': 'vitest'
    },
    configFiles: ['vite.config.js', 'svelte.config.js', '.eslintrc.js'],
    entryFile: 'src/main.js',
    extensions: ['.js', '.svelte']
  },
  'svelte-ts': {
    name: 'svelte-ts',
    displayName: 'Svelte with TypeScript',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {},
    devDependencies: {
      'svelte': '^4.0.0',
      'vite': '^4.4.0',
      '@sveltejs/vite-plugin-svelte': '^2.4.0',
      'typescript': '^5.0.0',
      'svelte-check': '^3.4.0',
      'eslint': '^8.44.0',
      'vitest': '^0.34.3'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext ts,svelte',
      'test': 'vitest',
      'check': 'svelte-check --tsconfig ./tsconfig.json'
    },
    configFiles: ['vite.config.ts', 'svelte.config.js', 'tsconfig.json', '.eslintrc.js'],
    entryFile: 'src/main.ts',
    extensions: ['.ts', '.svelte'],
    hasTypeScript: true
  },
  'next': {
    name: 'next',
    displayName: 'Next.js 14',
    buildTool: 'webpack',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'next': '^14.1.0',
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/node': '^20.11.0',
      '@types/react': '^18.2.48',
      '@types/react-dom': '^18.2.18',
      'typescript': '^5.3.3',
      'tailwindcss': '^3.4.1',
      'autoprefixer': '^10.4.17',
      'postcss': '^8.4.33',
      'eslint': '^8.56.0',
      'eslint-config-next': '^14.1.0'
    },
    scripts: {
      'dev': 'next dev',
      'build': 'next build',
      'start': 'next start',
      'lint': 'next lint'
    },
    configFiles: ['next.config.js', 'tailwind.config.ts', 'tsconfig.json', '.eslintrc.json'],
    entryFile: 'src/app/page.tsx',
    extensions: ['.ts', '.tsx'],
    hasTypeScript: true
  },
  'remix': {
    name: 'remix',
    displayName: 'Remix',
    buildTool: 'esbuild',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      '@remix-run/node': '^2.8.1',
      '@remix-run/react': '^2.8.1',
      '@remix-run/serve': '^2.8.1',
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@remix-run/dev': '^2.8.1',
      '@types/react': '^18.2.48',
      '@types/react-dom': '^18.2.18',
      'typescript': '^5.3.3',
      'tailwindcss': '^3.4.1',
      'autoprefixer': '^10.4.17',
      'postcss': '^8.4.33',
      'eslint': '^8.56.0'
    },
    scripts: {
      'dev': 'remix dev --manual',
      'build': 'remix build',
      'start': 'remix-serve ./build/index.js',
      'typecheck': 'tsc'
    },
    configFiles: ['remix.config.js', 'tailwind.config.js', 'tsconfig.json'],
    entryFile: 'app/root.tsx',
    extensions: ['.ts', '.tsx'],
    hasTypeScript: true
  },
  'gatsby': {
    name: 'gatsby',
    displayName: 'Gatsby 5',
    buildTool: 'webpack',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'gatsby': '^5.13.0',
      'gatsby-plugin-image': '^3.13.0',
      'gatsby-plugin-manifest': '^5.13.0',
      'gatsby-plugin-offline': '^6.13.0',
      'gatsby-plugin-sharp': '^5.13.0',
      'gatsby-source-filesystem': '^5.13.0',
      'gatsby-transformer-remark': '^7.13.0',
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/node': '^20.11.0',
      '@types/react': '^18.2.48',
      '@types/react-dom': '^18.2.18',
      'typescript': '^5.3.3'
    },
    scripts: {
      'develop': 'gatsby develop',
      'build': 'gatsby build',
      'serve': 'gatsby serve',
      'clean': 'gatsby clean'
    },
    configFiles: ['gatsby-config.ts', 'gatsby-node.ts', 'tsconfig.json'],
    entryFile: 'src/pages/index.tsx',
    extensions: ['.ts', '.tsx'],
    hasTypeScript: true
  },
  'nuxt': {
    name: 'nuxt',
    displayName: 'Nuxt 3',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'nuxt': '^3.10.0',
      '@nuxtjs/tailwindcss': '^6.10.0',
      '@pinia/nuxt': '^0.5.1',
      '@pinia/plugin-persistedstate': '^3.2.1',
      '@vueuse/nuxt': '^10.7.2',
      '@nuxtjs/i18n': '^8.3.0',
      '@nuxtjs/seo': '^2.0.0',
      '@nuxtjs/color-mode': '^3.3.3',
      'vue': '^3.4.0'
    },
    devDependencies: {
      '@types/node': '^20.11.0',
      'typescript': '^5.3.3',
      'autoprefixer': '^10.4.17',
      'postcss': '^8.4.33',
      'tailwindcss': '^3.4.1'
    },
    scripts: {
      'dev': 'nuxt dev',
      'build': 'nuxt build',
      'generate': 'nuxt generate',
      'preview': 'nuxt preview',
      'postinstall': 'nuxt prepare'
    },
    configFiles: ['nuxt.config.ts', 'tsconfig.json', 'app.config.ts', 'tailwind.config.js'],
    entryFile: 'app/app.vue',
    extensions: ['.ts', '.vue'],
    hasTypeScript: true
  },
  'quasar': {
    name: 'quasar',
    displayName: 'Quasar Framework',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      '@quasar/extras': '^1.16.9',
      'axios': '^1.6.5',
      'pinia': '^2.1.7',
      'quasar': '^2.14.0',
      'vue': '^3.4.15',
      'vue-router': '^4.2.5'
    },
    devDependencies: {
      '@quasar/app-vite': '^1.5.0',
      '@types/node': '^20.11.0',
      'autoprefixer': '^10.4.17',
      'eslint': '^8.56.0',
      'eslint-config-prettier': '^9.1.0',
      'eslint-plugin-vue': '^9.20.1',
      'prettier': '^3.2.4',
      'typescript': '^5.3.3'
    },
    scripts: {
      'dev': 'quasar dev',
      'build': 'quasar build',
      'build:pwa': 'quasar build -m pwa',
      'build:electron': 'quasar build -m electron',
      'lint': 'eslint --ext .js,.vue ./src',
      'format': 'prettier --write "**/*.{js,vue,scss,md,json}"',
      'test': 'echo "No test specified" && exit 0'
    },
    configFiles: ['quasar.config.js', 'tsconfig.json'],
    entryFile: 'src/App.vue',
    extensions: ['.js', '.vue'],
    hasTypeScript: true
  },
  'angular': {
    name: 'angular',
    displayName: 'Angular 17+',
    buildTool: 'esbuild',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      '@angular/animations': '^17.3.0',
      '@angular/common': '^17.3.0',
      '@angular/compiler': '^17.3.0',
      '@angular/core': '^17.3.0',
      '@angular/forms': '^17.3.0',
      '@angular/platform-browser': '^17.3.0',
      '@angular/platform-browser-dynamic': '^17.3.0',
      '@angular/router': '^17.3.0',
      'rxjs': '^7.8.1',
      'tslib': '^2.6.2',
      'zone.js': '^0.14.4'
    },
    devDependencies: {
      '@angular-devkit/build-angular': '^17.3.0',
      '@angular/cli': '^17.3.0',
      '@angular/compiler-cli': '^17.3.0',
      '@types/jasmine': '~5.1.0',
      '@types/node': '^20.11.0',
      'jasmine-core': '~5.1.0',
      'karma': '~6.4.0',
      'karma-chrome-launcher': '~3.2.0',
      'karma-coverage': '~2.2.0',
      'karma-jasmine': '~5.1.0',
      'karma-jasmine-html-reporter': '~2.1.0',
      'typescript': '~5.4.2'
    },
    scripts: {
      'ng': 'ng',
      'start': 'ng serve',
      'build': 'ng build',
      'watch': 'ng build --watch --configuration development',
      'test': 'ng test',
      'lint': 'ng lint'
    },
    configFiles: ['angular.json', 'tsconfig.json', 'karma.conf.js'],
    entryFile: 'src/main.ts',
    extensions: ['.ts', '.html'],
    hasTypeScript: true
  },
  'vite-react': {
    name: 'vite-react',
    displayName: 'Vite + React',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/react': '^18.2.48',
      '@types/react-dom': '^18.2.18',
      '@typescript-eslint/eslint-plugin': '^6.19.0',
      '@typescript-eslint/parser': '^6.19.0',
      '@vitejs/plugin-react': '^4.2.1',
      'eslint': '^8.56.0',
      'eslint-plugin-react-hooks': '^4.6.0',
      'eslint-plugin-react-refresh': '^0.4.5',
      'prettier': '^3.2.4',
      'typescript': '^5.3.3',
      'vite': '^5.0.12'
    },
    scripts: {
      'dev': 'vite',
      'build': 'tsc && vite build',
      'lint': 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      'preview': 'vite preview',
      'format': 'prettier --write "src/**/*.{ts,tsx,css,md}"'
    },
    configFiles: ['vite.config.ts', 'tsconfig.json', '.eslintrc.cjs'],
    entryFile: 'src/main.tsx',
    extensions: ['.ts', '.tsx'],
    hasTypeScript: true
  },
  'sveltekit': {
    name: 'sveltekit',
    displayName: 'SvelteKit',
    buildTool: 'vite',
    packageManager: ['npm', 'yarn', 'pnpm'],
    dependencies: {},
    devDependencies: {
      '@playwright/test': '^1.41.2',
      '@sveltejs/adapter-auto': '^3.1.1',
      '@sveltejs/adapter-node': '^5.0.1',
      '@sveltejs/kit': '^2.5.0',
      '@typescript-eslint/eslint-plugin': '^6.19.0',
      '@typescript-eslint/parser': '^6.19.0',
      'eslint': '^8.56.0',
      'eslint-config-prettier': '^9.1.0',
      'eslint-plugin-svelte': '^2.35.1',
      'prettier': '^3.2.4',
      'prettier-plugin-svelte': '^3.2.2',
      'svelte-check': '^3.6.3',
      'svelte': '^4.2.9',
      'tslib': '^2.6.2',
      'typescript': '^5.3.3',
      'vite': '^5.1.0',
      'vitest': '^1.2.2'
    },
    scripts: {
      'dev': 'vite dev',
      'build': 'vite build',
      'preview': 'vite preview',
      'check': 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
      'check:watch': 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch',
      'test': 'playwright test',
      'lint': 'prettier --check . && eslint .',
      'format': 'prettier --write .'
    },
    configFiles: ['svelte.config.js', 'vite.config.ts', 'tsconfig.json'],
    entryFile: 'src/routes/+page.svelte',
    extensions: ['.svelte', '.ts'],
    hasTypeScript: true
  }
};

export function getFrameworkChoices() {
  return Object.values(SUPPORTED_FRAMEWORKS).map(framework => ({
    title: framework.displayName,
    value: framework.name
  }));
}

export function getFrameworkConfig(framework: string): FrameworkConfig {
  const config = SUPPORTED_FRAMEWORKS[framework];
  if (!config) {
    throw new Error(`Unsupported framework: ${framework}`);
  }
  return config;
}

export function detectFramework(projectPath: string): string | null {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Check for framework-specific dependencies
    if (dependencies['@angular/core']) return 'angular';
    if (dependencies['vue']) return dependencies['typescript'] ? 'vue-ts' : 'vue';
    if (dependencies['svelte']) return dependencies['typescript'] ? 'svelte-ts' : 'svelte';
    if (dependencies['react']) return dependencies['typescript'] ? 'react-ts' : 'react';

    return null;
  } catch (error) {
    return null;
  }
}

export function validateFramework(framework: string): boolean {
  return framework in SUPPORTED_FRAMEWORKS;
}
