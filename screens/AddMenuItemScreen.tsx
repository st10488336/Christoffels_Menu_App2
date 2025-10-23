// screens/AddMenuItemScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem, Course } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMenuItem'> & {
  items: MenuItem[];
  setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const COURSES: Course[] = ['Starter', 'Main', 'Dessert'];

const AddMenuItemScreen: React.FC<Props> = ({ navigation, items, setItems }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [priceText, setPriceText] = useState('');
  const [category, setCategory] = useState<Course>('Starter');

  const handleSave = () => {
    if (!name.trim() || !priceText.trim()) {
      Alert.alert('Validation', 'Please enter at least a name and a price.');
      return;
    }
    const price = parseFloat(priceText);
    if (Number.isNaN(price) || price < 0) {
      Alert.alert('Validation', 'Please enter a valid positive number for price.');
      return;
    }
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: desc.trim(),
      category,
      price,
    };
    setItems([...items, newItem]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g., Grilled Chicken" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={desc}
        onChangeText={setDesc}
        placeholder="Short description"
        multiline
      />

      <Text style={styles.label}>Course (predefined)</Text>
      <View style={styles.row}>
        {COURSES.map((c) => {
          const active = c === category;
          return (
            <TouchableOpacity
              key={c}
              style={[styles.courseBtn, active && styles.courseBtnActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.courseText, active && styles.courseTextActive]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Price (Rands or currency)</Text>
      <TextInput
        style={styles.input}
        value={priceText}
        onChangeText={(t) => setPriceText(t)}
        keyboardType="numeric"
        placeholder="e.g., 55.00"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE ITEM</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMenuItemScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, backgroundColor: '#fff' },
  row: { flexDirection: 'row', marginTop: 6, marginBottom: 12 },
  courseBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginRight: 8, borderWidth: 1, borderColor: '#ddd' },
  courseBtnActive: { backgroundColor: '#0a84ff', borderColor: '#0a84ff' },
  courseText: { color: '#333' },
  courseTextActive: { color: '#fff', fontWeight: '700' },
  saveBtn: { marginTop: 18, backgroundColor: '#0a84ff', padding: 14, borderRadius: 8, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700' },
});

