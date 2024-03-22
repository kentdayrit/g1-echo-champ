import './App.css';
import React, { useState, useEffect } from 'react';
import RandomWord from './helpers/randomWords.js'

function App() {
  const [randomWord, setRandomWord] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [totalTime, setTotalTime] = useState(30 +'s');
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [firstChar, setFirstChar] = useState(null);
  const [showRestartButton, setShowRestartButton] = useState(true);

  const wordList = RandomWord
  function wordPickerRandomizer() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const newWord = wordList[randomIndex];
    setRandomWord(newWord);
  }

  function gameTimer()
  {
      let time = 29;
      setInterval(() => {
      setIsDisabled(time <= 0)
      if(time >= 0) {
        setTotalTime(time-- +'s')
      }

      if(time < 0) {
        setTotalTime('Time\'s Up!')
        setRandomWord('---');
      }
    }, 1000);
  }

  useEffect(() => {
    wordPickerRandomizer();
  }, []);
  
  
  const handleInputChange = (event) => {
    if (!firstChar) {
      gameTimer();
      setFirstChar(true);
    }

    setInputValue(event.target.value);
    const typedWord = event.target.value.toLowerCase();
    if (typedWord === randomWord) {
      wordPickerRandomizer();
      setScore(score + 1);
      // setMessage('Correct!');
      setInputValue('');
    }
  };

  const handleRestart = () => {
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src="https://media.tenor.com/O6T25ctlsk0AAAAi/alien-dance.gif" width="40" height="60" alt="Alien Dance Sticker - Alien Dance Alien Dancing Stickers" ></img>
          Echo Champ! 
          <img src="https://media.tenor.com/O6T25ctlsk0AAAAi/alien-dance.gif" width="40" height="60" alt="Alien Dance Sticker - Alien Dance Alien Dancing Stickers" ></img>
        </h1>
        <div id="game-container">
          <div id="question">{randomWord}</div>
          <input 
            type="text" 
            id="answer" 
            placeholder="Type the word above" 
            onChange={handleInputChange}
            disabled={isDisabled}
            autocomplete="off" 
            // onfocus="this.setAttribute('autocomplete', 'none');"
            value={inputValue}
          />
          <div id="timer">
            <span id="score-value">{totalTime}</span>
          </div>
          <div id="score">Score: <span id="score-value">{score}</span></div>
          <div id="message">{message}</div>
          
          <button id="restartButton" onClick={handleRestart} >Restart</button>
        </div>
      </header>
      <footer>
        <p> - kd</p>
    </footer>

    </div>
  );
}

export default App;
