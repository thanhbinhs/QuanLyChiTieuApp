import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function BalanceInput() {

  return (
    <View style={styles.container}>
        <Text style={{fontSize:16, fontWeight:'600'}}>Số tiền</Text>
      <TextInput 
        autoFocus={true}
        keyboardType='numeric'
        value='0'
        placeholderTextColor={'#000'}
      />
    </View>
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