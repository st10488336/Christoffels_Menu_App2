// screens/HomeScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem, Course } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  items: MenuItem[];
};

const COURSES: Course[] = ['Starter', 'Main', 'Dessert'];

const calcAverage = (arr: number[]) =>
  arr.length === 0 ? 0 : arr.reduce((s, v) => s + v, 0) / arr.length;

const HomeScreen: React.FC<Props> = ({ navigation, items }) => {
  const totalItems = items.length;

  const averageOverall = useMemo(() => calcAverage(items.map((i) => i.price)), [items]);

  const averageByCourse = useMemo(() => {
    const map: Record<Course, number> = { Starter: 0, Main: 0, Dessert: 0 };
    COURSES.forEach((c) => {
      const list = items.filter((i) => i.category === c).map((i) => i.price);
      map[c] = calcAverage(list);
    });
    return map;
  }, [items]);

  const countsByCourse = useMemo(() => {
    const counts: Record<Course, number> = { Starter: 0, Main: 0, Dessert: 0 };
    items.forEach((i) => (counts[i.category] = (counts[i.category] || 0) + 1));
    return counts;
  }, [items]);

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>

      <View style={styles.card}>
        <Text style={styles.stat}>Total items: {totalItems}</Text>
        <Text style={styles.stat}>Average price (overall): ${averageOverall.toFixed(2)}</Text>

        <View style={{ marginTop: 8 }}>
          {COURSES.map((c) => (
            <Text key={c} style={styles.smallStat}>
              {c}: {countsByCourse[c]} item(s) — average ${averageByCourse[c].toFixed(2)}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenuItem')}>
        <Text style={styles.buttonText}>ADD MENU ITEM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FilterMenu')}>
        <Text style={styles.buttonText}>FILTER MENU</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>VIEW FULL MENU</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'stretch', backgroundColor: '#fff', minHeight: '100%' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 8, marginBottom: 16 },
  stat: { fontSize: 16, marginBottom: 6 },
  smallStat: { fontSize: 14, color: '#444' },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
