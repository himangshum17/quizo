import React from "react";
import coreutils from "@/utils/coreutils";
const Timer = () => {
  const [timer, setTimer] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    // stoping the timer if it reaches 30
    if (timer === 30) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);
  return (
    <span className="text-2xl font-bold text-gray-700">
      {coreutils.padWithLeadingZeros(timer, 2)}
    </span>
  );
};
export default Timer;
