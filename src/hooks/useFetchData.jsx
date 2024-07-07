import { useState, useEffect, useCallback } from 'react';
import { fetchUserData, fetchAccounts, fetchNotesForAccount, fetchUserDocId } from '../modules/dataService';

export const useFetchData = (change) => {
  const [userData, setUserData] = useState(null);
  const [noteData, setNoteData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const userDocId = await fetchUserDocId();
      const userData = await fetchUserData(userDocId);
      setUserData(userData);

      const accounts = await fetchAccounts(userDocId);
      setAccountData(accounts);

      const allNotes = [];
      for (const account of accounts) {
        const notes = await fetchNotesForAccount(userDocId, account.accountId);
        allNotes.push(...notes);
      }
      setNoteData(allNotes);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [change]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { userData, noteData, accountData, loading, error };
};
