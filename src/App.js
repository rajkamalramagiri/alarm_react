// src/App.js
import React from 'react';
import AlarmClock from './components/AlarmClock';
import AlarmComponent from './components/Alarm';
import AlarmWithMultipleDates from './components/MultipleAlarm';

const App = () => {
  return (
    <div>
      {/* <AlarmClock /> */}
      {/* <AlarmComponent /> */}
      <AlarmWithMultipleDates/>
    </div>
  );
};

export default App;
