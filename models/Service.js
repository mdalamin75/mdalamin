const {Schema, models, model} = require('mongoose');

const ServiceSchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, unique: true, required: true},
    description: {type: String},
    btnurl: {type: String},
    tags: [{type: String}],
    status: {type: String, required: true}, // Added required for status
}, {
    timestamps: true,
});

// Changed the export syntax to match your API import
module.exports = models.Service || model('Service', ServiceSchema);