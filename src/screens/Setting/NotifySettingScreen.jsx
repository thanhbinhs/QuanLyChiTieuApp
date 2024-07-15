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
      <Text style={styles.header}>Notification Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Email Notifications</Text>
        <Switch
          onValueChange={toggleEmailNotifications}
          value={isEmailNotificationsEnabled}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Push Notifications</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
});
