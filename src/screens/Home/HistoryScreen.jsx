import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useChange } from "../../context/ChangeContext";
import { useFetchData } from "../../hooks/useFetchData";
import { parseISO, format } from "date-fns";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import SizedBox from "../../components/SizedBox";
import { ScrollView } from "react-native-gesture-handler";
import {
  groupNotesByDate,
  getDayOfWeekFromDateString,
  filterCurrentMonthNotes,
  filterCurrentWeekNotes,
  filterTodayNotes,
} from "../../global/functions";

export default function HistoryScreen({navigation}) {
  const { change, setChange } = useChange();
  const { userData, noteData, accountData, loading, error } =
    useFetchData(change);

  const [time, setTime] = useState("Hôm nay");

  if (time === "Tháng này") {
    const currentMonthNotes = filterCurrentMonthNotes(noteData);
    // Nhóm các ghi chú đã lọc theo ngày
    var groupedNotes = groupNotesByDate(currentMonthNotes);
  } else if (time === "Tuần này") {
    const currentWeekNotes = filterCurrentWeekNotes(noteData);
    // Nhóm các ghi chú đã lọc theo ngày
    var groupedNotes = groupNotesByDate(currentWeekNotes);
  } else if (time === "Hôm nay") {
    const todayNotes = filterTodayNotes(noteData);
    // Nhóm các ghi chú đã lọc theo ngày
    var groupedNotes = groupNotesByDate(todayNotes);
  }

  return (
    <View style={{ marginTop: 110 }}>
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center", flexDirection: "row" }}
        onPress={() => navigation.navigate("SelectDate", {onChangeTime: setTime})}
      >
        <Text style={{ color: COLORS.primary, fontSize: 20 }}>{time}</Text>
        <Entypo name="chevron-right" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <SizedBox />
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
                    right: 15,
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
                    right: 15,
                    fontSize: 22,
                    color: COLORS.green,
                  }}
                >
                  {groupedNotes[date].total.toLocaleString("en-US")} đ
                </Text>
              )}
            </View>
            {groupedNotes[date].notes.map((note, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 16,
                  paddingRight: 15,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 18,
                    fontWeight: "500",
                    marginLeft: 20,
                  }}
                >
                  {note.noteName}
                </Text>
                {note.noteType === "Chi tiền" ? (
                  <Text
                    style={{ color: COLORS.red, fontSize: 20, marginLeft: 20 }}
                  >
                    {note.noteMoney.toLocaleString("en-US")} đ
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: 20,
                      marginLeft: 20,
                    }}
                  >
                    {note.noteMoney.toLocaleString("en-US")} đ
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
