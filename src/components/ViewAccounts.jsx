import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS, logo } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import ViewOptions from "./ViewOptions";
import { useChange } from "../context/ChangeContext";
import { useFetchData } from "../hooks/useFetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_DB } from "./FirebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function ViewAccounts({ listings, title, navigation }) {
  const { change, setChange } = useChange();

  const widthScreen = Dimensions.get("window").width;
  const heightScreen = Dimensions.get("window").height;
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [data, setData] = useState(true);

  const deleteAccount = async (accountId, balance) => {
    setData(false);
    const userDocId = await AsyncStorage.getItem("userDocId");
    const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`);
    const userData = await getDoc(userDocRef);
    await updateDoc(userDocRef, { total: userData.data().total - balance });
    await deleteDoc(
      doc(FIRESTORE_DB, "users", userDocId, "account", accountId)
    );
    setChange(!change);
    setData(true);
  };

  return (
    <>
      {data ? (
        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
          {listings.map((account, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View style={{ paddingVertical: 10, flexDirection: "row" }}>
                <Image
                  source={logo[account.accountImage]}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 16 }}>{account.accountName}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "700" }}>
                    {account.balance.toLocaleString("en-US")} VND
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: widthScreen,
                  height: 1,
                  backgroundColor: "#ccc",
                  position: "absolute",
                  bottom: 0,
                  right: -15,
                }}
              ></View>
              {account.accountId === selectedItemId && (
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 50,
                    backgroundColor: COLORS.white,
                    padding: 10,
                    paddingHorizontal: 20,
                    zIndex: 100,
                  }}
                >
                  <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() =>
                      deleteAccount(account.accountId, account.balance)
                    }
                  >
                    <Text>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      borderTopColor: "#ccc",
                      borderTopWidth: 1,
                      paddingTop: 10,
                      paddingHorizontal: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("EditAccount", { account: account })
                    }
                  >
                    <Text>Sửa</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  setSelectedItemId(
                    account.accountId === selectedItemId
                      ? null
                      : account.accountId
                  );
                }}
              >
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
    </>
  );
}
