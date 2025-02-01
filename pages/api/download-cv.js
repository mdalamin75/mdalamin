import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const response = await axios.get(url, { responseType: 'arraybuffer' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=MD_AL_AMIN_CV.pdf');
    res.setHeader('Content-Length', response.data.length);

    res.send(Buffer.from(response.data, 'binary'));

  } catch (error) {
    console.error('Error downloading PDF:', error.message);
    console.error('Error response data:', error.response?.data);
    res.status(500).json({ message: `Failed to download PDF: ${error.message}` });
  }
}
