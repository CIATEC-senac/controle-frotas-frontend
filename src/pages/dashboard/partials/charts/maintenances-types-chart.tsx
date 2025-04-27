import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { API } from '@/lib/api';

import { ChartAttr } from '../../dashboard';
import { getConfig } from './utils';

export const MaintenancesTypesChart = ({
  from,
  to,
  aggregation,
}: ChartAttr) => {
  const { data } = useQuery({
    queryKey: ['stats-maintenances-types', from, to, aggregation],
    queryFn: () => new API().getMaintenancesPerType(from, to, aggregation),
    refetchOnMount: true,
  });

  const { config, labels } = getConfig(data);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Manutenções por tipo</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => dayjs(value).format('YYYY-MM-DD')}
            />

            <YAxis tickLine={false} tickMargin={10} axisLine={false} />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            {labels.map((label) => (
              <Bar
                key={label}
                type="natural"
                dataKey={label}
                radius={4}
                strokeWidth={2}
                fill={config[label].color}
                stroke={config[label].color}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
