import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useChange } from "../context/ChangeContext";
import { useFetchData } from "../hooks/useFetchData";
import ViewChart from "../components/ViewChart";
import { COLORS } from "../constants";
import Modal from 'react-native-modal';
import { Calendar } from "react-native-calendars";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { filterByRange } from "../global/functions";

const screenWidth = Dimensions.get("window").width;
const ReportScreen = () => {
  const { change, setChange } = useChange();
  console.log("ReportScreen");

  const { userData, noteData, accountData, loading, error } = useFetchData(change);

  const [type, setType] = useState("Thu tiền");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("NGÀY");
  const [selectedDay, setSelectedDay] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [filteredData, setFilteredData] = useState(noteData);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          const formattedDate = format(curr, "yyyy-MM-dd");
          acc[formattedDate] = { selected: true, selectedColor: COLORS.primary };
          return acc;
        }, {});
        setSelectedDates(dates);
      }
    } else {
      setSelectedDay(day.dateString);
    }
  };

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

  const handleApply = () => {
    if (selectedItem === "TÙY CHỌN" && (!startDate || !endDate)) {
      Alert.alert('Lỗi', 'Vui lòng chọn khoảng thời gian hợp lệ');
      return;
    }

    let timeValue;
    if (selectedItem === "TUẦN") {
      timeValue = getWeekDates(selectedDay);
    } else if (selectedItem === "THÁNG") {
      timeValue = getMonthDates(selectedDay);
    } else if (selectedItem === "TÙY CHỌN") {
      timeValue = selectedDates;
    } else {
      timeValue = { [selectedDay]: { selected: true, selectedColor: COLORS.primary } };
    }

    console.log("Selected time range:", timeValue);
    toggleModal();
    setFilteredData(filterByRange(noteData, timeValue));
  };



  return (
    <View style={{ paddingTop: 100, alignItems: "center", paddingHorizontal: 15 }}>
      <View style={styles.typeBox}>
        <TouchableOpacity style={styles.itemBox} onPress={() => setType("Chi tiền")}>
          <Text style={styles.itemText}>Chi tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBox} onPress={() => setType("Thu tiền")}>
          <Text style={styles.itemText}>Thu tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBox} onPress={toggleModal}>
          <Text style={styles.itemText}>Chọn thời gian</Text>
        </TouchableOpacity>
      </View>
      <ViewChart noteData={filteredData} type={type} />
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalTypeBox}>
            <TouchableOpacity style={styles.modalItemBox} onPress={() => setSelectedItem("NGÀY")}>
              <Text style={styles.modalItemText}>Ngày</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItemBox} onPress={() => setSelectedItem("TUẦN")}>
              <Text style={styles.modalItemText}>Tuần</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItemBox} onPress={() => setSelectedItem("THÁNG")}>
              <Text style={styles.modalItemText}>Tháng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItemBox} onPress={() => setSelectedItem("TÙY CHỌN")}>
              <Text style={styles.modalItemText}>Tùy chọn</Text>
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={
              selectedItem === "TUẦN"
                ? getWeekDates(selectedDay)
                : selectedItem === "THÁNG"
                ? getMonthDates(selectedDay)
                : selectedItem === "TÙY CHỌN"
                ? selectedDates
                : {
                    [selectedDay]: {
                      selected: true,
                      selectedColor: COLORS.primary,
                    },
                  }
            }
          />
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  typeBox: {
    height: 60,
    width: screenWidth,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemBox: {

  },
  itemText: {
    fontSize: 20,
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
  modalTypeBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  modalItemBox: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ReportScreen;
