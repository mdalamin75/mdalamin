// pages/api/about.js
import mongooseConnect from "../../lib/connectDB";
import  About  from "../../models/About";

// Comprehensive skill categories mapping
const skillCategories = {
  // Frontend Technologies
  'HTML': 'frontend',
  'CSS': 'frontend', 
  'SASS': 'frontend',
  'SCSS': 'frontend',
  'Bootstrap': 'frontend',
  'Tailwind': 'frontend',
  'Tailwind CSS': 'frontend',
  'JavaScript': 'frontend',
  'JS': 'frontend',
  'jQuery': 'frontend',
  'React': 'frontend',
  'React JS': 'frontend',
  'React.js': 'frontend',
  'Next': 'frontend',
  'Next Js': 'frontend',
  'Next.js': 'frontend',
  'Vue': 'frontend',
  'Vue.js': 'frontend',
  'Angular': 'frontend',
  'TypeScript': 'frontend',
  'TS': 'frontend',
  
  // Backend Technologies
  'PHP': 'backend',
  'Node': 'backend',
  'Node.js': 'backend',
  'Express': 'backend',
  'Python': 'backend',
  'Django': 'backend',
  'Flask': 'backend',
  'Java': 'backend',
  'Spring': 'backend',
  'C#': 'backend',
  '.NET': 'backend',
  'Ruby': 'backend',
  'Rails': 'backend',
  'Go': 'backend',
  'Rust': 'backend',
  
  // Database Technologies
  'MySQL': 'database',
  'PostgreSQL': 'database',
  'MongoDB': 'database',
  'SQLite': 'database',
  'Redis': 'database',
  'Firebase': 'database',
  'Supabase': 'database',
  
  // Tools & DevOps
  'Git': 'tools',
  'Github': 'tools',
  'GitLab': 'tools',
  'Gitlab': 'tools',
  'Bitbucket': 'tools',
  'Docker': 'tools',
  'Kubernetes': 'tools',
  'AWS': 'tools',
  'Azure': 'tools',
  'Vercel': 'tools',
  'Netlify': 'tools',
  'Heroku': 'tools',
  'WordPress': 'tools',
  'Shopify': 'tools',
  'WooCommerce': 'tools',
  'Magento': 'tools',
  'Figma': 'tools',
  'Adobe XD': 'tools',
  'Sketch': 'tools',
  'Photoshop': 'tools',
  'Illustrator': 'tools',
  
  // Mobile Development
  'React Native': 'mobile',
  'Flutter': 'mobile',
  'Ionic': 'mobile',
  'Xamarin': 'mobile',
  'Swift': 'mobile',
  'Kotlin': 'mobile',
  
  // AI & Machine Learning
  'TensorFlow': 'ai',
  'PyTorch': 'ai',
  'OpenAI': 'ai',
  'Machine Learning': 'ai',
  'Deep Learning': 'ai',
  'NLP': 'ai',
  'Computer Vision': 'ai'
};

// Function to auto-categorize skills
function categorizeSkills(skills) {
  return skills.map(skill => ({
    ...skill,
    category: skillCategories[skill.label] || 'frontend',
    level: skill.level || 'Intermediate'
  }));
}

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
      // Auto-categorize skills before saving
      const categorizedSkills = categorizeSkills(req.body.skillimages || []);
      
      const aboutDoc = await About.create({
        aboutimage: req.body.aboutimage,
        description: req.body.description,
        education: req.body.education,
        skillimages: categorizedSkills,
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
      // Auto-categorize skills before updating
      const categorizedSkills = categorizeSkills(req.body.skillimages || []);
      
      await About.updateOne(
        { _id: id },
        {
          aboutimage: req.body.aboutimage,
          description: req.body.description,
          education: req.body.education,
          skillimages: categorizedSkills,
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