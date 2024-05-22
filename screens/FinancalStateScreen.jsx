import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FinancalStateScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.fontTitle}>Financial State Screen</Text>
        </View>
    );
    }
    const styles = StyleSheet.create({
        container:{
            flex:1,
            flexGrow:1,
            backgroundColor: '#00aff0',
        },
        fontTitle:{
            fontSize:20,
            color:'#fff',
            fontWeight:'bold',
        },
    })

export default FinancalStateScreen;