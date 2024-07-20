import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';

export default function SupportScreen() {
  const handleCallSupport = () => {
    Linking.openURL('tel:0376416543'); 
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@example.com'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.contactItem}>
        <Text style={styles.label}>Điện thoại:</Text>
        <Button title="Gọi ngay" onPress={handleCallSupport} />
      </View>

      <View style={styles.contactItem}>
        <Text style={styles.label}>Email:</Text>
        <Button title="Liên hệ hỗ trợ" onPress={handleContactSupport} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120, 
    padding: 24,
    backgroundColor: '#f0f0f5', // Màu nền nhẹ nhàng
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333', // Màu chữ đậm
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginRight: 12,
    color: '#555', // Màu chữ nhạt hơn
  },
});