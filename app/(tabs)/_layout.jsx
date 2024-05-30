import { View, Text, Animated } from "react-native";
import React, {useRef} from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function Layout() {

  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Zoom out
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Zoom in back to normal size
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          }
          if (route.name === "account") {
            iconName = focused ? "wallet" : "wallet-outline";
          }

          if (route.name === "report") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }
          if (route.name === "setting") {
            iconName = focused ? "settings" : "settings-outline";
          }

          if (route.name === "add")
            return (
              <View style={{ position: "absolute", top: -25 }}>
                <Ionicons
                  name="add-circle"
                  size={64}
                  color={color}
                  focused={true}
                />
              </View>
            );

          return <Ionicons name={iconName} size={32} color={color} onPressIn={onPressIn} onPressOut={onPressOut} />;
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          marginTop: 10,
          position: "relative",
        },
        tabBarShowLabel: false,
        tabBarVisibilityAnimationConfig: {
          duration: 2000,
          easing: "ease-in-out",
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="report" />
      <Tabs.Screen name="setting" />
    </Tabs>
  );
}
