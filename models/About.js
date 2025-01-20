import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema({
  title: [{ type: String }],
  image: [{ type: String }],
  description: { type: String },
  status: { type: String, enum: ['draft', 'publish'] }
}, {
  timestamps: true,
});

export default models?.About || model('About', AboutSchema);
