// models/About.js
import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema({
  aboutimage: [{ type: String }],
  description: { type: String, required: true },
  education: [{
    name: { type: String },
    date: { type: Date }
  }],
  skillimages: [{ type: String }],
  experiencetitle: { type: String },
  experiencedescription: { type: String },
  status: { type: String, required: true }
}, {
  timestamps: true,
});

export default models?.About || model('About', AboutSchema);