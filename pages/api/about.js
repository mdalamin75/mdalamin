import mongooseConnect from "../../lib/connectDB";
import About from "../../models/About";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        if (req.query?.id) {
            // Get specific record
            const about = await About.findById(req.query.id);
            res.json(about);
        } else {
            // Get all records (you might want to limit this to one)
            const abouts = await About.find();
            res.json(abouts);
        }
    }

    if (req.method === 'POST') {
        // Create new record
        const aboutDoc = await About.create(req.body);
        res.json(aboutDoc);
    }

    if (req.method === 'PUT') {
        // Update existing record
        const { _id, ...updateData } = req.body;
        await About.findByIdAndUpdate(_id, updateData);
        res.json({ message: 'updated' });
    }
}