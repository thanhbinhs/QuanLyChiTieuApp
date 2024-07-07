import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

export default function SubmitButton({handleSubmit}) {
  return (
             <TouchableOpacity style={{alignItems:'center', marginTop:10}} onPress={handleSubmit} >
                <View style={{width:'90%', height:50, backgroundColor:COLORS.primary, justifyContent:'center', alignItems:'center', borderRadius:10}}> 
                  <Text style={{fontSize:24, color:COLORS.white}}>Ghi</Text>
                </View>
              </TouchableOpacity> 
  )
}