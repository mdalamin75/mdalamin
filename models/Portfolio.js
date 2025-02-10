const {Schema, models, model} = require('mongoose');

const ProjectSchema = new Schema({
    title: {type: String, required: true}, // Added required since title should be mandatory
    slug: {type: String, unique: true, required: true},
    images: [{type: String}],
    description: {type: String},
    client: {type: String},
    projectcategory: [{type: String}],
    tags: [{type: String}],
    livepreview: {type: String},
    status: {type: String, required: true}, // Added required for status
}, {
    timestamps: true,
});

// Changed the export syntax to match your API import
module.exports = models.Project || model('Project', ProjectSchema);