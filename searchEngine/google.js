require('dotenv').config()
const fetchGoogleData = async (query, startIndex) => {
    try {
      const cxId =process.env.GOOGLE_CX;
      const apiKey =process.env.GOOGLE_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cxId}&q=${query}&start=${startIndex}`
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }
  

      const data = await response.json();
      return data.items.map((item) => item.link);
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };
  
module.exports = fetchGoogleData;
  