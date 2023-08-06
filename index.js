const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 4000;

const fetchGoogleData = require('./searchEngine/google')
const fetchBingData = require('./searchEngine/bing')

app.use(express.json());
app.use(cors());

app.post('/search', async (req, res) => {
    console.log(req.body)
  const query = req.body.query; 

  let startIndex = 0;
  const allGoogleResults = [];
  const allBingResults = []; 

  for (let i = 0; i < 1; i++) { 
    const googleResults = await fetchGoogleData(query,startIndex);
    const bingResults = await fetchBingData(query,startIndex);
    allGoogleResults.push(...googleResults);
    allBingResults.push(...bingResults); 
    startIndex += 10;
  }


  const combinedResults = [...allGoogleResults, ...allBingResults];
  const secureResults = combinedResults.filter(checkHTTPS);

// remove duplicates
const deduplicatedResults = removeDuplicates(secureResults);
console.log("dedup:",deduplicatedResults);

  res.json(deduplicatedResults);
})

// Middleware to check HTTPS
function checkHTTPS(url) {
    return url.startsWith('https://');
  }
  

function removeDuplicates(arr) {
    const seenUrls = new Set();
    return arr.filter((item) => {
      if (!seenUrls.has(item)) {
        seenUrls.add(item);
        return true;
      }
      return false;
    });
}
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});