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
import { parseISO, format } from "date-fns";
import { Entypo, Ionicons } from "@expo/vector-icons";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_DB } from "../../components/FirebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export default function HistoryScreen({ navigation }) {
  const { change, setChange } = useChange();
  const [data, setData] = useState(true);
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
        onPress={() =>
          navigation.navigate("SelectDate", { onChangeTime: setTime })
        }
      >
        <Text style={{ color: COLORS.primary, fontSize: 20 }}>{time}</Text>
        <Entypo name="chevron-right" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <SizedBox />
      {data ? (
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
                <SwipeableItem
                  item={note}
                  setData={setData}
                  setChange={setChange}
                  change={change}
                />
              ))}
            </View>
          ))}
        </ScrollView>
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

const SwipeableItem = ({ item, setData, setChange, change }) => {
  const deleteNote = async (accountId, noteId, balance, type) => {
    setData(false);
    const userDocId = await AsyncStorage.getItem("userDocId");
    const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`);
    const userData = await getDoc(userDocRef);
    const accountRef = doc(
      FIRESTORE_DB,
      `users/${userDocId}/account/${accountId}`
    );
    const accountData = await getDoc(accountRef);
    if (type === "Thu tiền") {
      await updateDoc(userDocRef, { total: userData.data().total - balance });
      await updateDoc(accountRef, {
        income: accountData.data().income - balance,
      });
      await updateDoc(accountRef, {
        balance: accountData.data().balance - balance,
      });
    } else {
      await updateDoc(userDocRef, { total: userData.data().total + balance });
      await updateDoc(accountRef, {
        expense: accountData.data().expense - balance,
      });
      await updateDoc(accountRef, {
        balance: accountData.data().balance + balance,
      });
    }
    await deleteDoc(
      doc(
        FIRESTORE_DB,
        "users",
        userDocId,
        "account",
        accountId,
        "note",
        noteId
      )
    );

    setChange(!change);
    Alert.alert("Xóa ghi chú thành công");
    setData(true);
  };
  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.timing(translateX, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "red" }]}
          onPress={() => {
            deleteNote(
              item.accountId,
              item.noteId,
              item.noteMoney,
              item.noteType
            );
          }}
        >
          <Ionicons name="trash" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "blue" }]}
        >
          <Ionicons name="archive" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.item, { transform: [{ translateX }] }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingRight: 15,
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
            {item.noteName}
          </Text>
          {item.noteType === "Chi tiền" ? (
            <Text
              style={{
                color: COLORS.red,
                fontSize: 20,
                marginLeft: 20,
              }}
            >
              {item.noteMoney.toLocaleString("en-US")} đ
            </Text>
          ) : (
            <Text
              style={{
                color: COLORS.green,
                fontSize: 20,
                marginLeft: 20,
              }}
            >
              {item.noteMoney.toLocaleString("en-US")} đ
            </Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
