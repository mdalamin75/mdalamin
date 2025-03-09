// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../lib/connectDB';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectMongo();
          const user = await User.findOne({ email: credentials.email });

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            console.log("User authenticated:", user.email);
            console.log("2FA status:", Boolean(user.twoFactorSecret));
            
            // Return user with 2FA information
            return {
              id: user._id.toString(),
              email: user.email,
              role: user.role,
              twoFactorEnabled: Boolean(user.twoFactorSecret),
              twoFactorVerified: false, // Always false on new login session
            };
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled,
          twoFactorVerified: user.twoFactorVerified,
        };
      }

      if (trigger === 'update' && session) {
        token.user.twoFactorEnabled = session.user.twoFactorEnabled;
        token.user.twoFactorVerified = session.user.twoFactorVerified;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);