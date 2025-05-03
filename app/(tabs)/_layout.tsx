import { Tabs } from 'expo-router';
import React,{useContext} from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {showBarAcceuil} from './acceuil';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={'white'} />,
        }}
      />
      <Tabs.Screen
        name="acceuil"
        options={
          showBarAcceuil
            ? {
              title: 'acceuil',
              tabBarIcon: () => <MaterialIcons name="fastfood" size={24} color="black" />,
            }
            : {
              href: null,
            }
        }
      />


      <Tabs.Screen
        name="apropo"
        options={{
          title: 'Apropo',
          tabBarIcon: () => <Entypo name="info" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="langage"
        options={{
          title: 'langage',
          tabBarIcon: () => <Entypo name="language" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="inscription"
        options={{
          href: null, // Ne pas l’afficher dans la tab bar
        }}
      />

      <Tabs.Screen
        name="connexion"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          href: null,
          tabBarStyle: { display: 'none' }, // Masquer la tab bar

        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href:null,
          tabBarStyle: { display: 'none' }
        }}
      />
    </Tabs>
  );
}
