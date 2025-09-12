// models/About.js
import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema({
  aboutimage: [{ type: String }],
  description: { type: String, required: true },
  education: [{
    name: { type: String }, // Legacy field for backward compatibility
    degree: { type: String }, // e.g., "Bachelor of Science in Computer Science"
    institution: { type: String }, // e.g., "University of California, Berkeley"
    location: { type: String }, // e.g., "Berkeley, CA"
    date: { type: Date },
    gpa: { type: String }, // e.g., "3.8/4.0"
    coursework: { type: String }, // Relevant courses
    achievements: { type: String } // Dean's list, honors, etc.
  }],
  skillimages: [{
    src: { type: String },
    label: { type: String },
    category: { type: String, enum: ['frontend', 'backend', 'tools', 'devops', 'database', 'mobile', 'ai'], default: 'frontend' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' }
  }],
  certifications: [{
    name: { type: String }, // e.g., "AWS Certified Solutions Architect"
    issuer: { type: String }, // e.g., "Amazon Web Services"
    date: { type: Date },
    credentialId: { type: String },
    credentialUrl: { type: String }
  }],
  experiencetitle: { type: String },
  experiencedescription: { type: String },
  status: { type: String, required: true }
}, {
  timestamps: true,
});

export default models?.About || model('About', AboutSchema);