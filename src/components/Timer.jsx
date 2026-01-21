import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function Timer() {
  const { state, dispatch } = useContext(AppContext);

  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // focus | break

  // ⏱ Timer tick
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // ⏰ When time finishes
  useEffect(() => {
    if (seconds > 0) return;

    if (mode === "focus") {
      dispatch({ type: "FINISH_TASK" });
      setMode("break");
      setSeconds(BREAK_TIME);
    } else {
      setMode("focus");
      setSeconds(FOCUS_TIME);
    }
  }, [seconds, mode, dispatch]);

  // 🔄 Reset timer when active task changes
  useEffect(() => {
    setIsRunning(false);
    setMode("focus");
    setSeconds(FOCUS_TIME);
  }, [state.activeTaskId]);
  // auto-start timer when a task is started
useEffect(() => {
  if (state.activeTaskId) {
    setIsRunning(true);
  }
}, [state.activeTaskId]);


  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className="timer">
      <h2>{mode === "focus" ? "Focus Time" : "Break Time"}</h2>

      <div className="time">{formatTime(seconds)}</div>

      <div className="timer-controls">
        <button
          onClick={() => setIsRunning(true)}
          disabled={!state.activeTaskId}
        >
          Start
        </button>

        <button onClick={() => setIsRunning(false)}>Pause</button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(FOCUS_TIME);
            setMode("focus");
          }}
        >
          Reset
        </button>
      </div>

      {!state.activeTaskId && (
        <p className="hint">Start a task to enable timer</p>
      )}
    </div>
  );
}
