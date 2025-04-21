import { ToastOptions } from 'react-toastify';

export const toastOptions = (options?: ToastOptions) => {
  // Adicionar configurações padrões
  return <ToastOptions>{
    position: 'bottom-right',
    pauseOnFocusLoss: false,
    ...options,
  };
};
