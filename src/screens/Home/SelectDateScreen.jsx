import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../constants";
import { startOfWeek, endOfWeek, format, getWeek, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

export default function SelectDateScreen({ navigation }) {
  const route = useRoute();
  const { onChangeTime } = route.params;
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const data = [
    {
      type: "NGÀY",
      name: "Hôm nay",
    },
    {
      type: "TUẦN",
      name: "Tuần này",
    },
    {
      type: "THÁNG",
      name: "Tháng này",
    },
    {
      type: "TÙY CHỌN",
      name: "Tùy chọn",
    }
  ];

  const getWeekDates = (date) => {
    const start = startOfWeek(new Date(date), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(date), { weekStartsOn: 1 });
    const dates = {};
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const formattedDate = format(d, 'yyyy-MM-dd');
      dates[formattedDate] = { selected: true, selectedColor: COLORS.primary };
    }
    return dates;
  };

  const getMonthDates = (date) => {
    const start = startOfMonth(new Date(date));
    const end = endOfMonth(new Date(date));
    const dates = eachDayOfInterval({ start, end }).reduce((acc, curr) => {
      const formattedDate = format(curr, 'yyyy-MM-dd');
      acc[formattedDate] = { selected: true, selectedColor: COLORS.primary };
      return acc;
    }, {});
    return dates;
  };

  const timeWeek = (selectedDate) => {
    const selectedDateObject = new Date(selectedDate);
    const weekNumber = getWeek(selectedDateObject, { weekStartsOn: 1 });
    const year = selectedDateObject.getFullYear();
    return `${weekNumber}-${year}`;
  };

  const handleDayPress = (day) => {
    if (selectedItem === "TÙY CHỌN") {
      if (!startDate || (startDate && endDate)) {
        setStartDate(day.dateString);
        setEndDate(null);
        setSelectedDates({ [day.dateString]: { selected: true, selectedColor: COLORS.primary } });
      } else {
        setEndDate(day.dateString);
        const start = new Date(startDate);
        const end = new Date(day.dateString);
        const dates = eachDayOfInterval({ start, end }).reduce((acc, curr) => {
          const formattedDate = format(curr, 'yyyy-MM-dd');
          acc[formattedDate] = { selected: true, selectedColor: COLORS.primary };
          return acc;
        }, {});
        setSelectedDates(dates);
      }
    } else {
      setSelectedDay(day);
    }
  };

  const getSelectedRangeDates = () => {
    if (!startDate || !endDate) return {};
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = eachDayOfInterval({ start, end }).reduce((acc, curr) => {
      const formattedDate = format(curr, 'yyyy-MM-dd');
      acc[formattedDate] = { selected: true, selectedColor: COLORS.primary };
      return acc;
    }, {});
    return dates;
  };

  return (
    <View style={{ marginTop: 102 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height: 40,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              marginBottom: 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                item.type === selectedItem ? COLORS.primary : "transparent",
            }}
            onPress={() => {
              setShowCalendar(true);
              setSelectedItem(item.type);
              setStartDate(null);
              setEndDate(null);
              setSelectedDates({});
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: item.type === selectedItem ? "white" : "black",
              }}
            >
              {item.type}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.type}
        horizontal={true}
      />
      {showCalendar && (
        <Calendar
          onDayPress={handleDayPress}
          markedDates={
            selectedItem === "TUẦN"
              ? getWeekDates(selectedDay?.dateString)
              : selectedItem === "THÁNG"
              ? getMonthDates(selectedDay?.dateString)
              : selectedItem === "TÙY CHỌN"
              ? selectedDates
              : {
                  [selectedDay?.dateString]: {
                    selected: true,
                    selectedColor: COLORS.primary,
                  },
                }
          }
        />
      )}
      {showCalendar && (
        <TouchableOpacity
          style={{
            height: 40,
            marginHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            marginTop: 100,
            width: 100,
            alignSelf: "center",
            borderRadius: 4,
          }}
          onPress={() => {
            let timeValue;
            if (selectedItem === "TUẦN") {
              const selectedDate = new Date(selectedDay?.dateString);
              timeValue = timeWeek(selectedDate);
            } else if (selectedItem === "THÁNG") {
              const selectedDate = new Date(selectedDay?.dateString);
              timeValue = format(selectedDate, 'yyyy-MM');
            } else if (selectedItem === "TÙY CHỌN") {
              timeValue = `${startDate} đến ${endDate}`;
            } else {
              timeValue = selectedDay?.dateString;
            }
            onChangeTime(timeValue);
            navigation.goBack();
          }}
        >
          <Text style={{ fontSize: 18, color: COLORS.white }}>LƯU LẠI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
