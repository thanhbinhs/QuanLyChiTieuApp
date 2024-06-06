import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useFetchData } from '../hooks/useFetchData'
import { PieChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width;

export default function ReportScreen() {

  const { userData, noteData, accountData, loading, error } = useFetchData()

  const mergedNotes = Object.values(noteData.reduce((acc, note) => {
    if(note.noteType === 'Chi tiền'){
    if (!acc[note.noteName]) {
        acc[note.noteName] = { ...note };
    } else {
        acc[note.noteName].noteMoney += note.noteMoney;
    }
  }
    return acc;
}, {}));

let chartData = [];
let fillColors = ['#FF0000', '#0000FF', '#008000', '#FFA500', '#FFFF00', '#90EE90', '#800080'];

mergedNotes.forEach((note) => {
  chartData.push({
    key: note.noteName,
    amount: note.noteMoney,
    svg: { fill: fillColors[chartData.length] },
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  })
});

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 2,
  formatCenterText: (amount, percentage) => `${amount.toLocaleString('vi-VN')} đ\n${percentage.toFixed(2)}%`
};

const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);


  return (
    <View style={styles.container}>
  <PieChart
  data={chartData}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor="amount"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
  
/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
})