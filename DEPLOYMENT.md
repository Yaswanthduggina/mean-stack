# Pharma Marketplace - Deployment Guide

## Overview
This is a complete MEAN stack application for a Pharma Marketplace where farmers sell pharmaceutical products directly to customers. The application is containerized and ready for cloud deployment.

## Project Structure
```
pharma-marketplace/
├── backend/              # Node.js + Express + MongoDB backend
│   ├── models/          # Database schemas
│   ├── controllers/      # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth and custom middleware
│   ├── utils/           # Utilities
│   ├── server.js        # Main server file
│   ├── dbConfig.js      # MongoDB connection
│   ├── Dockerfile       # Container configuration
│   └── package.json
│
├── frontend/            # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   └── assets/
│   ├── Dockerfile       # Container configuration
│   ├── nginx.conf       # Nginx configuration
│   └── package.json
│
├── docker-compose.yml   # Multi-container orchestration
└── README.md
```

## Features

### Backend Features
- **Authentication**: JWT-based authentication with role-based access control
- **Users**: One-click registration for farmers and customers
- **Products**: CRUD operations for pharma products
- **Orders**: Complete order management system
- **Database**: MongoDB with Mongoose ORM

### Frontend Features
- **Home Page**: Landing page with marketplace information
- **Authentication**: Login and registration for both roles
- **Product Browsing**: Search and filter by category
- **Shopping Cart**: Add/remove products, update quantities
- **Checkout**: Order placement with shipping address and payment method selection
- **Farmer Dashboard**: Manage products and track orders
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites
- Docker and Docker Compose installed
- Node.js v18+ (if running locally without Docker)
- MongoDB Atlas account (for cloud deployment)
- Git

## Local Development Setup

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   cd mean_stack
   ```

2. **Configure environment variables**
   - Copy `.env.example` to `.env` in the backend folder
   - Update MongoDB URI and JWT secret

3. **Build and run containers**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Option 2: Running Locally (Without Docker)

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

## Database Setup

### Using MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Create a new M0 (free) cluster
   - Wait for cluster to be deployed (5-10 minutes)

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect Your Application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update .env file**
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pharma-marketplace?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```

### Using Local MongoDB

```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod

# Set MONGO_URI in .env
MONGO_URI=mongodb://localhost:27017/pharma-marketplace
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Product Endpoints
- `GET /api/products` - Get all products (with search and filter)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (farmer only)
- `PUT /api/products/:id` - Update product (farmer only)
- `DELETE /api/products/:id` - Delete product (farmer only)
- `GET /api/products/farmer/my-products` - Get farmer's products

### Order Endpoints
- `POST /api/orders` - Create order (customer only)
- `GET /api/orders` - Get customer's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/farmer/orders` - Get farmer's orders
- `PUT /api/orders/:id/status` - Update order status

## Cloud Deployment Options

### 1. Heroku (Recommended for beginners)

**Backend Deployment**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create pharma-marketplace-api

# Add MongoDB Atlas addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main
```

**Frontend Deployment**
```bash
# Build Angular app
ng build --configuration production

# Deploy to Heroku static buildpack
heroku buildpacks:set heroku/static
git push heroku main
```

### 2. AWS Elastic Beanstalk

**Deploy Backend**
```bash
# Install AWS CLI and EB CLI
pip install awsebcli

# Initialize EB app
eb init -p node.js-14 pharma-backend

# Create environment
eb create prod

# Deploy
eb deploy
```

### 3. Google Cloud Platform App Engine

**Deploy Backend (app.yaml)**
```yaml
runtime: nodejs18

env: standard

handlers:
  - url: /.*
    script: auto

env_variables:
  MONGO_URI: "your_mongodb_atlas_uri"
  JWT_SECRET: "your_jwt_secret"
  PORT: "5000"
```

Deploy:
```bash
gcloud app deploy
```

### 4. Docker Hub + Cloud Run

**Push to Docker Hub**
```bash
# Login to Docker Hub
docker login

# Build and push backend
docker build -t yourusername/pharma-backend:latest ./backend
docker push yourusername/pharma-backend:latest

# Build and push frontend
docker build -t yourusername/pharma-frontend:latest ./frontend
docker push yourusername/pharma-frontend:latest
```

**Deploy on Google Cloud Run**
```bash
gcloud run deploy pharma-backend \
  --image yourusername/pharma-backend:latest \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGO_URI=your_uri,JWT_SECRET=your_secret
```

## Testing the Application

### Test User Credentials
Create test users through the registration page:

**Farmer Account**
- Name: John Farmer
- Email: farmer@example.com
- Password: password123
- Role: Farmer

**Customer Account**
- Name: Jane Customer
- Email: customer@example.com
- Password: password123
- Role: Customer

### Test Workflow
1. Register as farmer
2. Add 2-3 products from farmer dashboard
3. Logout and register as customer
4. Browse products on marketplace
5. Add products to cart
6. Proceed to checkout
7. Place order
8. Login as farmer to see orders

## Security Best Practices

- **Environment Variables**: Never commit `.env` files with secrets
- **JWT Secret**: Use a strong, random JWT secret in production
- **MongoDB**: Enable authentication, use strong passwords
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure CORS properly for your domain
- **Rate Limiting**: Implement rate limiting on APIs
- **Input Validation**: Validate all user inputs

## Performance Optimization

- **Frontend**
  - Enable gzip compression (nginx)
  - Lazy load Angular modules
  - Minify and bundle assets
  - Cache static assets (1 year expiry)

- **Backend**
  - Use connection pooling for MongoDB
  - Implement caching (Redis)
  - Use pagination for large datasets
  - Create indexes on frequently queried fields

- **Database**
  - Index frequently searched fields
  - Use MongoDB optimization
  - Regular backups

## Troubleshooting

**Backend Connection Issues**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check logs
docker-compose logs backend
```

**MongoDB Connection Issues**
```bash
# Verify connection string in .env
# Check MongoDB is running
# Test connection: mongo "mongodb_uri"
```

**Frontend Not Loading**
```bash
# Clear browser cache
# Check nginx logs
docker-compose logs frontend

# Rebuild frontend
ng build --configuration production
```

## Maintenance

- **Update Dependencies**: Regularly update npm packages
- **Backup Database**: Regular MongoDB backups
- **Monitor Logs**: Check application logs for errors
- **Performance**: Monitor API response times

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check backend logs: `docker-compose logs backend`
4. Check frontend console: F12 → Console tab

## License

MIT License - See LICENSE file for details

## Author

Created as part of MEAN Stack learning project
