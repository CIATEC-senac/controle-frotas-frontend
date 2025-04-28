import dayjs from 'dayjs';
import { DateRange } from 'react-day-picker';

import { Layout } from '@/components/layout/layout';
import { DatePickerWithRange } from '@/components/ui/datepicker';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParamsWithUpdate } from '@/hooks/use-search-params';

import { ActiveDrivers } from './partials/active-drivers.card';
import { ActiveVehicles } from './partials/active-vehicles-card';
import { DriverPerformanceChart } from './partials/charts/driver-performance-chart';
import { MaintenancesTypesChart } from './partials/charts/maintenances-types-chart';
import { MaintenancesVehiclesChart } from './partials/charts/maintenances-vehicles-chart';
import { ElapsedDistance } from './partials/elapsed-distance';
import { MostRecentHistories } from './partials/most-recent-histories';
import { OnGoingRoutes } from './partials/ongoing-routes-card';

export type StatsAggregation = 'daily' | 'weekly' | 'monthly';

export type ChartAttr = {
  from: Date;
  to: Date;
  aggregation: StatsAggregation;
};

const defaultFrom = dayjs().startOf('month').format('YYYY-MM-DD');
const defaultTo = dayjs().endOf('month').format('YYYY-MM-DD');
const defaultAggregation: StatsAggregation = 'daily';

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParamsWithUpdate([
    ['from', defaultFrom],
    ['to', defaultTo],
    ['by', defaultAggregation],
  ]);

  if (!searchParams.get('from') || !searchParams.get('to')) {
    return null;
  }

  const from = dayjs(searchParams.get('from')).toDate();
  const to = dayjs(searchParams.get('to')).toDate();
  const aggregation: StatsAggregation = searchParams.get(
    'by'
  ) as StatsAggregation;

  const aggregationsOptions = [
    { label: 'Diário', value: 'daily' },
    { label: 'Semanal', value: 'weekly' },
    { label: 'Mensal', value: 'monthly' },
  ];

  const onValueChange = (range: DateRange | undefined) => {
    if (range?.from != undefined) {
      searchParams.set('from', dayjs(range.from).format('YYYY-MM-DD'));
    }

    if (range?.to != undefined) {
      searchParams.set('to', dayjs(range.to).format('YYYY-MM-DD'));
    }

    setSearchParams(searchParams);
  };

  return (
    <Layout title="Dashboard">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-end">
          <Select
            defaultValue={aggregation ?? defaultAggregation}
            onValueChange={(value) => {
              searchParams.set('by', value);
              setSearchParams(searchParams);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue
                className="shadow-none"
                placeholder="Selecione o período..."
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {aggregationsOptions.map((aggregation) => (
                  <SelectItem
                    key={aggregation.value}
                    value={aggregation.value}
                    children={aggregation.label}
                  />
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DatePickerWithRange
            from={from}
            to={to}
            placeholder="Seleciona uma data..."
            onValueChange={onValueChange}
          />
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActiveVehicles />
          <OnGoingRoutes />
          <ActiveDrivers />
          <ElapsedDistance />

          <DriverPerformanceChart
            from={from}
            to={to}
            aggregation={aggregation}
          />

          <MaintenancesVehiclesChart
            from={from}
            to={to}
            aggregation={aggregation}
          />

          <MaintenancesTypesChart
            from={from}
            to={to}
            aggregation={aggregation}
          />

          <MostRecentHistories />
        </div>
      </div>
    </Layout>
  );
};
