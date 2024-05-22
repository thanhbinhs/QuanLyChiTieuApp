import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputText}>
        <Text>Username</Text>
      </View>
      <View style={styles.inputText}>
        <Text>Password</Text>
      </View>
      <Button title="Submit" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 144,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: FONTS.h1,
    color: COLORS.text,
    marginTop:144,
  },
  inputText:{
    marginTop:40,
    paddingHorizontal: 15,
    height:40,
    width:300,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
  }
});
