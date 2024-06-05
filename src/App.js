import './App.css';
// import React, { useState, useEffect } from 'react';
// import RandomWord from './helpers/randomWords.js'
import TitleHeader from './components/layouts/TitleHeader.js'
import InGame from './components/pages/InGame.js'
import FooterSection from './components/layouts/FooterSection.js'

function App() {
  return (
    <div className="App">
      <TitleHeader/>
      <InGame/>
      <FooterSection/>
    </div>
  );
}

export default App;
