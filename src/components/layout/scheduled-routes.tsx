import { useQuery } from 'react-query';

import { FetchError } from '@/components/layout/fetch-error';
import { SkeletonGrid } from '@/components/layout/skeleton-grid';
import { API } from '@/lib/api';

import { Bus } from 'lucide-react';
import { RouteCard } from './route-card';

export const ScheduledRoutes = () => {
  // Busca pela queryKey "ongoing" no queryClient
  // Se não existir, ele vai executar a função (queryFn) do segundo parametro
  const {
    data, // dado armazenado no queryClient
    isLoading, // se está carregando (por exemplo: uma chamada http)
    isRefetching, // se está carregando novamente após ser montado
    error, // se nossa função (queryFn) retornou um erro (por exemplo: um reject de promise)
    refetch, // uma função que podemos chamar para buscar os dados novamente, como por exemplo, para atualizar a tela ou caso algum erro aconteça e o usuário pode tentar novamente
  } = useQuery(
    ['ongoing-routes'],
    () =>
      // usa api para buscar rotas
      new API().getOnGoingRoutesHistory(),
    {
      refetchOnMount: true,
    }
  );

  const getChildren = () => {
    if (error) {
      // em caso de erro, tentar novamente
      return (
        <FetchError message="Não foi possível listar rotas" onClick={refetch} />
      );
    }

    if (isLoading || isRefetching) {
      // se está carregando então exibe skeletons
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkeletonGrid length={4} />
        </div>
      );
    }

    // se não possui data (em caso de algum erro não tratado) ou não haja itens no array de Route[]
    if (!data || !data.length) {
      return <span className="text-sm">Sem rotas em andamento</span>;
    }

    // renderiza o card de rotas no grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((history) => (
          <RouteCard key={history.id} history={history} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-3 items-center">
        <Bus size={16} />
        <h3>Rotas em andamento</h3>
      </div>

      {getChildren()}
    </div>
  );
};
