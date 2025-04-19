import { CreateButton } from '@/components/layout/create-button';
import { DataTable } from '@/components/layout/data-table';
import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { API } from '@/lib/api';
import { useQuery } from 'react-query';
import { FormDialog } from './form-dialog';
import { columns } from './partials/maintenance-details';

export const MaintenancePage = () => {
  const { data, isLoading, error, refetch } = useQuery(['maintenances'], () =>
    new API().getMaintenances()
  );

  const getChildren = () => {
    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError
          message="Não foi possível listar manutenções"
          onClick={refetch}
        />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    if (!data) {
      return null;
    }

    return (
      <DataTable
        columns={columns}
        data={data}
        empty="Nenhum resultado encontrado"
      />
    );
  };

  return (
    <Layout title="Manutenções">
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-end">
          <FormDialog
            title="Nova Manutenção"
            trigger={<CreateButton title="Nova Manutenção" />}
          />
        </div>
        {getChildren()}
      </div>
    </Layout>
  );
};
