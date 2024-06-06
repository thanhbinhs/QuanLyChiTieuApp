import { View, Text,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../constants';

export default function CategoryRadio({onSelectionChange, selecti}) {

    const [selectedItem, setSelectedItem] = useState(null);
    const handleSelectionChange = (selection) => {
        setSelectedItem(selection)
        onSelectionChange(selection);
    };

  return (
    <View>
        {selecti.map((item, index) => {
            return (
                <View key={index} style={{flexDirection:'row', alignItems:'center', paddingVertical:10}}>
                    <Text style={{fontSize:16, color:COLORS.black}}>{item.name}</Text>
                    <TouchableOpacity onPress={() => handleSelectionChange(item.name)}>
                        <View style={{height:20, width:20, borderRadius:10, borderWidth:1, borderColor:COLORS.primary, justifyContent:'center', alignItems:'center'}}>
                            {selectedItem === item.name && <View style={{height:10, width:10, borderRadius:5, backgroundColor:COLORS.primary}}></View>}
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })}
    </View>
  )
}