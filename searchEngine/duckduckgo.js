const fetchDuckDuckGoData = async (query, startIndex) => {
    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${query}&format=json`
      );
      const data = await response.json();
      console.log("DuckRes",data);
      return data.Results.map((item) => item.FirstURL);
    } catch (error) {
      console.error("Error fetching DuckDuckGo data", error);
      return [];
    }
  };
  
  export default fetchDuckDuckGoData;
  