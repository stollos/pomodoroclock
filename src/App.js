import React, { useState, useRef } from 'react';
import './App.css';

// try useEffect ?

function App() {

  const [clock, setClock] = useState({
    session: 25,
    break: 5,
    time: 5,
    status: 'inactive',
    phase: 'Session'
  });

  const intervalID = useRef();

  const timer = () => {
    let min = Math.floor(clock.time / 60);
    let sec = clock.time - min * 60;
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    return min + ':' + sec;
  }

  const decBreak = () => {
    if (clock.break > 1 && clock.status === 'inactive') clock.phase === 'Break' ? setClock({...clock, break: clock.break -= 1,  time: clock.break * 60}) : setClock({...clock, break: clock.break -= 1});
  }

  const incBreak = () => {
    clock.phase === 'Break' ? setClock({...clock, break: clock.break += 1,  time: clock.break * 60}) : setClock({...clock, break: clock.break += 1});  }

  const decSession = () => {
    if (clock.session > 1 && clock.status === 'inactive')
    clock.phase === 'Session' ? setClock({...clock, session: clock.session -= 1,  time: clock.session * 60}) : setClock({...clock, session: clock.session -= 1});
  }

  const incSession = () => {
    clock.phase === 'Session' ? setClock({...clock, session: clock.session += 1,  time: clock.session * 60}) : setClock({...clock, session: clock.session += 1});
  }

  const start_stop = () => {
    clock.status === 'inactive' ? intervalID.current = setInterval(startTimer, 1000) : stopTimer();
  }

  const startTimer = () => {
    setClock({...clock, time: clock.time -= 1, status: 'active'})
    phaseManager();

    // if (clock.time === 0 && clock.phase === 'Session') setClock({...clock, time: clock.break * 60, phase: 'Break'});
    // else if (clock.time === 0 && clock.phase === 'Break') setClock({...clock, time: clock.session * 60, phase: 'Session'});
    // else setClock({...clock, time: clock.time -= 1, status: 'active'});

    console.log(clock.status);
  }

  const stopTimer = () => {
    setClock({...clock, status: 'inactive'});
    clearInterval(intervalID.current)
  }

  const phaseManager = () => {
    if (clock.time === 0 && clock.phase === 'Session') setClock({...clock, time: clock.break * 60, phase: 'Break'});
    if (clock.time === 0 && clock.phase === 'Break') setClock({...clock, time: clock.session * 60, phase: 'Session'});
  }

  // ohhhhhhh great, setState is asynchronous, no setting state multiple times in a single call. this will overwrite previous properties written to that state.

  const resetClock = () => {
    stopTimer();

    setClock({
      session: 25,
      break: 5,
      time: 1500,
      status: 'inactive',
      phase: 'Session'
    })
  }

  return (
    <div className='app'>
      <p id='timer-label'>{clock.phase}</p>
      <div className='holder'>
        <div id="session">
          <label id="session-label">Session Length</label>
          <button id='session-increment' onClick={ () => incSession() }>ADD</button>
          <p id='session-length'>{clock.session}</p>
          <button id='session-decrement' onClick={ () => decSession() }>SUBTRACT</button>
        </div>
        <div className='clock'>
          <div className='timer'>
            <div id='time-left'>{timer()}</div>
          </div>
        </div>
        <div id="break">
          <label id="break-label">Break Length</label>
          <button id='break-increment' onClick={ () => incBreak() }>ADD</button>
          <p id='break-length'>{clock.break}</p>
          <button id='break-decrement' onClick={ () => decBreak() }>SUBTRACT</button>
        </div>
      </div>
      <div className='controls'>
        <button id='start_stop' onClick={ () => start_stop()}>START / STOP</button>
        <button id='reset' onClick={ () => resetClock()}>RESET</button>
      </div>
    </div>

 
  );
}

export default App;


