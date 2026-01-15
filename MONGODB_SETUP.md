# MongoDB Setup Guide - Free Database Configuration

This guide will help you set up a **FREE MongoDB database** using MongoDB Atlas and configure it with your storeNshare project.

## 🆓 Free MongoDB Options

### 1. **MongoDB Atlas (Recommended - Best Free Option)**
- ✅ **512 MB free storage** (enough for development and small projects)
- ✅ **Always-on cluster** (no sleep/wake delays)
- ✅ **Free forever** (no credit card required for M0 tier)
- ✅ **Easy setup** (5-10 minutes)
- ✅ **Secure and reliable**

### 2. **Other Free Options** (Not Recommended)
- MongoDB Community Edition (requires local installation)
- Railway MongoDB (limited free tier)
- Render MongoDB (limited free tier)

**We'll use MongoDB Atlas** - it's the easiest and most reliable free option.

---

## 📋 Step-by-Step MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to **https://www.mongodb.com/cloud/atlas/register**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Your email address, OR
   - Google account (faster)
4. Verify your email if required

### Step 2: Create a Free Cluster

1. After logging in, you'll see **"Deploy a cloud database"**
2. Click **"Build a Database"**
3. Choose **"M0 FREE"** tier (Free Shared Cluster)
4. Select a **Cloud Provider**:
   - AWS (recommended)
   - Google Cloud
   - Azure
5. Select a **Region** closest to you:
   - For example: `N. Virginia (us-east-1)` or `Mumbai (ap-south-1)`
6. Leave cluster name as default (e.g., "Cluster0") or rename it
7. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User

1. While cluster is creating, you'll see **"Create Database User"**
2. Choose **"Password"** authentication
3. Enter a **Username** (e.g., `storeNshare` or `admin`)
4. Click **"Autogenerate Secure Password"** OR create your own strong password
5. **⚠️ IMPORTANT: Copy and save this password!** You'll need it for the connection string.
6. Click **"Create User"**

### Step 4: Configure Network Access

1. You'll see **"Where would you like to connect from?"**
2. For development, click **"Add My Current IP Address"**
3. For production/deployment, click **"Allow Access from Anywhere"** and enter `0.0.0.0/0`
   - ⚠️ This allows connections from any IP (safe for free tier, but use IP whitelist for production)
4. Click **"Finish and Close"**

### Step 5: Get Connection String

1. Wait for cluster to finish creating (status will show "Available")
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver
5. Select version **"5.5 or later"** (or latest)
6. You'll see a connection string like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **Copy this connection string**

### Step 6: Customize Connection String

Replace the placeholders in your connection string:

1. Replace `<username>` with your database username (from Step 3)
2. Replace `<password>` with your database password (from Step 3)
3. Add a database name at the end (before `?`), for example:
   ```
   mongodb+srv://storeNshare:YourPassword123@cluster0.xxxxx.mongodb.net/storeNshare?retryWrites=true&w=majority
   ```
   - Replace `storeNshare` with your username
   - Replace `YourPassword123` with your actual password
   - The last `storeNshare` is your database name (can be anything, e.g., `filestore`, `storeNshare`)

**Final connection string should look like:**
```
mongodb+srv://storeNshare:MySecurePass123@cluster0.abc123.mongodb.net/storeNshare?retryWrites=true&w=majority
```

---

## ⚙️ Configure Your Project

### Step 1: Create .env File

1. In your project root directory, create a file named `.env`
2. Copy the content from `.env.example` (if it exists) or create new

### Step 2: Add MongoDB Connection String

Open `.env` file and add:

```env
# MongoDB Connection (from MongoDB Atlas)
MONGO_CONNECTION_URL=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/storeNshare?retryWrites=true&w=majority

# Server Configuration
PORT=3000

# Application Base URL
APP_BASE_URL=http://localhost:3000

# CORS Configuration (optional)
ALLOWED_CLIENTS=http://localhost:3000

# Email Configuration (optional - for email features)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# MAIL_USER=your-email@gmail.com
# MAIL_PASS=your-app-password
```

**Replace:**
- `yourusername` with your MongoDB Atlas username
- `yourpassword` with your MongoDB Atlas password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- `storeNshare` with your preferred database name

### Step 3: Test Connection

1. Make sure your `.env` file is saved
2. Run your application:
   ```bash
   npm start
   # or
   npm run dev
   ```
3. You should see: **"Database Connected Successfully."**
4. If you see an error, check:
   - Connection string is correct
   - Username and password are correct
   - IP address is whitelisted in Atlas
   - Internet connection is working

---

## 🔍 Troubleshooting

### Error: "Authentication failed"
- **Solution:** Check username and password in connection string
- Make sure password doesn't have special characters that need URL encoding
- If password has `@`, `#`, `%`, etc., replace them with URL-encoded versions:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

### Error: "IP not whitelisted"
- **Solution:** Go to MongoDB Atlas → Network Access → Add IP Address
- Add your current IP or use `0.0.0.0/0` for development

### Error: "Connection timeout"
- **Solution:** Check internet connection
- Verify cluster is running (status should be "Available")
- Check firewall settings

### Error: "MONGO_CONNECTION_URL is not defined"
- **Solution:** Make sure `.env` file exists in project root
- Verify `.env` file has `MONGO_CONNECTION_URL=` line
- Restart your server after creating `.env` file

---

## 📝 Quick Reference

### Connection String Format:
```
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### Example Connection String:
```
mongodb+srv://admin:SecurePass123@cluster0.abc123.mongodb.net/storeNshare?retryWrites=true&w=majority
```

### Where to Find Your Connection String:
1. MongoDB Atlas Dashboard
2. Click on your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster created and running
- [ ] Database user created (username + password saved)
- [ ] IP address whitelisted
- [ ] Connection string copied
- [ ] Connection string customized with username, password, and database name
- [ ] `.env` file created with `MONGO_CONNECTION_URL`
- [ ] Server starts without database errors
- [ ] See "Database Connected Successfully" message

---

## 🚀 Next Steps

Once MongoDB is configured:
1. Your application should connect successfully
2. You can start uploading files
3. Files will be stored in MongoDB database
4. Ready to deploy to GitHub and hosting platforms!

**Need Help?** Check the main `README.md` for more information.
