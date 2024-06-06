// LoadingScreen.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = () => {
  const navigation = useNavigation();
  console.log("LoadingScreen");

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Kiểm tra trạng thái đăng nhập của người dùng (ví dụ: kiểm tra token trong AsyncStorage)
      const userToken = await AsyncStorage.getItem('userDocId');

      if (userToken) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('SignIn');
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
