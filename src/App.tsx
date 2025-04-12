import { BrowserRouter, Route, Routes } from 'react-router';

import { LoginPage } from '@/pages/login/login';
import { HomePage } from '@/pages/home/home';
import { UsersPage } from '@/pages/users/users';
import { VehiclesPage } from '@/pages/vehicles/vehicles';

export const App = () => {
  return (
    // Definição de rotas
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
