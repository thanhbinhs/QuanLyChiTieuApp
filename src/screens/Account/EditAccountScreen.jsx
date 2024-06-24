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
import { useRoute } from "@react-navigation/native";
import TextInputv3 from "../../components/TextInputv3";
  
  export default function EditAccountScreen({ navigation }) {

    const route = useRoute();
    const {account} = route.params;

    const [number, setNumber] = useState(account.balanceBegin);
    const [name, setName] = useState(account.accountName);
    const [selection, setSelection] = useState(account.accountType); // [1,2,3]
    const [bank, setBank] = useState("BIDV");
    const textInputRef = useRef(null);
    const [itemId, setItemId] = useState(1);
    const [bankId, setBankId] = useState(1);
    const [success, setSuccess] = useState(true);

    let image =account.accountImage;
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
      console.log("selection account", selection);
      
      if(selection === "Tài khoản ngân hàng"){
        // setImage(bankData.find((item) => item.id === bankId).image);
        image = bankData.find((item) => item.id === bankId).image;
      }else{
        // setImage(typeAccountData.find((item) => item.id === itemId).image);
        image = typeAccountData.find((item) => item.id === itemId).image;
      }
      const accountNew = {
        accountId: account.accountId,
        accountName: name,
        accountType: selection,
        accountImage: image,
        balanceBegin: number,
        balance: account.balance,
        income: account.income,
        expense: account.expense,
        createdAt: new Date(),
      };


      // Thực hiện lưu dữ liệu vào database
      const userDocId = await AsyncStorage.getItem("userDocId");
      const userDocRef = doc(FIRESTORE_DB, `users/${userDocId}`)
      const userData = await getDoc(userDocRef);
      const newTotal = userData.data().total + number;
      await updateDoc(userDocRef, {total: newTotal});
      const accountRef = doc(
        FIRESTORE_DB,
        `users/${userDocId}/account/${account.accountId}`
      );

      await updateDoc(accountRef, accountNew);
  
      setSuccess(true);
      Alert.alert('Sửa Ghi chú thành công');
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
        <TextInputv3 onTitleChange={handleTitleChange} name={name}/>
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
  