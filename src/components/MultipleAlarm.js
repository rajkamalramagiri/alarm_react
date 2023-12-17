import React, { useState, useEffect,useRef } from "react";
import alarmSound from "../alarm.wav";

const ReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
    const audioRef = useRef(new Audio(alarmSound));
    console.log('remainders', reminders)
    console.log('time',time)
    

  useEffect(() => {
    // Load reminders from localStorage on component mount
      const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
      console.log('storedReminders', storedReminders)
      
      storedReminders.forEach(item => {
        const dateObject = new Date(item.dateTime);

        // Extract year, month, and day
        const year = dateObject.getUTCFullYear();
        const month = dateObject.getUTCMonth() + 1; // Month is zero-indexed, so add 1
          const day = dateObject.getUTCDate();
          const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
        //   const dateObject = new Date(item.dateTime);
        //   const formattedDate = item.dateTime.toLocaleString();
          const date = `${year}-${month}-${day}`
          const time= `${hours}:${minutes}`
          console.log('time', )
          
          item.dateTime=new Date(`${date}T${time}`)

          
      })

    //   const dateObject = new Date(storedReminders[0].dateTime);
    //   console.log('dateObject', dateObject)

      
      
    //   const formattedDate = dateObject.toLocaleString('en-US', options);
      
    //   console.log('formattedDate',formattedDate);

    setReminders(storedReminders);

    // Check for existing reminders and schedule alarms if needed
    storedReminders.forEach((reminder) => {
      scheduleAlarm(reminder);
    });
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
    

    
  const playAlarm = () => {
    audioRef.current.loop = true;
      audioRef.current.play();
  };
  const stopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.loop = false;
  };
  const addReminder = () => {
    const newReminder = { id: Date.now(), text, dateTime: new Date(`${date}T${time}`) };

    setReminders([...reminders, newReminder]);

    // Save reminders to localStorage
    localStorage.setItem('reminders', JSON.stringify([...reminders, newReminder]));

    // Schedule the alarm for the new reminder
    scheduleAlarm(newReminder);

    // Clear input fields
    setText('');
    setDate('');
    setTime('');
  };

  const removeReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);

    // Save updated reminders to localStorage
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const scheduleAlarm = (reminder) => {
    const timeUntilAlarm = reminder.dateTime - new Date();

    if (timeUntilAlarm > 0) {
        setTimeout(() => {
             playAlarm();
         alert(reminder.text)
      }, timeUntilAlarm);
    }
  };

  

  return (
    <div>
      <h1>Reminder App</h1>
      <label>Text: </label>
      <input type="text" value={text} onChange={handleTextChange} />
      <br />
      <label>Date: </label>
      <input type="date" value={date} onChange={handleDateChange} />
      <br />
      <label>Time: </label>
      <input type="time" value={time} onChange={handleTimeChange} />
      <br />
      <button onClick={addReminder}>Add Reminder</button>
      <button onClick={stopAlarm}>Stop Alarm</button>

      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {`Reminder: ${reminder.text} at ${reminder.dateTime.toLocaleString()}`}
            <button onClick={() => removeReminder(reminder.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderApp;
