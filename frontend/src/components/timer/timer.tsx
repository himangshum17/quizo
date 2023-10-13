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
    <div className="mx-auto grid h-44 w-44 place-content-center rounded-full border border-gray-600">
      <span className="text-6xl font-bold">
        {coreutils.padWithLeadingZeros(timer, 2)}
      </span>
    </div>
  );
};
export default Timer;
