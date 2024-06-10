import React, { Component, useState, useEffect, useRef } from "react";
import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./src/screens/authScreens/SignInScreen";
import SignUpScreen from "./src/screens/authScreens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddScreen from "./src/screens/AddScreen";
import AccountScreen from "./src/screens/AccountScreen";
import SettingScreen from "./src/screens/SettingScreen";
import ReportScreen from "./src/screens/ReportScreen";
import WelcomeScreen from "./src/screens/authScreens/WelcomeScreen";
import ForgotPasswordScreen from "./src/screens/authScreens/ForgotPasswordScreen";
import HistoryScreen from "./src/screens/Home/HistoryScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import AddAccountScreen from "./src/screens/Account/AddAccountScreen";
import SelectTypeAccScreen from "./src/screens/Account/SelectTypeAccScreen";
import SelectBankScreen from "./src/screens/Account/SelectBankScreen";
import SelectDateScreen from "./src/screens/Home/SelectDateScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { COLORS } from "./src/constants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useFetchData } from './src/hooks/useFetchData';
import { useChange } from "./src/context/ChangeContext";
import { registerRootComponent } from 'expo';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

registerRootComponent(gestureHandlerRootHOC(App));


import Providers from "./src/context/Providers";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AddStack = createStackNavigator();
const AccountStack = createStackNavigator();
const SettingStack = createStackNavigator();
const ReportStack = createStackNavigator();

function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitle: "Lịch sử ghi chép",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              ></View>
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 15 }} onPress={()=> navigation.navigate("Home")}>
              <Entypo name="chevron-left" size={28} color={COLORS.white} />
            </TouchableOpacity>
          ),
        
        }}
      />
      <HomeStack.Screen
        name="SelectDate"
        component={SelectDateScreen}
        options={{
          headerTitle: "Chọn thời gian",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              ></View>
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 15 }} onPress={()=> navigation.navigate("History")}>
              <Entypo name="chevron-left" size={28} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

function AddStackScreen() {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="Add"
        component={AddScreen}
        options={{ headerShown: false}}
      />
    </AddStack.Navigator>
  );
}

function AccountStackScreen({navigation}) {
  const headerHeight = useHeaderHeight();
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          // headerShown: false,
          headerTitle: "Tài khoản",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              ></View>
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <Ionicons name="search" size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 15 }}>
              <Ionicons name="filter" size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <AccountStack.Screen
        name="AddAccount"
        component={AddAccountScreen}
        options={{
          // headerShown: false,
          headerTitle: "Thêm tài khoản",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              ></View>
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Account")}
              style={{ paddingLeft: 15 }}
            >
              <Entypo name="chevron-left" size={28} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <AccountStack.Screen
        name="SelectTypeAcc"
        component={SelectTypeAccScreen}
        options={{
          // headerShown: false,
          headerTitle: "Chọn loại tài khoản",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              ></View>
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AddAccount")}
              style={{ paddingLeft: 15 }}
            >
              <Entypo name="chevron-left" size={28} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <AccountStack.Screen
        name="SelectBank"
        component={SelectBankScreen}
        options={{
          // headerShown: false,
          headerTitle: "Chọn ngân hàng",
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              ></View>
            </>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectTypeAcc")}
              style={{ paddingLeft: 15 }}
            >
              <Entypo name="chevron-left" size={28} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
    </AccountStack.Navigator>
  );
}

function SettingStackScreen() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}

function ReportStackScreen() {
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen
        name="Report"
        component={ReportScreen}
        options={{ headerShown: false }}
      />
    </ReportStack.Navigator>
  );
}

const MainTabScreen = () => {
  const {change, setChange} = useChange();
  const { userData, noteData, accountData, loading, error } = useFetchData(change);

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
    <>
      {noteData ? (
        <Tab.Navigator
          screenOptions={{
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: COLORS.primary,
            tabBarStyle: {
              paddingTop: 5,
              position: "relative",
            },
            tabBarShowLabel: false,
            tabBarVisibilityAnimationConfig: {
              duration: 2000,
              easing: "ease-in-out",
            },
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                iconName = focused ? "home" : "home-outline";
                return (
                  <Ionicons
                    name={iconName}
                    size={32}
                    color={color}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="AccountStack"
            component={AccountStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                iconName = focused ? "wallet" : "wallet-outline";
                return (
                  <Ionicons
                    name={iconName}
                    size={32}
                    color={color}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="AddStack"
            component={AddStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
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
              },
            }}
          />
          <Tab.Screen
            name="ReportStack"
            component={ReportStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                iconName = focused ? "bar-chart" : "bar-chart-outline";
                return (
                  <Ionicons
                    name={iconName}
                    size={32}
                    color={color}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="SettingStack"
            component={SettingStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                iconName = focused ? "settings" : "settings-outline";
                return (
                  <Ionicons
                    name={iconName}
                    size={32}
                    color={color}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
    </>
  );
};



export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const checkUserDocId = async () => {
      try {
        const storedUserDocId = await AsyncStorage.getItem("userDocId");
        setUserDocId(storedUserDocId);
      } catch (error) {
        console.error("Failed to load userDocId:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserDocId();
  }, []);


  if (isLoading) {
    return null; // hoặc một ActivityIndicator để hiển thị khi đang tải
  }

  return (
    <Providers>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen
          name="Main"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Providers>
  );

}
