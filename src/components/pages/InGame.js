import React, { useState, useEffect, useRef } from 'react';
import RandomWord from '../../helpers/randomWords';
import HighScoreOffCanva from '../canva/HighScoreOffCanva';
import { createUser, getUsersById  } from '../../configs/firebase';

function InGame() {
  const [randomWord, setRandomWord] = useState('');
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(30 +'s');
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [firstChar, setFirstChar] = useState(null);
  const scoreSpanRef = useRef(null);

  const saveToSessionStorage = () => {
    if(!sessionStorage.getItem('session')) {
      sessionStorage.setItem('session', generateRandomData());
    }
    
    return sessionStorage.getItem('session');
  };

  const getUsername = () => {
    if(!sessionStorage.getItem('username')) {
      return sessionStorage.setItem('username', 'Unknown');
    }
    
    return sessionStorage.getItem('username');
  };

  const generateRandomData = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 30; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result+Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  };

  const wordList = RandomWord
  function wordPickerRandomizer() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const newWord = wordList[randomIndex];
    setRandomWord(newWord);
  }

  const checkPreviousUserScore = async (session, userScore, username) => {
    try {
      const response = await getUsersById(session);
      if (!response?.data?.score || response.data.score < userScore) {
        return await createUser(session, username, userScore);
      }
    } catch (err) {
      console.error('Error fetching top users:', err);
    }
  };


  const handleCreateUser = async (username, userScore) => {
    try {
      checkPreviousUserScore(sessionStorage.getItem('session'), userScore, username)
    } catch (err) {
      console.error('Error saving new user:', err);
    }
  }

  function gameTimer()
  {
      let time = 29;
      let gameIntervalId = setInterval(() => {

      setIsDisabled(time <= 0)
      if(time >= 0) {
        setTotalTime(time-- +'s')
      }

      if(time < 0) {
        handleCreateUser(getUsername(), parseInt(scoreSpanRef.current.textContent))
        clearInterval(gameIntervalId);
        setTotalTime('Time\'s Up!')
        setRandomWord('---');
      }
    }, 1000);
  }

  useEffect(() => {
    saveToSessionStorage();
    scoreSpanRef.current.textContent = score; 
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
      setInputValue('');
    }
  };

  const handleRestart = () => {
    window.location.reload();
  }
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenOffcanvas = () => {
    setIsOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOpen(false);
  };

  const handlePreventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <div id="game-container">
      <div id="question" 
        onCopy={handlePreventDefault}
        onCut={handlePreventDefault}
      >{randomWord}</div> 
      <input 
        type="text" 
        id="answer" 
        placeholder="Type the word above" 
        onChange={handleInputChange}
        disabled={isDisabled}
        autocomplete="off" 
        value={inputValue}
        onPaste={handlePreventDefault}
      />
      <div id="timer">
        <span id="score-value">{totalTime}</span>
      </div>
      <div id="score">Score: <span id="score-value" ref={scoreSpanRef}>{score}</span></div>
      
      <button id="restartButton" onClick={handleRestart} >Restart</button>
      <button id="HighScoreButton" onClick={handleOpenOffcanvas}>TOP PLAYERS</button>
      <HighScoreOffCanva
        placement="start"
        isOpen={isOpen}
        onClose={handleCloseOffcanvas}
      >
      </HighScoreOffCanva>
    </div>
  );
}

export default InGame;
