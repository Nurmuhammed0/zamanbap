import React, { useState, useEffect } from 'react';

const DURATION_DEFAULT = 24 * 60 * 60; // 24 hours in seconds

const formatTime = (timeInSeconds) => {
  if (timeInSeconds <= 0) {
    return '00:00:00';
  }
  const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const getTimerColor = (timeInSeconds) => {
  if (timeInSeconds <= 0) {
    return 'bg-red-500 text-white';
  }
  if (timeInSeconds < 10 * 60) { // Less than 10 minutes
    return 'bg-red-400 text-white';
  }
  if (timeInSeconds < 60 * 60) { // Less than 1 hour
    return 'bg-yellow-400 text-gray-800';
  }
  return 'bg-green-400 text-gray-800';
};


const CountdownTimer = ({ timestamp, duration = DURATION_DEFAULT, onComplete }) => {
  const calculateRemaining = () => {
    const elapsed = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    return duration - elapsed;
  };

  const [remaining, setRemaining] = useState(calculateRemaining());

  useEffect(() => {
    if (remaining <= 0) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setRemaining(prevRemaining => {
        const newRemaining = prevRemaining - 1;
        if (newRemaining <= 0) {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
        }
        return newRemaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp, onComplete, remaining]);

  if (remaining <= 0) {
    return (
      <span className={`font-mono text-base py-1 px-2 rounded ${getTimerColor(remaining)}`}>
        Убакыт бүттү
      </span>
    );
  }

  return (
    <span className={`font-mono text-base py-1 px-2 rounded ${getTimerColor(remaining)}`}>
      {formatTime(remaining)}
    </span>
  );
};

export default CountdownTimer;
