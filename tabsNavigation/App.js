import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/home';
import Profile from './screens/profile';
import Settings from './screens/settings';
import Detalle from './screens/detalles';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={Profile} 
        options={{ headerShown: false }} 
      />
      <ProfileStack.Screen 
        name="Detalle" 
        component={Detalle} 
        options={{ 
          title: 'Detalle',
          headerBackTitle: 'Perfil' 
        }} 
      />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, 
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: true }} 
        />
        <Tab.Screen 
          name="ProfileTab" 
          component={ProfileStackScreen} 
          options={{ title: 'Profile' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={Settings} 
          options={{ headerShown: true }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}