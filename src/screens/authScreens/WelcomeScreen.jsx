import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

export default function WelcomeScreen({navigation}) {
  return (
    <View style={{alignItems:'center',flex:1, paddingTop:120,paddingHorizontal:20, backgroundColor:'#e3feff'}}>
      <Image source={require('../../assets/welcome.jpg')} style={{width:320, height:320, borderRadius:20}}/>
      <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold', marginTop:40}}>Chào mừng bạn đến với ứng dụng quản lý tài chính của chúng tôi!</Text>
      <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            alignItems: "center",
            padding: 12,
            width: 320,
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 80,
          }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={{color:COLORS.white, fontSize:16}}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            padding: 12,
            width: 320,
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{color:COLORS.primary, fontSize:16}}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
    </View>
  ) 
}