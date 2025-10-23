// types/navigation.ts
export type Course = 'Starter' | 'Main' | 'Dessert';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: Course;
  price: number;
};

export type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  Menu: undefined;
  FilterMenu: undefined;
};
