import Testimonial from "../../models/Testimonial";
import mongooseConnect from "../../lib/connectDB";


export default async function handle(req, res) {
    try {
        // if authenticated, connect to MongoDB
        await mongooseConnect();

        const { method } = req;

        // Use uppercase for consistency with HTTP methods
        if (method === 'POST') {
            const { clientname, date, nationality, review, star, status } = req.body;
            const testimonialDoc = await Testimonial.create({
                clientname, date, nationality, review, star, status
            });
            return res.status(201).json(testimonialDoc);
        }

        if (method === 'GET') {
            if (req.query?.id) {
                const testimonial = await Testimonial.findById(req.query.id);
                if (!testimonial) {
                    return res.status(404).json({ error: 'Testimonial not found' });
                }
                return res.json(testimonial);
            }
            const testimonials = await Testimonial.find();
            return res.json(testimonials.reverse());
        }

        if (method === 'PUT') {
            const { _id, clientname, date, nationality, review, star, status } = req.body;
            await Testimonial.updateOne({ _id }, {
                clientname, date, nationality, review, star, status
            });
            return res.json(true);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                await Testimonial.deleteOne({ _id: req.query?.id });
                return res.json(true);
            }
            return res.status(400).json({ error: 'ID is required' });
        }

        // Handle unsupported methods
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}