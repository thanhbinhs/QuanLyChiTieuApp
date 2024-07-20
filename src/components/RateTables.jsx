import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import rateData from "../data/ratemoney.json"
import {countrys} from "../constants";

export default function RateTables() {
    const lengthData = rateData.length;

    const RenderRateItem = ({item, index}) => {
        return (
          <View style={index === lengthData - 1 ? styles.rowEnd : styles.row}>
            <View style={{width:50, justifyContent:'center', alignItems:'center', borderRightColor:'#ccc', borderRightWidth:1}}>
              <Text style={{fontWeight:'bold', fontSize:SIZES.font}}>{item.unit}</Text>
              <Text>{item.code}</Text>
            </View>
            <View style={{paddingHorizontal:20,flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontSize:SIZES.body3}}>1 {item.code} ~ {item.rate.toLocaleString('en-US')} ₫ </Text>
              <Image source={countrys[item.flag]} style={styles.image}></Image>
            </View> 
          </View>
        )
      }

  return (
    <>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Tra cứu tỉ giá</Text>

      </View>

      <View style={styles.table}>
            {rateData.map((item,index) => (
              <React.Fragment key={index}>
              <Pressable>
                <RenderRateItem item={item} index={index}/>
              </Pressable>
              </React.Fragment>
            ))}  
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  table:{
     borderColor:"#ccc",borderWidth:1, borderRadius:8, margin:15
  },
  row:{
    flexDirection:'row', borderBottomColor:'#ccc',height:50, borderBottomWidth:1
  },
  rowEnd:{
    flexDirection:'row', height:50,
  },
  image:{
    width:30,
    height:30,
  }
});
