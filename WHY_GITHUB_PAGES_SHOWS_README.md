# Why GitHub Pages Shows README Instead of Your App

## The Problem

**GitHub Pages only serves static files** (HTML, CSS, JavaScript files). It **CANNOT run Node.js servers**.

Your project is a **full-stack application**:
- **Frontend:** HTML/CSS/JS files in `public/` folder
- **Backend:** Node.js/Express server in `server.js`

## Why You See README

1. GitHub Pages looks for `index.html` in the **root** of your repository
2. Your `index.html` is in the `public/` folder, not the root
3. When no `index.html` is found, GitHub Pages shows `README.md` instead

## The Real Issue

Even if we fix GitHub Pages to show your frontend, **it still won't work** because:

- Your frontend calls `/api/files` and `/api/files/send` (backend APIs)
- GitHub Pages **cannot run** your Node.js backend server
- Without the backend, file uploads/downloads won't work

## Solutions

### Option 1: Deploy Full App (Recommended) ✅

Deploy the **complete application** (frontend + backend) to a platform that supports Node.js:

**Railway (5 minutes):**
1. Go to https://railway.app
2. Sign up with GitHub
3. Deploy from GitHub repo: `harshadlokare/storeNshare`
4. Add environment variables
5. Your app will work fully at: `https://your-app.railway.app`

**Render (5 minutes):**
1. Go to https://render.com
2. Sign up with GitHub
3. Create Web Service from your repo
4. Your app will work fully at: `https://your-app.onrender.com`

### Option 2: Show Frontend on GitHub Pages (Limited)

I've configured GitHub Pages to show your frontend, but:
- ✅ Frontend will be visible
- ❌ File upload won't work (no backend)
- ❌ File download won't work (no backend)
- ❌ Email sharing won't work (no backend)

**To enable GitHub Pages:**
1. Go to your GitHub repo settings
2. Go to "Pages" section
3. Source: Select "GitHub Actions"
4. Save

The frontend will show, but it's just a UI demo without functionality.

## Recommendation

**Deploy to Railway or Render** - Your app will work completely with all features!

See `DEPLOY_FROM_GITHUB.md` for detailed deployment instructions.
