import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../components/FirebaseConfig'; // Import Firestore instance from your configuration

export const fetchUserDocId = async () => {
  return await AsyncStorage.getItem('userDocId');
};

export const fetchUserData = async (userDocId) => {
  const userDocRef = doc(FIRESTORE_DB, 'users', userDocId);
  const userSnap = await getDoc(userDocRef);
  return userSnap.data();
};

export const fetchAccounts = async (userDocId) => {
  const accountDocRef = collection(FIRESTORE_DB, 'users', userDocId, 'account');
  const accountSnap = await getDocs(accountDocRef);
  return accountSnap.docs.map(doc => doc.data());
};

export const fetchNotesForAccount = async (userDocId, accountId) => {
  const noteDocRef = collection(FIRESTORE_DB, 'users', userDocId, 'account', accountId, 'note');
  const noteSnap = await getDocs(noteDocRef);
  if (!noteSnap.empty) {
    return noteSnap.docs.map(doc => ({
      ...doc.data(),
    }));
  }
  return [];
};
