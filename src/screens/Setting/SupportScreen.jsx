import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';

export default function SupportScreen() {
  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can contact us at support@example.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Thông tin liên hệ với bộ phận hỗ trợ của chúng tôi.
      </Text>
      <Text>Phone: 0376416543</Text>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});
