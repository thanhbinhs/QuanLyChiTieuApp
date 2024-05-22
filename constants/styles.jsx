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
        },
        paddingBox:{
            padding:SIZES.padding,
        },
        borderBottom:{
            width:'100%',
            height:1,
            backgroundColor:'#ccc',
        },

        flexRowBetween:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },

        imageMini:{
            width:30,
            height:30,
        }

    })
}

export default useStyles;