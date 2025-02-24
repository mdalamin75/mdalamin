// lib/connectDB.js
import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
};

export default connectMongo;
