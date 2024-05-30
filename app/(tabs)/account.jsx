import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, { useMemo } from 'react'
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

export default function Account() {

  const {income, expense} = useTotal();
  total = income - expense;

  const accountMoney = useMemo(() => {
    return AccountData.filter((account) => account.userId === UserData[0].userId &&  account.accountType === "Tiền mặt");
  }, [AccountData]);

  const accountBank = useMemo(() => {
    return AccountData.filter((account) => account.userId === UserData[0].userId && account.accountType === "Tài khoản ngân hàng");
  }, [AccountData]);

  const accountWallet = useMemo(() => {
    return AccountData.filter((account) => account.userId === UserData[0].userId && account.accountType === "Ví điện tử");
  }, [AccountData]);

  const headerHeight = useHeaderHeight();


  return (
    <>
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerTitle: "Tài khoản",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackground: () => (
            <>
              <View style={[styles.header, { paddingTop: headerHeight }]}>
              </View>
              <View style={{paddingVertical:10, flexDirection:'row', justifyContent:'center'}}>
                <Text style={{fontSize:20, fontWeight:'600'}}
                >
                  Tổng tiền: {total.toLocaleString('en-US')} VND
                </Text>
              </View>
                <SizedBox/>
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
      <ScrollView style={{paddingTop:headerHeight+60}}>
        <ViewAccounts listings={accountMoney} title="Tiền mặt"/>
        <ViewAccounts listings={accountBank} title="Tài khoản ngân hàng"/>
        <ViewAccounts listings={accountWallet} title="Ví điện tử"/>
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
});