// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddMenuItemScreen from './screens/AddMenuItemScreen';
import MenuScreen from './screens/MenuScreen';
import FilterMenuScreen from './screens/FilterMenuScreen';
import { RootStackParamList, MenuItem } from './types/navigation';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  
  const [items, setItems] = useState<MenuItem[]>([
  
    // optional example seed items (comment out if you want empty by default)
    // {
    //   id: '1',
    //   name: 'Burger & chips',
    //   description: 'Cheese burger served with fries',
    //   category: 'Main',
    //   price: 55.0,
    // },
  ]);

  

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: "Home" }}>
          {(props) => <HomeScreen {...props} items={items} />}
        </Stack.Screen>

        <Stack.Screen name="AddMenuItem" options={{ title: "Add Menu Item" }}>
          {(props) => <AddMenuItemScreen {...props} items={items} setItems={setItems} />}
        </Stack.Screen>

        <Stack.Screen name="Menu" options={{ title: "Full Menu" }}>
          {(props) => <MenuScreen {...props} items={items} />}
        </Stack.Screen>

        <Stack.Screen name="FilterMenu" options={{ title: "Filter Menu" }}>
          {(props) => <FilterMenuScreen {...props} items={items} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
    
}

   