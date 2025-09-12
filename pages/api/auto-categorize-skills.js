// API endpoint to automatically categorize skills when they're added/updated
import About from '../../models/About';
import mongooseConnect from '../../lib/connectDB';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await mongooseConnect();
    
    // Get current about data
    const aboutData = await About.findOne();
    
    if (!aboutData) {
      return res.status(404).json({ message: 'About data not found' });
    }
    
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
    
    // Auto-categorize skills
    const updatedSkills = aboutData.skillimages.map(skill => {
      const category = skillCategories[skill.label] || 'frontend';
      
      return {
        ...skill,
        category: category,
        level: skill.level || 'Intermediate'
      };
    });
    
    // Update the database
    aboutData.skillimages = updatedSkills;
    await aboutData.save();
    
    // Group skills by category for response
    const categories = {};
    updatedSkills.forEach(skill => {
      const category = skill.category || 'uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(skill.label);
    });
    
    return res.status(200).json({
      success: true,
      message: 'Skills auto-categorized successfully',
      categories: categories,
      totalSkills: updatedSkills.length,
      updatedSkills: updatedSkills.map(skill => ({
        label: skill.label,
        category: skill.category,
        level: skill.level
      }))
    });
    
  } catch (error) {
    console.error('Error auto-categorizing skills:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to auto-categorize skills'
    });
  }
}
