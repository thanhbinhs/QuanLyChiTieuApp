import { View, Text, Button, SafeAreaView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../components/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';

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
    <View >
      <View style={styles.itemCenter}>
        <Image source={{uri: "https://xsgames.co/randomusers/avatar.php?g=male"}} style={styles.avatar}/>
      </View>
      <View style={styles.flexRow}>
        <Ionicons name="search" size={28} color="#ccc" />
        <Text style={{fontSize:18, color:'#ccc'}}>Search</Text>
      </View>

      <View style={[styles.flexRow,{flexDirection:'column', alignItems:'flex-start', padding:0}]}>
        <View style={styles.row}>
        <Ionicons name="person" size={28} color="#ccc" />
        <Text style={{fontSize:18, color:COLORS.black, paddingLeft:10}}>Tài khoản</Text>
        </View>
        <View style={styles.row}>
        <Ionicons name="lock-closed-outline" size={28} color="#ccc" />
        <Text style={{fontSize:18, color:COLORS.black, paddingLeft:10}}>Bảo mật & Quyền riêng tư</Text>
        </View>
        <View style={styles.row}>
        <Ionicons name="notifications" size={28} color="#ccc" />
        <Text style={{fontSize:18, color:COLORS.black, paddingLeft:10}}>Thông báo</Text>
        </View>
        <View style={styles.row}>
        <Feather name="help-circle" size={28} color="#ccc" />
        <Text style={{fontSize:18, color:COLORS.black, paddingLeft:10}}>Hỗ trợ</Text>
        </View>
        <View style={[styles.row,{borderBottomWidth:0}]}>
        <MaterialCommunityIcons name="email-newsletter" size={28} color="#ccc" />
        <Text style={{fontSize:18, color:COLORS.black, paddingLeft:10}}>Góp ý nhà phát triển</Text>
        </View>
      </View>

      <View style={styles.flexRow}>
      <Entypo name="log-out" size={24} color={COLORS.primary}  onPress={signOut}/>
        <Text style={{fontSize:18, color:COLORS.primary}} onPress={signOut  }>Đăng xuất</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemCenter:{
    paddingTop:50,
    alignItems:'center',
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    backgroundColor:'#fff',
    paddingBottom:20,
  },
  avatar:{
    width:160, height:160, borderRadius:800,

  }, 
  flexRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    borderWidth:1,
    borderColor:'#ccc',
    marginTop:20,
    backgroundColor:'#fff',
    marginHorizontal:15,
    borderRadius:20,
    paddingHorizontal:20,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingVertical:15,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    width:'100%',
  }
})