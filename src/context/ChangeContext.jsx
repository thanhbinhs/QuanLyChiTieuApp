import React, { createContext, useState, useContext } from 'react';

const ChangeContext = createContext();

export const ChangeProvider = ({ children }) => {
  const [change, setChange] = useState(null); // Giá trị khởi tạo tùy chỉnh

  return (
    <ChangeContext.Provider value={{ change, setChange }}>
      {children}
    </ChangeContext.Provider>
  );
};

export const useChange = () => {
  const context = useContext(ChangeContext);
  if (context === undefined) {
    throw new Error('useChange must be used within a ChangeProvider');
  }
  return context;
};