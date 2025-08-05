# DigitalDokan - an ecommerce solution

[![Node.js](https://img.shields.io/badge/Node.js-22.x+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.15.0-green.svg)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-blue.svg)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.4-blue.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## About the Project
DigitalDokan is an ecommerce platform developed to provide a comprehensive solution to the ecommerce market faciliatating the individual merchants to reach the customers effortlessly and vice-versa. It is a fullstack application built using MERN stack.

## Features
 ### User 
 - **Authentication**: JWT based user authentication with password recovery
 - **Product Catalog**: User can browse, search and filter the products
 - **Shopping Cart**: Cart Management with redux and persisted state with local storage  
 - **Reviews & Ratings**: User can give their reviews and ratings
 - **Order Tracking**: User can track their order status 

 ### Admin
 - **📊 Analytics Dashboard**: Sales metrics, user statistics, revenue tracking
 - **📦 Product Management**: CRUD operations with image preview while uploading
 - **📋 Order Management**: View Order Details and update order and payment status
 - **👥 User Management**: View and manage users
 
 
## Tech Stack

 ### Frontend
 - ReactJs
 - TailwindCSS
 - React Hook Form
 - Redux
 - React Router

 ### Backend
 - NodeJs
 - ExpressJs
 - MongoDB/Mongoose
 - JWT
 - bcryptjs
 - Multer
 - Cloudinary
 - Nodemailer
 
## Installation
```bash
# clone the repository
git clone https://github.com/pratikgiri10/ecommerce.git

# navigate to frontend for client side and install dependencies
cd frontend
npm install

# navigate to backend for server side and install dependencies
cd backend
npm install

# configure frontend .env file
VITE_DOMAIN=
VITE_NODE_ENV=

# configure backend .env file
MONGO_URI=
PORT=
NODE_ENV=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
SMTP_HOST=
SMTP_PORT=
SMTP_EMAIL=
SMTP_PASS=

# for starting frontend development server
npm run dev

# for starting backend development server
npm start
```
## API Documentation

## Contribution
Contributions are always welcome! Please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License.
