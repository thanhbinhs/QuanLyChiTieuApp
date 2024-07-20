import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useContext } from "react";
import { Switch } from "react-native";
import SecurityContext from "../../context/SecurityContext";
import { Ionicons } from "@expo/vector-icons";

export default function SecurityScreen() {
  const { isAuthenEnabled, toggleAuthen } = useContext(SecurityContext);

  console.log("toggleAuthen", toggleAuthen);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BẢO MẬT</Text>
      <View style={styles.buttonContainer}>
        <Ionicons name="lock-closed" size={28} color="grey" />
        <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
          Mật khẩu ứng dụng
        </Text>
        <Switch
          onValueChange={toggleAuthen}
          value={isAuthenEnabled}
          style={{ marginLeft: "auto" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
});
