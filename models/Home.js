import { Schema, model, models } from "mongoose";

const HomeSchema = new Schema({
  title: [{ type: String }],
  image: [{ type: String }],
  description: { type: String },
  status: { type: String, enum: ['draft', 'publish'] }
}, {
  timestamps: true,
});

export default models?.Home || model('Home', HomeSchema);
