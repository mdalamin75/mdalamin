import Portfolio from "../../models/Portfolio";
import mongooseConnect from "../../lib/connectDB";

export default async function handle(req, res) {
    try {
        await mongooseConnect();

        const { method } = req;

        if (method === 'POST') {
            // Validate required fields
            const { title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;

            if (!title || !slug || !status) {
                return res.status(400).json({
                    error: 'Missing required fields',
                    required: ['title', 'slug', 'status']
                });
            }

            // Check if slug already exists
            const existingProject = await Portfolio.findOne({ slug });
            if (existingProject) {
                return res.status(400).json({ error: 'Slug already exists' });
            }

            // Create new project
            const projectDoc = await Portfolio.create({
                title,
                slug,
                images: images || [],
                description,
                client,
                projectcategory: projectcategory || [],
                tags: tags || [],
                livepreview,
                status
            });

            return res.status(201).json(projectDoc);
        }

        if (method === 'GET') {
            // Get by ID
            if (req.query?.id) {
                const project = await Portfolio.findById(req.query.id);
                if (!project) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.json(project);
            }

            // Get by slug
            if (req.query?.slug) {
                const project = await Portfolio.findOne({ slug: req.query.slug });
                if (!project) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.json(project);
            }

            // Get all projects with optional filtering
            const filter = {};

            // Add status filter if provided
            if (req.query?.status) {
                filter.status = req.query.status;
            }

            // Add category filter if provided
            if (req.query?.category) {
                filter.projectcategory = req.query.category;
            }

            const projects = await Portfolio.find(filter)
                .sort({ createdAt: -1 }); // Sort by newest first

            return res.json(projects);
        }

        if (method === 'PUT') {
            const { _id, title, slug, images, description, client, projectcategory, tags, livepreview, status } = req.body;

            if (!_id) {
                return res.status(400).json({ error: 'ID is required for updates' });
            }

            // Check if project exists
            const existingProject = await Portfolio.findById(_id);
            if (!existingProject) {
                return res.status(404).json({ error: 'Project not found' });
            }

            // Check if new slug already exists (if slug is being changed)
            if (slug !== existingProject.slug) {
                const slugExists = await Portfolio.findOne({ slug, _id: { $ne: _id } });
                if (slugExists) {
                    return res.status(400).json({ error: 'Slug already exists' });
                }
            }

            // Update project
            const updatedProject = await Portfolio.findByIdAndUpdate(
                _id,
                {
                    title,
                    slug,
                    images: images || [],
                    description,
                    client,
                    projectcategory: projectcategory || [],
                    tags: tags || [],
                    livepreview,
                    status
                },
                { new: true } // Return updated document
            );

            return res.json(updatedProject);
        }

        if (method === 'DELETE') {
            if (!req.query?.id) {
                return res.status(400).json({ error: 'ID is required' });
            }

            // Check if project exists
            const project = await Portfolio.findById(req.query.id);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            // Delete project
            await Portfolio.findByIdAndDelete(req.query.id);
            return res.json({ success: true, message: 'Project deleted successfully' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('API Error:', error);

        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Duplicate value error',
                field: Object.keys(error.keyPattern)[0]
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: Object.values(error.errors).map(err => err.message)
            });
        }

        return res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}