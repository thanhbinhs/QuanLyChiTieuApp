import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import useStyles from "../constants/styles";
import { StatusBar } from "expo-status-bar";

let money = 1000000;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styleBase.fontTitle}>Hi Group Two</Text>
        <View style={styles.totalBox}>
          <View style={{flexDirection: "row", alignItems:'center',justifyContent:'space-between'}}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: SIZES.font,
                    color: "#999",
                  }}
                >
                  Total Balance
                </Text>
                <Image source={icons.arrowRight} />
              </View>
              <Text
                style={{
                  fontSize: SIZES.h2,
                  color: COLORS.green,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                +{money.toLocaleString('en-US')} ₫
              </Text>
            </View>
            <Image source={icons.show}/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
