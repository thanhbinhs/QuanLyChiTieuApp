import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';

export default function SupportScreen() {
  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can contact us at support@example.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support Screen</Text>
      <Text style={styles.description}>
        If you need help, please contact our support team.
      </Text>
      <Button
        title="Contact Support"
        onPress={handleContactSupport}
      />
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
    marginBottom: 16,
  },
});
