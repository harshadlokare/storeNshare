# 🚀 Deploy from GitHub - Complete Guide

This guide shows you how to deploy your storeNshare project directly from GitHub to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [x] ✅ Project is on GitHub
- [x] ✅ All code is committed and pushed
- [x] ✅ MongoDB Atlas account created
- [x] ✅ Environment variables documented

---

## 🎯 Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

**Time: 5 minutes | Cost: Free tier available**

1. **Go to Railway:** https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository:** `harshadlokare/storeNshare`
6. **Add Environment Variables:**
   - `MONGO_CONNECTION_URL` - Your MongoDB Atlas connection string
   - `APP_BASE_URL` - Will be provided by Railway (e.g., `https://yourapp.railway.app`)
   - `PORT` - Railway sets this automatically
   - `NODE_ENV` - Set to `production`
7. **Click "Deploy"**
8. **Wait 2-3 minutes** for deployment
9. **Get your live URL** from Railway dashboard

**✅ Done!** Your app is live!

---

### Option 2: Render (Free Tier)

**Time: 5 minutes | Cost: Free tier available**

1. **Go to Render:** https://render.com
2. **Sign up** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Select repository:** `storeNshare`
6. **Configure:**
   - **Name:** `storenshare` (or any name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
7. **Add Environment Variables:**
   - `MONGO_CONNECTION_URL`
   - `APP_BASE_URL` (Render will provide after first deploy)
   - `NODE_ENV` = `production`
8. **Click "Create Web Service"**
9. **Wait 5-10 minutes** for first deployment

**✅ Done!** Your app is live at `https://yourapp.onrender.com`

---

### Option 3: Heroku (Classic Platform)

**Time: 10 minutes | Cost: Free tier discontinued, paid plans available**

1. **Install Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli
2. **Login:**
   ```bash
   heroku login
   ```
3. **Create Heroku app:**
   ```bash
   heroku create storenshare-app
   ```
4. **Add MongoDB addon:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```
5. **Set environment variables:**
   ```bash
   heroku config:set MONGO_CONNECTION_URL="your-mongodb-connection-string"
   heroku config:set APP_BASE_URL="https://storenshare-app.herokuapp.com"
   heroku config:set NODE_ENV="production"
   ```
6. **Deploy:**
   ```bash
   git push heroku main
   ```
7. **Open app:**
   ```bash
   heroku open
   ```

**✅ Done!** Your app is live!

---

### Option 4: Vercel (Serverless)

**Time: 5 minutes | Cost: Free tier available**

1. **Go to Vercel:** https://vercel.com
2. **Sign up** with GitHub
3. **Click "Add New Project"**
4. **Import repository:** `storeNshare`
5. **Configure:**
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
6. **Add Environment Variables:**
   - `MONGO_CONNECTION_URL`
   - `APP_BASE_URL` (Vercel will provide)
   - `NODE_ENV` = `production`
7. **Click "Deploy"**
8. **Wait 2-3 minutes**

**✅ Done!** Your app is live!

**Note:** Vercel works best with serverless functions. For file uploads, consider using cloud storage.

---

### Option 5: Fly.io (Global Edge)

**Time: 10 minutes | Cost: Free tier available**

1. **Install Fly CLI:**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```
2. **Login:**
   ```bash
   fly auth login
   ```
3. **Create app:**
   ```bash
   fly launch
   ```
4. **Follow prompts:**
   - App name: `storenshare`
   - Region: Choose closest
   - PostgreSQL: No (we use MongoDB)
   - Redis: No
5. **Set secrets:**
   ```bash
   fly secrets set MONGO_CONNECTION_URL="your-connection-string"
   fly secrets set APP_BASE_URL="https://storenshare.fly.dev"
   ```
6. **Deploy:**
   ```bash
   fly deploy
   ```

**✅ Done!** Your app is live!

---

## 🔧 Platform-Specific Configurations

### Railway
- ✅ `railway.json` already configured
- ✅ Auto-detects Node.js
- ✅ Automatic HTTPS
- ✅ Free tier: 500 hours/month

### Render
- ✅ `render.yaml` already configured
- ✅ Free tier: Spins down after 15 min inactivity
- ✅ Automatic HTTPS
- ✅ Health checks configured

### Heroku
- ✅ `Procfile` already configured
- ✅ Uses `npm start` command
- ✅ Automatic HTTPS

### Vercel
- ✅ `vercel.json` already configured
- ✅ Serverless functions
- ✅ Edge network
- ⚠️ File uploads: Use cloud storage (S3, Cloudinary)

### Fly.io
- ✅ Docker-based deployment
- ✅ Global edge network
- ✅ Persistent volumes for uploads

---

## 📝 Environment Variables Setup

### Required Variables (All Platforms)

```env
MONGO_CONNECTION_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/storeNshare?retryWrites=true&w=majority
APP_BASE_URL=https://your-app-url.com
NODE_ENV=production
```

### Optional Variables

```env
PORT=3000  # Usually set automatically by platform
ALLOWED_CLIENTS=https://your-app-url.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

---

## 🔍 Post-Deployment Checklist

After deploying, verify:

- [ ] ✅ App loads without errors
- [ ] ✅ Database connection successful (check logs)
- [ ] ✅ File upload works
- [ ] ✅ File download works
- [ ] ✅ Email sharing works (if configured)
- [ ] ✅ Health check endpoint works: `/health`
- [ ] ✅ HTTPS is enabled
- [ ] ✅ Environment variables are set correctly

---

## 🐛 Troubleshooting

### App Won't Start

1. **Check logs:**
   - Railway: Dashboard → Logs
   - Render: Dashboard → Logs
   - Heroku: `heroku logs --tail`

2. **Common issues:**
   - Missing `MONGO_CONNECTION_URL`
   - Wrong `APP_BASE_URL`
   - Port not set correctly
   - Dependencies not installed

### Database Connection Fails

1. **Check MongoDB Atlas:**
   - IP whitelist includes `0.0.0.0/0` (all IPs)
   - Database user credentials are correct
   - Cluster is running

2. **Check connection string:**
   - Format is correct
   - Username/password are URL-encoded if needed

### File Uploads Don't Work

1. **Check disk space** (free tiers have limits)
2. **Verify `uploads` directory** is writable
3. **Consider cloud storage** for production:
   - AWS S3
   - Cloudinary
   - Google Cloud Storage

---

## 📊 Platform Comparison

| Platform | Free Tier | Ease | Best For |
|----------|-----------|------|----------|
| **Railway** | ✅ 500 hrs/month | ⭐⭐⭐⭐⭐ | Quick deployments |
| **Render** | ✅ (sleeps after 15min) | ⭐⭐⭐⭐ | Simple apps |
| **Heroku** | ❌ Paid only | ⭐⭐⭐ | Traditional apps |
| **Vercel** | ✅ Generous | ⭐⭐⭐⭐ | Serverless |
| **Fly.io** | ✅ 3 VMs | ⭐⭐⭐ | Global edge |

---

## 🚀 Recommended: Railway (Easiest)

**Why Railway?**
- ✅ Easiest setup (5 minutes)
- ✅ Free tier available
- ✅ Auto HTTPS
- ✅ Great GitHub integration
- ✅ No credit card required
- ✅ Persistent storage

**Quick Start:**
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repo
5. Add environment variables
6. Deploy!

---

## 📚 Additional Resources

- **MongoDB Atlas Setup:** See `MONGODB_SETUP.md`
- **Local Development:** See `README.md`
- **GitHub Setup:** See `GITHUB_PUSH_GUIDE.md`

---

## ✅ Success!

Once deployed, your app will be live and accessible worldwide! 🎉

**Share your deployed app:** Update `APP_BASE_URL` in your platform's environment variables with your live URL.
