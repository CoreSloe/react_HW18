import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({
  initialTime,
  autostart,
  onTick,
  onTimeStart,
  onTimePause,
  step,
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (autostart) {
      setIsRunning(true);
      if (onTimeStart) {
        onTimeStart(time);
      }
    }
  }, [autostart, onTimeStart, time]);

  useEffect(() => {
    let timerInterval;

    if (isRunning && time >= 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - step);
        if (onTick) {
          onTick(time - step);
        }
      }, step);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [time, isRunning, onTick, step]);

  useEffect(() => {
    if (time < 0) {
      setTime(initialTime);
      if (onTimePause) {
        onTimePause(initialTime);
      }
      if (isRunning && onTimeStart) {
        onTimeStart(initialTime);
      }
    }
  }, [time, initialTime, isRunning, onTimePause, onTimeStart]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleStartPauseClick = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    if (!isRunning && onTimeStart) {
      onTimeStart(time);
    } else if (isRunning && onTimePause) {
      onTimePause(time);
    }
  };

  return (
    <div className="timer-container">
      <div className={`timer ${isRunning ? "running" : "paused"}`}>
        <h1>Timer</h1>
        <p className="timer-display">{formatTime(time)}</p>
        <button className="timer-button" onClick={handleStartPauseClick}>
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
