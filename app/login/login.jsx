import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Thực hiện logic đăng nhập và lấy user và accountId
    userId =  '1a2b3c4d-5678-9101-1121-314151617181'
    onLogin(userId);
  };

  return (
    <View>
      <Text>Đăng nhập</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
}
