
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Eye, Zap, Trophy, Bell } from 'lucide-react';

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
  { week: 'Week 1', focusMinutes: 200, distractions: 8, completedSessions: 5 },
  { week: 'Week 2', focusMinutes: 250, distractions: 6, completedSessions: 7 },
  { week: 'Week 3', focusMinutes: 180, distractions: 10, completedSessions: 4 },
  { week: 'Week 4', focusMinutes: 300, distractions: 4, completedSessions: 9 },
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
        return 'Completed Sessions';
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

  const getMetricIcon = (metric: FocusMetric) => {
    switch (metric) {
      case 'focusMinutes':
        return <Eye className="h-4 w-4" />;
      case 'distractions':
        return <Bell className="h-4 w-4" />;
      case 'completedSessions':
        return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center">
              <Eye className="mr-2 h-4 w-4 text-purple-600" />
              Focus Analytics
            </CardTitle>
            <CardDescription className="text-xs">
              Focus sessions and distractions
            </CardDescription>
          </div>
          <Tabs 
            value={period} 
            onValueChange={(v) => setPeriod(v as 'weekly' | 'monthly')}
            className="w-auto"
          >
            <TabsList className="h-8 grid w-32 grid-cols-2">
              <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <ToggleGroup 
            type="single" 
            value={metric} 
            onValueChange={(value) => value && setMetric(value as FocusMetric)}
            className="justify-start"
          >
            <ToggleGroupItem value="focusMinutes" size="sm" className="flex items-center text-xs">
              <Eye className="mr-1 h-3 w-3" />
              Focus
            </ToggleGroupItem>
            <ToggleGroupItem value="distractions" size="sm" className="flex items-center text-xs">
              <Bell className="mr-1 h-3 w-3" />
              Distractions
            </ToggleGroupItem>
            <ToggleGroupItem value="completedSessions" size="sm" className="flex items-center text-xs">
              <Trophy className="mr-1 h-3 w-3" />
              Sessions
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="h-56">
            <ChartContainer
              config={{
                [metric]: { color: getMetricColor(metric) },
              }}
            >
              <BarChart data={data} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey={metric} 
                  name={getMetricLabel(metric)} 
                  fill={`var(--color-${metric})`}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center p-2 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 mb-1">
                <Eye className="h-4 w-4" />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-purple-600">
                  {data.reduce((sum, item) => sum + item.focusMinutes, 0)}
                </p>
                <p className="text-[10px] text-gray-500">Minutes Focused</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 mb-1">
                <Bell className="h-4 w-4" />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-orange-600">
                  {data.reduce((sum, item) => sum + item.distractions, 0)}
                </p>
                <p className="text-[10px] text-gray-500">Distractions</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mb-1">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-blue-600">
                  {data.reduce((sum, item) => sum + item.completedSessions, 0)}
                </p>
                <p className="text-[10px] text-gray-500">Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
