import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';
import { COLORS, logo } from '../constants';
import { useChange } from '../context/ChangeContext';

export default function ViewAccounts({ listings, title }) {
  const navigation = useNavigation();
  const { change, setChange } = useChange();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async (accountId, balance) => {
    setIsLoading(true);
    const userDocId = await AsyncStorage.getItem('userDocId');
    const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`);
    const userData = await getDoc(userDocRef);

    await updateDoc(userDocRef, {
      total: userData.data().total - balance,
    });
    await deleteDoc(doc(FIRESTORE_DB, 'users', userDocId, 'account', accountId));
    setChange(!change);
    setIsLoading(false);
    Alert.alert('Xóa tài khoản thành công');
  };

  if (listings.length === 0) return null; 

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
          {listings.map((account, index) => (
            <View key={index} style={styles.accountContainer}>
              <TouchableOpacity
                style={styles.accountInfo}
                onPress={() =>
                  setSelectedItemId(
                    account.accountId === selectedItemId ? null : account.accountId
                  )
                }
              >
                <Image
                  source={logo[account.accountImage]}
                  style={styles.accountImage}
                />
                <View style={styles.accountDetails}>
                  <Text style={styles.accountName}>{account.accountName}</Text>
                  <Text style={styles.accountBalance}>
                    {account.balance.toLocaleString('en-US')} VND
                  </Text>
                </View>
              </TouchableOpacity>
              {account.accountId === selectedItemId && (
                <View style={styles.optionsMenu}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                      navigation.navigate('EditAccount', { account: account })
                    }
                  >
                    <Text>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteAccount(account.accountId, account.balance)}
                  >
                    <Text>Xóa</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={() =>
                  setSelectedItemId(
                    account.accountId === selectedItemId ? null : account.accountId
                  )
                }
              >
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  accountInfo: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  accountDetails: {
    marginLeft: 15,
  },
  accountName: {
    fontSize: 16,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionsMenu: {
    flexDirection:'row',
    backgroundColor: COLORS.white,
    padding: 10,
    paddingHorizontal: 20,

  },
  deleteButton: {
    paddingHorizontal: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
  editButton: {
    borderRightColor: COLORS.grey,
    borderRightWidth: 1,
    paddingHorizontal: 10,
  },
  optionsButton: {
    padding: 10,
  },
});
