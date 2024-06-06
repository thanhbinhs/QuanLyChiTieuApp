import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { COLORS } from '../constants';

export default function TextInputv2({onTitleChange}) {

    const [title, setTitle] = useState('');

    const handleChangeText = (text) => {
        setTitle(text);
        onTitleChange(text);
    };

  return (
    <View style={{paddingHorizontal:15,paddingTop:30,paddingBottom:10, flexDirection:'row'}}>
      <Fontisto name="wallet" size={32} color={COLORS.primary} />
      <TextInput 
        keyboardType='default'
        style={{fontSize:24, fontWeight:'800', color:COLORS.black, paddingLeft:20}}
        placeholder='Tên tài khoản'
        placeholderTextColor={COLORS.grey}
        onChangeText={(text) => handleChangeText(text)}
        value={title}
      />
    </View>
  )
}