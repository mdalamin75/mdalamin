import  mongooseConnect  from "../../lib/connectDB";
import Home  from "../../models/Home";

export default async function handler(req, res) {
  await mongooseConnect();
  
  if (req.method === 'GET') {
    if (req.query?.id) {
      // Get specific record
      const home = await Home.findById(req.query.id);
      res.json(home);
    } else {
      // Get all records (you might want to limit this to one)
      const homes = await Home.find();
      res.json(homes);
    }
  }

  if (req.method === 'POST') {
    // Create new record
    const homeDoc = await Home.create(req.body);
    res.json(homeDoc);
  }

  if (req.method === 'PUT') {
    // Update existing record
    const { _id, ...updateData } = req.body;
    await Home.findByIdAndUpdate(_id, updateData);
    res.json({ message: 'updated' });
  }
}