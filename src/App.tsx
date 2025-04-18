import { BrowserRouter, Route, Routes } from 'react-router';

import { HomePage } from '@/pages/home/home';
import { LoginPage } from '@/pages/login/login';
import { RoutesPage } from '@/pages/routes/routes';
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
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
