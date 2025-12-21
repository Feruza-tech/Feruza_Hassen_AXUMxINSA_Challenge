const express = require('express');
const axios = require('axios');
const router = express.Router();

const ALLOWED_DOMAINS = ['imgur.com', 'images.example.com'];

router.post('/fetch-image', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    const hostname = new URL(imageUrl).hostname;

    if (!ALLOWED_DOMAINS.some(d => hostname.endsWith(d))) {
      return res.status(403).send('Domain not allowed');
    }

    // SSRF vulnerable fetch
    await axios.get(imageUrl);

    res.send('Image fetched');
  } catch (err) {
    res.status(500).send('Fetch failed');
  }
});

module.exports = router; // 🔴 THIS LINE MUST EXIST
