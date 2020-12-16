import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Entypo, MaterialIcons} from '@expo/vector-icons';

import ListScreen from './components/ListScreen';
import MapScreen from './components/MapScreen';
import FavorietScreen from './components/FavorietScreen';
import {colors} from './assets/js/colors';
const Tab = createBottomTabNavigator();





export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator  tabBarOptions={{activeBackgroundColor:colors.primary,inactiveBackgroundColor:colors.primary, activeTintColor:colors.secondary}}>
        <Tab.Screen name="Map" component={MapScreen} options={{tabBarIcon:({color,size})=>(<Entypo name="home" size={size} color={color}/>)}}/>
        <Tab.Screen name="Stations" component={ListScreen} options={{tabBarIcon:({color,size})=>(<MaterialIcons name="train" size={size} color={color}/>)}}/>
        <Tab.Screen name="Favorieten" component={FavorietScreen} options={{tabBarIcon:({color,size})=>(<MaterialIcons name="favorite" size={size} color={color} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

 

  
