import React from 'react';
import { TotalProvider } from './TotalContext';
import { UserProvider } from './UserContext';

const Providers = ({ children }) => {
  return (
    <UserProvider>
      <TotalProvider>
        {children}
      </TotalProvider>
      </UserProvider>
  );
};

export default Providers;
