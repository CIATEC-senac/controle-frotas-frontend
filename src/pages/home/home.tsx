import { Layout } from '@/components/layout/layout';
import { ScheduledMaintenances } from '@/components/layout/scheduled-maintenances';
import { ScheduledRoutes } from '@/components/layout/scheduled-routes';
import { useTitle } from '@/hooks/use-title';

export const HomePage = () => {
  useTitle('Home');

  return (
    <Layout title="Home">
      <div className="flex flex-col gap-y-6">
        <ScheduledRoutes />
        <ScheduledMaintenances />
      </div>
    </Layout>
  );
};
