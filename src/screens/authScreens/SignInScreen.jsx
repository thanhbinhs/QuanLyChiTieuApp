import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import {
  signInWithEmailAndPassword,
  OAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../components/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";



const androidClientId = '354317548303-qcca2p8gd42t45f9ge62hcjjsduhjpf1.apps.googleusercontent.com';
const iosClientId = '354317548303-9hghhl2b4o3gj26agtj4flcf8kkvvsqt.apps.googleusercontent.com';



const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isshowPass, setIsShowPass] = useState(false);
  const [data, isData] = useState(true);

  const handleSignIn = async () => {
    isData(false);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log("Sign in successful");
      const userId = FIREBASE_AUTH.currentUser.uid;
      await AsyncStorage.setItem("userDocId", userId);
      const userDocId = await AsyncStorage.getItem("userDocId");
      isData(true);
      console.log("User document ID stored in AsyncStorage", userDocId);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      isData(true);
      console.log("Authentication error: ", error.message, error.code);
      if (error.code === "auth/invalid-credential") {
        Alert.alert(
          "Thông báo",
          "Email hoặc Mật khẩu không đúng. Vui lòng thử lại."
        );
        return;
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert(
          "Thông báo",
          "Bạn đã đăng nhập quá nhiều lần. Vui lòng thử lại sau vài phút!"
        );
        return;
      } else if (error.code === "auth/wrong-password") {
        Alert.alert(
          "Thông báo",
          "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!"
        );
      }
    }
  };

  const loginWithApple = async () => {
    try {
      // Yêu cầu Apple sign-in
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken, email, fullName } = credential;

      // Xác thực với Firebase
      const provider = new OAuthProvider("apple.com");
      const appleCredential = provider.credential({
        idToken: identityToken,
        rawNonce: null, // Nếu cần thiết có thể thêm rawNonce
      });

      await signInWithCredential(FIREBASE_AUTH, appleCredential);

      const user = FIREBASE_AUTH.currentUser;
      const userDoc = FIRESTORE_DB.collection("users").doc(user.uid);
      const userDocSnap = await userDoc.get();

      // Nếu user chưa tồn tại, tạo mới user
      if (!userDocSnap.exists) {
        await userDoc.set({
          email: email,
          fullName: fullName,
          role: "user",
          createdAt: new Date(),
        });
      }

      // Điều hướng đến màn hình chính
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      console.log("Authentication error: ", error.message);
    }
  };


  const loginWithGoogle = () => {
    // Assuming iosClientId and androidClientId are defined elsewhere in your scope
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      iosClientId: iosClientId,
      androidClientId: androidClientId,
    });
  
    useEffect(() => {
      if (response?.type === 'success') {
        const { authentication } = response;
        const token = authentication?.accessToken;
        console.log("accessToken", token);
  
        // Assuming `firebase.auth()` is already configured
        const credential = firebase.auth.GoogleAuthProvider.credential(authentication.idToken);
        firebase.auth().signInWithCredential(credential).then((result) => {
          // Handle the signed-in user info.
          const user = result.user;
          const userDoc = firebase.firestore().doc(`users/${user.uid}`);
  
          userDoc.get().then((userDocSnap) => {
            if (!userDocSnap.exists) {
              userDoc.set({
                email: user.email,
                fullName: user.displayName,
                role: "user",
                createdAt: new Date(),
              });
            }
          });
  
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
  
        }).catch((error) => {
          console.error("Authentication error: ", error.message);
        });
      }
    }, [response]);
  
    return promptAsync;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {data ? (
          <View>
            <Text style={styles.title}>Chào mừng tới App</Text>
            <Text style={{ marginBottom: 24, textAlign: "center" }}>
              Đăng nhập
            </Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <View>
              <TextInput
                placeholder="Mật khẩu"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isshowPass ? false : true}
              />
              {isshowPass ? (
                <Ionicons
                  name="eye-off"
                  size={24}
                  color={COLORS.grey}
                  style={{ position: "absolute", right: 50, top: 12 }}
                  onPress={() => setIsShowPass(!isshowPass)}
                />
              ) : (
                <Ionicons
                  name="eye"
                  size={24}
                  color={COLORS.grey}
                  style={{ position: "absolute", right: 50, top: 12 }}
                  onPress={() => setIsShowPass(!isshowPass)}
                />
              )}
            </View>
            <Text
              style={{ textAlign: "right", paddingRight: 36 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Quên mật khẩu?
            </Text>
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
              onPress={handleSignIn}
            >
              <Text style={{ color: COLORS.white, fontSize: 16 }}>
                ĐĂNG NHẬP
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 36,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text>Chưa có tài khoản?</Text>
              {Platform.OS === "ios" ? (
                <Button
                  title="ĐĂNG KÝ"
                  style={{ color: COLORS.primary }}
                  onPress={() => navigation.navigate("SignUp")}
                />
              ) : (
                <Text
                  style={{ color: COLORS.primary, marginLeft: 4 }}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  ĐĂNG KÝ
                </Text>
              )}
            </View>
            {/* <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.black }]}
              onPress={loginWithApple}
            >
              <Ionicons
                name="logo-apple"
                size={24}
                color="white"
                style={{
                  marginRight: 10,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              />
              <Text style={{ color: COLORS.white }}>Đăng nhập bằng APPLE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.white }]}
              onPress={loginWithGoogle}
            >
              <Ionicons
                name="logo-google"
                size={24}
                color="black"
                style={{
                  marginRight: 10,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              />
              <Text style={{ textAlign: "center" }}>Đăng nhập bằng GOOGLE</Text>
            </TouchableOpacity> */}
          </View>
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  button: {
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 20,
    paddingVertical: 10,
    width: 320,
    alignSelf: "center",
    marginTop: 16,
  },
});

export default SignInScreen;
