import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {Ionicons} from "@expo/vector-icons"
import { COLORS } from '../../constants/theme'

export default function Layout() {
  return (
    <Tabs
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } 
          if (route.name === 'account') {
            iconName = focused ? 'wallet' : 'wallet-outline';
            }

        // if(route.name === 'add') iconName = 'add-circle';

          if(route.name === 'report'){
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }
          if (route.name === 'setting') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          if(route.name === 'add') return ( <View style={{position:'absolute', top:-25}}>
            <Ionicons name="add-circle" size={60} color={color} focused={true}/>
        </View>)


          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
        tabBarStyle:{
            marginTop:10,
            position:'relative',
        }
      })
    }
        
    >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="account"  />
        <Tabs.Screen name="add" />
        <Tabs.Screen name="report" />
        <Tabs.Screen name="setting"  />
        
    </Tabs>
  )
}

