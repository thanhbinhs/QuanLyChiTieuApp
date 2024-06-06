import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {  sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../components/FirebaseConfig";
import { COLORS } from "../../constants";

export default function ForgotPasswordScreen({navigation}) {

  const [email, setEmail] = useState('');
  
  const handleSubmitEmail = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      console.log("Email sent");
      navigation.navigate("SignIn");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
                <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            alignItems: "center",
            padding: 12,
            width: 320,
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 24,
          }}
          onPress={handleSubmitEmail}
        >
          <Text style={{color:COLORS.white, fontSize:16}}>GỬI</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", paddingLeft:36,  alignItems:'center' }}>
            <Text>Chưa có tài khoản?</Text>
            <Button
              title="ĐĂNG KÝ"
              style={{ color: COLORS.primary }}
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    height: 45,
    width: 320,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  link: {
    color: "blue",
    marginTop: 16,
    textAlign: "center",
  },
  button:{
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row',
    borderRadius: 20,
    paddingVertical:10,
    width:320,
    alignSelf:'center',
    marginTop:16
  }
});