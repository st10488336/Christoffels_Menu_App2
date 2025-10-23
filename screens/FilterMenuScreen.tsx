// screens/FilterMenuScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem, Course } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FilterMenu'> & {
  items: MenuItem[];
};

const COURSES: (Course | 'All')[] = ['All', 'Starter', 'Main', 'Dessert'];

const FilterMenuScreen: React.FC<Props> = ({ items }) => {
  const [selected, setSelected] = useState<Course | 'All'>('All');

  const filtered = useMemo(() => (selected === 'All' ? items : items.filter((i) => i.category === selected)), [items, selected]);

  const average = useMemo(() => {
    if (filtered.length === 0) return 0;
    return filtered.reduce((s, i) => s + i.price, 0) / filtered.length;
  }, [filtered]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <View style={styles.tabs}>
        {COURSES.map((c) => {
          const active = c === selected;
          return (
            <TouchableOpacity key={String(c)} style={[styles.tab, active && styles.tabActive]} onPress={() => setSelected(c as any)}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.info}>
        <Text>{filtered.length} item(s) shown</Text>
        <Text>Average price: ${average.toFixed(2)}</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.category}>Category: {item.category}</Text>
            {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items in this category.</Text>}
      />
    </View>
  );
};

export default FilterMenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  tabActive: { backgroundColor: '#0a84ff', borderColor: '#0a84ff' },
  tabText: { color: '#333' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  info: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  card: { backgroundColor: '#f7f7f7', padding: 12, marginBottom: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
  price: { color: '#0a84ff', fontWeight: '700' },
  category: { color: '#666', marginTop: 6 },
  desc: { marginTop: 6, color: '#333' },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
});
 