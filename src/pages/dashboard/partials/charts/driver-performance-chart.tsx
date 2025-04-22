import { useQuery } from 'react-query';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { API } from '@/lib/api';

import { getConfig } from './utils';

export const DriverPerformanceChart = () => {
  const { data } = useQuery({
    queryKey: ['stats-drivers-performance'],
    queryFn: () => new API().getDriversPerformance(),
    refetchOnMount: true,
  });

  if (!data || !data.length) {
    return null;
  }

  const { config, labels } = getConfig(data);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Performance do motorista</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis tickLine={false} tickMargin={10} axisLine={false} />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            {labels.map((label) => (
              <Line
                key={label}
                type="natural"
                dataKey={label}
                radius={4}
                strokeWidth={2}
                dot={false}
                fill={config[label].color}
                stroke={config[label].color}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
