require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    // Database connection 
    if (!process.env.MONGO_CONNECTION_URL) {
        console.error('\n❌ MONGO_CONNECTION_URL is not defined in environment variables.');
        console.error('\n📖 To set up a FREE MongoDB database:');
        console.error('   1. See QUICK_START.md for 5-minute setup guide');
        console.error('   2. Or see MONGODB_SETUP.md for detailed instructions');
        console.error('   3. Get free MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register');
        console.error('\n💡 After setting up MongoDB Atlas, add to your .env file:');
        console.error('   MONGO_CONNECTION_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority\n');
        process.exit(1);
    }

    mongoose.connect(process.env.MONGO_CONNECTION_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).catch(err => {
        console.error('MongoDB connection error:', err.message);
    });
    
    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('Database Connected Successfully.');
    });

    connection.on('error', (err) => {
        console.error('Database Connection Failed:', err.message);
    });

    connection.on('disconnected', () => {
        console.log('Database Disconnected.');
    });
}

module.exports = connectDB;