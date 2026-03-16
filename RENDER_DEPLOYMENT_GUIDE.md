# Render Deployment Guide - Backend Only

## Prerequisites
- GitHub account
- MongoDB Atlas account (for database)
- Render account

## Step 1: Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with username and password
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your actual credentials

## Step 2: Prepare Your Code
Your backend is already configured for Render deployment with:
- Updated `server.js` with proper CORS and port configuration
- `.env.example` file with required environment variables
- `render.yaml` configuration file

## Step 3: Create a GitHub Repository
1. Create a new GitHub repository
2. Push only the backend code:
   ```bash
   git init
   git add backend/
   git add render.yaml
   git commit -m "Initial backend deployment"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

## Step 4: Deploy to Render
1. Go to [Render](https://render.com)
2. Sign up/sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: pharma-marketplace-backend
   - **Region**: Choose nearest to you
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong secret key
   - `PORT`: `5000`
7. Click "Create Web Service"

## Step 5: Verify Deployment
1. Wait for deployment to complete
2. Test your API endpoints:
   - Health check: `https://your-app-name.onrender.com/api/health`
   - Auth endpoints: `https://your-app-name.onrender.com/api/auth`
   - Product endpoints: `https://your-app-name.onrender.com/api/products`
   - Order endpoints: `https://your-app-name.onrender.com/api/orders`

## Step 6: Update Frontend Configuration
Update your frontend to use the new backend URL:
```typescript
// In your frontend environment files
API_URL=https://your-app-name.onrender.com
```

## Important Notes
- Render free tier has a 15-minute cold start time
- MongoDB Atlas free tier has 512MB storage limit
- Always keep your environment variables secret
- Monitor your usage to avoid exceeding free tier limits

## Troubleshooting
- **500 errors**: Check environment variables in Render dashboard
- **Database connection failed**: Verify MongoDB connection string
- **CORS errors**: Update CORS origins in server.js
- **Build failures**: Check Render build logs

## Next Steps
1. Set up custom domain (optional)
2. Configure monitoring and logging
3. Set up automated backups for MongoDB
4. Consider upgrading to paid plans for better performance
