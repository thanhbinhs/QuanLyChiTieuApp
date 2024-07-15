import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';

export default function SecurityScreen() {

  const handleTwoFactorAuth = () => {
    Alert.alert('Two-Factor Authentication', 'Two-Factor Authentication setup will be implemented here.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Security Settings</Text>
      <Text style={styles.description}>
        Manage your security settings here.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Two-Factor Authentication"
          onPress={handleTwoFactorAuth}
          
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 16,
  },
});
