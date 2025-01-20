// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  twoFactorSecret: String,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
