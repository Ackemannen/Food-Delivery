# Foodel - Food Delivery Platform

A full-stack food delivery application built with React, Node.js, and MongoDB. The platform consists of three main components:
- Client portal for customers to browse and order food
- Admin dashboard for restaurant management 
- Backend API server handling data and business logic

## Features

### Customer Portal
- Browse food items by category
- Add/remove items to cart
- User authentication
- Secure checkout with Stripe
- Order tracking
- Order history
- Responsive design

### Admin Dashboard
- Add new food items
- Upload food images
- Manage food catalog
- Track orders
- Update order status
- Basic analytics

### Backend
- RESTful API
- MongoDB database
- JWT authentication
- File upload handling
- Stripe payment integration
- Order management

## Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment**: Stripe
- **Image Upload**: Multer
- **Styling**: TailwindCSS
- **State Management**: React Context

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/food-delivery.git
````
2. Install depencencies for all components:
# Install client dependencies
cd client
npm install

# Install admin dependencies
cd ../admin
npm install

# Install server dependencies
cd ../server
npm install

3. Set up enviroment variables: Create a .env file in the server directory with:
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
