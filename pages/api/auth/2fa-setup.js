// pages/api/auth/2fa-setup.js
import { getToken } from 'next-auth/jwt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import connectMongo from '../../../lib/connectDB';
import User from '../../../models/User';

const secret = process.env.NEXTAUTH_SECRET;

export default async (req, res) => {
  try {
    await connectMongo(); // Ensure MongoDB connection
    console.log('Connected to MongoDB');

    const token = await getToken({ req, secret });
    console.log('Token in API:', token);

    if (!token || !token.email) {
      console.error('Unauthorized: No token or token email');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findOne({ email: token.email });
    if (!user) {
      console.error('User not found:', token.email);
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.twoFactorSecret) {
      console.log('2FA already set up');
      return res.status(200).json({ twoFactorSetup: true });
    }

    const generatedSecret = speakeasy.generateSecret({ name: 'YourAppName' });
    user.twoFactorSecret = generatedSecret.base32;
    await user.save();

    const qrCodeDataURL = await qrcode.toDataURL(generatedSecret.otpauth_url);
    console.log('QR Code Generated:', qrCodeDataURL);

    res.status(200).json({ qrCodeDataURL, twoFactorSetup: false });
  } catch (error) {
    console.error('Error in 2fa-setup endpoint:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
