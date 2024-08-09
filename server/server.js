const express = require('express');
const axios = require('axios');
const imghash = require('imghash');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 


async function loadImageBuffer(url) {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Image not found at URL: ${url}`);
      return null; // Return null to indicate image was not found
    } else {
      console.error(`Error loading image from URL: ${url}`, error);
      throw error;
    }
  }
}

// Generate perceptual hash for an image buffer
async function generateImageHash(buffer) {
  return imghash.hash(buffer, 16, 'binary');
}

// Compare hashes to determine similarity
function compareHashes(hash1, hash2) {
  // Hamming distance to measure similarity
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) {
      distance++;
    }
  }
  return (1 - distance / hash1.length).toFixed(4); // Normalize to [0, 1] range
}

app.get('/', (req, res) => {
  res.send('Hello World!'); // Respond a simple message on the page
});

// 定义 API 端点
app.post('/compare', async (req, res) => {
  const { url1, url2 } = req.body;
  
  try {
    console.log('Receiving origin-image link:', url1);
    console.log('Receiving hit-image link:', url2);
    
    const img1 = await loadImageBuffer(url1);
    if (!img1) {
      console.error('Origin image not found, skipping processing.');
      const similarity = 0;
      res.json({ similarity });
      return; // Exit early if image not found
    }
    
    const img2 = await loadImageBuffer(url2);
    if (!img2) {
      console.error('Hit image not found, skipping processing.');
      const similarity = 0;
      res.json({ similarity });
      return; // Exit early if image not found
    }

    const hash1 = await generateImageHash(img1);
    const hash2 = await generateImageHash(img2);

    const similarity = compareHashes(hash1, hash2);
    console.log('Similarity:', similarity, '\n');
    res.json({ similarity });
    
  } catch (error) {
    console.error('Error processing images:', error);
    res.status(500).json({ error: 'Error processing images' });
  }
});

// Message for testing
app.get('/test', (req, res) => {
  res.json({ message: 'Server is up and running!' });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});