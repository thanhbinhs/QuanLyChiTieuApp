import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import SizedBox from "../../components/SizedBox";
import userData from "../../data/user.json"
import ExpenseAIncome from "../../components/ExpenseAIncome";
import RateTables from "../../components/RateTables";
import {balanceUser} from "../../constants/functions"
import { useTotal } from "../../context/TotalContext";

export default function Home() {
  const [isshow, setIsshow] = useState(false);
  const {total, income, expense} = useTotal()



  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.headerTitle}>Hello Group Two</Text>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="notifications" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoWrapper}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 14, color: "#999" }}>Tổng số dư</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
            {total < 0 ? (

              <Text
                style={{ color: COLORS.red, fontSize: 28, fontWeight: "700" }}
              >
                {isshow ? "***000" : "-" + Math.abs(total).toLocaleString('en-US')} VND
              </Text>
            ) : (
              <Text
                style={{ color: COLORS.green, fontSize: 28, fontWeight: "700" }}
              >
                {isshow ? "***000" : "+" + total.toLocaleString('en-US')} VND
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => {
            setIsshow(!isshow);
          }}>
            {
              isshow ? (
                <Ionicons name="eye-off-sharp" size={30} color="#999" />
              ) : (
                <Ionicons name="eye-sharp" size={30} color="#999" />
              )
            }
          </TouchableOpacity>
        </View>
      </View>
      <SizedBox />
      <ExpenseAIncome listings={userData[0]} />
      <SizedBox />
      <RateTables />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "stretch",
    padding: SIZES.padding,
    paddingTop: 60,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
});
