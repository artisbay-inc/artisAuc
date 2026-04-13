/**
 * ClockJST.js
 * Displays current Japan Standard Time with automatic updates.
 */

import { useEffect, useState } from 'react';

export default function ClockJST({ label = 'Japan Standard Time' }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const jstTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
      const formatted =
        jstTime.toLocaleDateString('en-US', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
        ' ' +
        jstTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-jst">
      <p className="bold">{label}</p>
      <div id="time">{time}</div>
    </div>
  );
}
