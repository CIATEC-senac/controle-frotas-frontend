import { BrowserRouter, Route, Routes } from 'react-router';

import { DetailedHistoryPage } from '@/pages/history/detailed-history';
import { HistoryPage } from '@/pages/history/history';
import { HomePage } from '@/pages/home/home';
import { LoginPage } from '@/pages/login/login';
import { DetailedRoutePage } from '@/pages/routes/detailed-route-page';
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
        <Route path="/route/:id" element={<DetailedRoutePage />} />
        <Route path="/route/:id/history" element={<HistoryPage />} />

        <Route
          path="/route/:routeId/history/:historyId"
          element={<DetailedHistoryPage />}
        />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
