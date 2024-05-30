import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoteData from '../../data/note.json';
import UserData from '../../data/user.json';
import { Stack } from 'expo-router';
import { useHeaderHeight } from "@react-navigation/elements";
import {COLORS} from '../../constants/theme';
import SizedBox from '../../components/SizedBox';


export default function Report() {
  const screenWidth = Dimensions.get('window').width;
const headerHeight = useHeaderHeight();


  const mergedNotes = Object.values(NoteData.reduce((acc, note) => {
    if(note.userId === UserData[0].userId && note.noteType === 'Chi'){
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


  

  const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);

  const [selectedSegment, setSelectedSegment] = useState(null);

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index} onPress={() => setSelectedSegment(data)}>
          <SvgText
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            fill="white"
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={15}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {data.key}
          </SvgText>
        </G>
      );
    });
  };

  return (
    <>
    <Stack.Screen
      options={{
        headerTitle: "",
        headerTransparent: true,
        headerBackground: () => (
          <>
            <View style={[styles.header, { paddingTop: headerHeight - 46, paddingBottom: 5 }]}>
            </View>
            <SizedBox />
          </>
        ),
      }}
    />
    <View style={[styles.container, {paddingTop: headerHeight-10}]}>
      <View style={styles.chartContainer}>
        <Text style={styles.header}>CHI PHÍ THEO HẠNG MỤC</Text>
        <PieChart
          style={{ height: 220, width: screenWidth }}
          valueAccessor={({ item }) => item.amount}
          data={chartData}
          spacing={0}
          outerRadius={'95%'}
        >
          <Labels />
        </PieChart>
        {selectedSegment && (
          <View style={styles.chartDetails}>
            <Text style={styles.chartText}>{selectedSegment.key}</Text>
            <Text style={styles.chartText}>{selectedSegment.amount.toLocaleString('vi-VN')} đ</Text>
            <Text style={styles.chartText}>{((selectedSegment.amount / totalExpenses) * 100).toFixed(2)}%</Text>
          </View>
        )}
      </View>
      <View style={styles.expenseContainer}>
        <View style={styles.legend}>
          {chartData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]} />
              <Text>{item.key}: {((item.amount / totalExpenses) * 100).toFixed(2)}% - {item.amount.toLocaleString('vi-VN')} đ</Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Tổng chi tiêu: {totalExpenses.toLocaleString('vi-VN')} đ</Text>
      </View>
    </View>
    </>
  );
};

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

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartContainer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#ADD8E6', // Light blue background color for the top part
    padding: 10,
  },
  expenseContainer: {
    flex: 2,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontSize: 20,
    margin: 10,
  },
  chartDetails: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  chartText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  legend: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  navButton: {
    alignItems: 'center',
  }
});
