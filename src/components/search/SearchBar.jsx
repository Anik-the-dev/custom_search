import React, { useState } from 'react';
import './SearchBar.css'
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    try {
        setLoading(true);
        setError('')
        setResults([])
        const encodedQuery = encodeURIComponent(query);
        const url = `http://localhost:4000/search`;
        const data = {
          query: encodedQuery,
        };
    
        const response = await axios.post(url, data);
        console.log("response",response);
        console.log("resData",response.data);
        setLoading(false);
        setResults(response.data)
      } catch (error) {
        setLoading(false);
        console.log("Error making POST request", error);
        setError(error.message);

      }
  };

  return (
    <div className='main-container'>
    <h1 className='head-title'><span>Custom</span> Search Bar</h1>
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="search-bar-input"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {results && results.length > 0 && 
    <div  className="link-container">
      <p className='link-headline'>Search Result( Secured, Unique from multiple search Engine Like Google, Bing, Duck Duck Go etc.) </p>
      {results.map((link, index) => {
          return (
              <ul key={index} className="link-list">
                <li className="link-item">{link}</li>
              </ul>
          );
        })}
    </div> }
  </div>
  );
};

export default SearchBar;
