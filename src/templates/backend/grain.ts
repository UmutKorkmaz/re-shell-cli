import { BackendTemplate } from '../types';

export const grainTemplate: BackendTemplate = {
  id: 'grain',
  name: 'grain',
  displayName: 'Grain (WebAssembly)',
  description: 'WebAssembly-first language with memory safety and modern syntax for server applications',
  language: 'grain',
  framework: 'grain',
  version: '1.0.0',
  tags: ['grain', 'webassembly', 'wasm', 'wasi', 'memory-safe', 'modern'],
  port: 8080,
  dependencies: {},
  features: ['authentication', 'validation', 'logging', 'cors', 'documentation', 'testing'],

  files: {
    // Main Grain file
    'main.gr': `// {{projectName}} - Grain WebAssembly Server
import std/http
import std/crypto
import std/json

// User type
type user = {
  id: Int,
  email: String,
  name: String,
  password: String,
  role: String,
}

// Product type
type product = {
  id: Int,
  name: String,
  description: String,
  price: Float64,
  stock: Int,
}

// Auth response type
type authResponse = {
  token: String,
  user: user,
}

// In-memory database
let users = [
  {
    id: 1,
    email: "admin@example.com",
    password: hashPassword("admin123"),
    name: "Admin User",
    role: "admin",
  },
]

let products = [
  {
    id: 1,
    name: "Sample Product 1",
    description: "This is a sample product",
    price: 29.99,
    stock: 100,
  },
  {
    id: 2,
    name: "Sample Product 2",
    description: "Another sample product",
    price: 49.99,
    stock: 50,
  },
]

// Hash password (simplified)
let hashPassword = (password: String): String => {
  // In production, use proper SHA256
  password
}

// Generate JWT token (simplified)
let generateToken = (user: user): String => {
  // In production, use proper JWT
  "jwt-token-placeholder"
}

// Find user by email
let findUserByEmail = (email: String): Option[user] => {
  users |> List.findFirst(u => u.email == email)
}

// Health handler
let healthHandler = (_request: http.Request): http.Response => {
  let body = json.stringify({
    status: "healthy",
    timestamp: std.time.now(),
    version: "1.0.0",
  })

  http.Response.ok(body)
    |> http.Response.withHeader("Content-Type", "application/json")
}

// Home handler
let homeHandler = (_request: http.Request): http.Response => {
  let html = \`
<!DOCTYPE html>
<html>
  <head>
    <title>{{projectName}}</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
      h1 { color: #333; }
    </style>
  </head>
  <body>
    <h1>Welcome to {{projectName}}</h1>
    <p>WebAssembly server built with Grain language</p>
    <p>Memory-safe with modern syntax</p>
    <p>API available at: <a href="/api/v1/health">/api/v1/health</a></p>
  </body>
</html>
  \`

  http.Response.ok(html)
    |> http.Response.withHeader("Content-Type", "text/html")
}

// Register handler
let registerHandler = (request: http.Request): http.Response => {
  // In production, parse JSON body
  let email = "user@example.com"
  let password = "password123"
  let name = "New User"

  // Check if user exists
  match (findUserByEmail(email)) {
    Some(_user) => {
      let body = json.stringify({ error: "Email already registered" })
      http.Response.conflict(body)
        |> http.Response.withHeader("Content-Type", "application/json")
    }
    None => {
      // Create user
      let newUser = {
        id: List.length(users) + 1,
        email: email,
        password: hashPassword(password),
        name: name,
        role: "user",
      }

      let token = generateToken(newUser)
      let body = json.stringify({
        token: token,
        user: newUser,
      })

      http.Response.created(body)
        |> http.Response.withHeader("Content-Type", "application/json")
    }
  }
}

// Login handler
let loginHandler = (_request: http.Request): http.Response => {
  let email = "admin@example.com"
  let password = "admin123"

  match (findUserByEmail(email)) {
    None => {
      let body = json.stringify({ error: "Invalid credentials" })
      http.Response.unauthorized(body)
        |> http.Response.withHeader("Content-Type", "application/json")
    }
    Some(user) => {
      if (user.password == hashPassword(password)) {
        let token = generateToken(user)
        let body = json.stringify({
          token: token,
          user: user,
        })
        http.Response.ok(body)
          |> http.Response.withHeader("Content-Type", "application/json")
      } else {
        let body = json.stringify({ error: "Invalid credentials" })
        http.Response.unauthorized(body)
          |> http.Response.withHeader("Content-Type", "application/json")
      }
    }
  }
}

// List products handler
let listProductsHandler = (_request: http.Request): http.Response => {
  let body = json.stringify({
    products: products,
    count: List.length(products),
  })

  http.Response.ok(body)
    |> http.Response.withHeader("Content-Type", "application/json")
}

// Get product handler
let getProductHandler = (request: http.Request): http.Response => {
  let idStr = request |> http.Request.getParam("id")

  match (Int.fromString(idStr)) {
    None => {
      let body = json.stringify({ error: "Invalid product ID" })
      http.Response.badRequest(body)
        |> http.Response.withHeader("Content-Type", "application/json")
    }
    Some(id) => {
      match (products |> List.findFirst(p => p.id == id)) {
        None => {
          let body = json.stringify({ error: "Product not found" })
          http.Response.notFound(body)
            |> http.Response.withHeader("Content-Type", "application/json")
        }
        Some(product) => {
          let body = json.stringify({ product: product })
          http.Response.ok(body)
            |> http.Response.withHeader("Content-Type", "application/json")
        }
      }
    }
  }
}

// Create product handler
let createProductHandler = (_request: http.Request): http.Response => {
  // In production, parse JSON body
  let newProduct = {
    id: List.length(products) + 1,
    name: "New Product",
    description: "",
    price: 29.99,
    stock: 100,
  }

  let body = json.stringify({ product: newProduct })
  http.Response.created(body)
    |> http.Response.withHeader("Content-Type", "application/json")
}

// Update product handler
let updateProductHandler = (request: http.Request): http.Response => {
  let idStr = request |> http.Request.getParam("id")

  match (Int.fromString(idStr)) {
    None => {
      let body = json.stringify({ error: "Invalid product ID" })
      http.Response.badRequest(body)
        |> http.Response.withHeader("Content-Type", "application/json")
    }
    Some(id) => {
      match (products |> List.findFirst(p => p.id == id)) {
        None => {
          let body = json.stringify({ error: "Product not found" })
          http.Response.notFound(body)
            |> http.Response.withHeader("Content-Type", "application/json")
        }
        Some(product) => {
          // In production, parse JSON body and update
          let updatedProduct = { product with name: "Updated Product" }
          let body = json.stringify({ product: updatedProduct })
          http.Response.ok(body)
            |> http.Response.withHeader("Content-Type", "application/json")
        }
      }
    }
  }
}

// Delete product handler
let deleteProductHandler = (request: http.Request): http.Response => {
  let idStr = request |> http.Request.getParam("id")

  match (Int.fromString(idStr)) {
    None => {
      let body = json.stringify({ error: "Invalid product ID" })
      http.Response.badRequest(body)
        |> http.Response.withHeader("Content-Type", "application/json")
    }
    Some(id) => {
      match (products |> List.findFirst(p => p.id == id)) {
        None => {
          let body = json.stringify({ error: "Product not found" })
          http.Response.notFound(body)
            |> http.Response.withHeader("Content-Type", "application/json")
        }
        Some(_product) => {
          // In production, delete from database
          http.Response.noContent()
        }
      }
    }
  }
}

// CORS middleware
let corsMiddleware = (request: http.Request, next: () -> http.Response): http.Response => {
  let response = next()

  response
    |> http.Response.withHeader("Access-Control-Allow-Origin", "*")
    |> http.Response.withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    |> http.Response.withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

// Main server setup
let main = () => {
  let server = http.Server.make(8080)

  // Add CORS middleware
  server |> http.Server.withMiddleware(corsMiddleware)

  // Home route
  server |> http.Server.get("/", homeHandler)

  // Health check
  server |> http.Server.get("/api/v1/health", healthHandler)

  // Auth routes
  server |> http.Server.post("/api/v1/auth/register", registerHandler)
  server |> http.Server.post("/api/v1/auth/login", loginHandler)

  // Product routes
  server |> http.Server.get("/api/v1/products", listProductsHandler)
  server |> http.Server.get("/api/v1/products/:id", getProductHandler)
  server |> http.Server.post("/api/v1/products", createProductHandler)
  server |> http.Server.put("/api/v1/products/:id", updateProductHandler)
  server |> http.Server.delete("/api/v1/products/:id", deleteProductHandler)

  // Start server
  server |> http.Server.start(() => {
    std.log("🚀 Server running at http://localhost:8080")
    std.log("📚 API docs: http://localhost:8080/api/v1/health")
  })
}

// Run main
main()`,

    // Grain configuration
    'grain.json': `{
  "name": "{{projectName}}",
  "version": "1.0.0",
  "dependencies": {
    "std": "*"
  },
  "entry": "main.gr"
}`,

    // Environment file
    '.env': `# Server Configuration
PORT=8080
ENV=development

# JWT Secret (change in production!)
JWT_SECRET=change-this-secret-in-production

# CORS
CORS_ORIGIN=*

# Logging
LOG_LEVEL=info`,

    // .gitignore
    '.gitignore': `# Build output
.wasm
.mjs
.grain/

# Dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs
*.log

# OS
.DS_Store
Thumbs.db`,

    // Dockerfile
    'Dockerfile': `FROM ghcr.io/grain-lang/grain:latest

WORKDIR /app

# Copy source files
COPY . .

# Build Grain project to WebAssembly
RUN grain build

# Expose port
EXPOSE 8080

# Run WebAssembly module
CMD ["grain", "run", "main.wasm"]`,

    // Docker Compose
    'docker-compose.yml': `version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ENV=production
      - PORT=8080
      - JWT_SECRET=change-this-secret
    restart: unless-stopped`,

    // README
    'README.md': `# {{projectName}}

WebAssembly-first server built with Grain language with memory safety.

## Features

- **Grain**: Modern language compiling to WebAssembly
- **Memory Safety**: Rust-like memory guarantees without manual management
- **WebAssembly**: Near-native performance in a sandbox
- **Type-Safe**: Strong typing with compile-time guarantees
- **Modern Syntax**: Clean, expressive syntax
- **HTTP Module**: Built-in HTTP server in standard library
- **JSON Support**: Native JSON handling

## Requirements

- Grain compiler (latest)
- WebAssembly runtime

## Installation

\`\`\`bash
# Install Grain (follow https://grain-lang.org/)
# Clone the repository
git clone https://github.com/grain-lang/grain

# Build to WebAssembly
grain build

# Run
grain run main.wasm
\`\`\`

## Quick Start

### Development Mode
\`\`\`bash
# Watch mode (if available)
grain watch

# Build
grain build

# Run
grain run main.wasm
\`\`\`

### Production Mode
\`\`\`bash
grain build
grain run main.wasm
\`\`\`

Visit http://localhost:8080

## API Endpoints

### Health
- \`GET /api/v1/health\` - Health check

### Authentication
- \`POST /api/v1/auth/register\` - Register new user
- \`POST /api/v1/auth/login\` - Login user

### Products
- \`GET /api/v1/products\` - List all products
- \`GET /api/v1/products/:id\` - Get product by ID
- \`POST /api/v1/products\` - Create product
- \`PUT /api/v1/products/:id\` - Update product
- \`DELETE /api/v1/products/:id\` - Delete product

## Default Credentials

- Email: \`admin@example.com\`
- Password: \`admin123\`

## Project Structure

\`\`\`
main.gr           # Main server and routes
grain.json        # Grain configuration
.env              # Environment variables
\`\`\`

## Grain Features

- **WebAssembly**: Compiles to WASM for portable, sandboxed execution
- **Memory Safety**: No null pointers, no data races
- **Modern Syntax**: Influenced by OCaml, Rust, and Elm
- **Pattern Matching**: Powerful destructuring and matching
- **Type Inference**: Most types inferred automatically
- **Immutable**: Default immutable data structures
- **Module System**: Organize code into modules
- **Standard Library**: HTTP, JSON, crypto, and more

## Performance

WebAssembly provides:
- Near-native performance
- Sandboxed execution
- Portable across platforms
- Small binary sizes
- Fast startup times

## Development

\`\`\`bash
# Build
grain build

# Run
grain run main.wasm

# Format (if available)
grain format
\`\`\`

## Docker

\`\`\`bash
docker build -t {{projectName}} .
docker run -p 8080:8080 {{projectName}}
\`\`\`

Or with Docker Compose:

\`\`\`bash
docker-compose up
\`\`\`

## Why Grain?

- **Memory Safe**: No manual memory management
- **WebAssembly**: Run anywhere with near-native speed
- **Modern**: Clean syntax and type system
- **Safe**: Compile-time guarantees eliminate runtime errors
- **Portable**: WebAssembly runs on any platform
- **Efficient**: Small binary sizes and fast startup

## Status

⚠️ **Experimental**: Grain is in early development
- Syntax and APIs may change
- Tooling is immature
- Limited documentation
- Not yet production-ready

This template is provided for experimental and learning purposes.

## License

MIT
`,
  }
};
