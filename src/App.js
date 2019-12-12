import React, { useState, useRef } from 'react';
import './App.css';

// try useEffect ?

function App() {

  // const [clock, setClock] = useState({
  //   session: 25,
  //   break: 5,
  //   time: 5,
  //   status: 'inactive',
  //   phase: 'Session'
  // });

  const [session, setSession] = useState({
    state: 25
  });

  const [breako, setBreako] = useState({
    state: 5
  });

  const [time, setTime] = useState({
    state: 5
  });

  const [status, setStatus] = useState({
    state: 'inactive'
  });

  const [phase, setPhase] = useState({
    state: 'Session'
  });


  const [intervalID, setIntervalID] = useState({
    state: useRef()
  });

  const timer = () => {
    let min = Math.floor(time.state / 60);
    let sec = time.state - min * 60;
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    return min + ' : ' + sec;
  }

  const decBreak = () => {
    if (breako.state > 1 && status.state === 'inactive') {
      if(phase.state === 'Break'){
        setBreako({state: --breako.state});
        setTime({state: breako.state * 60})
      } else {
         setBreako({state: --breako.state});
      }
    }
  }

  const incBreak = () => {
    if (phase.state === 'Break' && status.state === 'inactive'){
      setBreako({state: ++breako.state});
      setTime({state: breako.state * 60});
     } else {
       setBreako({state: ++breako.state});
     }
  }

  const decSession = () => {
    if (session.state > 1 && status.state === 'inactive') {
      if(phase.state === 'Session'){
        setSession({state: --session.state});
        setTime({state: session.state * 60});
       } else {
        setSession({state: --session.state});
       }
    }
  }

  const incSession = () => {
    if(phase.state === 'Session' && status.state === 'inactive') {
      setSession({state: ++session.state});
      setTime({state: session.state * 60})
    } else {
      setSession({state: ++session.state});
    }
  }

  const start_stop = () => {
    if(status.state === 'inactive'){
      setStatus({state: 'active'});
      // startTimer();
    } else {
      // stopTimer();
      setStatus({state: 'inactive'});
    }
    console.log(status.state);
  }

  // react batches state updates that occur in event handlers. so how do i fix this?
  
  const startTimer = () => {
    setIntervalID({current: setInterval(function(){
        decrementTimer();
        phaseManager();
      }, 1000)
    });
  }

  const decrementTimer = () => {
    setTime({state: --time.state});
  }

  const stopTimer = () => {
    setIntervalID({current: clearInterval(intervalID.current)});
    setStatus({state: 'inactive'});
  }

  const switchBreak = () => {
    setTime({state: breako.state * 60});
    setPhase({state: 'Break'});
    // start_stop();
    console.log('begin break');
  }

  const switchSession = () => {
    setTime({state: session.state * 60});
    setPhase({state: 'Session'});
    // start_stop();
    console.log('begin session');
  }

  const phaseManager = () => {
    if(time.state === 0){
      phase.state === 'Session' ? switchBreak() : switchSession();
    }
    console.log(time.state);
    console.log(status.state); 
  }
    

  // ohhhhhhh great, setState is asynchronous, no setting state multiple times in a single call. this will overwrite previous properties written to that state.

  const resetClock = () => {
    stopTimer();

    // setClock({
    //   session: 25,
    //   break: 5,
    //   time: 1500,
    //   status: 'inactive',
    //   phase: 'Session'
    // })
  }

  return (
    <div className='app'>
      <p id='timer-label'>{phase.state}</p>
      <div className='holder'>
        <div id="session">
          <label id="session-label">Session Length</label>
          <button id='session-increment' onClick={ () => incSession() }>ADD</button>
          <p id='session-length'>{session.state}</p>
          <button id='session-decrement' onClick={ () => decSession() }>SUBTRACT</button>
        </div>
        <div className='clock'>
          <div className='timer'>
            <div id='time-left'>{timer()}</div>
          </div>
        </div>
        <div id="break">
          <label id="break-label">Break Length</label>
          <button id='break-increment' onClick={ () => incBreak()}>ADD</button>
          <p id='break-length'>{breako.state}</p>
          <button id='break-decrement' onClick={ () => decBreak()}>SUBTRACT</button>
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


