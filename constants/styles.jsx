import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "./theme";

const useStyles = () =>{
    return StyleSheet.create({
        container:{
            flex:1,
            flexGrow:1,
            backgroundColor: '#00aff0',
        },
        fontTitle:{
            fontSize:SIZES.h3,
            color:COLORS.white,
            fontWeight:'bold',
        },
        styleIcon:{
            width:24,
            height:24,
            color:'#999',
        }
    })
}

export default useStyles;