import { Layout } from '@/components/layout/layout';
import { ScheduledMaintenances } from '@/components/layout/scheduled-maintenances';
import { ScheduledRoutes } from '@/components/layout/scheduled-routes';

export const HomePage = () => {
  return (
    <Layout title="Home">
      <div className="flex flex-col gap-y-3">
        <ScheduledRoutes />
        <ScheduledMaintenances />
      </div>
    </Layout>
  );
};
