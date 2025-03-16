
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Eye, Bell, Trophy, Activity } from 'lucide-react';

// Mock data for the focus sessions
const weeklyData = [
  { day: 'Mon', focusMinutes: 45, distractions: 2, completedSessions: 1 },
  { day: 'Tue', focusMinutes: 60, distractions: 1, completedSessions: 2 },
  { day: 'Wed', focusMinutes: 30, distractions: 3, completedSessions: 1 },
  { day: 'Thu', focusMinutes: 75, distractions: 0, completedSessions: 2 },
  { day: 'Fri', focusMinutes: 25, distractions: 4, completedSessions: 0 },
  { day: 'Sat', focusMinutes: 90, distractions: 1, completedSessions: 3 },
  { day: 'Sun', focusMinutes: 15, distractions: 2, completedSessions: 0 },
];

const monthlyData = [
  { week: 'W1', focusMinutes: 200, distractions: 8, completedSessions: 5 },
  { week: 'W2', focusMinutes: 250, distractions: 6, completedSessions: 7 },
  { week: 'W3', focusMinutes: 180, distractions: 10, completedSessions: 4 },
  { week: 'W4', focusMinutes: 300, distractions: 4, completedSessions: 9 },
];

type FocusMetric = 'focusMinutes' | 'distractions' | 'completedSessions';

interface FocusBarGraphProps {
  className?: string;
}

export function FocusBarGraph({ className }: FocusBarGraphProps) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [metric, setMetric] = useState<FocusMetric>('focusMinutes');

  const data = period === 'weekly' ? weeklyData : monthlyData;
  const xAxisKey = period === 'weekly' ? 'day' : 'week';

  const getMetricLabel = (metric: FocusMetric): string => {
    switch (metric) {
      case 'focusMinutes':
        return 'Focus Minutes';
      case 'distractions':
        return 'Distractions';
      case 'completedSessions':
        return 'Sessions';
    }
  };

  const getMetricColor = (metric: FocusMetric): string => {
    switch (metric) {
      case 'focusMinutes':
        return '#8B5CF6'; // Vivid Purple
      case 'distractions':
        return '#F97316'; // Bright Orange
      case 'completedSessions':
        return '#0EA5E9'; // Ocean Blue
    }
  };

  const getBgColor = (metric: FocusMetric): string => {
    switch (metric) {
      case 'focusMinutes':
        return 'bg-purple-50';
      case 'distractions':
        return 'bg-orange-50';
      case 'completedSessions':
        return 'bg-blue-50';
    }
  };
  
  const getTextColor = (metric: FocusMetric): string => {
    switch (metric) {
      case 'focusMinutes':
        return 'text-purple-600';
      case 'distractions':
        return 'text-orange-600';
      case 'completedSessions':
        return 'text-blue-600';
    }
  };

  const getIconBgColor = (metric: FocusMetric): string => {
    switch (metric) {
      case 'focusMinutes':
        return 'bg-purple-100';
      case 'distractions':
        return 'bg-orange-100';
      case 'completedSessions':
        return 'bg-blue-100';
    }
  };

  // Calculate metrics for the current period
  const totalFocusMinutes = data.reduce((sum, item) => sum + item.focusMinutes, 0);
  const totalDistractions = data.reduce((sum, item) => sum + item.distractions, 0);
  const totalSessions = data.reduce((sum, item) => sum + item.completedSessions, 0);
  
  // Find the day with the most focus time
  const bestFocusDay = [...data].sort((a, b) => b.focusMinutes - a.focusMinutes)[0];
  
  // Find the day with the least distractions
  const leastDistractionDay = [...data].sort((a, b) => a.distractions - b.distractions)[0];

  return (
    <Card className={`${className} overflow-hidden border-2 border-gray-100 hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-0 pt-3 px-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5 text-gray-800">
              <Activity className="h-4 w-4 text-purple-600" />
              Focus Tracker
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {period === 'weekly' ? 'This week' : 'This month'}
            </CardDescription>
          </div>
          <div className="flex gap-1 bg-gray-100 p-0.5 rounded-md">
            <button 
              onClick={() => setPeriod('weekly')} 
              className={`text-[10px] px-2 py-1 rounded-sm font-medium transition-colors ${
                period === 'weekly' 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setPeriod('monthly')} 
              className={`text-[10px] px-2 py-1 rounded-sm font-medium transition-colors ${
                period === 'monthly' 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="mt-3">
          <ToggleGroup 
            type="single" 
            value={metric} 
            onValueChange={(value) => value && setMetric(value as FocusMetric)}
            className="justify-start gap-1 w-full bg-gray-50 p-1 rounded-md"
          >
            <ToggleGroupItem 
              value="focusMinutes" 
              size="sm" 
              className={`h-6 px-2 text-xs flex-1 ${metric === 'focusMinutes' ? 'bg-white ' + getTextColor('focusMinutes') : 'text-gray-600'}`}
            >
              <Eye className="mr-1 h-3 w-3" />
              Focus
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="distractions" 
              size="sm" 
              className={`h-6 px-2 text-xs flex-1 ${metric === 'distractions' ? 'bg-white ' + getTextColor('distractions') : 'text-gray-600'}`}
            >
              <Bell className="mr-1 h-3 w-3" />
              Distractions
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="completedSessions" 
              size="sm" 
              className={`h-6 px-2 text-xs flex-1 ${metric === 'completedSessions' ? 'bg-white ' + getTextColor('completedSessions') : 'text-gray-600'}`}
            >
              <Trophy className="mr-1 h-3 w-3" />
              Sessions
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="mt-1">
          <div className="h-28 px-2">
            <ChartContainer
              config={{
                [metric]: { color: getMetricColor(metric) },
              }}
            >
              <BarChart 
                data={data} 
                margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis 
                  dataKey={xAxisKey} 
                  tick={{ fontSize: 10 }} 
                  tickLine={false} 
                  axisLine={false}
                  dy={5}
                />
                <YAxis 
                  tick={{ fontSize: 10 }} 
                  tickLine={false} 
                  axisLine={false} 
                  width={20}
                  dx={-5}
                />
                <Tooltip 
                  content={<ChartTooltipContent />} 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar 
                  dataKey={metric} 
                  name={getMetricLabel(metric)} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={20}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={getMetricColor(metric)}
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-3 gap-1 px-3 pb-3 mt-1">
            <div className={`flex items-center justify-between ${getBgColor('focusMinutes')} rounded p-1.5`}>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${getIconBgColor('focusMinutes')} flex items-center justify-center mr-1`}>
                  <Eye className={`h-2 w-2 ${getTextColor('focusMinutes')}`} />
                </div>
                <span className="text-[9px] text-gray-500">Focus</span>
              </div>
              <p className={`text-xs font-medium ${getTextColor('focusMinutes')}`}>
                {totalFocusMinutes} min
              </p>
            </div>
            
            <div className={`flex items-center justify-between ${getBgColor('distractions')} rounded p-1.5`}>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${getIconBgColor('distractions')} flex items-center justify-center mr-1`}>
                  <Bell className={`h-2 w-2 ${getTextColor('distractions')}`} />
                </div>
                <span className="text-[9px] text-gray-500">Distract</span>
              </div>
              <p className={`text-xs font-medium ${getTextColor('distractions')}`}>
                {totalDistractions}
              </p>
            </div>
            
            <div className={`flex items-center justify-between ${getBgColor('completedSessions')} rounded p-1.5`}>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${getIconBgColor('completedSessions')} flex items-center justify-center mr-1`}>
                  <Trophy className={`h-2 w-2 ${getTextColor('completedSessions')}`} />
                </div>
                <span className="text-[9px] text-gray-500">Sessions</span>
              </div>
              <p className={`text-xs font-medium ${getTextColor('completedSessions')}`}>
                {totalSessions}
              </p>
            </div>
          </div>

          <div className="px-3 pb-3 border-t border-gray-100 pt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-500 flex items-center">
                <Activity className="h-3 w-3 mr-1 text-purple-600" />
                <span>Key Insights:</span>
              </div>
              <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {period === 'weekly' ? '7-day analysis' : '4-week analysis'}
              </span>
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-1.5 rounded text-[9px]">
                <span className="text-gray-500">Best focus day:</span>
                <p className="font-medium text-purple-600">
                  {bestFocusDay[xAxisKey]} ({bestFocusDay.focusMinutes} min)
                </p>
              </div>
              <div className="bg-gray-50 p-1.5 rounded text-[9px]">
                <span className="text-gray-500">Least distractions:</span>
                <p className="font-medium text-orange-600">
                  {leastDistractionDay[xAxisKey]} ({leastDistractionDay.distractions})
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
