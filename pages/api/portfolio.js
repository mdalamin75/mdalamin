import Project from "../../models/Portfolio";
import  mongooseConnect  from "../../lib/connectDB";


export default async function handle(req, res) {
    try {
        // if authenticated, connect to MongoDB
        await mongooseConnect();

        const { method } = req;

        // Use uppercase for consistency with HTTP methods
        if (method === 'POST') {
            const { title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;
            const blogDoc = await Project.create({
                title, slug, images, description, client, projectcategory, tags, livepreview, status
            });
            return res.status(201).json(blogDoc);
        }

        if (method === 'GET') {
            if (req.query?.id) {
                const blog = await Project.findById(req.query.id);
                if (!blog) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.json(blog);
            }
            const blogs = await Project.find();
            return res.json(blogs.reverse());
        }

        if (method === 'PUT') {
            const { _id, title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;
            await Project.updateOne({ _id }, {
                title, slug, images, description, client, projectcategory, tags, livepreview, status
            });
            return res.json(true);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                await Project.deleteOne({ _id: req.query?.id });
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