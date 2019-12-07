import React, { useState, useRef } from 'react';
import './App.css';

// try useEffect ?

function App() {

  const [clock, setClock] = useState({
    minutes: '25',
    seconds: '05',
    status: 'inactive',
    // intervalID: useRef()
  });

  const intervalID = useRef();

  // max time should be 60 minutes, and 60 seconds

  const incMin = () => {
    setClock({
      minutes: +clock.minutes + 1 > 9 ? ++clock.minutes : '0' + ++clock.minutes,
      seconds: clock.seconds
    })
  }
 
  const decMin = () => {
    setClock({
      minutes: +clock.minutes - 1 > 9 ? --clock.minutes : '0' + --clock.minutes,
      seconds: clock.seconds 
    })
  }

  const decSec = () => {
    setClock({
      minutes: clock.minutes,
      seconds: --clock.seconds 
    })
  }

  

  

  const countstart = () => {
    intervalID.current = setInterval(decSec, 1000);
  }

  const countstop = () => {
    clearInterval(intervalID.current);
  }

  return (
    <div className='app'>
      <div className='clock'>
        <div className='timer'>
          <div className='minutes'>{clock.minutes}</div>
          <div className='seconds'>{clock.seconds}</div>
        </div>
      </div>
      <button className='' onClick={ () => incMin() }>ADD</button>
      <button className='' onClick={ () => decMin() }>SUBTRACT</button>
      <button className='' onClick={ () => countstart()}>START</button>
      <button className='' onClick={ () => countstop()}>STOP</button>
    </div>
 
  );
}

export default App;
