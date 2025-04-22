import { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { UserRole } from '@/models/user.type';
import { DashboardPage } from '@/pages/dashboard/dashboard';
import { DetailedHistoryPage } from '@/pages/history/detailed-history';
import { HistoryPage } from '@/pages/history/history';
import { HomePage } from '@/pages/home/home';
import { LoginPage } from '@/pages/login/login';
import { MaintenancePage } from '@/pages/maintenance/maintenance';
import { DetailedRoutePage } from '@/pages/routes/detailed-route';
import { RoutesPage } from '@/pages/routes/routes';
import { DetailedUserPage } from '@/pages/users/detailed-user';
import { UsersPage } from '@/pages/users/users';
import { DetailedVehiclePage } from '@/pages/vehicles/detailed-vehicle';
import { VehiclesPage } from '@/pages/vehicles/vehicles';

import { useQuery } from 'react-query';
import { AuthProvider } from './auth.context';
import { API } from './lib/api';
import { ProtectedRoute } from './protected-route';

export const App = () => {
  const { data: user, isLoading } = useQuery({
    queryFn: () => new API().getTokenUser().catch(() => undefined),
  });

  const defaultRoles = [UserRole.ADMIN, UserRole.MANAGER];

  const getProtectedRoute = (element: JSX.Element, roles: UserRole[]) => {
    return <ProtectedRoute roles={roles} children={element} />;
  };

  if (isLoading) {
    return null;
  }

  return (
    // Definição de rotas
    <AuthProvider defaultUser={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/users"
            element={getProtectedRoute(<UsersPage />, defaultRoles)}
          />

          <Route
            path="/user/:id"
            element={getProtectedRoute(<DetailedUserPage />, defaultRoles)}
          />

          <Route
            path="/vehicles"
            element={getProtectedRoute(<VehiclesPage />, defaultRoles)}
          />

          <Route
            path="/vehicle/:id"
            element={getProtectedRoute(<DetailedVehiclePage />, defaultRoles)}
          />

          <Route
            path="/maintenances"
            element={getProtectedRoute(<MaintenancePage />, defaultRoles)}
          />

          <Route
            path="/routes"
            element={getProtectedRoute(<RoutesPage />, defaultRoles)}
          />

          <Route
            path="/route/:id"
            element={getProtectedRoute(<DetailedRoutePage />, defaultRoles)}
          />

          <Route
            path="/route/:id/history"
            element={getProtectedRoute(<HistoryPage />, defaultRoles)}
          />

          <Route
            path="/route/:routeId/history/:historyId"
            element={getProtectedRoute(<DetailedHistoryPage />, defaultRoles)}
          />

          <Route
            path="/dashboard"
            element={getProtectedRoute(<DashboardPage />, defaultRoles)}
          />

          <Route
            path="/"
            element={getProtectedRoute(<HomePage />, [
              ...defaultRoles,
              UserRole.DRIVER,
            ])}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
