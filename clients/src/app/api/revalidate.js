export default async function handler(req, res) {
    const allowedMethods = ['POST', 'PUT', 'DELETE'];
  
    // Ensure only allowed methods are processed
    if (!allowedMethods.includes(req.method)) {
      res.setHeader('Allow', allowedMethods);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  
    try {
      // Validate the secret token (optional but recommended)
    //   if (req.headers['x-secret'] !== process.env.REVALIDATION_TOKEN) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    //   }
  
      // Validate request body
      const { path } = req.body;
      if (!path || typeof path !== 'string' || !path.startsWith('/')) {
        return res.status(400).json({ message: 'Invalid path. Path must be a non-empty string starting with "/"' });
      }
  
      // Handle revalidation for specific methods
      if (req.method === 'POST') {
        await res.revalidate(path); // Revalidate the static path
        return res.json({ revalidated: true, method: 'POST', message: `Page at ${path} revalidated.` });
      }
  
      if (req.method === 'PUT') {
        // Implement specific logic for PUT if needed
        await res.revalidate(path);
        return res.json({ revalidated: true, method: 'PUT', message: `Page at ${path} revalidated after PUT.` });
      }
  
      if (req.method === 'DELETE') {
        // Implement specific logic for DELETE if needed
        await res.revalidate(path);
        return res.json({ revalidated: true, method: 'DELETE', message: `Page at ${path} revalidated after DELETE.` });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error during revalidation', error: err.message });
    }
  }