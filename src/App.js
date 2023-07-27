import React from 'react';
import ParallaxArch from './ParallaxArch';

const App = () => {
  return (
      <div>
        <ParallaxArch />
        {/* The div below is for testing purposes, and to demonstrate that we can scroll down normally after. */}
        <div style={{ position: 'relative', height:"10000px", width:"100%", background:"#5a5aff"}}></div>
      </div>
  );
};

export default App;