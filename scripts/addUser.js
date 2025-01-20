// scripts/addUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' }); // Load environment variables from .env.local file

const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri); // Debugging log

if (!uri) {
    throw new Error('The `uri` parameter to `mongoose.connect()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.');
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Connection error', err.message);
    }
};

const addUser = async (email, password) => {
    await connectDB();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
        twoFactorSecret: '', // Initialize with empty 2FA secret or generate it if you have a setup process
    });

    await user.save();
    console.log('User created:', user);
    mongoose.connection.close();
};

const email = 'mdalamiin75@gmail.com';
const password = 'MdAliKhan@92425';
addUser(email, password);
