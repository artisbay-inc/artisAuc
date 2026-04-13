import { useState, useEffect } from 'react';

export default function AuctionTimer({ endTime, onEnd }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  
  useEffect(() => {
    const updateTimer = () => {
      if (!endTime) {
        setTimeRemaining('No end time');
        return;
      }
      
      let endDate;
      try {
        if (endTime instanceof Date) {
          endDate = endTime;
        } else {
          endDate = new Date(endTime);
        }
        
        if (isNaN(endDate.getTime())) {
          setTimeRemaining('Invalid date');
          return;
        }
        
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();
        
        if (diff <= 0) {
          setTimeRemaining('Ended');
          setIsEnded(true);
          onEnd?.();
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining(`${minutes}m ${seconds}s`);
        }
      } catch (error) {
        console.error('Error in AuctionTimer:', error);
        setTimeRemaining('Error');
      }
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime, onEnd]);
  
  const getVariant = () => {
    if (isEnded) return 'bg-red-100 text-red-800';
    if (['No end time', 'Invalid date', 'Error'].includes(timeRemaining)) {
      return 'bg-gray-100 text-gray-800';
    }
    if (timeRemaining && timeRemaining.includes('m') && !timeRemaining.includes('h') && !timeRemaining.includes('d')) {
      return 'bg-orange-100 text-[#FF9900] animate-pulse';
    }
    return 'bg-blue-50 text-[#1E398A]';
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm ${getVariant()}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {timeRemaining}
    </span>
  );
}
