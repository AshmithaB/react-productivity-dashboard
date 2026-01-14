import usePomodoro from "../hooks/usePomodoro";

export default function Timer() {
  const { seconds, isRunning, isBreak, start, pause, reset } =
    usePomodoro();

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="timer-card">
      <h2>{isBreak ? "Break Time" : "Focus Time"}</h2>

      <div className="timer-display">
        {minutes}:{secs.toString().padStart(2, "0")}
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
