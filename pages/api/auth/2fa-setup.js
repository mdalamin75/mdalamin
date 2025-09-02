// pages/api/auth/2fa-setup.js
import { getToken } from 'next-auth/jwt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import connectMongo from '../../../lib/connectDB';
import User from '../../../models/User';

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req, res) => {
  try {
    await connectMongo(); // Ensure MongoDB connection

    const token = await getToken({ req, secret });

    if (!token || !token.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findOne({ email: token.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.twoFactorSecret) {
      return res.status(200).json({ twoFactorSetup: true });
    }

    const generatedSecret = speakeasy.generateSecret({ name: 'YourAppName' });
    user.twoFactorSecret = generatedSecret.base32;
    await user.save();

    const qrCodeDataURL = await qrcode.toDataURL(generatedSecret.otpauth_url);

    res.status(200).json({ qrCodeDataURL, twoFactorSetup: false });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
