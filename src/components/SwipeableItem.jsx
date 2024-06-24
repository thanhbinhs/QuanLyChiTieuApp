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
  import { useChange } from "../context/ChangeContext";
  import { useFetchData } from "../hooks/useFetchData";
  import { parseISO, format, set } from "date-fns";
  import { Entypo, Ionicons } from "@expo/vector-icons";
  import { COLORS } from "../constants";
  import SizedBox from "../components/SizedBox";
  import { ScrollView } from "react-native-gesture-handler";
  import {
    groupNotesByDate,
    getDayOfWeekFromDateString,
    filterCurrentMonthNotes,
    filterCurrentWeekNotes,
    filterTodayNotes,
  } from "../global/functions";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { FIRESTORE_DB } from "../components/FirebaseConfig";
  import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const SwipeableItem = ({ item, setData, setChange, change, navigation }) => {
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
          if (gestureState.dx < -100) {
            Animated.timing(translateX, {
              toValue: -150,
              duration: 200,
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
            onPress={() => {navigation.navigate("EditNote", {item: item})}}
          >
            <Ionicons name="pencil-sharp" size={32} color="white" />
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

  export default SwipeableItem;