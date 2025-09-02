// scripts/check-portfolio.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the project root .env.local file
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Import the Portfolio model
const Portfolio = (await import('../models/Portfolio.js')).default;

async function checkPortfolio() {
    try {
        console.log('🔍 Checking portfolio database...');

        // Check if MONGODB_URI is available
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI environment variable is not defined');
            console.log('Please check your .env.local file with your MongoDB connection string');
            console.log('Current working directory:', process.cwd());
            console.log('Script directory:', __dirname);
            console.log('Looking for .env.local file at:', join(__dirname, '..', '.env.local'));
            return;
        }

        console.log('🔌 Connecting to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGODB_URI.substring(0, 20) + '...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB successfully');

        // Check if Portfolio collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const portfolioCollection = collections.find(col => col.name === 'projects');

        if (!portfolioCollection) {
            console.log('⚠️ Portfolio collection does not exist');
            console.log('Available collections:', collections.map(col => col.name));
            return;
        }

        console.log('📊 Portfolio collection found');

        // Count total portfolio items
        const totalCount = await Portfolio.countDocuments();
        console.log(`📈 Total portfolio items: ${totalCount}`);

        // Count published items
        const publishedCount = await Portfolio.countDocuments({ status: 'publish' });
        console.log(`✅ Published portfolio items: ${publishedCount}`);

        // Count draft items
        const draftCount = await Portfolio.countDocuments({ status: 'draft' });
        console.log(`📝 Draft portfolio items: ${draftCount}`);

        // Get sample items
        const sampleItems = await Portfolio.find().limit(3);
        if (sampleItems.length > 0) {
            console.log('\n📋 Sample portfolio items:');
            sampleItems.forEach((item, index) => {
                console.log(`${index + 1}. ${item.title} (${item.status}) - ${item.slug}`);
            });
        } else {
            console.log('\n❌ No portfolio items found in database');
        }

    } catch (error) {
        console.error('❌ Error checking portfolio:', error.message);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

// Run the check
checkPortfolio();
