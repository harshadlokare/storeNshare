# Deployment Checklist

This document provides a checklist for deploying the storeNshare application to GitHub and various hosting platforms.

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] All syntax errors fixed
- [x] All critical bugs fixed
- [x] Error handling improved
- [x] Environment variables properly handled
- [x] Unused dependencies removed

### ✅ Files Ready
- [x] `.env.example` created with all required variables
- [x] `README.md` with complete documentation
- [x] `.gitignore` properly configured
- [x] `uploads/.gitkeep` to track directory
- [x] All routes and services working

### ✅ Configuration
- [x] `package.json` main entry point corrected
- [x] Scripts defined (dev, start)
- [x] Dependencies cleaned up
- [x] Procfile for Heroku ready

## GitHub Deployment Steps

1. **Initialize Git Repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit - storeNshare file sharing app"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/storeNshare.git
   git branch -M main
   git push -u origin main
   ```

## Environment Variables Required

Make sure to set these in your hosting platform:

### Required
- `MONGO_CONNECTION_URL` - MongoDB connection string
- `APP_BASE_URL` - Your application URL (e.g., `https://yourdomain.com`)

### Optional (with defaults)
- `PORT` - Server port (defaults to 3000)
- `ALLOWED_CLIENTS` - CORS origins (defaults to *)

### Required for Email Features
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `MAIL_USER` - Email username
- `MAIL_PASS` - Email password/app password

## Platform-Specific Notes

### Heroku
- Procfile is already configured
- Add MongoDB addon: `heroku addons:create mongolab`
- Set environment variables in Heroku dashboard

### Vercel / Netlify
- These platforms work well for Node.js apps
- Use MongoDB Atlas for database
- Consider cloud storage for file uploads (AWS S3, Cloudinary)

### Railway / Render
- Similar to Heroku
- Set environment variables in platform dashboard
- Use MongoDB Atlas for database

## Testing After Deployment

1. **Check Server Starts**
   - Verify server starts without errors
   - Check logs for database connection

2. **Test File Upload**
   - Upload a test file
   - Verify file is saved
   - Check download link works

3. **Test Email (if configured)**
   - Send a test email
   - Verify email is received

4. **Check Error Handling**
   - Test with invalid file
   - Test with missing environment variables
   - Verify graceful error messages

## Common Issues

### Database Connection Fails
- Check `MONGO_CONNECTION_URL` format
- Verify MongoDB is accessible from hosting platform
- Check network/firewall settings

### File Upload Fails
- Verify `uploads` directory is writable
- Check file size limits
- Ensure sufficient disk space

### Email Not Sending
- Verify SMTP credentials
- Check firewall settings
- For Gmail, use app password

## Support

If you encounter issues, check:
1. Server logs for error messages
2. Environment variables are set correctly
3. MongoDB connection is working
4. All dependencies are installed
