import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HorizontalMenuAccount = ({ items, onItemChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    onItemChange(item.accountId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.accountId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.menuItem,
              item.accountId === selectedItem?.accountId ? styles.selectedMenuItem : null,
            ]}
            onPress={() => handleSelectItem(item)}
          >
            <Text
              style={[
                styles.menuItemText,
                item.accountId === selectedItem?.accountId ? styles.selectedMenuItemText : null,
              ]}
            >
              {item.accountName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedMenuItem: {
    backgroundColor: '#007bff',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
  selectedMenuItemText: {
    color: '#fff',
  },
});

export default HorizontalMenuAccount;
