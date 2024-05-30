// DataEntryScreen.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const DataEntryScreen = ({ navigation }) => {
  const [income, setIncome] = useState('');
  const [food, setFood] = useState('');
  const [housing, setHousing] = useState('');
  const [shopping, setShopping] = useState('');
  const [transport, setTransport] = useState('');
  const [pets, setPets] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [others, setOthers] = useState('');

  const handleSubmit = () => {
    const data = {
      income: parseFloat(income),
      food: parseFloat(food),
      housing: parseFloat(housing),
      shopping: parseFloat(shopping),
      transport: parseFloat(transport),
      pets: parseFloat(pets),
      entertainment: parseFloat(entertainment),
      others: parseFloat(others),
    };
    navigation.navigate('Chart', { data });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Tổng thu nhập:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={income}
          onChangeText={setIncome}
        />
        <Text style={styles.label}>Ăn uống:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={food}
          onChangeText={setFood}
        />
        <Text style={styles.label}>Nhà cửa:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={housing}
          onChangeText={setHousing}
        />
        <Text style={styles.label}>Mua sắm:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={shopping}
          onChangeText={setShopping}
        />
        <Text style={styles.label}>Vận chuyển:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={transport}
          onChangeText={setTransport}
        />
        <Text style={styles.label}>Thú nuôi:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pets}
          onChangeText={setPets}
        />
        <Text style={styles.label}>Giải trí:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={entertainment}
          onChangeText={setEntertainment}
        />
        <Text style={styles.label}>Khác:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={others}
          onChangeText={setOthers}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
  },
});

export default DataEntryScreen;
