import React from "react";
import Timer from "./Timer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Timer
        initialTime={20000} // Приклад: 5 секунд в мілісекундах
        autostart={true}
        onTick={(time) => console.log("Залишилось часу: " + time)}
        step={2000} // 1 секунда в мілісекундах
        onTimeStart={(timeLeft) =>
          console.log("Таймер запущено! Залишилось часу: " + timeLeft)
        }
        onTimePause={(timeLeft) =>
          console.log("Таймер на паузі! Залишилось часу: " + timeLeft)
        }
      />
    </div>
  );
}

export default App;
