// pages/api/auth/2fa-verify.js
import { getToken } from 'next-auth/jwt';
import connectMongo from '../../../lib/connectDB';
import User from '../../../models/User';
import speakeasy from 'speakeasy';

// Get secret from environment variable
const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectMongo();
    console.log('Connected to MongoDB');

    const token = await getToken({ req, secret });
    console.log('Token in verify API:', token);

    if (!token || !token.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { token: verificationToken } = req.body;
    if (!verificationToken) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const user = await User.findOne({ email: token.email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: '2FA not set up. Please set up 2FA first.' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: verificationToken.toString(),
      window: 1,
    });

    if (verified) {
      console.log("2FA verification successful");
      
      // Update user in database
      await User.findOneAndUpdate(
        { email: token.email },
        { 
          $set: { 
            twoFactorEnabled: true,
            twoFactorVerified: true 
          }
        },
        { new: true } // Return updated document
      );

      return res.status(200).json({
        verified: true,
        message: 'Verification successful'
      });
    }

    return res.status(400).json({
      verified: false,
      message: 'Invalid verification code'
    });

  } catch (error) {
    console.error('Error in 2fa-verify endpoint:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}