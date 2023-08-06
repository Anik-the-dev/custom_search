require('dotenv').config()
const fetchBingData = async (query, startIndex) => {
    try {
        const apiKey =process.env.BING_API_KEY;
        const response = await fetch(
        `https://api.bing.microsoft.com/v7.0/search?q=${query}&count=${startIndex}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const data = await response.json();
      return data.webPages.value.map((item) => item.url);
    } catch (error) {
      console.error('Error fetching data from Bing', error);
      return [];
    }
  };
  
module.exports = fetchBingData;
  