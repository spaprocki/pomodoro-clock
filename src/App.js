import './App.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from 'react';
import { BsPlayFill, BsStopFill, BsPauseFill, BsArrowRepeat } from 'react-icons/bs';

function App() {
  const workTime = 1500;
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(workTime);
  const [timerOn, setTimerOn] = useState(false);

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60

    if (remainingTime === 0) {
      return <button className="start-button"
      onClick={() => {
        setKey(prevKey => prevKey + 1)
        setTime(workTime)
        setTimerOn(true)}}>
      <BsArrowRepeat size="100" />
    </button>
    }

    if (remainingTime === workTime) {
      if (timerOn === false) {
        return <button className="start-button" onClick={() => setTimerOn(true)}>
        <BsPlayFill size="100" />
      </button>
      }
      else {
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{minutes}:{("0"+ seconds).slice(-2)}</div>
            <div>
              <BsPauseFill  className="stop-button"
                            size="30"
                            onClick={() => setTimerOn(false)}  />
              <BsStopFill   className="stop-button"
                            size="30"
                            onClick={() => {setKey(prevKey => prevKey + 1);}}     />
            </div>
          </div>
        );
      }
    }

    if (remainingTime < workTime) {
      if (timerOn === false){
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{minutes}:{("0"+ seconds).slice(-2)}</div>
            <div>
              <BsPlayFill  className="stop-button"
                            size="30"
                            onClick={() => setTimerOn(true)}  />
              <BsStopFill   className="stop-button"
                            size="30"
                            onClick={() => {
                              setKey(prevKey => prevKey + 1)
                              setTime(workTime)
                              setTimerOn(false)}}     />
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{minutes}:{("0"+ seconds).slice(-2)}</div>
            <div>
              <BsPauseFill  className="stop-button"
                            size="30"
                            onClick={() => setTimerOn(false)}  />
              <BsStopFill   className="stop-button"
                            size="30"
                            onClick={() => {
                              setKey(prevKey => prevKey + 1);
                              setTimerOn(false);}}     />
            </div>
          </div>
        );
      }
      }}

    /*if (timerOn === true && remainingTime < 15) {
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div>
          <BsPauseFill  className="stop-button"
                        size="30"
                        onClick={() => setTimerOn(false)}  />
          <BsStopFill   className="stop-button"
                        size="30"
                        onClick={() => {setTimerOn(false);
                                        setTime(15);}}     />
        </div>
      </div>
    );
    };*/

  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer className="circle-timer"
          key={key}
          isPlaying={timerOn}
          duration={time}
          colors={["#FCE4EC", "#F06292", "#D81B60", "#880E4F"]}
          colorsTime={[1500, 1000, 500, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
    
  );
}

export default App;
