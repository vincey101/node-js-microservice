# E-commerce Microservices Application

This project is a microservices-based architecture for an e-commerce platform with separate services for User, Product, Order, and Payment management. Each service is isolated and communicates with other services via RESTful APIs.

## Table of Contents

1. [Services](#services)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Services](#running-the-services)
5. [Service Routes and Postman Examples](#service-routes-and-postman-examples)
    - [User Service](#user-service)
    - [Product Service](#product-service)
    - [Order Service](#order-service)
    - [Payment Service](#payment-service)
6. [Environment Variables](#environment-variables)
7. [Inter-Service Communication](#inter-service-communication)
8. [Service Discovery and Load Balancing](#service-discovery-and-load-balancing)
9. [Logging and Monitoring](#logging-and-monitoring)

---

## Services

The project is divided into the following microservices:

1. **User Service** - Manages user information (sign-up, login, etc.).
2. **Product Service** - Handles product catalog and inventory.
3. **Order Service** - Manages user orders, including communication with the User and Product services.
4. **Payment Service** - Processes payments and updates the order status.

---

## Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/) for API testing
- [Docker](https://www.docker.com/products/docker-desktop) (optional for containerization)

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/ecommerce-microservices.git
    cd ecommerce-microservices
    ```

2. Navigate to each service directory (e.g., `user-service`, `product-service`) and install the dependencies:
    ```bash
    cd user-service
    npm install
    cd ../product-service
    npm install
    cd ../order-service
    npm install
    cd ../payment-service
    npm install
    ```

---

## Running the Services

To run each service, use `npm start` in the respective service directory:

```bash
# Start User Service
cd user-service
npm start

# Start Product Service
cd ../product-service
npm start

# Start Order Service
cd ../order-service
npm start

# Start Payment Service
cd ../payment-service
npm start


Each service will run on its own port as defined in the .env files.

Service Routes and Postman Examples
User Service
Base URL: http://localhost:4000
1. Register a New User
Endpoint: /users/register
Method: POST
Body (raw JSON):
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
2. User Login
Endpoint: /users/login
Method: POST
Body (raw JSON):
json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Product Service
Base URL: http://localhost:4001
1. Add a Product
Endpoint: /products
Method: POST
Body (raw JSON):
json
Copy code
{
  "name": "Product A",
  "description": "High-quality product",
  "price": 49.99
}
2. Get All Products
Endpoint: /products
Method: GET
Order Service
Base URL: http://localhost:4002
1. Create an Order
Endpoint: /orders
Method: POST
Body (raw JSON):
json
Copy code
{
  "userId": "64f6c45120a92f23e804b2b1",
  "productId": "64f6c45120a92f23e804b2b1",
  "quantity": 2
}
2. Get Order by ID
Endpoint: /orders/:id
Method: GET
Payment Service
Base URL: http://localhost:4003
1. Create a Payment
Endpoint: /payments
Method: POST
Body (raw JSON):
json
Copy code
{
  "orderId": "64f6c45120a92f23e804b2b1",
  "amount": 99.98
}
2. Get Payment by ID
Endpoint: /payments/:id
Method: GET
Environment Variables
Each service requires its own .env file, which contains sensitive configuration values such as database URLs and API keys. Below is an example of required environment variables:

bash
Copy code
# .env file for User Service
PORT=4000
MONGO_URI=mongodb://localhost:27017/usersdb
JWT_SECRET=your_jwt_secret

# .env file for Product Service
PORT=4001
MONGO_URI=mongodb://localhost:27017/productsdb

# .env file for Order Service
PORT=4002
MONGO_URI=mongodb://localhost:27017/ordersdb
USER_SERVICE_URL=http://localhost:4000
PRODUCT_SERVICE_URL=http://localhost:4001

# .env file for Payment Service
PORT=4003
MONGO_URI=mongodb://localhost:27017/paymentsdb
ORDER_SERVICE_URL=http://localhost:4002
.gitignore Example
To ensure sensitive files are not committed to version control, the following items are included in the .gitignore file:

bash
Copy code
node_modules/
.env
package-lock.json