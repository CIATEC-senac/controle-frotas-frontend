import { createContext, ReactNode, useContext, useState } from 'react';

import { User } from '@/models/user.type';

interface AuthContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  defaultUser,
  children,
}: {
  defaultUser: User | undefined;
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | undefined>(defaultUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
};
