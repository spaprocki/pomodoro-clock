import "./App.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import {
  BsPlayFill,
  BsStopFill,
  BsPauseFill,
  BsArrowRepeat,
  BsFillCaretRightFill,
  BsFillCaretLeftFill,
} from "react-icons/bs";

function App() {
  const [workTime, setWorkTime] = useState(1500);
  const [pauseTime, setPauseTime] = useState(300);
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(workTime);
  const [timerOn, setTimerOn] = useState(false);
  const [status, setStatus] = useState('Session')

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    if (remainingTime === 0) {
      return (
        <button
          className="large-button"
          onClick={() => {
            setKey((prevKey) => prevKey + 1);
            setTime(workTime);
            setTimerOn(true);
          }}
        >
          <BsArrowRepeat size="100" />
        </button>
      );
    }

    if (remainingTime === time) {
      if (timerOn === false) {
        return (
          <button className="large-button" onClick={() => setTimerOn(true)}>
            <BsPlayFill size="100" />
          </button>
        );
      } else {
        return (
          <div className="timer">
            <div className="status">{status}</div>
            <div id="time-left" className="value">
              {("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
            </div>
            <div>
              <BsPauseFill
                className="small-button"
                size="30"
                onClick={() => setTimerOn(false)}
              />
              <BsStopFill
                className="small-button"
                size="30"
                onClick={() => {
                  setKey((prevKey) => prevKey + 1);
                }}
              />
            </div>
          </div>
        );
      }
    }

    if (remainingTime < time) {
      if (timerOn === false) {
        return (
          <div className="timer">
            <div className="status">{status}</div>
            <div id="time-left" className="value">
              {("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
            </div>
            <div>
              <BsPlayFill
                className="small-button"
                size="30"
                onClick={() => setTimerOn(true)}
              />
              <BsStopFill
                className="small-button"
                size="30"
                onClick={() => {
                  setKey((prevKey) => prevKey + 1);
                  setTime(workTime);
                  setTimerOn(false);
                }}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="timer">
            <div className="status">{status}</div>
            <div id="time-left" className="value">
              {("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
            </div>
            <div>
              <BsPauseFill
                className="small-button"
                size="30"
                onClick={() => setTimerOn(false)}
              />
              <BsStopFill
                className="small-button"
                size="30"
                onClick={() => {
                  setKey((prevKey) => prevKey + 1);
                  setTimerOn(false);
                }}
              />
            </div>
          </div>
        );
      }
    }
  };

  const playSound = () => {
    const audioTag = new Audio(
      "https://onlineclock.net/audio/options/default.mp3"
    );
    audioTag.volume = 1;
    audioTag.currentTime = 0;
    audioTag.play();
  };

  return (
    <div className="App">
      <div className="timer-wrapper">
        <div className="timer-header">{"Pomodoro Clock"}</div>
        <div className="session-wrapper">
          <div id="session-label">Session Length</div>
          <div className="buttons-wrapper">
            <BsFillCaretLeftFill
              className="smaller-button"
              size="20"
              onClick={() => {
                if (timerOn === false) {
                  setWorkTime((prevworkTime) => prevworkTime - 60);
                  setTime((prevTime) => prevTime - 60);
                }
              }}
            />
            <div>{(("0" + (workTime/60)).slice(-2))}</div>
            <BsFillCaretRightFill
              className="smaller-button"
              size="20"
              onClick={() => {
                if (timerOn === false) {
                  setWorkTime((prevworkTime) => prevworkTime + 60);
                  setTime((prevTime) => prevTime + 60);
                }
              }}
            />
          </div>
        </div>

        <div className="session-wrapper">
          <div id="break-label">Break Length</div>
          <div className="buttons-wrapper">
            <BsFillCaretLeftFill
              className="smaller-button"
              size="20"
              onClick={() => setPauseTime((prevpauseTime) => prevpauseTime - 60)}
            />
            <div>{(("0" + (pauseTime/60)).slice(-2))}</div>
            <BsFillCaretRightFill
              className="smaller-button"
              size="20"
              onClick={() => setPauseTime((prevpauseTime) => prevpauseTime + 60)}
            />
          </div>
        </div>

        <CountdownCircleTimer
          className="circle-timer"
          key={key}
          isPlaying={timerOn}
          duration={time}
          size={250}
          strokeWidth={16}
          colors={["#F4BECF", "#EEA9BF", "#E994AE", "#E37F9D"]}
          colorsTime={[1500, 1000, 500, 0]}
          onComplete={(duration) => {
            if (duration === workTime) {
              playSound();
              setTime(pauseTime);
              setTimerOn(true);
              setKey((prevKey) => prevKey + 1);
              setStatus('Break');
              return { shouldRepeat: true, delay: 1 };

            } else {
              playSound();
              setTime(workTime);
              setTimerOn(false);
              setKey((prevKey) => prevKey + 1);
              setStatus('Session');
              return { shouldRepeat: false, delay: 1 };
            }
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default App;
