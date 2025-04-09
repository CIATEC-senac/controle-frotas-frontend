import { SkeletonGrid } from './skeleton-grid';

export const ScheduledMaintenances = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <h3>Manutenções</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <SkeletonGrid length={4} />
      </div>
    </div>
  );
};
