
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Eye, Bell, Trophy } from 'lucide-react';

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

  return (
    <Card className={className}>
      <CardHeader className="pb-0 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm flex items-center">
              <Eye className="mr-1 h-3 w-3 text-purple-600" />
              Focus Tracker
            </CardTitle>
            <CardDescription className="text-xs">
              {period === 'weekly' ? 'This week' : 'This month'}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setPeriod('weekly')} 
              className={`text-[10px] px-2 py-1 rounded ${period === 'weekly' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setPeriod('monthly')} 
              className={`text-[10px] px-2 py-1 rounded ${period === 'monthly' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
            >
              Month
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          <ToggleGroup 
            type="single" 
            value={metric} 
            onValueChange={(value) => value && setMetric(value as FocusMetric)}
            className="justify-start gap-1"
          >
            <ToggleGroupItem value="focusMinutes" size="sm" className="h-6 px-2 text-xs">
              <Eye className="mr-1 h-3 w-3" />
              Focus
            </ToggleGroupItem>
            <ToggleGroupItem value="distractions" size="sm" className="h-6 px-2 text-xs">
              <Bell className="mr-1 h-3 w-3" />
              Distractions
            </ToggleGroupItem>
            <ToggleGroupItem value="completedSessions" size="sm" className="h-6 px-2 text-xs">
              <Trophy className="mr-1 h-3 w-3" />
              Sessions
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="h-32">
            <ChartContainer
              config={{
                [metric]: { color: getMetricColor(metric) },
              }}
            >
              <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9 }} tickLine={false} axisLine={false} width={20} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey={metric} 
                  name={getMetricLabel(metric)} 
                  fill={`var(--color-${metric})`}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-2">
            <div className="flex items-center justify-between bg-purple-50 rounded p-1.5">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                  <Eye className="h-2 w-2 text-purple-600" />
                </div>
                <span className="text-[9px] text-gray-500">Focus</span>
              </div>
              <p className="text-xs font-medium text-purple-600">
                {data.reduce((sum, item) => sum + item.focusMinutes, 0)} min
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-orange-50 rounded p-1.5">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center mr-1">
                  <Bell className="h-2 w-2 text-orange-600" />
                </div>
                <span className="text-[9px] text-gray-500">Distract</span>
              </div>
              <p className="text-xs font-medium text-orange-600">
                {data.reduce((sum, item) => sum + item.distractions, 0)}
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-blue-50 rounded p-1.5">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-1">
                  <Trophy className="h-2 w-2 text-blue-600" />
                </div>
                <span className="text-[9px] text-gray-500">Sessions</span>
              </div>
              <p className="text-xs font-medium text-blue-600">
                {data.reduce((sum, item) => sum + item.completedSessions, 0)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
