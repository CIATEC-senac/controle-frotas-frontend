import React, { JSX } from 'react';
import { Navigate } from 'react-router';

import { UserRole } from '@/models/user.type';
import { useAuth } from './auth.context';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const { user } = useAuth();

  if (
    user === undefined ||
    user?.role == undefined ||
    (roles.length && !roles.includes(user.role))
  ) {
    return <Navigate to="/login" />; // Redireciona para uma página de acesso negado
  }

  return children;
};
