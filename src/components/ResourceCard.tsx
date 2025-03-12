
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration: string;
  rating: number;
  source: string;
  points: number;
  url: string;
}

export function ResourceCard({ 
  id, 
  title, 
  description, 
  thumbnail, 
  category, 
  duration, 
  rating, 
  source, 
  points,
  url
}: ResourceCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <Link to={`/resource/${id}`} className="block">
      <div className="resource-card h-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>
            </div>
          )}
          <img 
            src={thumbnail} 
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
              <Play className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <div className="bg-blue-600/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-medium">
              {category}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-medium text-lg line-clamp-2 text-gray-900">{title}</h3>
            <div className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap">
              +{points} pts
            </div>
          </div>
          
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                <span>{rating}</span>
              </div>
            </div>
            <div className="flex items-center">
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>{source}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
