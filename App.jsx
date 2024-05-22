import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './constants';
import HomeScreen from './screens/HomeScreen';

export default function App() {
    return (
        <View style={{flex:1}}>
            <HomeScreen/>
        </View>
    );
}
