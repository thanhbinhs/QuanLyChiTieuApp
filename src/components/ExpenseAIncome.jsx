import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import {
  filterCurrentMonthNotes,
  groupNotesByDate,
  filterCurrentWeekNotes,
  filterTodayNotes,
} from "../global/functions";

export default function ExpenseAIncome({ listing, navigation }) {
  let income, expense;

  const [show, setShow] = useState(false);
  const [time, setTime] = useState("Tháng này");

  if (time === "Tháng này") {
    const currentMonthNotes = filterCurrentMonthNotes(listing);
    income = (currentMonthNotes ?? [])
      .filter((item) => item.noteType === "Thu tiền")
      .reduce((acc, item) => acc + item.noteMoney, 0);
    expense = (currentMonthNotes ?? [])
      .filter((item) => item.noteType === "Chi tiền")
      .reduce((acc, item) => acc + item.noteMoney, 0);
    // Nhóm các ghi chú đã lọc theo ngày
    const groupedNotes = groupNotesByDate(currentMonthNotes);
  }

  if (time === "Tuần này") {
    const currentWeekNotes = filterCurrentWeekNotes(listing);
    income = (currentWeekNotes ?? [])
      .filter((item) => item.noteType === "Thu tiền")
      .reduce((acc, item) => acc + item.noteMoney, 0);
    expense = (currentWeekNotes ?? [])

      .filter((item) => item.noteType === "Chi tiền")
      .reduce((acc, item) => acc + item.noteMoney, 0);
    // Nhóm các ghi chú đã lọc theo ngày
    const groupedNotes = groupNotesByDate(currentWeekNotes);
  }

  if (time === "Hôm nay") {
    const todayNotes = filterTodayNotes(listing);
    income = (todayNotes ?? [])
      .filter((item) => item.noteType === "Thu tiền")
      .reduce((acc, item) => acc + item.noteMoney, 0);
    expense = (todayNotes ?? [])
      .filter((item) => item.noteType === "Chi tiền")
      .reduce((acc, item) => acc + item.noteMoney, 0);
    // Nhóm các ghi chú đã lọc theo ngày
    const groupedNotes = groupNotesByDate(todayNotes);
  }

  const total = income - expense;

  let heightIncome, heightExpense;
  if (income === Math.max(income, expense)) {
    heightIncome = 120;
    heightExpense = 120 * (expense / income);
  } else {
    heightExpense = 120;
    heightIncome = 120 * (income / expense);
  }
  if (income === expense) {
    heightIncome = 120;
    heightExpense = 120;
  }
  if (income === 0 || income < expense / 50) {
    heightIncome = 1;
  }
  if (expense === 0 || expense < income / 50) {
    heightExpense = 1;
  }

  const FinanceInfo = ({ name, color, finance }) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between",
      }}
    >
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
              position: "relative",
            }}
            onPress={() => setShow(!show)}
          >
            <Text style={{ color: "#999", fontSize: 15 }}>{time}</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#999"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

      </View>

      {listing != [] ? (
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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: 25,
              alignItems: "flex-end",
            }}
          >
            <FinanceInfo name="Thu" color={COLORS.green} finance={income} />
            <FinanceInfo name="Chi" color={COLORS.red} finance={expense} />
            <View
              style={{ height: 1, width: "100%", backgroundColor: "#ccc" }}
            ></View>
            <FinanceInfo name="Tổng" color={COLORS.text} finance={total} />
          </View>
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      {show && (
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: 15,
            width: 125,
            position: "absolute",
            top: 70,
            left: 15,
            backgroundColor: "#fff",
            borderRadius: 4,
            shadowColor: "#000",
            borderWidth:1,
            borderColor:"#ccc",
          }}
        >
          <Text
            style={{ color: "#333", fontSize: 18, paddingBottom: 15 }}
            onPress={() => {
              setTime("Hôm nay");
              setShow(!show);
            }}
          >
            Hôm nay
          </Text>
          <Text
            style={{ color: "#333", fontSize: 18, paddingVertical: 15 }}
            onPress={() => {
              setTime("Tuần này");
              setShow(!show);
            }}
          >
            Tuần này
          </Text>
          <Text
            style={{ color: "#333", fontSize: 18, paddingVertical: 15 }}
            onPress={() => {
              setTime("Tháng này");
              setShow(!show);
            }}
          >
            Tháng này
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={{ fontSize: 16, color: COLORS.primary }}>
          Lịch sử ghi chép
        </Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </>
  );
}

// ExpenseAIncome.propTypes = {
//   listings: PropTypes.arrayOf(
//     PropTypes.shape({
//       noteId: PropTypes.string.isRequired,
//       noteName: PropTypes.string.isRequired,
//       noteType: PropTypes.string.isRequired,
//       noteMoney: PropTypes.number.isRequired,
//       createdAt: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

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
