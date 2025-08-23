import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from '../TabsStacks';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DrawerRoutes() {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  const CustomDrawerContent = () => (
    <View style={{ flex: 1, paddingTop: 50, padding: 20 }}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
      >
        <Text>Início</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Profile')}
        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
      >
        <Text>Perfil</Text>
      </TouchableOpacity>
      {/* Adicione mais itens do menu aqui */}
    </View>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '70%',
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={TabRoutes} />
    </Drawer.Navigator>
  );
}
