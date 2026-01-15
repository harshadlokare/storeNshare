# StoreNShare - File Sharing Application

A secure and easy-to-use file sharing application built with Node.js, Express, MongoDB, and Multer. Upload files and share them via unique links or email.

## Features

- 📤 **File Upload**: Upload files with a maximum size of 100MB
- 🔗 **Shareable Links**: Generate unique links for each uploaded file
- 📧 **Email Sharing**: Send files directly via email
- 🔒 **Secure**: Files are stored securely with unique UUIDs
- ⚡ **Fast**: Built with Express.js for optimal performance
- 📱 **Responsive**: Modern and responsive user interface

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- npm or yarn package manager
- **MongoDB Database** (FREE cloud database available - see setup below)

> **💡 Don't have MongoDB?** No problem! We'll use **MongoDB Atlas** (free cloud database). See [MongoDB Setup Guide](MONGODB_SETUP.md).

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/storeNshare.git
   cd storeNshare
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up MongoDB Database (FREE)**
   
   **Option A: MongoDB Atlas (Recommended - Free Cloud Database)**
   
   Follow the detailed guide in [`MONGODB_SETUP.md`](MONGODB_SETUP.md) for step-by-step instructions.
   
   **Quick Setup:**
   1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   2. Sign up for free account
   3. Create a free M0 cluster (takes 3-5 minutes)
   4. Create database user (save username & password)
   5. Whitelist your IP address (or use `0.0.0.0/0` for development)
   6. Get connection string: Click "Connect" → "Connect your application" → Copy string
   7. Format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority`
   
   **Option B: Local MongoDB** (if you have MongoDB installed locally)
   ```bash
   # Connection string format:
   MONGO_CONNECTION_URL=mongodb://localhost:27017/storeNshare
   
   # Start MongoDB (Windows)
   net start MongoDB
   
   # Start MongoDB (macOS/Linux)
   sudo systemctl start mongod
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file
   # Copy the example (if .env.example exists) or create new
   ```
   
   Create `.env` file in project root with:
   ```env
   # MongoDB Connection (REQUIRED)
   MONGO_CONNECTION_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/storeNshare?retryWrites=true&w=majority
   
   # Server Configuration
   PORT=3000
   
   # Application Base URL (REQUIRED)
   APP_BASE_URL=http://localhost:3000
   
   # CORS Configuration (optional)
   ALLOWED_CLIENTS=http://localhost:3000
   
   # Email Configuration (optional - for email features)
   # SMTP_HOST=smtp.gmail.com
   # SMTP_PORT=587
   # MAIL_USER=your-email@gmail.com
   # MAIL_PASS=your-app-password
   ```
   
   **⚠️ Important:** Replace the MongoDB connection string with your actual Atlas connection string from Step 3.

5. **Create uploads directory** (if it doesn't exist)
   ```bash
   mkdir uploads
   ```

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```

The application will start with nodemon, which automatically restarts the server when you make changes.

### Production Mode
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000` (or the port specified in your `.env` file).

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 3000 |
| `APP_BASE_URL` | Base URL for generating file links | Yes | - |
| `MONGO_CONNECTION_URL` | MongoDB connection string | Yes | - |
| `ALLOWED_CLIENTS` | Comma-separated CORS origins | No | * (all) |
| `SMTP_HOST` | SMTP server hostname | Yes (for email) | - |
| `SMTP_PORT` | SMTP server port | Yes (for email) | - |
| `MAIL_USER` | Email username | Yes (for email) | - |
| `MAIL_PASS` | Email password/app password | Yes (for email) | - |

## Project Structure

```
storeNshare/
├── config/
│   └── db.js              # MongoDB connection configuration
├── models/
│   └── file.js            # File model schema
├── routes/
│   ├── files.js           # File upload and sharing routes
│   ├── show.js            # File display route
│   └── download.js        # File download route
├── services/
│   ├── emailService.js    # Email sending service
│   └── emailTemplate.js   # Email template
├── uploads/               # Directory for uploaded files
├── views/
│   └── download.ejs       # Download page template
├── public/                # Static files (HTML, CSS, JS, images)
├── server.js              # Main application entry point
├── script.js              # Cleanup script for old files (run manually or via cron)
├── package.json           # Project dependencies
└── .env                   # Environment variables (not in git)
```

## API Endpoints

### Upload File
```
POST /api/files
Content-Type: multipart/form-data
Body: { myfile: <file> }
Response: { file: "<download-link>" }
```

### Send File via Email
```
POST /api/files/send
Content-Type: application/json
Body: {
  uuid: "<file-uuid>",
  emailTo: "<recipient-email>",
  emailFrom: "<sender-email>"
}
Response: { success: true }
```

### View File
```
GET /files/:uuid
Response: Download page with file information
```

### Download File
```
GET /files/download/:uuid
Response: File download
```

## Email Configuration

### Gmail Setup
1. Enable 2-Step Verification on your Google Account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the app password in `MAIL_PASS`

### Other Email Providers
- **Mailtrap** (for testing): Use `smtp.mailtrap.io` with port `2525`
- **SendGrid**: Use `smtp.sendgrid.net` with port `587`
- **Outlook**: Use `smtp-mail.outlook.com` with port `587`

## 🚀 Quick Deploy from GitHub

**Deploy in 5 minutes!** Choose your platform:

- **[Railway](https://railway.app)** ⭐ Recommended - Easiest setup
- **[Render](https://render.com)** - Free tier available
- **[Heroku](https://heroku.com)** - Classic platform
- **[Vercel](https://vercel.com)** - Serverless
- **[Fly.io](https://fly.io)** - Global edge

**📖 See [DEPLOY_FROM_GITHUB.md](DEPLOY_FROM_GITHUB.md) for detailed deployment guides.**

## Deployment

### GitHub Deployment

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/storeNshare.git
   git push -u origin main
   ```

2. **Set up environment variables** in your hosting platform:
   - `MONGO_CONNECTION_URL` - Your MongoDB connection string
   - `APP_BASE_URL` - Your application URL (e.g., `https://yourdomain.com`)
   - `PORT` - Server port (usually set automatically by hosting platform)
   - `ALLOWED_CLIENTS` - Comma-separated list of allowed origins
   - `SMTP_HOST`, `SMTP_PORT`, `MAIL_USER`, `MAIL_PASS` - Email configuration

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or Heroku CLI
4. The `Procfile` is already configured
5. Add MongoDB addon: `heroku addons:create mongolab`

### Vercel / Netlify / Railway
- These platforms work well for Node.js apps
- Set environment variables in platform dashboard
- Use MongoDB Atlas for database (free tier available)
- Note: File uploads may require cloud storage (AWS S3, Cloudinary) for production

### Other Platforms
- Ensure MongoDB is accessible (use MongoDB Atlas for cloud hosting)
- Set all environment variables
- Make sure the `uploads` directory is writable
- Consider using cloud storage (AWS S3, Cloudinary) for production

## Cleanup Script

The project includes a cleanup script (`script.js`) that deletes files older than 24 hours. You can run it manually:

```bash
node script.js
```

For production, set up a cron job or scheduled task to run this script periodically:

```bash
# Example cron job (runs daily at 2 AM)
0 2 * * * cd /path/to/project && node script.js
```

## Troubleshooting

### Database Connection Issues
- Verify MongoDB is running
- Check `MONGO_CONNECTION_URL` format
- Ensure network access if using MongoDB Atlas

### Email Not Sending
- Verify SMTP credentials
- Check firewall settings
- For Gmail, ensure app password is used (not regular password)
- Check email service logs in console

### File Upload Issues
- Verify `uploads` directory exists and is writable
- Check file size limits (default: 100MB)
- Ensure sufficient disk space

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- File upload: [Multer](https://github.com/expressjs/multer)
- Email: [Nodemailer](https://nodemailer.com/)

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for easy file sharing
