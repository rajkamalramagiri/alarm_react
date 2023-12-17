// src/components/AlarmClock.js
import React, { useState, useEffect,useRef } from "react";
import alarmSound from "../alarm.wav";
const AlarmClock = () => {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(alarmSound));

  const playAlarm = () => {
    audioRef.current.loop = true;
    audioRef.current.play();
    setIsPlaying(true);
  };

  
  const stopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.loop = false;
    setIsPlaying(false);
  };

  console.log("alsrtime", alarmTime);
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const handleSetAlarm = () => {
    setIsAlarmSet(true);
  };

  const handleCancelAlarm = () => {
    setIsAlarmSet(false);
  };

  const handleAlarmTimeChange = (e) => {
    setAlarmTime(e.target.value);
  };

  const handleAlarmTrigger = () => {
    // Your logic to trigger the alarm (e.g., show a modal, play sound)
    playAlarm();
    alert("Time to wake up!");
    setIsAlarmSet(false);
  };

  useEffect(() => {
    if (isAlarmSet) {
      const currentHour = time.getHours();
      const currentMinute = time.getMinutes();
      const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);
      console.log("alarmHour", alarmHour);
      console.log("alarmMinute", alarmMinute);

      if (currentHour === alarmHour && currentMinute === alarmMinute) {
        handleAlarmTrigger();
      }
    }
  }, [isAlarmSet, alarmTime, time]);

  return (
    <div>
      <h1>Alarm Clock</h1>
      <div>
        <p>Current Time: {time.toLocaleTimeString()}</p>
        {!isAlarmSet && (
          <>
            <label>Set Alarm Time:</label>
            <input
              type="time"
              value={alarmTime}
              onChange={handleAlarmTimeChange}
            />
            <button onClick={handleSetAlarm}>Set Alarm</button>
            <button onClick={playAlarm}>Play Alarm</button>
            <button onClick={stopAlarm}>Stop Alarm</button>

            

            {/* playAlarm(); */}
          </>
        )}
        {isAlarmSet && (
          <>
            <p>Alarm set for: {alarmTime}</p>
            <button onClick={handleCancelAlarm}>Cancel Alarm</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AlarmClock;
