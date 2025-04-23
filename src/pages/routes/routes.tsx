import { Search } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { CreateButton } from '@/components/layout/create-button';
import { DataTable } from '@/components/layout/data-table';
import { FetchError } from '@/components/layout/fetch-error';
import { Layout } from '@/components/layout/layout';
import { LoadingMessage } from '@/components/layout/loading-message';
import { TextField } from '@/components/layout/textfield';
import { useTitle } from '@/hooks/use-title';
import { API } from '@/lib/api';
import { normalizeString } from '@/lib/normalize';

import { filter } from './filter';
import { FormDialog } from './form-dialog';
import { columns } from './partials/route-details';

export const RoutesPage = () => {
  useTitle('Rotas');

  const [search, setSearch] = useState('');

  const {
    data: routes,
    isLoading,
    error,
    refetch,
  } = useQuery(['routes'], () => new API().getRoutes());

  const getChildren = () => {
    if (error) {
      return (
        <FetchError message="Não foi possível listar rotas" onClick={refetch} />
      );
    }

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <DataTable
        columns={columns}
        data={(routes || []).filter(filter(normalizeString(search)))}
        empty="Nenhum resultado encontrado"
      />
    );
  };

  return (
    <Layout title="Rotas">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-wrap gap-3 place-content-between">
          <TextField
            containerProps={{ className: 'w-[350px] max-w-[100%]' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefixIcon={<Search size={16} />}
            placeholder="Busque por origem, destino ou paradas..."
          />

          <FormDialog
            title="Nova rota"
            trigger={<CreateButton title="Nova rota" />}
          />
        </div>

        {getChildren()}
      </div>
    </Layout>
  );
};
