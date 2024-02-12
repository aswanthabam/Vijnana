import React, { useEffect, useState } from "react";
import style from "./Counter.module.css";

interface CounterProps {
  date: Date;
  className?: string;
}
function calculateTimeDifference(
  date1: Date,
  date2: Date
): { days: number; hours: number; minutes: number } {
  // Calculate the time difference in milliseconds
  const timeDifference = date2.getTime() - date1.getTime();

  // Calculate days, hours, and minutes
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  days = days < 0 ? 0 : days;
  hours = hours < 0 ? 0 : hours;
  minutes = minutes < 0 ? 0 : minutes;

  return { days, hours, minutes };
}
function addLeadingZero(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}
const Counter: React.FC<CounterProps> = ({ date, className }) => {
  // console.log(date);
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
      s: days == 0 && hours == 0 && minutes == 0 ? 0 : 60 - now.getSeconds(),
    });
  }, []);
  setTimeout(() => {
    var now = new Date();
    var { days, hours, minutes } = calculateTimeDifference(now, date);

    setDiff({
      d: days,
      h: hours,
      m: minutes,
      s: days == 0 && hours == 0 && minutes == 0 ? 0 : 60 - now.getSeconds(),
    });
    // console.log(diff);
  }, 1000);
  return (
    <div className={style.counter + " " + className}>
      {addLeadingZero(diff.d)} : {addLeadingZero(diff.h)} :{" "}
      {addLeadingZero(diff.m)} : {addLeadingZero(diff.s)}
    </div>
  );
};

export default Counter;
