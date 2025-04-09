import { createRoot } from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './App';

// Armazenamento de dados
// Os dados são representados por uma chave (queryKey)
// Então se tenho 2 componentes que precisam das rotas, por exemplo, os 2
// podem usar o useQuery() com a mesma chave. Fazendo assim apenas uma requisição
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  // Utiliza o provider como HOC (Higher Order Component) para que seus filhos tenham acesso
  // aos dados do queryClient
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
