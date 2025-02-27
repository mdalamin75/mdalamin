import Service from "../../models/Service";
import mongooseConnect from "../../lib/connectDB";

export default async function handle(req, res) {
    try {
        await mongooseConnect();

        const { method } = req;

        if (method === 'POST') {
            // Validate required fields
            const { title, slug, description, btnurl, tags, status } = req.body;

            if (!title || !slug || !status) {
                return res.status(400).json({
                    error: 'Missing required fields',
                    required: ['title', 'slug', 'status']
                });
            }

            // Check if slug already exists
            const existingService = await Service.findOne({ slug });
            if (existingService) {
                return res.status(400).json({ error: 'Slug already exists' });
            }

            // Create new service
            const serviceDoc = await Service.create({
                title,
                slug,
                description,
                btnurl,
                tags: tags || [],
                status
            });

            return res.status(201).json(serviceDoc);
        }

        if (method === 'GET') {
            // Get by ID
            if (req.query?.id) {
                const service = await Service.findById(req.query.id);
                if (!service) {
                    return res.status(404).json({ error: 'Service not found' });
                }
                return res.json(service);
            }

            // Get by slug
            if (req.query?.slug) {
                const service = await Service.findOne({ slug: req.query.slug });
                if (!service) {
                    return res.status(404).json({ error: 'Service not found' });
                }
                return res.json(service);
            }

            // Get all Services with optional filtering
            const filter = {};

            // Add status filter if provided
            if (req.query?.status) {
                filter.status = req.query.status;
            }

            // Add category filter if provided
            if (req.query?.category) {
                filter.servicecategory = req.query.category;
            }

            const services = await Service.find(filter)
                .sort({ createdAt: -1 }); // Sort by newest first

            return res.json(services);
        }

        if (method === 'PUT') {
            const { _id, title, slug, description, btnurl, tags, status } = req.body;

            if (!_id) {
                return res.status(400).json({ error: 'ID is required for updates' });
            }

            // Check if Service exists
            const existingService = await Service.findById(_id);
            if (!existingService) {
                return res.status(404).json({ error: 'Service not found' });
            }

            // Check if new slug already exists (if slug is being changed)
            if (slug !== existingService.slug) {
                const slugExists = await Service.findOne({ slug, _id: { $ne: _id } });
                if (slugExists) {
                    return res.status(400).json({ error: 'Slug already exists' });
                }
            }

            // Update Service
            const updatedService = await Service.findByIdAndUpdate(
                _id,
                {
                    title,
                    slug,
                    description,
                    btnurl,
                    tags: tags || [],
                    status
                },
                { new: true } // Return updated document
            );

            return res.json(updatedService);
        }

        if (method === 'DELETE') {
            if (!req.query?.id) {
                return res.status(400).json({ error: 'ID is required' });
            }

            // Check if Service exists
            const service = await Service.findById(req.query.id);
            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }

            // Delete Service
            await Service.findByIdAndDelete(req.query.id);
            return res.json({ success: true, message: 'Service deleted successfully' });
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