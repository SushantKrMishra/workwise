//Tech Stack & Dependencies
Node.js + Express.js (REST API)
PostgreSQL (Database)
Prisma/Sequelize (ORM)
JWT (Authentication)
BCrypt (Password hashing)
Zod/Joi (Input validation)
Dotenv (Environment variables)

//Tables

Users

id (UUID, Primary Key)
name
email (Unique)
password
role (SELLER or BUYER)
createdAt, updatedAt

Products

id (UUID, Primary Key)
sellerId (Foreign Key → Users)
name
category
description
price
discount
createdAt, updatedAt

Cart
id (UUID, Primary Key)
buyerId (Foreign Key → Users)
productId (Foreign Key → Products)
quantity
createdAt, updatedAt


//API Endpoints

Authentication
POST /auth/signup → Register (Seller/Buyer)
POST /auth/login → Login (JWT-based)

Seller Routes
POST /products → Add Product
PUT /products/:id → Edit Product
DELETE /products/:id → Delete Product

Buyer Routes
GET /products → Search Products (by name/category)
POST /cart → Add to Cart
DELETE /cart/:id → Remove from Cart
GET /cart → View Cart