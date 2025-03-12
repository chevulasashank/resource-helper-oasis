
import { Award, Star } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  compact?: boolean;
}

export function PointsDisplay({ points, compact = false }: PointsDisplayProps) {
  if (compact) {
    return (
      <div className="glass py-1 px-3 rounded-full text-xs font-medium flex items-center space-x-1">
        <Star className="w-3 h-3 text-yellow-500" />
        <span>{points}</span>
      </div>
    );
  }
  
  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Your Points</h3>
        <Award className="w-5 h-5 text-blue-600" />
      </div>
      
      <div className="flex items-end space-x-1">
        <span className="text-4xl font-bold">{points}</span>
        <span className="text-sm text-gray-500 pb-1">points</span>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Keep learning to earn more points!</p>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { milestone: 'Beginner', points: 100, current: points >= 100 },
          { milestone: 'Intermediate', points: 500, current: points >= 500 },
          { milestone: 'Expert', points: 1000, current: points >= 1000 },
        ].map((level) => (
          <div 
            key={level.milestone} 
            className={cn(
              "px-2 py-1.5 rounded-lg text-center text-xs font-medium transition-colors",
              level.current 
                ? "bg-blue-100 text-blue-700" 
                : "bg-gray-100 text-gray-500"
            )}
          >
            {level.milestone}
          </div>
        ))}
      </div>
    </div>
  );
}
