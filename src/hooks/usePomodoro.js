import { useEffect, useState } from "react";

export default function usePomodoro() {
  const [seconds, setSeconds] = useState(1500);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return seconds;
}
