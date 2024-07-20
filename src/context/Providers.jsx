import React from 'react';
import { ChangeProvider,useChange } from './ChangeContext';
import {SecurityProvider} from './SecurityContext';

const Providers = ({ children }) => {
  return (
    <SecurityProvider>
      <ChangeProvider> 
        {children}
      </ChangeProvider>
    </SecurityProvider>
  );
};

export default Providers;
