import { BaseTemplate, TemplateFile, TemplateContext } from '../index';
import { FrameworkConfig } from '../../utils/framework';

export class NextJsTemplate extends BaseTemplate {
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

    // Next.js config
    files.push({
      path: 'next.config.js',
      content: this.generateNextConfig()
    });

    // TypeScript config
    if (hasTypeScript) {
      files.push({
        path: 'tsconfig.json',
        content: this.generateTsConfig()
      });
    }

    // Tailwind config
    files.push({
      path: 'tailwind.config.ts',
      content: this.generateTailwindConfig()
    });

    // PostCSS config
    files.push({
      path: 'postcss.config.js',
      content: this.generatePostcssConfig()
    });

    // ESLint config
    files.push({
      path: '.eslintrc.json',
      content: this.generateEslintConfig()
    });

    // App Router structure
    files.push({
      path: 'src/app/layout.tsx',
      content: this.generateLayout()
    });

    files.push({
      path: 'src/app/page.tsx',
      content: this.generateHomePage()
    });

    files.push({
      path: 'src/app/globals.css',
      content: this.generateGlobalsCss()
    });

    // API routes
    files.push({
      path: 'src/app/api/hello/route.ts',
      content: this.generateApiRoute()
    });

    files.push({
      path: 'src/app/api/users/route.ts',
      content: this.generateUsersApiRoute()
    });

    // Example dynamic route
    files.push({
      path: 'src/app/posts/[id]/page.tsx',
      content: this.generateDynamicRoute()
    });

    // Server component example
    files.push({
      path: 'src/app/components/ServerComponent.tsx',
      content: this.generateServerComponent()
    });

    // Client component example
    files.push({
      path: 'src/app/components/ClientComponent.tsx',
      content: this.generateClientComponent()
    });

    // Data fetching example
    files.push({
      path: 'src/app/lib/data.ts',
      content: this.generateDataLib()
    });

    // Types
    files.push({
      path: 'src/app/types/index.ts',
      content: this.generateTypes()
    });

    // Environment config
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

    // .dockerignore
    files.push({
      path: '.dockerignore',
      content: this.generateDockerIgnore()
    });

    // .gitignore
    files.push({
      path: '.gitignore',
      content: this.generateGitIgnore()
    });

    return files;
  }

  protected generatePackageJson() {
    return {
      name: this.context.normalizedName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        'type-check': 'tsc --noEmit'
      },
      dependencies: {
        next: '^14.1.0',
        react: '^18.2.0',
        'react-dom': '^18.2.0'
      },
      devDependencies: {
        '@types/node': '^20.11.0',
        '@types/react': '^18.2.48',
        '@types/react-dom': '^18.2.18',
        'autoprefixer': '^10.4.17',
        'eslint': '^8.56.0',
        'eslint-config-next': '^14.1.0',
        'postcss': '^8.4.33',
        tailwindcss: '^3.4.1',
        typescript: '^5.3.3'
      }
    };
  }

  protected generateNextConfig() {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
`;
  }

  protected generateTsConfig() {
    return JSON.stringify({
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
        paths: {
          '@/*': ['./src/*']
        }
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules']
    }, null, 2);
  }

  protected generateTailwindConfig() {
    return `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
    },
  },
  plugins: [],
}
export default config
`;
  }

  protected generatePostcssConfig() {
    return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
  }

  protected generateEslintConfig() {
    return JSON.stringify({
      extends: 'next/core-web-vitals'
    }, null, 2);
  }

  protected generateLayout() {
    return `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '${this.context.name}',
  description: '${this.context.description}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`;
  }

  protected generateHomePage() {
    return `import ClientComponent from '@/app/components/ClientComponent'
import { getPosts } from '@/app/lib/data'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to ${this.context.name}</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Server-Side Rendered Posts</h2>
          <div className="grid gap-4">
            {posts.map((post) => (
              <div key={post.id} className="border p-4 rounded-lg">
                <h3 className="text-xl font-medium">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        <ClientComponent />
      </div>
    </main>
  )
}
`;
  }

  protected generateGlobalsCss() {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
`;
  }

  protected generateApiRoute() {
    return `import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({
    message: 'Hello from Next.js API Route!',
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({
    message: 'Data received',
    data: body,
  })
}
`;
  }

  protected generateUsersApiRoute() {
    return `import { NextResponse } from 'next/server'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

export async function GET() {
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newUser = { id: users.length + 1, ...body }
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}
`;
  }

  protected generateDynamicRoute() {
    return `import { notFound } from 'next/navigation'
import { getPostById } from '@/app/lib/data'

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getPostById(parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">{post.date}</p>
        <div className="prose">{post.content}</div>
      </article>
    </main>
  )
}
`;
  }

  protected generateServerComponent() {
    return `import { getServerData } from '@/app/lib/data'

export default async function ServerComponent() {
  const data = await getServerData()

  return (
    <div className="border p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4">Server Component</h3>
      <p className="text-gray-600 mb-4">
        This component is rendered on the server with real data:
      </p>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
`;
  }

  protected generateClientComponent() {
    return `'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="border p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4">Client Component</h3>
      <p className="text-gray-600 mb-4">
        This component uses React hooks for interactivity:
      </p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        Count: {count}
      </button>
    </div>
  )
}
`;
  }

  protected generateDataLib() {
    return `// Simulated data fetching functions

export async function getPosts() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return [
    {
      id: 1,
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn about the new App Router and Server Components',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Server Actions in Next.js',
      excerpt: 'Mutations made easy with Server Actions',
      date: '2024-01-14',
    },
    {
      id: 3,
      title: 'Static Site Generation with Next.js',
      excerpt: 'Build lightning-fast static sites',
      date: '2024-01-13',
    },
  ]
}

export async function getPostById(id: number) {
  const posts = await getPosts()
  return posts.find(post => post.id === id) || null
}

export async function getServerData() {
  return {
    message: 'Data fetched on server',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }
}
`;
  }

  protected generateTypes() {
    return `export interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  content?: string
}

export interface User {
  id: number
  name: string
  email: string
}
`;
  }

  protected generateEnvExample() {
    return `# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# API Keys
NEXT_PUBLIC_API_URL=http://localhost:3000
API_SECRET_KEY=your-secret-key

# Features
NEXT_PUBLIC_ANALYTICS_ID=
`;
  }

  protected generateReadme() {
    return `# ${this.context.name}

${this.context.description}

Built with Next.js 14, TypeScript, Tailwind CSS, and App Router.

## Features

- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Server Components**: React Server Components for performance
- **API Routes**: Built-in API routes for backend functionality
- **SSR/SSG**: Server-Side Rendering and Static Site Generation
- **Docker**: Container support for deployment

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
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

\`\`\`bash
npm run build
npm run start
\`\`\`

## Project Structure

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (SSR)
│   ├── globals.css         # Global styles
│   ├── api/                # API routes
│   │   ├── hello/route.ts  # Example API route
│   │   └── users/route.ts  # Users CRUD API
│   ├── posts/[id]/page.tsx # Dynamic route (SSG)
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
└── public/                # Static assets
\`\`\`

## App Router Features

### Server Components (Default)

All components in the \`app\` directory are Server Components by default:

\`\`\`tsx
// This runs on the server
export default async function Page() {
  const data = await fetchData() // Direct async!
  return <div>{data}</div>
}
\`\`\`

### Client Components

Add \`'use client'\` for interactivity:

\`\`\`tsx
'use client'

import { useState } from 'react'

export default function Interactive() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

### API Routes

Create API routes in the \`app/api\` directory:

\`\`\`ts
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}
\`\`\`

### Dynamic Routes

Use brackets for dynamic segments:

\`\`\`ts
// app/posts/[id]/page.tsx
export default async function Post({ params }) {
  const post = await getPost(params.id)
  return <div>{post.title}</div>
}
\`\`\`

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

### Vercel (Recommended)

Deploy to Vercel with zero configuration:

\`\`\`bash
vercel
\`\`\`

### Other Platforms

Build the application and start the server:

\`\`\`bash
npm run build
npm run start
\`\`\`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## License

MIT
`;
  }

  protected generateDockerfile() {
    return `# Multi-stage Dockerfile for Next.js

# Dependencies stage
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies based on package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
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
      - NODE_ENV=production
    restart: unless-stopped
`;
  }

  protected generateDockerIgnore() {
    return `node_modules
.next
.git
.env*.local
*.md
`;
  }

  protected generateGitIgnore() {
    return `# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/
build
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;
  }
}
