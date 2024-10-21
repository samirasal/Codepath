import { useEffect, useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

const MY_API_KEY = import.meta.env.VITE_API_KEY; // Use VITE_API_KEY for Vite environment variables

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?&api_key=${MY_API_KEY}`
        );
        const json = await response.json();
        setList(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllCoinData(); // Call the function inside useEffect
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <ul>
          {list && Object.entries(list.Data).map(([coin]) =>
          list.Data[coin].PlatformType === "blockchain" ? (<li key={list.Data[coin].FullName}>{list.Data[coin].FullName} </li>): null)}
        </ul>

      </div>
    </>
  );
}

export default App;
