// SecurityContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [isAuthenEnabled, setIsAuthenEnabled] = useState(false);

  useEffect(() => {
    const getAuthenStatus = async () => {
      const status = await AsyncStorage.getItem('isAuthenEnabled');
      setIsAuthenEnabled(status === 'true');
    };
    getAuthenStatus();
  }, []);

  const toggleAuthen = async (value) => {
    setIsAuthenEnabled(value);
    await AsyncStorage.setItem('isAuthenEnabled', value.toString());
  };

  return (
    <SecurityContext.Provider value={{ isAuthenEnabled, toggleAuthen }}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityContext;
