import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = () => {
    if (feedback.trim().length === 0) {
      Alert.alert('Feedback is empty', 'Please enter your feedback before submitting.');
      return;
    }

    // Thêm logic gửi phản hồi ở đây

    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gửi phản hồi</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Viết phản hồi của bạn ở đây..."
        placeholderTextColor="#888" 
        value={feedback}
        onChangeText={setFeedback}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
        <Text style={styles.buttonText}>Gửi đi</Text>
      </TouchableOpacity>
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
      input: {
        width: '100%',
        height: 150,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 8,
        textAlignVertical: 'top',
      },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3', // Màu xanh dương
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});