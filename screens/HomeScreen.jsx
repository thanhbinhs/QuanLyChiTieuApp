import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { COLORS, SIZES } from "../constants";
import useStyles from "../constants/styles";
import { StatusBar } from "expo-status-bar";
import { SizedBox, Footer } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";

let money = 1000000;
let income = 1000000;
let expense = 500000;
let name = "John Doe";

const rate = [
  {"id":1, "code":"USD", "unit":"$", "flag": require('../assets/Country/united-states.png'), "rate": 23000},
  {"id":2, "code":"EUR", "unit":"€", "flag": require('../assets/Country/united-kingdom.png'), "rate": 27000},
  {"id":3, "code":"VGO", "unit":"chỉ", "flag": require('../assets/Country/vietnam.png'), "rate": 9050000},
]

const HomeScreen = ({ navigation }) => {
  const [showMoney, setShowMoney] = useState(true);

  const RenderRateItem = ({item}) => {
    return (
      <View style={{flexDirection:'row', borderBottomColor:'#ccc',height:50, borderBottomWidth:1}}>
        <View style={{width:50, justifyContent:'center', alignItems:'center', borderRightColor:'#ccc', borderRightWidth:1}}>
          <Text style={{fontWeight:'bold', fontSize:SIZES.font}}>{item.unit}</Text>
          <Text>{item.code}</Text>
        </View>
        <View style={{paddingHorizontal:20,flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Text style={{fontSize:SIZES.body3}}>1 {item.code} ~ {item.rate.toLocaleString('en-US')} ₫ </Text>
          <Image source={item.flag} style={styleBase.imageMini}></Image>
        </View>
      </View>
    )
  }

  const NavigatorLink = ({text, title, navigation})=>{
    return(
      <Pressable onPress={() => navigation.navigate(title)}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 18 }}>
            {text}
          </Text>
          <Icon name="chevron-right" color={COLORS.primary} size={22} />
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styleBase.fontTitle}>Hi {name}</Text>
        <View style={styles.totalBox}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
                onPress={() => navigation.navigate("Financial")}
              >
                <Text
                  style={{
                    fontSize: SIZES.font,
                    color: "#999",
                    // marginRight: 4,
                  }}
                >
                  Total Balance
                </Text>
                <Icon name="chevron-right" color="#999" size={20} />
              </Pressable>
              <Text
                style={{
                  fontSize: SIZES.h2,
                  color: COLORS.green,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                +{showMoney ? money.toLocaleString("en-US") : "***000"} ₫
              </Text>
            </View>
            <Pressable onPress={() => setShowMoney(!showMoney)}>
              {showMoney && <Icon name="visibility" color="#999" size={24} />}
              {!showMoney && (
                <Icon name="visibility-off" color="#999" size={24} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <SizedBox />
      <View style={styleBase.paddingBox}>
        <Text style={{ fontSize: 18, fontWeight: "500", color: COLORS.black }}>
          Expense vs Income
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#999",
              marginTop: 4,
              marginRight: 4,
            }}
          >
            This month
          </Text>

          <Icon name="keyboard-arrow-down" color="#999" size={20} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 25, paddingLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View
              style={{
                width: 45,
                height: 120,
                backgroundColor: COLORS.green,
                marginRight: 10,
              }}
            ></View>
            <View
              style={{ width: 45, height: 40, backgroundColor: COLORS.red }}
            ></View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: 25,
              alignItems: "flex-end",
            }}
          >
            <IndexBox
              is_cirle={true}
              title="Income"
              value={income.toLocaleString("en-US")}
              color={COLORS.green}
            />
            <IndexBox
              is_cirle={true}
              title="Expense"
              value={expense.toLocaleString("en-US")}
              color={COLORS.red}
            />
            <View style={styleBase.borderBottom}></View>
            <IndexBox
              value={(income - expense).toLocaleString("en-US")}
              color={COLORS.black}
            />
          </View>
        </View>
        <NavigatorLink text="Transaction history" title="Transaction"  navigation={navigation} />
      </View>
      <SizedBox />
      <View style={styleBase.paddingBox}>
        <View style={styleBase.flexRowBetween}>
          <Text
            style={{ fontSize: 18, fontWeight: "500", color: COLORS.black }}
          >
            Expense vs Income
          </Text>
          <Pressable onPress={()=> navigation.navigate("ExchangeRate")}>
            <Icon name="settings" color="#999" size={24} />
          </Pressable>
        </View>

        <View style={{width:'100%', borderColor:"#ccc",borderWidth:1, borderRadius:8, marginTop:10}}>
            {rate.map((item) => (
              <Pressable>
                <RenderRateItem item={item}/>
              </Pressable>
            ))}  
        </View>
        <NavigatorLink text="Search" title="ExchangeRate" navigation={navigation} />
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    height: 200,
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  totalBox: {
    height: 80,
    width: "100%",
    marginTop: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

const styleBase = useStyles();

const IndexBox = ({ is_cirle, title, value, color }) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {is_cirle && (
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: color,
            borderRadius: "50%",
            marginRight: 10,
          }}
        ></View>
      )}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, color: COLORS.black }}>{title}</Text>
        <Text style={{ fontSize: 16, color: color, fontWeight: "bold" }}>
          {value} ₫
        </Text>
      </View>
    </View>
  );
};



export default HomeScreen;
