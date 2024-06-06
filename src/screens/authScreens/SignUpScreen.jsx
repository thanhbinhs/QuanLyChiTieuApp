import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { connectAuthEmulator, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH,FIRESTORE_DB } from '../../components/FirebaseConfig';
import { addDoc, collection, connectFirestoreEmulator, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isshowPass, setIsShowPass] = useState(false);

    const handleAuthentication = async () => {
        try{
            if(user){
                console.log('User is signed in');
                navigation.navigate('Main');
            }else{

                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
                console.log('Signup successful');
                const userId = FIREBASE_AUTH.currentUser.uid;

                const userDocRef = await setDoc(doc(FIRESTORE_DB, 'users', userId), {
                    id: userId,
                    username: username,
                    email: email,
                    password: password,
                    total: 0,
                    createdAt: new Date(),
                });
                console.log('User added to database');
                await AsyncStorage.setItem('userDocId', userId);
                const userDocId = await AsyncStorage.getItem('userDocId');
                console.log('User document ID stored in AsyncStorage', userDocId);
                const accountDocRef = doc(collection(FIRESTORE_DB, 'users', userId, 'account'));
                await setDoc(accountDocRef, {
                    accountId: accountDocRef.id,
                    accountName: "Ví tiền mặt",
                    accountType: "Tiền mặt",
                    accountImage: "money",
                    balanceBegin: 0,
                    balance: 0,
                    income: 0,
                    expense: 0,
                    createdAt: new Date(),
                });
                console.log('Account added to user subcollection');
                navigation.navigate('Main');
            }
        }catch(error){
            console.log('Authentication error: ', error.message);
        }
    }

  
    return (
      <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
      
        <TextInput
          placeholder="Tên người dùng"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

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
          onPress={handleAuthentication}
        >
          <Text style={{color:COLORS.white, fontSize:16}}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", paddingLeft:36,  alignItems:'center' }}>
          <Text>Đã có tài khoản</Text>
          <Button
            title="ĐĂNG NHẬP"
            style={{ color: COLORS.primary }}
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor:COLORS.black }]}
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color="white"
            style={{
              marginRight:10,
              borderRadius: 20,
              alignSelf: "center",
            }}
          />
          <Text style={{ color:COLORS.white }}>
            Đăng ký bằng APPLE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor:COLORS.white}]}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color="black"
            style={{
              marginRight:10,
              borderRadius: 20,
              alignSelf: "center",
            }}
          />
          <Text style={{ textAlign: "center"}}>
            Đăng ký bằng GOOGLE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginBottom:24,
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
  
  export default SignupScreen;