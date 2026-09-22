import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';

// Fix for Windows ISP DNS blocking SRV lookups (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // fallback silently
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error(
        '❌ MONGODB_URI is undefined! Please make sure server/.env file exists and contains MONGODB_URI.',
      );
      process.exit(1);
    }

    if (uri.includes('<db_username>')) {
      console.error(
        '❌ Please replace "<db_username>" in server/.env with your actual MongoDB Atlas database username!',
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
