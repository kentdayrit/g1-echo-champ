import React, { useState, useEffect } from 'react';
import './HighScoreOffCanva.css';
import HighScoreOffCanvaList from '../canva/HighScoreOffCanvaList';

const HighScoreOffCanva = ({ placement, isOpen, onClose, children, buttonText = 'Close' }) => {
  const [usernameInput, setusernameInput] = useState(sessionStorage.getItem('username'));
  let userSession = sessionStorage.getItem('session');
  
  const handleChaneUsernameInput = (event) => {
    setusernameInput(event.target.value);
    sessionStorage.setItem('username', event.target.value);

  };

  if (!isOpen) return null;
  const offcanvasClass = `offcanvas offcanvas-${placement}`;
  const handleClose = () => {
    onClose(); // Call the provided onClose function
  };
  
  return (
    <div className={offcanvasClass}>
      <div className="offcanvas-header">
        <h2>PLAYERS DETAILS</h2>
      </div>

      <label for="ref">User Code:</label>
      <input className='input' type="text" id="ref" name="ref" disabled='true' value={userSession}/>
      <label for="ref">Username:</label>
      <input
        className='input' 
        type="text" 
        value={usernameInput}
        placeholder='Username'
        onChange={handleChaneUsernameInput}
      />
      
      <div className="offcanvas-header">
        <h2>TOP PLAYERS</h2>
      </div>
      <div className="offcanvas-body">
        <HighScoreOffCanvaList></HighScoreOffCanvaList>
      </div>
      <div className="offcanvas-footer">
        <button className="offcanvas-close-button" onClick={handleClose}>{buttonText}</button>
      </div>
    </div>
  );
};

  
export default HighScoreOffCanva;
  