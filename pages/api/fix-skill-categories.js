// API endpoint to fix skill categories with exact matching
import About from '../../models/About';
import mongooseConnect from '../../lib/connectDB';

export default async function handler(req, res) {
  try {
    await mongooseConnect();
    
    // Get current about data
    const aboutData = await About.findOne();
    
    if (!aboutData) {
      return res.status(404).json({ message: 'About data not found' });
    }
    
    // Define exact skill categories based on your skills
    const skillCategories = {
      'HTML': 'frontend',
      'CSS': 'frontend', 
      'SASS': 'frontend',
      'Bootstrap': 'frontend',
      'Tailwind': 'frontend',
      'JavaScript': 'frontend',
      'jQuery': 'frontend',
      'React JS': 'frontend',
      'Next Js': 'frontend',
      'PHP': 'backend',
      'MySQL': 'database',
      'WordPress': 'tools',
      'Shopify': 'tools',
      'Git': 'tools',
      'Github': 'tools',
      'Gitlab': 'tools'
    };
    
    // Update skill categories with exact matching
    const updatedSkills = aboutData.skillimages.map(skill => {
      const category = skillCategories[skill.label] || 'frontend';
      
      return {
        ...skill,
        category: category,
        level: skill.level || 'Intermediate'
      };
    });
    
    // Update the database with explicit save
    aboutData.skillimages = updatedSkills;
    await aboutData.save();
    
    // Verify the update
    const updatedData = await About.findOne();
    const categories = {};
    
    updatedData.skillimages.forEach(skill => {
      const category = skill.category || 'uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(skill.label);
    });
    
    return res.status(200).json({
      success: true,
      message: 'Skills categories fixed successfully',
      categories: categories,
      totalSkills: updatedData.skillimages.length,
      updatedSkills: updatedData.skillimages.map(skill => ({
        label: skill.label,
        category: skill.category,
        level: skill.level
      })),
    });
    
  } catch (error) {
    console.error('Error fixing skill categories:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to fix skill categories'
    });
  }
}
