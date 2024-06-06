import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../components/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen() {
  const navigation = useNavigation();

  const signOut = async() =>{
    // Xử lý đăng xuất
    try{
      await FIREBASE_AUTH.signOut();
      await AsyncStorage.removeItem('userDocId');
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <Text>SettingScreen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  )
}