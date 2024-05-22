import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SizedBox, Footer } from "../components";

const AccountScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
        <Text>Account Screen</Text>
        <Footer navigation={navigation}/>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          position: "relative",
        },});

export default AccountScreen;