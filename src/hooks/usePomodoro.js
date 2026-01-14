import { useEffect, useState } from "react";

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
        if (prev === 0) {
          if (isBreak) {
            setIsBreak(false);
            return WORK_TIME;
          } else {
            setIsBreak(true);
            return BREAK_TIME;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

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
