import React, { useState, useEffect } from "react";
import "./App.css";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'



function App() {
  const [brands, setBrands] = useState([]);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [banList, setBanList] = useState([]);

  // Fetch data from the mock JSON API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/fashionBrands.json");
        const data = await response.json();
        setBrands(data);
        getRandomBrand(data); // Get a random brand after fetching data
      } catch (error) {
        console.error("Error fetching the brands:", error);
      }
    };

    fetchBrands(); // Call the async function to fetch data
  }, []);

  const getRandomBrand = (availableBrands) => {
    const filteredBrands = availableBrands.filter(
      (brand) => !banList.includes(brand.name)
    );
    if (filteredBrands.length > 0) {
      const randomBrand =
        filteredBrands[Math.floor(Math.random() * filteredBrands.length)];
      setCurrentBrand(randomBrand);
    } else {
      setCurrentBrand(null);
    }
  };

  const handleNext = () => {
    getRandomBrand(brands);
  };

  const handleBan = (brandName) => {
    setBanList([...banList, brandName]);
    handleNext();
  };

  return (
    <div className="App">
      <h1>Fashion Discoverer</h1>

      {currentBrand ? (
        <div className="brand-container">
          <h2>{currentBrand.name}</h2>
          <p>Founder: {currentBrand.founder}</p>
          <p>Founded: {currentBrand.foundedYear}</p>
          <p>{currentBrand.description}</p>
          <img
            src={currentBrand.imageUrl}
            alt={currentBrand.name}
            style={{ width: "200px" }}
          />
          <div className="controls">
            <button onClick={handleNext}>Next Brand</button>
            <button onClick={() => handleBan(currentBrand.name)}>
              Ban this Brand
            </button>
          </div>
        </div>
      ) : (
        <p>No more brands to display!</p>
      )}

      {/* Ban List */}
      {banList.length > 0 && (
        <div className="ban-list">
          <h3>Banned Brands:</h3>
          <ul>
            {banList.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

