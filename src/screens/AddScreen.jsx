import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useMemo, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SizedBox from '../components/SizedBox';
import Modal from 'react-native-modal';
import BalanceInput from '../components/BalanceInput';
import TypeChooses from '../components/TypeChooses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc,getDoc,getDocs, collection, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../components/FirebaseConfig';
import { useChange } from '../context/ChangeContext';
import SubmitButton from '../components/SubmitButton';



export default function AddScreen() {
    const headerHeight = 62;
    const [type, setType] = useState('Chi tiền');
    const [isModalVisible, setModalVisible] = useState(false);
    const [number, setNumber] = useState(0);
    const [typeNote, setTypeNote] = useState('');
    const [account, setAccount] = useState('');
    const { change, setChange } = useChange();
  
    const [data, setData] = useState(true);
    console.log("AddScreen");


  
  
    const handleNumberChange = (newNumber)=>{
      setNumber(newNumber);
    }
    const handleTypeNoteChange = (newType)=>{
      setTypeNote(newType);
    }
    const handleAccountChange = (newAccount)=>{
      setAccount(newAccount);
    }

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
            setData(false);
        const userDocId = await AsyncStorage.getItem('userDocId');
        // const accountDocRef = doc(collection(FIRESTORE_DB, 'users', userDocId, 'account'));
        const noteDocRef = doc(collection(FIRESTORE_DB, 'users', userDocId, 'account', account, 'note'));
        const note = {
            noteId: noteDocRef.id,
            noteType: type,
            noteName: typeNote,
            noteMoney: number,
            createdAt: new Date(),
            accountId: account,
        }
        await setDoc(noteDocRef,note);
        if(type === "Chi tiền"){
            const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`)
            const userData = await getDoc(userDocRef);
            await updateDoc(userDocRef, {total: userData.data().total - number});
            const accountDocRef = doc(FIRESTORE_DB, `users/${userDocId}/account/${account}`)
            const accountData = await getDoc(accountDocRef);
            const newBalance = accountData.data().balance - number;
            const newExpense = accountData.data().expense + number;
            await updateDoc(accountDocRef, {balance: newBalance, expense: newExpense});
            console.log("Update success Chi tien");
        }else if(type === "Thu tiền"){
          const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`)
          const userData = await getDoc(userDocRef);
          await updateDoc(userDocRef, {total: userData.data().total + number});
            const accountDocRef = doc(FIRESTORE_DB, `users/${userDocId}/account/${account}`)
            const accountData = await getDoc(accountDocRef);
            const newBalance = accountData.data().balance + number;
            const newIncome = accountData.data().income + number;
            await updateDoc(accountDocRef, {balance: newBalance, income: newIncome});
            console.log("Update success Thu tien");
        }
        setData(true);
        Alert.alert('Ghi chú thành công');
        setChange(!change);
        };
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    return (
      <>

        <StatusBar style="auto" />  
        <View style={[styles.header, { paddingTop: headerHeight, paddingBottom: 5, flexDirection:'row'}]}>
                <TouchableOpacity onPress={toggleModal} style={{ width: '40%', height: 32, backgroundColor: "#00BFF0", borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                  <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: '700', marginRight: 5 }}>{type}</Text>
                  <Ionicons name="caret-down" size={16} color={COLORS.white} />
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => { toggleModal(); setType("Chi tiền"); }} style={styles.menuOption}>
                      <Text style={styles.menuOptionText}>Chi tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { toggleModal(); setType("Thu tiền"); }} style={styles.menuOption}>
                      <Text style={styles.menuOptionText}>Thu tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { toggleModal(); setType("Chuyển khoản"); }} style={styles.menuOption}>
                      <Text style={styles.menuOptionText}>Chuyển khoản</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

              </View>
              {data ? (
              <ScrollView >
              <BalanceInput type={type} onNumberChange={handleNumberChange} initialValue={0}/>
              <SizedBox/>
              <TypeChooses type={type} onItemChange={handleTypeNoteChange} data="type" initialValue={0}/>
              <TypeChooses type={type} onItemChange={handleAccountChange} data="account" initialValue={0}/>
              <SubmitButton handleSubmit={handleSubmit} />
              </ScrollView> 
      ):(
        <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
      )}
  
      </>
    )
  }
  
  const styles = StyleSheet.create({
    header: {
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
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