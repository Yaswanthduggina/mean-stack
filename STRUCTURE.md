# Project Structure Complete Reference

## Final Directory Structure

```
c:/6th sem/mean_stack/
│
├── backend/                           # Node.js + Express Backend
│   ├── models/
│   │   ├── User.js                   # User schema (farmer/customer)
│   │   ├── Product.js                # Product schema
│   │   └── Order.js                  # Order schema
│   │
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic
│   │   ├── productController.js      # Product CRUD
│   │   └── orderController.js        # Order management
│   │
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── productRoutes.js          # Product endpoints
│   │   └── orderRoutes.js            # Order endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification
│   │   └── roleMiddleware.js         # Role-based access
│   │
│   ├── utils/
│   │   └── errorHandler.js           # Error handling
│   │
│   ├── server.js                     # Main server entry
│   ├── dbConfig.js                   # MongoDB connection
│   ├── package.json                  # Dependencies
│   ├── .env.example                  # Environment template
│   ├── .env                          # Environment variables (create this)
│   ├── Dockerfile                    # Docker image
│   ├── .dockerignore                 # Docker ignore file
│   └── .gitignore
│
├── frontend/                          # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── home/            # Home/landing page
│   │   │   │   ├── login/           # Login component
│   │   │   │   ├── register/        # Registration
│   │   │   │   ├── product-list/    # Product listing
│   │   │   │   ├── product-detail/  # Product details
│   │   │   │   ├── product-form/    # Add/edit products
│   │   │   │   ├── cart/            # Shopping cart
│   │   │   │   ├── checkout/        # Checkout page
│   │   │   │   └── dashboard/       # Farmer dashboard
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts  # Authentication
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   └── order.service.ts
│   │   │   │
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts    # Route protection
│   │   │   │
│   │   │   ├── interceptors/
│   │   │   │   └── jwt.interceptor.ts
│   │   │   │
│   │   │   ├── app.module.ts        # Main module
│   │   │   ├── app-routing.module.ts # Routes
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   └── app.component.css
│   │   │
│   │   ├── assets/                  # Static files
│   │   ├── main.ts                  # Bootstrap
│   │   ├── styles.css               # Global styles
│   │   └── index.html
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   ├── angular.json
│   ├── Dockerfile
│   ├── nginx.conf                   # Nginx config
│   ├── .dockerignore
│   └── .gitignore
│
├── .github/
│   └── workflows/
│       ├── build-deploy.yml         # CI/CD pipeline
│       └── code-quality.yml         # Code quality checks
│
├── docker-compose.yml               # Multi-container setup
├── README.md                        # Main documentation
├── QUICKSTART.md                    # Quick start guide
├── DEPLOYMENT.md                    # Deployment guide
└── .gitignore
```

## Key Files Summary

### Backend Entry Point
- **server.js** - Starts Express server on port 5000
- **dbConfig.js** - Connects to MongoDB

### API Routes
- **POST** `/api/auth/register` - Create account
- **POST** `/api/auth/login` - User login
- **GET** `/api/products` - List products
- **POST** `/api/products` - Create product (farmer)
- **POST** `/api/orders` - Create order (customer)

### Frontend Entry Point
- **main.ts** - Bootstrap Angular app
- **app.component.html** - Root template with router outlet
- **app-routing.module.ts** - Route configuration

## Component Routes

```
/ → HomeComponent
/login → LoginComponent
/register → RegisterComponent
/products → ProductListComponent
/products/:id → ProductDetailComponent
/product-form → ProductFormComponent (farmer)
/product-form/:id → ProductFormComponent (farmer)
/cart → CartComponent
/checkout → CheckoutComponent
/farmers/dashboard → DashboardComponent (farmer)
```

## Database Models

### User Model
- Stores farmer and customer accounts
- Passwords hashed with bcryptjs
- JWT authentication

### Product Model
- Created by farmers
- Belongs to a farm
- Categories: herbal-medicine, supplements, oils, etc.

### Order Model
- Created by customers
- Contains product references
- Tracks order status
- Has farmer associations

## Technology Components

### Backend Stack
- Express.js - Web framework
- Mongoose - MongoDB ODM
- JWT - Authentication
- bcryptjs - Password hashing
- dotenv - Configuration

### Frontend Stack
- Angular 15 - Framework
- TypeScript - Language
- RxJS - Reactive programming
- Angular Router - Navigation
- Reactive Forms - Form handling

### DevOps Stack
- Docker - Containerization
- Docker Compose - Multi-container orchestration
- Nginx - Web server
- GitHub Actions - CI/CD

## Configuration Files

### Backend .env
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/pharma-marketplace
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend Environment
API calls configured in services to `http://localhost:5000/api`

### Docker Compose
- Orchestrates MongoDB, Backend, Frontend
- Exposes ports: 80 (frontend), 5000 (backend), 27017 (MongoDB)
- Uses development mode with hot reload

## Build & Run Commands

### Local Development
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && ng serve
```

### Docker
```bash
# Build and start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Build
```bash
# Frontend
ng build --configuration production

# Docker build
docker build -t pharma-backend:latest ./backend
docker build -t pharma-frontend:latest ./frontend
```

## Key Features Implemented

✅ **Authentication**
- Register with role selection
- JWT-based login
- Password hashing

✅ **Products**
- Farmer CRUD operations
- Customer view/search
- Category filtering

✅ **Shopping**
- Add to cart
- Checkout process
- Order management

✅ **Farmer Dashboard**
- Manage products
- Track orders
- Update order status

✅ **Security**
- Role-based routes
- Protected endpoints
- Input validation

✅ **Deployment**
- Docker containerization
- Docker Compose setup
- Cloud-ready architecture

## Customization Points

### Branding
- Frontend: `home.component.html` - Navbar and hero section
- Colors: CSS variables in components
- Logo: Add to `src/assets/`

### API Configuration
- Frontend: Update `apiUrl` in service files
- Backend: Configure CORS in `server.js`

### Database
- Models: Modify schemas in `backend/models/`
- Add new collections as needed

### UI Components
- Add Angular Material (optional)
- Extend component styles
- Create new components from template

## Deployment Checklist

- [ ] Create MongoDB Atlas account
- [ ] Get connection string
- [ ] Update .env with production values
- [ ] Test locally with production settings
- [ ] Choose deployment platform
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Test all features
- [ ] Set up backups

## Performance Optimizations

### Frontend
- Lazy load route modules
- Minify and tree-shake
- Cache busting with hashes
- Compression (gzip)

### Backend
- Connection pooling
- Query optimization
- Error handling
- Rate limiting ready

### Database
- Indexed fields
- Aggregation pipelines
- Query optimization

## Security Features

- JWT token validation
- Password hashing (10 rounds)
- CORS configuration
- Input sanitization
- Role-based access control
- Error message masking

## Support & Resources

- **Backend Docs**: Check Express docs, Mongoose docs
- **Frontend Docs**: Angular documentation
- **Deployment**: See DEPLOYMENT.md
- **Quick Start**: See QUICKSTART.md

## Files to Create/Update

### When Running Locally
1. Create `backend/.env` from `.env.example`
2. Add MongoDB connection string
3. Set JWT_SECRET

### When Deploying
1. Update API URLs in frontend
2. Add production environment variables
3. Configure database backups
4. Set up monitoring

---

**Application is ready for development and deployment!** 🚀
