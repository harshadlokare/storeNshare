# 🚀 Quick Start Guide - Get Running in 5 Minutes

## Step 1: Get Free MongoDB Database (2 minutes)

1. **Go to MongoDB Atlas:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (use Google for faster signup)
3. **Create Free Cluster:**
   - Click "Build a Database"
   - Choose **"M0 FREE"** tier
   - Select region closest to you
   - Click "Create" (wait 3-5 minutes)

4. **Create Database User:**
   - Username: `storeNshare` (or any name)
   - Password: Click "Autogenerate" or create your own
   - **⚠️ SAVE THE PASSWORD!** You'll need it.

5. **Network Access:**
   - Click "Add My Current IP Address"
   - OR click "Allow Access from Anywhere" (for development)

6. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and version "5.5 or later"
   - Copy the connection string

7. **Customize Connection String:**
   - Replace `<username>` with your username
   - Replace `<password>` with your password
   - Add database name before `?` (e.g., `storeNshare`)
   
   **Example:**
   ```
   mongodb+srv://storeNshare:MyPassword123@cluster0.abc123.mongodb.net/storeNshare?retryWrites=true&w=majority
   ```

## Step 2: Configure Project (1 minute)

1. **Create `.env` file** in project root:
   ```bash
   # Windows PowerShell
   New-Item -Path .env -ItemType File
   
   # Or just create manually
   ```

2. **Add this to `.env` file:**
   ```env
   MONGO_CONNECTION_URL=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/storeNshare?retryWrites=true&w=majority
   PORT=3000
   APP_BASE_URL=http://localhost:3000
   ```

   **Replace:**
   - `yourusername` → Your MongoDB Atlas username
   - `yourpassword` → Your MongoDB Atlas password
   - `cluster0.xxxxx.mongodb.net` → Your actual cluster URL

## Step 3: Install & Run (2 minutes)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

3. **You should see:**
   ```
   Database Connected Successfully.
   Server is running on port 3000.
   Visit http://localhost:3000 to use the application.
   ```

4. **Open browser:** http://localhost:3000

## ✅ Done!

Your application is now running! You can:
- Upload files
- Share files via links
- Send files via email (if email is configured)

---

## 🆘 Troubleshooting

### "MONGO_CONNECTION_URL is not defined"
- Make sure `.env` file exists in project root
- Check `.env` file has `MONGO_CONNECTION_URL=` line
- Restart server after creating `.env`

### "Authentication failed"
- Check username and password in connection string
- Make sure password is URL-encoded if it has special characters

### "IP not whitelisted"
- Go to MongoDB Atlas → Network Access
- Add your IP address or use `0.0.0.0/0`

### "Database Connection Failed"
- Check internet connection
- Verify cluster is running (status: "Available")
- Double-check connection string format

---

## 📚 Need More Help?

- **Detailed MongoDB Setup:** See [`MONGODB_SETUP.md`](MONGODB_SETUP.md)
- **Full Documentation:** See [`README.md`](README.md)
- **Deployment Guide:** See [`DEPLOYMENT.md`](DEPLOYMENT.md)
