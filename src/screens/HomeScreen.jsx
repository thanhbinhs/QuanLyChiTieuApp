import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Platform
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../components/FirebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import SizedBox from "../components/SizedBox";
import ExpenseAIncome from "../components/ExpenseAIncome";
import RateTables from "../components/RateTables";
import { useChange } from "../context/ChangeContext";
import { useFetchData } from "../hooks/useFetchData";
import SwipeableItem from "../components/SwipeableItem";
import { filterTodayNotes, groupNotesByDate } from "../global/functions";


const CHANNEL_KEY = 'eyJzZXR0aW5nc191cmwiOiJodHRwczovL3BoZW5pa2FhLnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSjJURlYyTUdKVjBQTVZCNUtGS0JCQzFNLmpzb24ifQ==';

const HomeScreen = ({ navigation }) => {
  const [isshow, setIsshow] = useState(false);
  const { change, setChange } = useChange();
  const [data, setData] = useState(true);
  console.log("HomeScreen");

  const { userData, noteData, accountData, loading, error } =
    useFetchData(change);
  const todayNotes = filterTodayNotes(noteData);
  // Nhóm các ghi chú đã lọc theo ngày
  var groupedNotes = groupNotesByDate(todayNotes);

  // useEffect(() => {
  //   Zendesk.initialize({ channelKey: CHANNEL_KEY })
  //     .then(() => /* success */{})
  //     .catch((error) => /* failure */{});
  // }, []);

  // const handlePressOpenButton = () => {
  //   Zendesk.openMessagingView();
  // };

  const chatBotBtn = () => (
    <TouchableOpacity
      // onPress={() => handlePressOpenButton()}
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
      }}
    >
      {/* <Image
        style={{ height: 60, width: 60, borderRadius: 30 }}
        source={require("../assets/chatbot.jpg")}
      /> */}
    </TouchableOpacity>
  );

  return (
    <>
      {userData && noteData ? (
        <>
          <View style={styles.header}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.headerTitle}>Hello {userData.username}</Text>
              <TouchableOpacity>
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
                  <Text style={{ fontSize: 14, color: "#999" }}>
                    Tổng số dư
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>
                {userData.total < 0 ? (
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 28,
                      fontWeight: "700",
                    }}
                  >
                    {isshow
                      ? "***000"
                      : "-" +
                        Math.abs(userData.total).toLocaleString("en-US")}{" "}
                    VND
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: 28,
                      fontWeight: "700",
                    }}
                  >
                    {isshow
                      ? "***000"
                      : "+" + userData.total.toLocaleString("en-US")}{" "}
                    VND
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={() => setIsshow(!isshow)}>
                {isshow ? (
                  <Ionicons name="eye-off-sharp" size={30} color="#999" />
                ) : (
                  <Ionicons name="eye-sharp" size={30} color="#999" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <SizedBox />
          <ScrollView>
            <ExpenseAIncome listing={noteData} navigation={navigation} />
            <SizedBox />
            {Object.keys(groupedNotes).map((date) => {
              return (
                <View key={date}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 15,
                      paddingVertical: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: COLORS.primary,
                      }}
                    >
                      {date}
                    </Text>
                    <Text style={{ fontSize: 24 }}>
                      {groupedNotes[date].total.toLocaleString("en-US")} đ
                    </Text>
                  </View>

                  {groupedNotes[date].notes.map((note, index) => {
                    return (
                      <SwipeableItem
                        item={note}
                        setData={setData}
                        setChange={setChange}
                        change={change}
                        navigation={navigation}
                      />
                    );
                  })}
                </View>
              );
            })}
            <SizedBox />
            <RateTables />
          </ScrollView>
          {chatBotBtn()}
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </>
  );
};

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
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
