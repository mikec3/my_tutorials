import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import TimeSeries from './TimeSeries';
import Histogram from './Histogram'
import './App.css';

function App() {

  return (
    <div className="App">
    <h2> React & D3 Chart Examples </h2>
    <div className='row'>
      <LineChart width={400} height={300} />

      <TimeSeries width={400} height={300}/>

      <Histogram width={400} height={400}/>
    </div>
    </div>
  );
}

export default App;