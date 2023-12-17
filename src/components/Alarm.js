import React, { useState } from 'react';

const AlarmWithDate = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const setAlarm = () => {
    const alarmDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const currentTime = new Date();

    const timeDifference = alarmDateTime - currentTime;

    if (timeDifference > 0) {
      setIsAlarmSet(true);

      setTimeout(() => {
        alert('Alarm! It is now ' + new Date());
        setIsAlarmSet(false);
      }, timeDifference);
    } else {
      alert('Please select a future date and time for the alarm.');
    }
  };

  return (
    <div>
      <h1>Set Alarm</h1>
      <label>Date: </label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <br />
      <label>Time: </label>
      <input type="time" value={selectedTime} onChange={handleTimeChange} />
      <br />
      <button onClick={setAlarm}>Set Alarm</button>

      {isAlarmSet && <p>Alarm set for {selectedDate} at {selectedTime}</p>}
    </div>
  );
};

export default AlarmWithDate;
