import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useChange } from "../context/ChangeContext";
import { useFetchData } from "../hooks/useFetchData";
import ViewChart from "../components/ViewChart";
import { COLORS } from "../constants";

const screenWidth = Dimensions.get("window").width;
const ReportScreen = () => {
  const { change, setChange } = useChange();
  console.log("ReportScreen");

  const { userData, noteData, accountData, loading, error } =
    useFetchData(change);

  const [type, setType] = useState("Thu tiền")

  return (
    <View
      style={{ paddingTop: 100, alignItems: "center", paddingHorizontal: 15 }}
    >
      <View style={styles.typeBox}>
        <TouchableOpacity style={styles.itemBox} onPress={()=> setType("Chi tiền")}>
          <Text style={styles.itemText}>Chi tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBox} onPress={()=> setType("Thu tiền")}>
          <Text style={styles.itemText}>Thu tiền</Text>
        </TouchableOpacity>
      </View>
      <ViewChart noteData={noteData} type={type} />
    </View>
  );
};

const styles = StyleSheet.create({
  typeBox: {
    height: 60,
    width: screenWidth,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemBox:{

  },
  itemText:{
    fontSize: 20,
  }
});

export default ReportScreen;
