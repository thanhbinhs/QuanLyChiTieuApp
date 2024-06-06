import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function SelectDateScreen({navigation}) {
  const route = useRoute();
  const { onChangeTime } = route.params;
  const data = [
    {
        "type": "NGÀY",
        "name": "Hôm nay",
    },
    {
        "type": "TUẦN",
        "name": "Tuần này",
    },
    {
        "type": "THÁNG",
        "name": "Tháng này",
    },
    

];
  return (
    <View style={{ marginTop: 110 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height: 40,
              marginHorizontal: 10,
            }}
            onPress={() => {
              onChangeTime(item.name);
              navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 20 }}>{item.type}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.type}
        horizontal={true}
      />
    </View>
  );
}
