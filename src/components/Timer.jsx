import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import usePomodoro from "../hooks/usePomodoro";

export default function Timer() {
  const { state, dispatch } = useContext(AppContext);

  const {
    seconds,
    isRunning,
    isBreak,
    start,
    pause,
    reset,
  } = usePomodoro();

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // ✅ When focus session ends → auto-complete task
  useEffect(() => {
    if (seconds === 0 && !isBreak && state.activeTaskId) {
      dispatch({ type: "FINISH_TASK" });
    }
  }, [seconds, isBreak, state.activeTaskId, dispatch]);

  return (
    <div className="timer-card">
      <h2>
        {isBreak ? "Break Time" : "Focus Time"}
      </h2>

      <p className="active-task">
        {state.activeTaskId
          ? "Focusing on a task"
          : "No task selected"}
      </p>

      <div className="timer-display">
        {minutes}:{secs.toString().padStart(2, "0")}
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button
            onClick={start}
            disabled={!state.activeTaskId}
          >
            Start
          </button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}

        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
