// screens/MenuScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'> & {
  items: MenuItem[];
};

const MenuScreen: React.FC<Props> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Full Menu</Text>

      {items.length === 0 ? (
        <Text style={styles.empty}>No items yet. Use "Add Menu Item" to create menu entries.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingBottom: 40 }}
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
        />
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
  card: { backgroundColor: '#f7f7f7', padding: 12, marginBottom: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
  price: { fontSize: 14, fontWeight: '700', color: '#0a84ff' },
  category: { fontSize: 13, color: '#666', marginTop: 6 },
  desc: { marginTop: 6, color: '#333' },
});
