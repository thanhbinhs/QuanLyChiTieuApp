import React from 'react';
import { ChangeProvider,useChange } from './ChangeContext';

const Providers = ({ children }) => {
  return (
      <ChangeProvider>
        {children}
      </ChangeProvider>
  );
};

export default Providers;
