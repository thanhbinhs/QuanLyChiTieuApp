import { View, Text, TouchableOpacity, Button, Image } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import typeAccountData from "../../data/type_account.json";
import { logo } from "../../constants";

export default function SelectTypeAccScreen({ navigation }) {
  const route = useRoute();

  const { selecBegin, onselectionchange } = route.params;

  const [selectedItem, setSelectedItem] = useState(selecBegin);
  const handleSelectionChange = (selection) => {
    setSelectedItem(selection);
    onselectionchange(selection);
    navigation.navigate("AddAccount");
  };

  return (
    <View style={{ marginTop: 100 }}>
      {typeAccountData.map((item, index) => {
        return (
          <>
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectionChange(item.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 15,
                paddingHorizontal: 25,
              }}
            >
              <Image
                source={logo[item.image]}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 20,
                  color: COLORS.black,
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: "100%",
                alignSelf: "center",
                backgroundColor: COLORS.grey,
              }}
            ></View>
            
          </>
        );
      })}
    </View>
  );
}
