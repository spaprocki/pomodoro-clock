import './App.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from 'react';
import { BsPlayFill, BsStopFill, BsPauseFill, BsArrowRepeat } from 'react-icons/bs';

function App() {
  const workTime = 15;
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(workTime);
  const [timerOn, setTimerOn] = useState(false);
  const [active, setActive] = useState(false)

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    if (remainingTime === 0) {
      return <button className="large-button"
        onClick={() => {
          setKey(prevKey => prevKey + 1)
          setTime(workTime)
          setTimerOn(true)
        }}>
        <BsArrowRepeat size="100" />
      </button>
    }

    if (remainingTime === workTime) {

      if (timerOn === false) {
        return <button className="large-button" onClick={() => setTimerOn(true)}>
          <BsPlayFill size="100" />
        </button>
      }

      else {
        return (
          <div className="timer">
            <div className="value">{minutes}:{("0" + seconds).slice(-2)}</div>
            <div>
              <BsPauseFill className="small-button"
                size="30"
                onClick={() => setTimerOn(false)} />
              <BsStopFill className="small-button"
                size="30"
                onClick={() => { setKey(prevKey => prevKey + 1); }} />
            </div>
          </div>
        );
      }
    }

    if (remainingTime < workTime) {
      if (timerOn === false) {
        return (
          <div className="timer">
            <div className="value">{minutes}:{("0" + seconds).slice(-2)}</div>
            <div>
              <BsPlayFill className="small-button"
                size="30"
                onClick={() => setTimerOn(true)} />
              <BsStopFill className="small-button"
                size="30"
                onClick={() => {
                  setKey(prevKey => prevKey + 1)
                  setTime(workTime)
                  setTimerOn(false)
                }} />
            </div>
          </div>
        );
      }

      else {
        return (
          <div className="timer">
            <div className="value">{minutes}:{("0" + seconds).slice(-2)}</div>
            <div>
              <BsPauseFill className="small-button"
                size="30"
                onClick={() => setTimerOn(false)} />
              <BsStopFill className="small-button"
                size="30"
                onClick={() => {
                  setKey(prevKey => prevKey + 1);
                  setTimerOn(false);
                }} />
            </div>
          </div>
        );
      }
    }
  }

  const playSound = () => {
    const audioTag = new Audio('https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3')
    setActive(true)
    setTimeout(() => setActive(false), 200)
    audioTag.volume = 1
    audioTag.currentTime = 0
    audioTag.play()
  }

  return (
    <div className="App">
      <div className="timer-wrapper">
        <div className="timer-header">
          {'Pomodoro Clock'}
        </div>
        <CountdownCircleTimer className="circle-timer"
          key={key}
          isPlaying={timerOn}
          duration={time}
          size={250}
          strokeWidth={16}
          colors={["#FCE4EC", "#F06292", "#D81B60", "#880E4F"]}
          colorsTime={[1500, 1000, 500, 0]}
          onComplete={() => {
            playSound();
            return { shouldRepeat: false, delay: 1 };
          }
          }
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>

  );
}

export default App;
