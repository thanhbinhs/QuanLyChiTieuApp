import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChartScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const screenWidth = Dimensions.get('window').width;

  const chartData = [
    { key: 'Nhà cửa', amount: data.housing, svg: { fill: 'red' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { key: 'Mua sắm', amount: data.shopping, svg: { fill: 'blue' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { key: 'Đồ ăn/Đồ uống', amount: data.food, svg: { fill: 'green' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { key: 'Vận chuyển', amount: data.transport, svg: { fill: 'orange' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { key: 'Thú nuôi', amount: data.pets, svg: { fill: 'yellow' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { key: 'Giải trí', amount: data.entertainment, svg: { fill: 'lightgreen' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { key: 'Khác (Các chi phí)', amount: data.others, svg: { fill: 'purple' }, legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = data.income; // Assuming total income is passed in the route params

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
    <View style={styles.container}>
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
        <Text style={styles.total}>Tổng thu nhập: {totalIncome.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.total}>Tổng chi tiêu: {totalExpenses.toLocaleString('vi-VN')} đ</Text>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Overview')}>
          <Icon name="dashboard" size={30} color="#000" />
          <Text>Tổng quan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Accounts')}>
          <Icon name="account-balance" size={30} color="#000" />
          <Text>Tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Add')}>
          <Icon name="add-circle" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Report')}>
          <Icon name="insert-chart" size={30} color="#000" />
          <Text>Báo cáo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('More')}>
          <Icon name="more-horiz" size={30} color="#000" />
          <Text>Khác</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default ChartScreen;
