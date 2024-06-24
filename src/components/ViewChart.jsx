import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const ViewChart = ({noteData, type}) => {
  const screenWidth = Dimensions.get('window').width;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const colors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33A1', // Pink
    '#33FFF5', // Cyan
    '#FF5733', // Orange
    '#8D33FF', // Purple
    '#FFF333', // Yellow
    '#57FF33', // Light Green
    '#5733FF', // Indigo
  ];

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  const groupedNote = noteData.reduce((note, current) => {
    if (current.noteType !== type) return note;
    const existing = note.find(note => note.noteName === current.noteName && note.noteType === current.noteType);
    if (existing) {
      existing.noteMoney += current.noteMoney;
    } else {
      note.push({ ...current, color: getColor(note.length) });
    }
    return note;
  }, []);

  const totalNoteMoney = groupedNote.reduce((total, item) => total + item.noteMoney, 0);
  const threshold = totalNoteMoney * 0.01;

  // Sắp xếp các mục theo giá trị noteMoney giảm dần
  groupedNote.sort((a, b) => b.noteMoney - a.noteMoney);

  // Lọc ra các mục có noteMoney nhỏ hơn 1%
  const smallNotes = groupedNote.filter(item => item.noteMoney <= threshold);
  const otherTotalFromSmall = smallNotes.reduce((total, item) => total + item.noteMoney, 0);

  // Lấy 5 mục lớn nhất từ các mục còn lại
  const remainingNotes = groupedNote.filter(item => item.noteMoney > threshold);
  const topFiveNotes = remainingNotes.slice(0, 5);

  // Lọc các mục nhỏ hơn 1% trong top 5
  const otherTotalFromTopFive = topFiveNotes.filter(item => item.noteMoney <= threshold).reduce((total, item) => total + item.noteMoney, 0);

  // Tổng các mục còn lại thành mục "Khác"
  const otherTotal = otherTotalFromSmall + otherTotalFromTopFive;

  const filteredNotes = topFiveNotes.filter(item => item.noteMoney > threshold);
  const handlePress = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); // Toggle selection
  };

  if (otherTotal > 0) {
    filteredNotes.push({
      noteName: 'Khác',
      noteMoney: otherTotal,
      color: '#D3D3D3', // Màu xám cho mục "Khác"
      percentage: ((otherTotal / totalNoteMoney) * 100).toFixed(2)
    });
  }

  const noteDataForChart = filteredNotes.map((item, index) => {
    const percentage = ((item.noteMoney / totalNoteMoney) * 100).toFixed(2);
    return {
      name: `${item.noteName} (${percentage}%)`,
      population: item.noteMoney,
      color: item.color,
      legendFontColor: "transparent", // Hide legend text color
      legendFontSize: 0 // Hide legend text size
    }
  });

  return (
    <View style={styles.container}>
      <PieChart
        data={noteDataForChart}
        width={screenWidth}
        height={screenWidth} // Make chart a square for better proportions
        chartConfig={{
          backgroundColor: 'transparent', // No background
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="100" // Adjust as needed for spacing
        absolute
        hasLegend={false}
        style={{ borderRadius: screenWidth / 2 }} // Make it a perfect circle
        onPress={(data, index) => handlePress(index)}
      />
      <View style={styles.legendContainer}>
        {noteDataForChart.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
      {selectedIndex !== null && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {noteDataForChart[selectedIndex].name}
          </Text>
          <Text style={{ fontSize: 16, color: '#666' }}>
            {noteDataForChart[selectedIndex].population} ({noteDataForChart[selectedIndex].percentage}%)
          </Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {

      marginTop: 20, // Add some top margin
    },
    legendContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow wrapping to multiple lines
      justifyContent: 'center',
      marginTop: 20,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 10,
    },
    colorBox: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 8,
    },
    legendText: {
      color: '#333',
      fontSize: 14,
    },
  });


export default ViewChart;
