# Smart Cart-frontend

**Smart Cart** is a modern, full-featured e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a seamless shopping experience with features like user authentication, product listings with image upload option, real-time cart updates,total sales(for Seller) customer support, and secure checkout.

## Features

- User-friendly UI with responsive design
- Product search and filter functionality
- Add-to-cart and remove-from-cart options
- Size and quantity selection
- Secure user authentication (JWT-based)
- Admin, Seller, Buyer dashboard  
- Customer reviews and ratings
- Order placement and delivery tracking
- Customer Support 
- Optimized backend 

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)


# Backend for E-Shop(Smart Cart)

This readme is for the backend server of the Smart Cart E-commerce web application. Built with Node.js, Express, and MongoDB, it handles all core functionalities including user authentication, product management, cart operations, order processing, reviews & ratings.

## Features

## User Authentication

- JWT-based login/signup
- Role-based access (Admin, User(Seller, Non-Seller))

## Product Management

- Add products (Seller)
- Fetch product lists & single product (Public)
- Buy Products

## Cart Functionality

- Add to cart
- Remove from cart

##  Order Processing

- Create orders
- Track order status(Seller/Buyer)
- Manage delivery status(Seller)

## Customer Support

- Ask for product recommendation(Public)
- Recommend product according to the requirement of user(MistralAI)

## Review & Rating

- Can review and rate the product after it is being delivered
- Will automatically popup after the delivery of product
- Reviews will be shown under the specific product page

## Image Upload Via Cloudinary

## CORS Enabled for Frontend Integeration

## How to Run?

- Clone both repositories into local desktop e.g smartcart-frontend, backend-for-smartcart.
- Install all dependencies by running command in both folders. e.g npm i.
- After installing dependencies, run "npm run dev" in "smartcart-frontend" and "node index" in backend-for-smartcart" to run website.

