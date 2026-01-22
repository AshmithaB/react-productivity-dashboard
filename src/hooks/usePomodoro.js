import { useEffect, useState,useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function usePomodoro() {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setSeconds((prev) => {
      if (prev === 1) {
        clearInterval(interval);

        if (mode === "focus" && state.activeTaskId) {
          dispatch({ type: "FINISH_TASK" });
          setMode("break");
          return BREAK_TIME;
        }

        if (mode === "break") {
          setMode("focus");
          return FOCUS_TIME;
        }
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning, mode, state.activeTaskId]);


  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setIsBreak(false);
    setSeconds(WORK_TIME);
  }

  return {
    seconds,
    isRunning,
    isBreak,
    start,
    pause,
    reset,
  };
}
