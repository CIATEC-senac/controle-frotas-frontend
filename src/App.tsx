import { BrowserRouter, Route, Routes } from 'react-router';

import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';

export const App = () => {
  return (
    // Definição de rotas
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
