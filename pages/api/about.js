// pages/api/about.js
import mongooseConnect from "../../lib/connectDB";
import  About  from "../../models/About";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    try {
      const about = await About.find();
      res.json(about);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const aboutDoc = await About.create({
        aboutimage: req.body.aboutimage,
        description: req.body.description,
        education: req.body.education,
        skillimages: req.body.skillimages,
        experiencetitle: req.body.experiencetitle,
        experiencedescription: req.body.experiencedescription,
        status: req.body.status
      });
      res.json(aboutDoc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      await About.updateOne(
        { _id: id },
        {
          aboutimage: req.body.aboutimage,
          description: req.body.description,
          education: req.body.education,
          skillimages: req.body.skillimages,
          experiencetitle: req.body.experiencetitle,
          experiencedescription: req.body.experiencedescription,
          status: req.body.status
        }
      );
      res.json({ message: 'updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}