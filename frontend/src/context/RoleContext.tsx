import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'Admin' | 'Intern';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('Intern');

  useEffect(() => {
    const saved = localStorage.getItem('role') as Role;
    if (saved) setRoleState(saved);
  }, []);

  const setRole = (newRole: Role) => {
    localStorage.setItem('role', newRole);
    setRoleState(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
