# Quick Start Guide - Pharma Marketplace

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Docker installed (or Node.js 18+ + MongoDB)
- Git

### Step 1: Start the Application

**Using Docker (Easiest):**
```bash
docker-compose up
```

Wait for all services to start, then:

### Step 2: Access the Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000/api/health
- **MongoDB**: localhost:27017

### Step 3: Test the Application

1. **Register as Farmer**
   - Click "Register"
   - Choose role: "Farmer (Seller)"
   - Fill in details and submit

2. **Add Products** (as Farmer)
   - Go to Dashboard
   - Click "+ Add New Product"
   - Fill product details and save

3. **Register as Customer**
   - Logout
   - Register with different email
   - Choose role: "Customer"

4. **Buy Products** (as Customer)
   - Browse products
   - Add to cart
   - Checkout and place order

## 📁 Project Structure Overview

```
mean_stack/
├── backend/          ← Express API server
├── frontend/         ← Angular SPA
├── docker-compose.yml
└── README.md
```

## 🔧 Common Tasks

### Run Without Docker

**Backend:**
```bash
cd backend
npm install
# Create .env file with MONGO_URI
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
ng serve
```

### View Database

```bash
# Using MongoDB Compass
# Connection: mongodb://admin:password123@localhost:27017
# Username: admin
# Password: password123
```

### Check Application Status

```bash
# Backend health
curl http://localhost:5000/api/health

# Container logs
docker-compose logs backend
docker-compose logs frontend
```

## 🌐 Deploy to Cloud

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Heroku deployment
- AWS Elastic Beanstalk
- Google Cloud Platform
- Docker Hub + Cloud Run

## 📋 Default Test Credentials

Create through registration page or use MongoDB directly:

**Farmer:**
- Email: farmer@test.com
- Password: password123
- Role: farmer

**Customer:**
- Email: customer@test.com
- Password: password123
- Role: customer

## 🆘 Troubleshooting

**Issue: Can't access localhost**
- Solution: Wait 30 seconds for containers to fully start
- Check: `docker-compose logs`

**Issue: MongoDB connection error**
- Solution: Check MONGO_URI in backend/.env
- For cloud: Use MongoDB Atlas connection string

**Issue: Frontend blank**
- Solution: Clear browser cache (Ctrl+Shift+Delete)
- Check: Browser console for errors (F12)

**Issue: API returns error**
- Check: `docker-compose logs backend`
- Verify: Database is running

## 💡 Quick Features Overview

### Customer Features
- 🏠 Browse products
- 🔍 Search & filter
- 🛒 Shopping cart
- 💳 Checkout
- 📦 Track orders

### Farmer Features
- ➕ Add products
- ✏️ Edit/delete products
- 📊 View orders
- 📋 Manage inventory

### Admin Features (via Database)
- 👥 User management
- 📊 Sales analytics
- 🔐 Role management

## 📞 Get Help

1. Check error messages in browser console (F12)
2. Check backend logs: `docker-compose logs backend`
3. Review [DEPLOYMENT.md](DEPLOYMENT.md)
4. Check database connection

## 🔐 Security Notes

- Default passwords are for development only
- Change `JWT_SECRET` in production
- Use MongoDB Atlas with strong credentials
- Enable HTTPS in production
- Update CORS settings for your domain

## 🎯 Next Steps

1. ✅ Get app running (you are here!)
2. ⬜ Customize branding and colors
3. ⬜ Add payment gateway (Stripe/Razorpay)
4. ⬜ Deploy to cloud
5. ⬜ Add email notifications

## 📚 Learn More

- Backend: See [backend/README.md](backend/README.md)
- Frontend: See [frontend/README.md](frontend/README.md)
- Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)
- Full docs: See [README.md](README.md)

---

**Ready to sell? Let's go! 🌿**
