import { useState } from 'react';

import Flashcard from "./Components/Flashcard";
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      {/* <div className='header'>
        
        <h2>The Ultimate Study French Aid!</h2>
        <h3>How ready are you to live in France? Let's put you to the test!</h3>
        <p>Number of cards: 10</p>
      </div> */}
      <Flashcard/>
    </div>
  );
}

export default App;
