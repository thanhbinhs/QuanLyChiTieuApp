import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = () => {
    if (feedback.trim().length === 0) {
      Alert.alert('Feedback is empty', 'Please enter your feedback before submitting.');
      return;
    }
    // Here you can add your logic to handle the feedback submission
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your feedback here"
        value={feedback}
        onChangeText={setFeedback}
      />
      <Button
        title="Send Feedback"
        onPress={handleSendFeedback}
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
});
