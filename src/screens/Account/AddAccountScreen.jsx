import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState, useRef } from "react";
import { COLORS } from "../../constants";
import SizedBox from "../../components/SizedBox";
import TextInputv2 from "../../components/TextInputv2";
import { logo } from "../../constants";
import typeAccountData from "../../data/type_account.json";
import bankData from "../../data/banking.json";

import SubmitButton from "../../components/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../components/FirebaseConfig";
import { useChange } from "../../context/ChangeContext";

export default function AddAccountScreen({ navigation }) {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [selection, setSelection] = useState("Tiền mặt"); // [1,2,3]
  const [bank, setBank] = useState("BIDV");
  const textInputRef = useRef(null);
  const [itemId, setItemId] = useState(1);
  const [bankId, setBankId] = useState(1);
  const [success, setSuccess] = useState(true);
  // const [image, setImage] = useState("");
  let image ="";
  const { change, setChange } = useChange();

  const handleChangeText = (text) => {
    // Chuyển đổi chuỗi nhập vào sang số float
    const parsedNumber = parseFloat(text.replace(/,/g, ""));
    const validNumber = isNaN(parsedNumber) ? 0 : parsedNumber;
    setNumber(validNumber);
  };

  const handleTitleChange = (text) => {
    setName(text);
  };

  const handleSelection = (id) => {
    setItemId(id);
    setSelection(typeAccountData.find((item) => item.id === id).name);
  };

  const handleSetBank = (id) =>{
    setBankId(id);
    setBank(bankData.find((item) => item.id === id).image);
  }

  const handleSubmit = async() => {
    if (name === "") {
      Alert.alert("Vui lòng nhập tên tài khoản");
      return;
    }
    if (selection === "") {
      Alert.alert("Vui lòng chọn loại tài khoản");
      return;
    }
    if (selection === "Tài khoản ngân hàng" && bank === "") {
      Alert.alert("Vui lòng chọn ngân hàng");
      return;
    }

    setSuccess(false);  

    if(selection === "Tài khoản ngân hàng"){
      // setImage(bankData.find((item) => item.id === bankId).image);
      image = bankData.find((item) => item.id === bankId).image;
    }else{
      // setImage(typeAccountData.find((item) => item.id === itemId).image);
      image = typeAccountData.find((item) => item.id === itemId).image;
    }
    // Thực hiện lưu dữ liệu vào database
    const userDocId = await AsyncStorage.getItem("userDocId");
    const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`)
    const userData = await getDoc(userDocRef);
    const newTotal = userData.data().total + number;
    await updateDoc(userDocRef, {total: newTotal});
    const accountRef = doc(collection(FIRESTORE_DB, 'users', userDocId, 'account'));
    const account = {
      accountId: accountRef.id,
      accountName: name,
      accountType: selection,
      accountImage: image,
      balanceBegin: number,
      balance: number,
      income: 0,
      expense: 0,
      createdAt: new Date(),
    };

    await setDoc(accountRef, account);
    // setImage("");
    image = "";
    setName("");
    setNumber(0);
    setSelection("Tiền mặt");
    setBank(1);
    setItemId(1);

    setSuccess(true);
    Alert.alert('Ghi chú thành công');
    setChange(!change);
  }

  return (
    <>
    {success ? (
      <>
       <View
        style={{ marginTop: 100, paddingVertical: 10, paddingHorizontal: 20 }}
      >
        <Text style={{ fontSize: 16, textAlign: "right" }}>Số dư ban đầu</Text>
        <TextInput
          ref={textInputRef}
          keyboardType="numeric"
          onChangeText={handleChangeText}
          value={number.toLocaleString("en-US")}
          placeholder="0"
          placeholderTextColor={COLORS.primary}
          style={{
            fontSize: 40,
            fontWeight: "800",
            color: COLORS.primary,
            paddingVertical: 5,
            textAlign: "right",
          }}
        />
        <View
          style={{ height: 1, width: "100%", backgroundColor: COLORS.grey }}
        ></View>
      </View>
      <SizedBox />
      <TextInputv2 onTitleChange={handleTitleChange} />
      <View
        style={{
          height: 1,
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.grey,
        }}
      ></View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SelectTypeAcc", {
            selecBegin: selection,
            onselectionchange: handleSelection,
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
      >
        <Image
          source={
            logo[typeAccountData.find((item) => item.id === itemId).image]
          }
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 20,
            color: COLORS.black,
            fontWeight: "600",
          }}
        >
          {typeAccountData.find((item) => item.id === itemId).name}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.grey,
        }}
      ></View>
      {selection === "Tài khoản ngân hàng" ? (
        <TouchableOpacity
        onPress={() =>
          navigation.navigate("SelectBank", {
            selecBankBegin: bank,
            onselectionbankchange: handleSetBank,
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
      >
        <Image
          source={
            logo[bankData.find((item) => item.id === bankId).image]
          }
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 20,
            color: COLORS.black,
            fontWeight: "600",
          }}
        >
          {bankData.find((item) => item.id === bankId).bank}
        </Text>
      </TouchableOpacity>
      ) : null}

      <SubmitButton handleSubmit={handleSubmit} />
      </>
    ) : (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )}
     
    </>
  );
}
