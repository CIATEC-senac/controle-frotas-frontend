import { Layout } from '@/components/layout/layout';

import { ActiveDrivers } from './partials/active-drivers.card';
import { ActiveVehicles } from './partials/active-vehicles-card';
import { DriverPerformanceChart } from './partials/charts/driver-performance-chart';
import { MaintenancesTypesChart } from './partials/charts/maintenances-types-chart';
import { MaintenancesVehiclesChart } from './partials/charts/maintenances-vehicles-chart';
import { ElapsedDistance } from './partials/elapsed-distance';
import { MostRecentHistories } from './partials/most-recent-histories';
import { OnGoingRoutes } from './partials/ongoing-routes-card';

export const DashboardPage = () => {
  return (
    <Layout title="Dashboard">
      <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <ActiveVehicles />
        <OnGoingRoutes />
        <ActiveDrivers />
        <ElapsedDistance />

        <DriverPerformanceChart />
        <MaintenancesVehiclesChart />
        <MaintenancesTypesChart />

        <MostRecentHistories />
      </div>
    </Layout>
  );
};
