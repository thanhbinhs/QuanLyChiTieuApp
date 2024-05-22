import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, TransactionHisScreen, FinancalStateScreen, ExchangeRateScreen, AccountScreen } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
                <Stack.Screen name='Transaction' component={TransactionHisScreen} options={{headerShown:false}} />
                <Stack.Screen name='Financial' component={FinancalStateScreen} options={{headerShown:false}} />
                <Stack.Screen name='ExchangeRate' component={ExchangeRateScreen} options={{headerShown:false}} />
                <Stack.Screen name='AccountScreen' component={AccountScreen} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
