import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import React, { useState } from 'react';

export default function NotifySettingScreen() {
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(false);
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(false);

  const toggleEmailNotifications = () => {
    setIsEmailNotificationsEnabled(previousState => !previousState);
    Alert.alert('Email Notifications', `Email notifications ${!isEmailNotificationsEnabled ? 'enabled' : 'disabled'}.`);
  };

  const togglePushNotifications = () => {
    setIsPushNotificationsEnabled(previousState => !previousState);
    Alert.alert('Push Notifications', `Push notifications ${!isPushNotificationsEnabled ? 'enabled' : 'disabled'}.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Cho phép thông báo từ Email</Text>
        <Switch
          onValueChange={toggleEmailNotifications}
          value={isEmailNotificationsEnabled}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Cho phép thông báo từ ứng dụng</Text>
        <Switch
          onValueChange={togglePushNotifications}
          value={isPushNotificationsEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:120,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
});
