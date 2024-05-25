import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import PropTypes from "prop-types";

export default function ExpenseAIncome({ listings }) {
  let heightIncome, heightExpense;
  if (listings.income === Math.max(listings.income, listings.expense)) {
    heightIncome = 120;
    heightExpense = 120 * (listings.expense / listings.income);
  } else {
    heightExpense = 120;
    heightIncome = 120 * (listings.income / listings.expense);
  }
  if (listings.income === listings.expense) {
    heightIncome = 120;
    heightExpense = 120;
  }
  if (listings.income === 0 || listings.income < listings.expense/50) {
    heightIncome = 1;
  }
  if (listings.expense === 0 || listings.expense < listings.income/50) {
    heightExpense = 1;
  }

  const FinanceInfo = ({ name, color, finance }) => (
    <View style={{ flexDirection: "row",  paddingVertical:10,justifyContent: "space-between"}}>

      <FontAwesome name="circle" size={16} color={color} />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, marginLeft: 5 }}>{name}</Text>

        <Text style={{ fontSize: 16, fontWeight: 700, color: color }}>
          {finance.toLocaleString("en-US")} VND
        </Text>
        </View>

    </View>
  );

  return (
    <>
      <View style={styles.headerBox}>
        <View>
          <Text style={styles.headerTitle}>Tình hình thu chi</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text style={{ color: "#999", fontSize: 15 }}>Tháng này</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#999"
              style={{ marginLeft: 5 }}
            />
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="settings" size={24} color={COLORS.grey} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          flexDirection: "row",

        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.green,
              height: heightIncome,
              width: 45,
              marginRight: 10,
            }}
          ></View>
          <View
            style={{
              backgroundColor: COLORS.red,
              height: heightExpense,
              width: 45,
            }}
          ></View>
        </View>
        <View             style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: 25,
              alignItems: "flex-end",
            }}>
          <FinanceInfo
            name="Thu"
            color={COLORS.green}
            finance={listings.income}
          />
          <FinanceInfo
            name="Chi"
            color={COLORS.red}
            finance={listings.expense}
          />
          <View style={{height:1, width:'100%', backgroundColor:'#ccc'}}></View>
          <FinanceInfo
            name="Tổng"
            color={COLORS.text}
            finance={listings.income - listings.expense}
          />
        </View>
      </View>

      <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end', paddingHorizontal:15, paddingVertical:10}}>
        <Text style={{fontSize:16, color:COLORS.primary}}>Lịch sử ghi chép</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </>
  );
}

ExpenseAIncome.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      income: PropTypes.number.isRequired,
      expense: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  headerBox: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
});
