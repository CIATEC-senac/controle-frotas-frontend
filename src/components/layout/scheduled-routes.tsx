import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { FetchError } from '@/components/layout/fetch-error';
import { RouteCard } from '@/components/layout/route-card';
import { SkeletonGrid } from '@/components/layout/skeleton-grid';
import { API } from '@/lib/api';

export const ScheduledRoutes = () => {
  // Busca pela queryKey "scheduled-routes" no queryClient
  // Se não existir, ele vai executar a função (queryFn) do segundo parametro

  const {
    data, // dado armazenado no queryClient
    isLoading, // se está carregando (por exemplo: uma chamada http)
    error, // se nossa função (queryFn) retornou um erro (por exemplo: um reject de promise)
    refetch, // uma função que podemos chamar para buscar os dados novamente, como por exemplo, para atualizar a tela ou caso algum erro aconteça e o usuário pode tentar novamente
  } = useQuery(['scheduled-routes'], () =>
    // usa o dayjs para pegar a data no inínio do dia e transforma em Date
    // usa api para buscar rotas
    new API().getRoutes(dayjs().startOf('day').toDate())
  );

  const getChildren = () => {
    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError message="Não foi possível listar rotas" onClick={refetch} />
      );
    }

    if (isLoading) {
      // se está carregando então exibe skeletons
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkeletonGrid length={4} />
        </div>
      );
    }

    // se não possui data (em caso de algum erro não tratado) ou não haja itens no array de Route[]
    if (!data || !data.length) {
      return <span>Sem rotas programadas para hoje</span>;
    }

    // renderiza o card de rotas no grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center">
        <h3 className="flex-auto">Rotas</h3>
      </div>

      {getChildren()}
    </div>
  );
};
