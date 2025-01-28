const {Schema, models, model} = require('mongoose');

const TestimonialSchema = new Schema({
    clientname: { type: String, required: true },
    date: { type: String, required: true },
    nationality: { type: String, required: true },
    review: { type: String, required: true },
    star: { type: Number, required: true },
    status: {type: String, required: true},
}, {
    timestamps: true,
});

// Changed the export syntax to match your API import
module.exports = models.Testimonial || model('Testimonial', TestimonialSchema);