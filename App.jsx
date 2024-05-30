// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DataEntryScreen from './DataEntryScreen';
import ChartScreen from './ChartScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DataEntry">
        <Stack.Screen name="DataEntry" component={DataEntryScreen} options={{ title: 'Nhập Dữ Liệu' }} />
        <Stack.Screen name="Chart" component={ChartScreen} options={{ title: 'Biểu Đồ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
