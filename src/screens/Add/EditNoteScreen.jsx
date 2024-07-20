import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SizedBox from '../../components/SizedBox';
import Modal from 'react-native-modal';
import BalanceInput from '../../components/BalanceInput';
import TypeChooses from '../../components/TypeChooses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../components/FirebaseConfig';
import { useChange } from '../../context/ChangeContext';
import SubmitButton from '../../components/SubmitButton';

export default function EditNoteScreen({ route, navigation }) {
  const { noteId, accountId } = route.params;

  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [typeNote, setTypeNote] = useState('');
  const [account, setAccount] = useState(accountId);
  const { change, setChange } = useChange();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    const fetchNoteData = async () => {
      const userDocId = await AsyncStorage.getItem('userDocId');
      const noteDocRef = doc(FIRESTORE_DB, 'users', userDocId, 'account', accountId, 'note', noteId);
      const noteDoc = await getDoc(noteDocRef);
      if (noteDoc.exists()) {
        const noteData = noteDoc.data();
        setType(noteData.noteType);
        setNumber(noteData.noteMoney);
        setTypeNote(noteData.noteName);
        setAccount(noteData.accountId);
        setInitialData(noteData);
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy ghi chú');
        navigation.goBack();
      }

      setLoading(false);
    };

    fetchNoteData();
  }, []);

  const handleNumberChange = (newNumber) => {
    setNumber(newNumber);
  };

  const handleTypeNoteChange = (newType) => {
    setTypeNote(newType);
  };

  const handleAccountChange = (newAccount) => {
    setAccount(newAccount);
  };

  const handleSubmit = async () => {
    if (number === 0) {
      Alert.alert('Vui lòng nhập số tiền');
      return;
    }
    if (typeNote === '') {
      Alert.alert('Vui lòng chọn loại giao dịch');
      return;
    }
    if (account === '') {
      Alert.alert('Vui lòng chọn tài khoản');
      return;
    }

    setLoading(true);
    const userDocId = await AsyncStorage.getItem('userDocId');
    const noteDocRef = doc(FIRESTORE_DB, 'users', userDocId, 'account', accountId, 'note', noteId);
    const updatedNote = {
      noteType: type,
      noteName: typeNote,
      noteMoney: number,
      accountId: account,
    };
    await updateDoc(noteDocRef, updatedNote);

    if (type !== initialData.noteType || number !== initialData.noteMoney || account !== initialData.accountId) {
      const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`);
      const userData = await getDoc(userDocRef);

      let totalAdjustment = 0;
      if (type === "Chi tiền") {
        totalAdjustment = initialData.noteMoney - number;
        await updateDoc(userDocRef, { total: userData.data().total - totalAdjustment });
      } else if (type === "Thu tiền") {
        totalAdjustment = number - initialData.noteMoney;
        await updateDoc(userDocRef, { total: userData.data().total + totalAdjustment });
      }

      const initialAccountDocRef = doc(FIRESTORE_DB, `users/${userDocId}/account/${initialData.accountId}`);
      const initialAccountData = await getDoc(initialAccountDocRef);
      if (initialData.noteType === "Chi tiền") {
        await updateDoc(initialAccountDocRef, {
          balance: initialAccountData.data().balance + initialData.noteMoney,
          expense: initialAccountData.data().expense - initialData.noteMoney
        });
      } else if (initialData.noteType === "Thu tiền") {
        await updateDoc(initialAccountDocRef, {
          balance: initialAccountData.data().balance - initialData.noteMoney,
          income: initialAccountData.data().income - initialData.noteMoney
        });
      }

      const newAccountDocRef = doc(FIRESTORE_DB, `users/${userDocId}/account/${account}`);
      const newAccountData = await getDoc(newAccountDocRef);
      if (type === "Chi tiền") {
        await updateDoc(newAccountDocRef, {
          balance: newAccountData.data().balance - number,
          expense: newAccountData.data().expense + number
        });
      } else if (type === "Thu tiền") {
        await updateDoc(newAccountDocRef, {
          balance: newAccountData.data().balance + number,
          income: newAccountData.data().income + number
        });
      }
    }

    setLoading(false);
    Alert.alert('Ghi chú đã được cập nhật');
    setChange(!change);
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={[styles.header, { paddingTop: 62, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={{ width: '40%', height: 32, backgroundColor: "#00BFF0", borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
          <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: '700', marginRight: 5 }}>{type}</Text>
          <Ionicons name="caret-down" size={16} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingRight: 15 }}>
          <Ionicons name='filter' size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <BalanceInput type={type} onNumberChange={handleNumberChange} initialValue={number} />
        <SizedBox />
        <TypeChooses type={type} onItemChange={handleTypeNoteChange} data="type" initialValue={typeNote} />
        <TypeChooses type={type} onItemChange={handleAccountChange} data="account" initialValue={account} />
        <SubmitButton handleSubmit={handleSubmit} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  menuOption: {
    padding: 10,
    width: '100%',
  },
  menuOptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
