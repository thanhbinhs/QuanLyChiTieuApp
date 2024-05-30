import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router';
import { COLORS } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from '@expo/vector-icons';
import AccountData from '../../data/account.json';
import UserData from '../../data/user.json';
import NoteData from '../../data/note.json';
import { useTotal } from '../../context/TotalContext';
import SizedBox from '../../components/SizedBox';
import ViewAccounts from '../../components/ViewAccounts';
import Modal from 'react-native-modal';

export default function Add() {
  const headerHeight = useHeaderHeight();
  const [type, setType] = useState('Chi tiền');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackground: () => (
            <>
              <View style={[styles.header, { paddingTop: headerHeight - 46, paddingBottom: 5 }]}>
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
              <SizedBox />
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <Ionicons name='search' size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 15 }}>
              <Ionicons name='filter' size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }} />

      <ScrollView style={{paddingTop:headerHeight}}>
        <TextInput placeholder="Nhập số tiền" style={{ padding: 10, margin: 10, borderColor: COLORS.grey, borderWidth: 1, borderRadius: 5 }} />
        </ScrollView>
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