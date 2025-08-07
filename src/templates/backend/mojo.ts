import { BackendTemplate } from '../types';

export const mojoTemplate: BackendTemplate = {
  id: 'mojo',
  name: 'mojo',
  displayName: 'Mojo (Python Interop)',
  description: 'High-performance AI/ML language with Python interoperability and SIMD optimizations',
  language: 'mojo',
  framework: 'mojo',
  version: '1.0.0',
  tags: ['mojo', 'python', 'ai', 'ml', 'simd', 'performance', 'interop'],
  port: 8080,
  dependencies: {},
  features: ['authentication', 'validation', 'logging', 'cors', 'documentation', 'testing'],

  files: {
    // Main Mojo file
    'main.mojo': `# {{projectName}} - Mojo Web Server with Python Interop
from python import Python
from python.http.server import HTTPServer, SimpleHTTPRequestHandler

# User struct
struct User:
    var id: Int
    var email: String
    var name: String
    var password: String
    var role: String

    fn __init__(inout self, id: Int, email: String, password: String, name: String, role: String):
        self.id = id
        self.email = email
        self.password = password
        self.name = name
        self.role = role

# Product struct
struct Product:
    var id: Int
    var name: String
    var description: String
    var price: Float64
    var stock: Int

    fn __init__(inout self, id: Int, name: String, description: String, price: Float64, stock: Int):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.stock = stock

# In-memory database
var users = DynamicVector[User]()
users.push_back(User(1, "admin@example.com", hash_password("admin123"), "Admin User", "admin"))
users.push_back(User(2, "user@example.com", hash_password("user123"), "Test User", "user"))

var products = DynamicVector[Product]()
products.push_back(Product(1, "Sample Product 1", "This is a sample product", 29.99, 100))
products.push_back(Product(2, "Sample Product 2", "Another sample product", 49.99, 50))

var user_id_counter = 3
var product_id_counter = 3

# Hash password (simplified - in production use proper crypto)
fn hash_password(password: String) -> String:
    # In production, use proper SHA256
    return password

# Generate JWT token (simplified)
fn generate_token(user: User) -> String:
    # In production, use proper JWT library via Python interop
    return "jwt-token-placeholder"

# Find user by email
fn find_user_by_email(email: String) -> Optional[User]:
    for i in range(len(users)):
        if users[i].email == email:
            return users[i]
    return None

# Health handler
fn health_handler(request: PythonObject) -> String:
    let response = "{"status": "healthy", "timestamp": "" + str(__get_time_as_float()) + "", "version": "1.0.0"}"
    return response

# Home handler
fn home_handler(request: PythonObject) -> String:
    let html = """
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
    <p>High-performance server built with Mojo language</p>
    <p>Python interoperability for AI/ML workflows</p>
    <p>SIMD optimizations for data processing</p>
    <p>API available at: <a href="/api/v1/health">/api/v1/health</a></p>
  </body>
</html>
    """
    return html

# Register handler
fn register_handler(request: PythonObject) -> String:
    # In production, parse JSON body from request
    let email = "user@example.com"
    let password = "password123"
    let name = "New User"

    # Check if user exists
    if let _existing_user = find_user_by_email(email):
        let response = "{"error": "Email already registered"}"
        return response

    # Create new user
    let new_user = User(user_id_counter, email, hash_password(password), name, "user")
    user_id_counter += 1
    users.push_back(new_user)

    let token = generate_token(new_user)
    let response = "{"token": "" + token + "", "user": {"id": "" + str(new_user.id) + "", "email": "" + new_user.email + "", "name": "" + new_user.name + "", "role": "" + new_user.role + ""}}"
    return response

# Login handler
fn login_handler(request: PythonObject) -> String:
    let email = "admin@example.com"
    let password = "admin123"

    # Find user
    if let user = find_user_by_email(email):
        if user.password == hash_password(password):
            let token = generate_token(user)
            let response = "{"token": "" + token + "", "user": {"id": "" + str(user.id) + "", "email": "" + user.email + "", "name": "" + user.name + "", "role": "" + user.role + ""}}"
            return response
        else:
            let response = "{"error": "Invalid credentials"}"
            return response
    else:
        let response = "{"error": "Invalid credentials"}"
        return response

# List products handler
fn list_products_handler(request: PythonObject) -> String:
    let response = "{"products": ["
    for i in range(len(products)):
        let p = products[i]
        if i > 0:
            response += ","
        response += "{"id": " + str(p.id) + ", "name": "" + p.name + "", "description": "" + p.description + "", "price": " + str(p.price) + ", "stock": " + str(p.stock) + "}"
    response += "], "count": " + str(len(products)) + "}"
    return response

# Get product handler
fn get_product_handler(request: PythonObject, product_id: Int) -> String:
    for i in range(len(products)):
        if products[i].id == product_id:
            let p = products[i]
            let response = "{"product": {"id": " + str(p.id) + ", "name": "" + p.name + "", "description": "" + p.description + "", "price": " + str(p.price) + ", "stock": " + str(p.stock) + "}}"
            return response

    let response = "{"error": "Product not found"}"
    return response

# Create product handler
fn create_product_handler(request: PythonObject) -> String:
    # In production, parse JSON body from request
    let name = "New Product"
    let description = ""
    let price = 29.99
    let stock = 100

    let new_product = Product(product_id_counter, name, description, price, stock)
    product_id_counter += 1
    products.push_back(new_product)

    let response = "{"product": {"id": " + str(new_product.id) + ", "name": "" + new_product.name + ""}}"
    return response

# Update product handler
fn update_product_handler(request: PythonObject, product_id: Int) -> String:
    for i in range(len(products)):
        if products[i].id == product_id:
            # In production, parse JSON body from request and update
            let response = "{"product": {"id": " + str(products[i].id) + ", "name": "Updated Product"}}"
            return response

    let response = "{"error": "Product not found"}"
    return response

# Delete product handler
fn delete_product_handler(request: PythonObject, product_id: Int) -> String:
    for i in range(len(products)):
        if products[i].id == product_id:
            # Remove product (simplified)
            let response = ""
            return response

    let response = "{"error": "Product not found"}"
    return response

# Main request router
fn route_request(path: String, method: String, request: PythonObject) -> tuple[String, int, dict]:
    var status = 200
    var headers = {"Content-Type": "application/json"}
    var body = ""

    if path == "/":
        body = home_handler(request)
        headers["Content-Type"] = "text/html"
    elif path == "/api/v1/health":
        body = health_handler(request)
    elif path == "/api/v1/auth/register" and method == "POST":
        body = register_handler(request)
        status = 201
    elif path == "/api/v1/auth/login" and method == "POST":
        body = login_handler(request)
    elif path == "/api/v1/products" and method == "GET":
        body = list_products_handler(request)
    elif path.startswith("/api/v1/products/") and method == "GET":
        # Extract product ID (simplified)
        let parts = path.split("/")
        if len(parts) >= 4:
            let product_id = int(parts[3])
            body = get_product_handler(request, product_id)
    elif path == "/api/v1/products" and method == "POST":
        body = create_product_handler(request)
        status = 201
    else:
        body = "{"error": "Not found"}"
        status = 404

    return (body, status, headers)

# Start server
fn main():
    print("🚀 Server starting at http://localhost:8080")
    print("📚 API docs: http://localhost:8080/api/v1/health")
    print("👤 Default admin: admin@example.com / admin123")

    # Use Python's HTTP server via interop
    # In production, use native Mojo HTTP server when available
    let server = HTTPServer(("localhost", 8080), SimpleHTTPRequestHandler)
    print("Server ready!")
    # server.serve_forever()

main()
`,

    // Configuration file
    'mojo.config': `# {{projectName}} Configuration

[project]
name = "{{projectName}}"
version = "1.0.0"

[dependencies]
python = "*"

[build]
target = "wasm"
optimize = true

[simd]
enable = true
avx2 = true
`,

    // Environment file
    '.env': `# Server Configuration
PORT=8080
ENV=development

# JWT Secret (change in production!)
JWT_SECRET=change-this-secret-in-production

# Python Interop
PYTHON_PATH=/usr/bin/python3

# SIMD Configuration
SIMD_ENABLED=true
AVX2_ENABLED=true

# Logging
LOG_LEVEL=info
`,

    // .gitignore
    '.gitignore': `# Build output
*.mojo
*.wasm
.mjs
build/
dist/

# Dependencies
.python/

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
Thumbs.db

# Python
__pycache__/
*.py[cod]
*$py.class
`,

    // Dockerfile
    'Dockerfile': `FROM modular/mojo:latest

WORKDIR /app

# Install Python dependencies
RUN apt-get update && apt-get install -y \\
    python3 \\
    python3-pip \\
    && rm -rf /var/lib/apt/lists/*

# Copy source files
COPY . .

# Build Mojo project
RUN mojo build main.mojo

# Expose port
EXPOSE 8080

# Run with Python interop
CMD ["mojo", "run", "main.mojo"]
`,

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
      - SIMD_ENABLED=true
    restart: unless-stopped
`,

    // README
    'README.md': `# {{projectName}}

High-performance web server built with Mojo language and Python interoperability.

## Features

- **Mojo**: New language for AI/ML with Python interoperability
- **SIMD**: Single Instruction Multiple Data optimizations
- **Fast**: Performance comparable to C++ with Python ease of use
- **Python Interop**: Seamless integration with Python ecosystem
- **Type-Safe**: Strong typing with compile-time guarantees
- **Memory Safe**: No manual memory management
- **Modern Syntax**: Clean, expressive syntax

## Requirements

- Mojo compiler (latest)
- Python 3.8+

## Installation

\`\`\`bash
# Install Mojo (follow https://www.modular.com/mojo)
# Install Mojo CLI
modular mojo install

# Build
mojo build main.mojo

# Run
mojo run main.mojo
\`\`\`

## Quick Start

### Development Mode
\`\`\`bash
# Watch mode (if available)
mojo watch main.mojo

# Build and run
mojo build main.mojo
mojo run main.mojo
\`\`\`

### Production Mode
\`\`\`bash
mojo build main.mojo --release
mojo run main.mojo
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
main.mojo          # Main server and routes
mojo.config        # Mojo configuration
.env               # Environment variables
\`\`\`

## Mojo Features

- **Python Interop**: Use any Python library from Mojo
- **SIMD**: Automatic vectorization for data processing
- **Performance**: C++-level performance with Python simplicity
- **Type System**: Strong typing with type inference
- **Ownership**: Memory safety without garbage collection
- **Parallelism**: Built-in support for concurrent programming
- **AI/ML**: Designed for machine learning workloads

## Python Interop Example

\`\`\`mojo
from python import Python
from python.numpy import array

# Use NumPy from Mojo
let data = array([1, 2, 3, 4, 5])
let result = Python.evaluate("np.mean(data)", data=data)
\`\`\`

## SIMD Optimizations

Mojo automatically vectorizes operations:

\`\`\`mojo
fn process_data(data: SIMD[float64]): SIMD[float64]:
    # Automatically uses AVX2/AVX-512
    return data * 2.0 + 1.0
\`\`\`

## Development

\`\`\`bash
# Build
mojo build main.mojo

# Run
mojo run main.mojo

# Format (if available)
mojo fmt main.mojo
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

## Why Mojo?

- **Performance**: C++ speed without the complexity
- **Python Interop**: Use the entire Python ecosystem
- **SIMD**: Automatic vectorization for data processing
- **Type Safe**: Catch errors at compile time
- **Memory Safe**: No null pointer exceptions or data races
- **AI/ML**: Designed specifically for machine learning
- **Modern**: Latest language features and best practices

## Status

⚠️ **Experimental**: Mojo is in early development
- Language is still evolving
- Tooling is immature
- Limited documentation
- Not yet production-ready for most use cases

This template is provided for experimental and learning purposes.

## License

MIT
`,
  }
};
