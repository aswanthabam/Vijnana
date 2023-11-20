import React, { useEffect, useState } from "react";
import style from "./Counter.module.css";

interface CounterProps {
  date: Date;
}
function calculateTimeDifference(
  date1: Date,
  date2: Date
): { days: number; hours: number; minutes: number } {
  // Calculate the time difference in milliseconds
  const timeDifference = date2.getTime() - date1.getTime();

  // Calculate days, hours, and minutes
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}
function addLeadingZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}
const Counter: React.FC<CounterProps> = ({ date }) => {
  console.log(date);
  const [diff, setDiff] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  useEffect(() => {
    var now = new Date();
    var { days, hours, minutes } = calculateTimeDifference(now, date);

    setDiff({
      d: days,
      h: hours,
      m: minutes,
      s: 60 - now.getSeconds(),
    });
  }, []);
  setTimeout(() => {
    var now = new Date();
    var { days, hours, minutes } = calculateTimeDifference(now, date);

    setDiff({
      d: days,
      h: hours,
      m: minutes,
      s: 60 - now.getSeconds(),
    });
    console.log(diff);
  }, 1000);
  return (
    <div className={style.counter}>
      {addLeadingZero(diff.d)} : {addLeadingZero(diff.h)} :{" "}
      {addLeadingZero(diff.m)} : {addLeadingZero(diff.s)}
    </div>
  );
};

export default Counter;
