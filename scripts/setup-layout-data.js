// Script to set up header and footer data in the database
// Run this script to populate your site_config collection

const mongooseConnect = require('../lib/connectDB');
const mongoose = require('mongoose');

async function setupLayoutData() {
    try {
        // Connect to MongoDB
        await mongooseConnect();

        // Header configuration
        const headerConfig = {
            type: 'header',
            data: {
                logo: "MD. AL AMIN",
                tagline: "Full Stack Developer",
                navigation: [
                    { href: "/", title: "Home" },
                    { href: "/about", title: "About" },
                    { href: "/portfolio", title: "Portfolio" },
                    { href: "/service", title: "Services" },
                    { href: "/contact", title: "Contact" }
                ],
                themeToggle: true,
                mobileMenu: true
            }
        };

        // Footer configuration
        const footerConfig = {
            type: 'footer',
            data: {
                socialLinks: [
                    {
                        name: "GitHub",
                        url: "https://github.com/mdalamin75",
                        icon: "github",
                        color: "hover:text-gray-400"
                    },
                    {
                        name: "LinkedIn",
                        url: "https://linkedin.com/in/mdalamin75",
                        icon: "linkedin",
                        color: "hover:text-blue-500"
                    },
                    {
                        name: "Email",
                        url: "mailto:mdalamiin75@gmail.com",
                        icon: "email",
                        color: "hover:text-red-500"
                    }
                ],
                copyright: "© 2024 MD. AL AMIN. All rights reserved.",
                links: [
                    { href: "/", title: "Home" },
                    { href: "/about", title: "About" },
                    { href: "/portfolio", title: "Portfolio" },
                    { href: "/service", title: "Services" },
                    { href: "/contact", title: "Contact" }
                ],
                tagline: "Connect With Me"
            }
        };

        // Insert or update header config
        await mongoose.connection.db.collection('site_config').updateOne(
            { type: 'header' },
            { $set: headerConfig },
            { upsert: true }
        );

        // Insert or update footer config
        await mongoose.connection.db.collection('site_config').updateOne(
            { type: 'footer' },
            { $set: footerConfig },
            { upsert: true }
        );

        console.log('✅ Layout data setup completed successfully!');
        console.log('Header and footer configurations have been added to the database.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up layout data:', error);
        process.exit(1);
    }
}

// Run the setup
setupLayoutData();
