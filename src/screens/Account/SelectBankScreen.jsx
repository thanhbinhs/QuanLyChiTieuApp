import { View, Text, TouchableOpacity, Button, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import bankData from "../../data/banking.json";
import { logo } from "../../constants";

export default function SelectBankScreen({ navigation }) {
  const route = useRoute();

  const { selecBankBegin, onselectionbankchange } = route.params;

  const [selectedItem, setSelectedItem] = useState(selecBankBegin);
  const handleSelectionChange = (selection) => {
    setSelectedItem(selection);
    onselectionbankchange(selection);
    navigation.goBack();
  };

  return (
    <View style={{ marginTop: 100 }}>
        <FlatList
            data={bankData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
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
                    {item.bank}
                </Text>
                </TouchableOpacity>
            )}
        

        />

    </View>
  );
}
