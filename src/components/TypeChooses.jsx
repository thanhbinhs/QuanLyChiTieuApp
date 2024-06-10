import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import TypeData from '../data/type.json';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';
import HorizontalMenu from './HorizontalMenu';
import HorizontalMenuAccount from './HorizontalMenuAccount';
import { useChange } from '../context/ChangeContext';
import { useFetchData } from '../hooks/useFetchData';


export default function TypeChooses({ type, onItemChange, data }) {
  const { change } = useChange();
  const { userData, noteData, accountData, loading, error } = useFetchData(change);
  const [title, setTitle] = useState('Chọn hạng mục');
  const [showMenu, setShowMenu] = useState(false);
  const [item, setItem] = useState('');

  const handleItemChange = useCallback((newItem) => {
    setItem(newItem);
    onItemChange(newItem);
  }, [onItemChange]);

  const mergedTypes = useMemo(() => {
    if (data === "type") {
      setTitle(type === 'Chi tiền' ? 'Chọn hạng mục chi' : 'Chọn hạng mục thu');
      return Object.values(TypeData.reduce((types, note) => {
        if (type === 'Chi tiền' && note.type === 'Chi') {
          if (!types[note.name]) {
            types[note.name] = { ...note };
          }
        } else if (type === 'Thu tiền' && note.type === 'Thu') {
          if (!types[note.name]) {
            types[note.name] = { ...note };
          }
        }
        return types;
      }, {}));
    } else if (data === "account") {
      setTitle('Chọn tài khoản');
      return Object.values(accountData.reduce((type, note) => {
        if (!type[note.accountName]) {
          type[note.accountName] = { ...note };
        }
        return type;
      }, {}));
    }
    return [];
  }, [data, type, accountData]);

  if (loading) {
    return null;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
      <TouchableOpacity style={styles.flexRowBox} onPress={() => setShowMenu(true)}>
        <AntDesign name='questioncircle' color={COLORS.grey} size={40} />
        <Text style={{ fontSize: 22, fontWeight: '600', color: '#ccc' }}>{title}</Text>
        <View style={styles.flexRowBox}>
          <Text style={{ color: COLORS.primary, fontSize: 18 }}>Tất cả</Text>
          <AntDesign name="right" size={24} color={COLORS.primary} />
        </View>
      </TouchableOpacity>
      {showMenu && (
        data === "type" ? (
          <HorizontalMenu items={mergedTypes} onItemChange={handleItemChange} />
        ) : data === "account" ? (
          <HorizontalMenuAccount items={mergedTypes} onItemChange={handleItemChange} />
        ) : null
      )}
      <View style={{ width: '100%', height: 1, backgroundColor: COLORS.grey, marginTop: 10 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexRowBox: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  }
});
