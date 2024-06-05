import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useRef } from 'react'
import { COLORS } from '../constants'

export default function BalanceInput({type, onNumberChange}) {


  const textInputRef = useRef(null);
  const color = type === 'Chi tiền' ? COLORS.red: COLORS.green;
  let [number, setNumber] = useState(0);
  
  const handleChangeText = (text) => {
    // Chuyển đổi chuỗi nhập vào sang số float
    const parsedNumber = parseFloat(text.replace(/,/g, ''));
    const validNumber = isNaN(parsedNumber) ? 0 : parsedNumber;
    setNumber(validNumber);
    onNumberChange(validNumber);
  };

  return (
    <TouchableWithoutFeedback onPress={()=>textInputRef.current.focus()}>
    <View style={styles.container}>
        <Text style={{fontSize:18}}>Số tiền</Text>
      <TextInput 
      ref={textInputRef}
        autoFocus={true}
        keyboardType='numeric'
        onChangeText={handleChangeText}
        value={number.toLocaleString('en-US')}
        placeholder='0'
        placeholderTextColor={color}
        style={{fontSize:40, fontWeight:'800', color:color, paddingVertical:5}}
      />
      <View style={{height:1, width:'100%', backgroundColor:COLORS.grey}}></View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical:10,
        alignItems: 'flex-end',
    },
    })