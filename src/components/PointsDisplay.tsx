
import { useState, useEffect } from 'react';
import { getUserPoints } from '@/lib/data';
import { cn } from '@/lib/utils';

export function PointsDisplay() {
  const [points, setPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const userPoints = getUserPoints();
    
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setPoints(Math.min(count, userPoints));
      
      if (count >= userPoints) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className={cn(
        "glass py-1 px-3 rounded-full text-xs font-medium flex items-center space-x-1 transition-all",
        isAnimating ? "scale-110" : ""
      )}
    >
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
      <span>{points} points</span>
    </div>
  );
}
