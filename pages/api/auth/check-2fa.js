// pages/api/auth/check-2fa.js
import { getSession } from 'next-auth/react';
import connectDB from '../../../lib/connectDB';
import User from '../../../models/User';

export default async (req, res) => {
  await connectDB(); // Ensure MongoDB connection
  const session = await getSession({ req });
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findOne({ email: session.user.email });
  if (user && user.twoFactorSecret) {
    return res.status(200).json({ twoFactorSetup: true });
  }

  return res.status(200).json({ twoFactorSetup: false });
};
