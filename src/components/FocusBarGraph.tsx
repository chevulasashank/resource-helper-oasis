
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Eye, Bell, Trophy, Activity, Calendar, BarChart3, BrainCircuit } from 'lucide-react';

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
        return '#9b87f5'; // Primary Purple
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
    <Card className={`${className} overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50`}>
      <CardHeader className="pb-0 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="flex items-center justify-center p-1 rounded-lg bg-purple-100 text-purple-600">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">
                Focus Tracker
              </span>
            </CardTitle>
          </div>
          
          <Tabs 
            value={period} 
            onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly')}
            className="h-7"
          >
            <TabsList className="h-7 p-0.5 bg-gray-100">
              <TabsTrigger 
                value="weekly" 
                className="h-6 px-3 text-xs data-[state=active]:bg-white data-[state=active]:text-purple-600"
              >
                Week
              </TabsTrigger>
              <TabsTrigger 
                value="monthly" 
                className="h-6 px-3 text-xs data-[state=active]:bg-white data-[state=active]:text-purple-600"
              >
                Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-4">
          <ToggleGroup 
            type="single" 
            value={metric} 
            onValueChange={(value) => value && setMetric(value as FocusMetric)}
            className="justify-between gap-1 bg-gray-50 p-1 rounded-lg"
          >
            <ToggleGroupItem 
              value="focusMinutes" 
              size="sm" 
              className={`h-8 px-3 text-xs rounded-md ${metric === 'focusMinutes' 
                ? 'bg-white shadow-sm ' + getTextColor('focusMinutes') 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              Focus
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="distractions" 
              size="sm" 
              className={`h-8 px-3 text-xs rounded-md ${metric === 'distractions' 
                ? 'bg-white shadow-sm ' + getTextColor('distractions') 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Bell className="mr-1.5 h-3.5 w-3.5" />
              Distractions
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="completedSessions" 
              size="sm" 
              className={`h-8 px-3 text-xs rounded-md ${metric === 'completedSessions' 
                ? 'bg-white shadow-sm ' + getTextColor('completedSessions')
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Trophy className="mr-1.5 h-3.5 w-3.5" />
              Sessions
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="mt-1">
          <div className="h-32 px-2">
            <ChartContainer
              config={{
                [metric]: { 
                  color: getMetricColor(metric),
                },
              }}
            >
              <BarChart 
                data={data} 
                margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
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
                  animationDuration={300}
                />
                <Bar 
                  dataKey={metric} 
                  name={getMetricLabel(metric)} 
                  radius={[5, 5, 0, 0]}
                  maxBarSize={25}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={getMetricColor(metric)}
                      fillOpacity={0.9}
                      className="hover:opacity-100 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 px-4 pb-2 mt-2">
            <div className={`flex items-center justify-between ${getBgColor('focusMinutes')} rounded-lg p-2 shadow-sm`}>
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-md ${getIconBgColor('focusMinutes')} flex items-center justify-center mr-1.5`}>
                  <Eye className={`h-3 w-3 ${getTextColor('focusMinutes')}`} />
                </div>
                <span className="text-[10px] text-gray-600 font-medium">Focus</span>
              </div>
              <p className={`text-xs font-semibold ${getTextColor('focusMinutes')}`}>
                {totalFocusMinutes} min
              </p>
            </div>
            
            <div className={`flex items-center justify-between ${getBgColor('distractions')} rounded-lg p-2 shadow-sm`}>
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-md ${getIconBgColor('distractions')} flex items-center justify-center mr-1.5`}>
                  <Bell className={`h-3 w-3 ${getTextColor('distractions')}`} />
                </div>
                <span className="text-[10px] text-gray-600 font-medium">Distract</span>
              </div>
              <p className={`text-xs font-semibold ${getTextColor('distractions')}`}>
                {totalDistractions}
              </p>
            </div>
            
            <div className={`flex items-center justify-between ${getBgColor('completedSessions')} rounded-lg p-2 shadow-sm`}>
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-md ${getIconBgColor('completedSessions')} flex items-center justify-center mr-1.5`}>
                  <Trophy className={`h-3 w-3 ${getTextColor('completedSessions')}`} />
                </div>
                <span className="text-[10px] text-gray-600 font-medium">Sessions</span>
              </div>
              <p className={`text-xs font-semibold ${getTextColor('completedSessions')}`}>
                {totalSessions}
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="text-gray-700 flex items-center">
                <Activity className="h-3.5 w-3.5 mr-1.5 text-purple-600" />
                <span className="font-medium">Key Insights</span>
              </div>
              <span className="text-[9px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                {period === 'weekly' ? '7-day analysis' : '4-week analysis'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-2 rounded-lg shadow-sm">
                <span className="text-[10px] text-gray-600 block font-medium">Best focus day:</span>
                <p className="font-semibold text-xs text-purple-700 mt-0.5">
                  {bestFocusDay[xAxisKey]} ({bestFocusDay.focusMinutes} min)
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-2 rounded-lg shadow-sm">
                <span className="text-[10px] text-gray-600 block font-medium">Least distractions:</span>
                <p className="font-semibold text-xs text-orange-700 mt-0.5">
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
