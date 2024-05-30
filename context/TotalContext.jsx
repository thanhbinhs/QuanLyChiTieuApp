import React, { createContext, useMemo, useContext } from 'react';
import AccountData from '../data/account.json';
import NoteData from '../data/note.json';
import UserData from '../data/user.json';

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const { total, income, expense } = useMemo(() => {
    let total = 0;
    let income = 0;
    let expense = 0;

    AccountData.forEach((account) => {
      if (account.userId === UserData[0].userId) {
        total = account.balance;
      }
    });

    NoteData.forEach((note) => {
      if (note.userId === UserData[0].userId) {
        AccountData.forEach((account) => {
          if (account.userId === UserData[0].userId && account.accountId === note.accountId) {
            if (note.noteType === 'Thu') {
              income += note.noteMoney;
            } else {
              expense += note.noteMoney;
            }
          }
        });
      }
    });
    return { total, income, expense };
  }, [ NoteData, AccountData]);

  return (
    <TotalContext.Provider value={{ total, income, expense }}>
      {children}
    </TotalContext.Provider>
  );
};

export const useTotal = () => {
  return useContext(TotalContext);
};
