import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export default function Timer() {
  const { state, dispatch } = useContext(AppContext);

  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // "focus" | "break"

  /* ⏱ Tick */
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  /* ⏰ Handle completion */
  useEffect(() => {
    if (seconds > 0) return;

    if (mode === "focus" && state.activeTaskId) {
      dispatch({ type: "FINISH_TASK" });
      setMode("break");
      setSeconds(BREAK_TIME);
    } else {
      setMode("focus");
      setSeconds(FOCUS_TIME);
    }
  }, [seconds, mode, dispatch, state.activeTaskId]);

  /* 🔄 Reset on task change */
  useEffect(() => {
    if (state.activeTaskId) {
      setMode("focus");
      setSeconds(FOCUS_TIME);
      setIsRunning(true); // auto-start
    } else {
      setIsRunning(false);
      setSeconds(FOCUS_TIME);
      setMode("focus");
    }
  }, [state.activeTaskId]);

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className="timer-card">
      <h2>{mode === "focus" ? "Focus Time" : "Break Time"}</h2>

      <div className="timer-display">
        {formatTime(seconds)}
      </div>

      <div className="timer-controls">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={!state.activeTaskId}
        >
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(FOCUS_TIME);
            setMode("focus");
          }}
          disabled={!state.activeTaskId}
        >
          Reset
        </button>
      </div>

      {!state.activeTaskId && (
        <p className="hint">
          Start a task to activate the Pomodoro timer
        </p>
      )}
    </div>
  );
}
