import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants";
import {menuItem} from "../api";

const Footer = ({navigation}) => {

  const [menuItems, setMenuItems] = useState(menuItem);

  const handlePress = (clickedItem) => {
    const updatedItems = menuItems.map((item) => ({
      ...item,
      node: item === clickedItem ? true : false,
    }));
    setMenuItems(updatedItems);
  };




  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <Pressable key={index} onPress={()=> handlePress(item)}>
          {item.name === "add-circle" ? (
            <Icon
              name={item.name}
              size={50}
              color={item.node ? COLORS.primary : COLORS.grey}
            />
          ) : (
            <View style={styles.menuItem}>
              <Icon
                name={item.name}
                size={32}
                color={item.node ? COLORS.primary : COLORS.grey}
              />
              <Text style={item.node ? styles.menuItemTextActive : styles.menuItemText}>{item.label}</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    position: "absolute",
    bottom: 16,
    width: "100%",
  },
  menuItem: {
    padding: 10,
    alignItems: "center",
  },
  menuItemText: {
    color: COLORS.grey,
    fontSize: 12,
  },
  menuItemTextActive: {
    color: COLORS.primary,
    fontSize: 12,
  },
});

export default Footer;
