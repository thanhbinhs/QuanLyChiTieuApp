import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { useChange } from "../../context/ChangeContext";
import { useFetchData } from "../../hooks/useFetchData";
import { parseISO, format, set } from "date-fns";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import SizedBox from "../../components/SizedBox";
import { ScrollView } from "react-native-gesture-handler";
import {
  groupNotesByDate,
  getDayOfWeekFromDateString,
  filterTodayNotes,
  filterNotesByDate,
  filterNotesByWeek,
  filterNotesByMonth,
} from "../../global/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_DB } from "../../components/FirebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import SwipeableItem from "../../components/SwipeableItem";

export default function HistoryScreen({ navigation }) {
  const { change, setChange } = useChange();
  const [data, setData] = useState(true);
  const { userData, noteData, accountData, loading, error } =
    useFetchData(change);

  const [time, setTime] = useState("Hôm nay");
  const [show, setShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

 if (time === "Hôm nay") {
    const todayNotes = filterTodayNotes(noteData);
    // Nhóm các ghi chú đã lọc theo ngày
    var groupedNotes = groupNotesByDate(todayNotes);
  } else if (/\d{4}-\d{2}-\d{2}/.test(time)){
    const selectedDateNotes = filterNotesByDate(noteData, time);
    // Nhóm các ghi chú đã lọc theo ngày
    var groupedNotes = groupNotesByDate(selectedDateNotes);
  } else if (/\d+-\d{4}/.test(time)) {
    // Nếu time là số tuần và năm
    const [weekNumber, year] = time.split('-').map(Number);
    selectedDateNotes = filterNotesByWeek(noteData,weekNumber, year);
    // Nhóm các ghi chú đã lọc theo ngày
    var groupedNotes = groupNotesByDate(selectedDateNotes);
  }else if (/\d{4}-\d{2}/.test(time)) {
    // Nếu time là tháng và năm
    const [year, month] = time.split('-').map(Number);
    selectedDateNotes = filterNotesByMonth(noteData, year, month);
    groupedNotes = groupNotesByDate(selectedDateNotes);
  }else if (time.includes("đến")) {
    // Nếu time là khoảng ngày tùy chọn
    const [startDate, endDate] = time.split(" đến ");
    selectedDateNotes = filterNotesByCustomRange(noteData, startDate, endDate);
    groupedNotes = groupNotesByDate(selectedDateNotes);
  }
  

  console.log(groupedNotes);

  const total = Object.keys(groupedNotes).reduce((acc, date) => {
    return acc + groupedNotes[date].total;
  }, 0);

  return (
    <View style={{ marginTop: 110 }}>
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center", flexDirection: "row" }}
        onPress={() =>
          navigation.navigate("SelectDate", { onChangeTime: setTime })
        }
      >
        <Text style={{ color: COLORS.primary, fontSize: 20 }}>{time}</Text>
        <Entypo name="chevron-right" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <SizedBox />
      {data ? (
        <>
          <View style={{ height: 60, alignItems:'center', paddingVertical:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
            <Text style={{ fontSize: 28, color: COLORS.primary }}>
              Tổng chỉ tiêu: {total.toLocaleString("en-US")} đ
            </Text>
          </View>
          <ScrollView style={{ height: "100%" }}>
            {Object.keys(groupedNotes).map((date) => (
              <View key={date} style={{ marginBottom: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    style={{
                      height: 64,
                      width: 8,
                      backgroundColor: COLORS.primary,
                    }}
                  ></View>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 40,
                      marginLeft: 10,
                      fontWeight: "500",
                    }}
                  >
                    {format(date, "dd")}
                  </Text>

                  <View>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 20,
                        marginLeft: 10,
                        fontWeight: "500",
                      }}
                    >
                      {getDayOfWeekFromDateString(date)}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.grey,
                        fontSize: 20,
                        marginLeft: 10,
                      }}
                    >
                      {format(date, "MM/yyyy")}
                    </Text>
                  </View>
                  {groupedNotes[date].total < 0 ? (
                    <Text
                      style={{
                        position: "absolute",
                        right: 45,
                        fontSize: 22,
                        color: COLORS.red,
                      }}
                    >
                      {groupedNotes[date].total.toLocaleString("en-US")} đ
                    </Text>
                  ) : (
                    <Text
                      style={{
                        position: "absolute",
                        right: 45,
                        fontSize: 22,
                        color: COLORS.green,
                      }}
                    >
                      {groupedNotes[date].total.toLocaleString("en-US")} đ
                    </Text>
                  )}
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 15,
                      fontSize: 22,
                      color: COLORS.green,
                    }}
                    onPress={() => {
                      setShow(!show);
                      setSelectedItemId(date);
                    }}
                  >
                    <Ionicons
                      name="chevron-down"
                      size={24}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                </View>

                {date === selectedItemId &&
                  show &&
                  groupedNotes[date].notes.map((note, index) => (
                    <SwipeableItem
                      item={note}
                      setData={setData}
                      setChange={setChange}
                      change={change}
                      navigation={navigation}

                    />
                  ))}
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: 600,
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
