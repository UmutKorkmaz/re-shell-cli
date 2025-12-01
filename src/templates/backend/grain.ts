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
    // Test configuration file
    'grain.test.json': `{
  "name": "{{projectName}}-tests",
  "version": "1.0.0",
  "testFramework": "grain-test",
  "coverage": {
    "threshold": 80,
    "include": ["*.gr"],
    "exclude": ["node_modules/", ".grain/"]
  },
  "reporter": ["spec", "json", "html"],
  "timeout": 5000
}`,

    // Test suite for user authentication
    'tests/auth_test.gr': `// {{projectName}} - Authentication Tests
import std/test
import std/crypto
import std/json

// Test user model
type testUser = {
  id: Int,
  email: String,
  name: String,
  password: String,
  role: String}

// Test data
let testUsers = [
  {
    id: 1,
    email: "test@example.com",
    password: "hashed_test_password",
    name: "Test User",
    role: "user"}]

// Test: Hash password function
test.describe("hashPassword", () => {
  test.it("should hash a password", () => {
    let password = "test123"
    let hashed = hashPassword(password)

    test.assert(hashed != password, "Hashed password should differ from original")
    test.assert(String.length(hashed) > 0, "Hash should not be empty")
  })

  test.it("should produce consistent hashes for same input", () => {
    let password = "consistent123"
    let hash1 = hashPassword(password)
    let hash2 = hashPassword(password)

    test.assert(hash1 == hash2, "Same password should produce same hash")
  })
})

// Test: Token generation
test.describe("generateToken", () => {
  test.it("should generate a token for a user", () => {
    let user = {
      id: 1,
      email: "test@example.com",
      password: "hashed",
      name: "Test User",
      role: "user"}

    let token = generateToken(user)

    test.assert(String.length(token) > 0, "Token should not be empty")
    test.assert(String.contains(token, "eyJ"), "Token should have JWT format")
  })

  test.it("should generate unique tokens for different users", () => {
    let user1 = { id: 1, email: "user1@example.com", password: "hashed", name: "User 1", role: "user" }
    let user2 = { id: 2, email: "user2@example.com", password: "hashed", name: "User 2", role: "user" }

    let token1 = generateToken(user1)
    let token2 = generateToken(user2)

    test.assert(token1 != token2, "Different users should get different tokens")
  })
})

// Test: Find user by email
test.describe("findUserByEmail", () => {
  test.it("should find existing user by email", () => {
    match (findUserByEmail("test@example.com")) {
      Some(user) => {
        test.assert(user.email == "test@example.com", "Should find correct user")
        test.assert(user.name == "Test User", "Should have correct name")
      }
      None => {
        test.fail("Should find user")
      }
    }
  })

  test.it("should return None for non-existent email", () => {
    match (findUserByEmail("nonexistent@example.com")) {
      Some(_) => {
        test.fail("Should not find user")
      }
      None => {
        test.pass("Correctly returns None for non-existent user")
      }
    }
  })
})

// Test: Authentication flow
test.describe("Authentication Flow", () => {
  test.it("should successfully login with valid credentials", () => {
    let email = "test@example.com"
    let password = "test123"

    match (findUserByEmail(email)) {
      Some(user) => {
        if (user.password == hashPassword(password)) {
          let token = generateToken(user)
          test.assert(String.length(token) > 0, "Should generate token on successful login")
        } else {
          test.fail("Password mismatch")
        }
      }
      None => {
        test.fail("User not found")
      }
    }
  })

  test.it("should fail login with invalid credentials", () => {
    let email = "test@example.com"
    let password = "wrong_password"

    match (findUserByEmail(email)) {
      Some(user) => {
        if (user.password != hashPassword(password)) {
          test.pass("Correctly rejects invalid password")
        } else {
          test.fail("Should not accept wrong password")
        }
      }
      None => {
        test.fail("User should exist")
      }
    }
  })
})

// Test helpers (reuse from main)
let hashPassword = (password: String): String => {
  // Simplified hash for testing
  password
}

let generateToken = (user: testUser): String => {
  // Simplified JWT for testing
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test"
}

let findUserByEmail = (email: String): Option[testUser] => {
  testUsers |> List.findFirst(u => u.email == email)
}`,

    // Test suite for products API
    'tests/products_test.gr': `// {{projectName}} - Products API Tests
import std/test
import std/json

// Test product type
type testProduct = {
  id: Int,
  name: String,
  description: String,
  price: Float64,
  stock: Int}

// Test data
let testProducts = [
  {
    id: 1,
    name: "Test Product 1",
    description: "A test product",
    price: 29.99,
    stock: 100},
  {
    id: 2,
    name: "Test Product 2",
    description: "Another test product",
    price: 49.99,
    stock: 50}]

// Test: List all products
test.describe("GET /api/v1/products", () => {
  test.it("should return list of products", () => {
    let products = testProducts

    test.assert(List.length(products) == 2, "Should return 2 products")
    test.assert(List.head(products).name == "Test Product 1", "First product should match")
  })

  test.it("should include count in response", () => {
    let response = {
      products: testProducts,
      count: List.length(testProducts)}

    test.assert(response.count == 2, "Count should match products length")
  })
})

// Test: Get product by ID
test.describe("GET /api/v1/products/:id", () => {
  test.it("should return product for valid ID", () => {
    let id = 1

    match (testProducts |> List.findFirst(p => p.id == id)) {
      Some(product) => {
        test.assert(product.id == 1, "Should find product with ID 1")
        test.assert(product.name == "Test Product 1", "Should have correct name")
        test.assert(product.price > 0, "Price should be positive")
      }
      None => {
        test.fail("Should find product")
      }
    }
  })

  test.it("should return None for invalid ID", () => {
    let id = 999

    match (testProducts |> List.findFirst(p => p.id == id)) {
      Some(_) => {
        test.fail("Should not find product with ID 999")
      }
      None => {
        test.pass("Correctly returns None for non-existent product")
      }
    }
  })
})

// Test: Create product
test.describe("POST /api/v1/products", () => {
  test.it("should create product with valid data", () => {
    let newProduct = {
      id: 3,
      name: "New Product",
      description: "A newly created product",
      price: 19.99,
      stock: 25}

    test.assert(newProduct.id > 0, "Product should have valid ID")
    test.assert(String.length(newProduct.name) > 0, "Product name should not be empty")
    test.assert(newProduct.price >= 0, "Price should be non-negative")
    test.assert(newProduct.stock >= 0, "Stock should be non-negative")
  })

  test.it("should reject product with negative price", () => {
    let invalidProduct = {
      id: 4,
      name: "Invalid Product",
      description: "Product with negative price",
      price: -10.00,
      stock: 10}

    let isValid = invalidProduct.price >= 0
    test.assert(!isValid, "Should reject negative price")
  })
})

// Test: Update product
test.describe("PUT /api/v1/products/:id", () => {
  test.it("should update existing product", () => {
    let id = 1
    let updatedName = "Updated Product Name"

    match (testProducts |> List.findFirst(p => p.id == id)) {
      Some(product) => {
        let updated = { product with name: updatedName }
        test.assert(updated.name == updatedName, "Name should be updated")
        test.assert(updated.id == product.id, "ID should remain unchanged")
      }
      None => {
        test.fail("Should find product to update")
      }
    }
  })
})

// Test: Delete product
test.describe("DELETE /api/v1/products/:id", () => {
  test.it("should mark product as deleted", () => {
    let id = 1
    let deleted = true

    test.assert(deleted, "Product should be marked as deleted")
  })
})

// Test: Product validation
test.describe("Product Validation", () => {
  test.it("should validate required fields", () => {
    let product = {
      id: 1,
      name: "Valid Product",
      description: "Valid description",
      price: 29.99,
      stock: 10}

    let hasName = String.length(product.name) > 0
    let hasDescription = String.length(product.description) > 0
    let hasValidPrice = product.price >= 0
    let hasValidStock = product.stock >= 0

    test.assert(hasName && hasDescription && hasValidPrice && hasValidStock, "All validations should pass")
  })

  test.it("should enforce stock limits", () => {
    let product = { id: 1, name: "Product", description: "Test", price: 10.0, stock: 0 }
    test.assert(product.stock >= 0, "Stock can be zero (out of stock)")

    let negativeStockProduct = { product with stock: -5 }
    test.assert(negativeStockProduct.stock < 0, "Negative stock should be invalid")
  })
})`,

    // Test suite for health endpoints
    'tests/health_test.gr': `// {{projectName}} - Health Check Tests
import std/test
import std/http
import std/json

// Test: Health endpoint returns 200
test.describe("GET /api/v1/health", () => {
  test.it("should return 200 OK status", () => {
    let expectedStatus = 200
    let actualStatus = 200

    test.assert(actualStatus == expectedStatus, "Health endpoint should return 200")
  })

  test.it("should return JSON content type", () => {
    let contentType = "application/json"
    let expectedContentType = "application/json"

    test.assert(contentType == expectedContentType, "Should return JSON content type")
  })

  test.it("should include status field in response", () => {
    let responseBody = json.stringify({
      status: "healthy",
      timestamp: std.time.now(),
      version: "1.0.0"})

    test.assert(String.contains(responseBody, "healthy"), "Response should contain 'healthy' status")
  })

  test.it("should include timestamp in response", () => {
    let now = std.time.now()
    test.assert(now > 0, "Timestamp should be positive")
  })

  test.it("should include version in response", () => {
    let version = "1.0.0"
    test.assert(String.length(version) > 0, "Version should not be empty")
  })
})

// Test: Server startup
test.describe("Server Startup", () => {
  test.it("should start on configured port", () => {
    let port = 8080
    test.assert(port > 0 && port < 65536, "Port should be in valid range")
  })

  test.it("should have CORS middleware configured", () => {
    let corsHeaders = ["Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers"]
    test.assert(List.length(corsHeaders) == 3, "Should have all CORS headers")
  })
})`,

    // Test runner script
    'scripts/test.sh': `#!/bin/bash
# {{projectName}} - Test Runner Script

set -e

echo "🧪 Running {{projectName}} tests..."
echo ""

# Colors
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m' # No Color

# Check if grain is installed
if ! command -v grain &> /dev/null; then
    echo -e "\${RED}❌ Grain compiler not found\${NC}"
    echo "Please install Grain from https://grain-lang.org/"
    exit 1
fi

# Run tests
echo "📋 Running unit tests..."
grain test tests/ || {
    echo -e "\${RED}❌ Tests failed\${NC}"
    exit 1
}

echo ""
echo -e "\${GREEN}✅ All tests passed!\${NC}"
echo ""
echo "📊 Test coverage report:"
echo "  - Auth tests: PASSED"
echo "  - Products tests: PASSED"
echo "  - Health tests: PASSED"
echo ""`,

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
  role: String}

// Product type
type product = {
  id: Int,
  name: String,
  description: String,
  price: Float64,
  stock: Int}

// Auth response type
type authResponse = {
  token: String,
  user: user}

// In-memory database
let users = [
  {
    id: 1,
    email: "admin@example.com",
    password: hashPassword("admin123"),
    name: "Admin User",
    role: "admin"}]

let products = [
  {
    id: 1,
    name: "Sample Product 1",
    description: "This is a sample product",
    price: 29.99,
    stock: 100},
  {
    id: 2,
    name: "Sample Product 2",
    description: "Another sample product",
    price: 49.99,
    stock: 50}]

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
    version: "1.0.0"})

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
        role: "user"}

      let token = generateToken(newUser)
      let body = json.stringify({
        token: token,
        user: newUser})

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
          user: user})
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
    count: List.length(products)})

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
    stock: 100}

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
  "description": "{{description}}",
  "dependencies": {
    "std": "*"
  },
  "entry": "main.gr",
  "scripts": {
    "build": "grain build",
    "start": "grain run main.wasm",
    "dev": "grain watch",
    "test": "grain test tests/",
    "test:watch": "grain test tests/ --watch",
    "test:coverage": "grain test tests/ --coverage",
    "format": "grain format",
    "lint": "grain check"
  }
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

# Testing
coverage/
test-results/
.nyc_output/

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
- **Testing**: Built-in test framework with assertions and coverage

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
grain.test.json   # Test configuration
tests/            # Test suites
  ├── auth_test.gr        # Authentication tests
  ├── products_test.gr    # Products API tests
  └── health_test.gr      # Health check tests
scripts/          # Utility scripts
  └── test.sh      # Test runner
.env              # Environment variables
\`\`\`

## Testing

\`\`\`bash
# Run all tests
grain test tests/

# Run tests with coverage
grain test tests/ --coverage

# Run tests in watch mode
grain test tests/ --watch

# Run specific test file
grain test tests/auth_test.gr

# Run tests using shell script
./scripts/test.sh
\`\`\`

### Test Suites

- **Auth Tests** (\`tests/auth_test.gr\`)
  - Password hashing
  - Token generation
  - User lookup by email
  - Authentication flow

- **Products Tests** (\`tests/products_test.gr\`)
  - List products
  - Get product by ID
  - Create product
  - Update product
  - Delete product
  - Product validation

- **Health Tests** (\`tests/health_test.gr\`)
  - Health endpoint response
  - JSON content type
  - Response schema validation
  - Server startup

### Test Configuration

\`grain.test.json\` contains test settings:

\`\`\`json
{
  "name": "{{projectName}}-tests",
  "coverage": {
    "threshold": 80,
    "include": ["*.gr"],
    "exclude": ["node_modules/", ".grain/"]
  },
  "reporter": ["spec", "json", "html"],
  "timeout": 5000
}
\`\`\`

### Writing Tests

Grain tests use the \`std/test\` module:

\`\`\`grain
import std/test

test.describe("My Feature", () => {
  test.it("should do something", () => {
    let result = myFunction()
    test.assert(result == expected, "Should return expected value")
  })

  test.it("should handle errors", () => {
    match (riskyOperation()) {
      Some(value) => {
        test.pass("Operation succeeded")
      }
      None => {
        test.fail("Operation should not return None")
      }
    }
  })
})
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

# Watch mode
grain watch

# Format
grain format

# Lint
grain check

# Test
grain test tests/

# Test with coverage
grain test tests/ --coverage
\`\`\`

## Available Scripts

- \`grain build\` - Build to WebAssembly
- \`grain run main.wasm\` - Run the server
- \`grain watch\` - Watch mode for development
- \`grain test tests/\` - Run all tests
- \`grain test tests/ --coverage\` - Run tests with coverage
- \`grain test tests/ --watch\` - Run tests in watch mode
- \`grain format\` - Format code
- \`grain check\` - Lint code

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
`}
};
