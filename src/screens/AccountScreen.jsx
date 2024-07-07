import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import SizedBox from "../components/SizedBox";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewAccounts from "../components/ViewAccounts";
import { useChange } from "../context/ChangeContext";
import { useFetchData } from "../hooks/useFetchData";

const Stack = createNativeStackNavigator();

export default function AccountScreen({ navigation }) {
  const { change, setChange } = useChange();
  console.log("AccountScreen");

  const { userData, noteData, accountData, loading, error } =
    useFetchData(change);

  const total = useMemo(() => {
    return accountData.reduce((total, account) => total + account.balance, 0);
  }, [accountData]);

  const accountMoney = useMemo(() => {
    return accountData.filter((account) => account.accountType === "Tiền mặt");
  }, [accountData]);

  const accountBank = useMemo(() => {
    return accountData.filter(
      (account) => account.accountType === "Tài khoản ngân hàng"
    );
  }, [accountData]);

  const accountWallet = useMemo(() => {
    return accountData.filter(
      (account) => account.accountType === "Ví điện tử"
    );
  }, [accountData]);

  const accountCredit = useMemo(() => {
    return accountData.filter(
      (account) => account.accountType === "Thẻ tín dụng"
    );
  }, [accountData]);

  const headerHeight = useHeaderHeight();

  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          paddingVertical: 10,
          paddingTop: 110,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Tổng tiền: {total.toLocaleString("en-US")} VND
        </Text>
      </View>
      <SizedBox />
      <ScrollView>
        <ViewAccounts listings={accountMoney} title="Tiền mặt" navigation={navigation}/>
        <ViewAccounts listings={accountBank} title="Tài khoản ngân hàng" navigation={navigation}/>
        <ViewAccounts listings={accountWallet} title="Ví điện tử" navigation={navigation}/>
        <ViewAccounts listings={accountCredit} title="Thẻ tín dụng" navigation={navigation}/>
      </ScrollView>
      {Platform.OS === "android" ? (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("AddAccount");
          }}
        >
          <Ionicons
            name="add-circle"
            size={68}
            color={COLORS.primary}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddAccount");
          }}
        >
          <Ionicons
            name="add-circle"
            size={68}
            color={COLORS.primary}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
