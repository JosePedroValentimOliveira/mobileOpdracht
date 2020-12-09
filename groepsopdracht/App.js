import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView, {Marker} from "react-native-maps";
import { Entypo} from '@expo/vector-icons';

import ListScreen from './components/ListScreen';
import MapScreen from './components/MapComponent';
const Tab = createBottomTabNavigator();


const Screen = ()=>
{
  //simpel map tonen
  return (
    <MapView style={styles.container}
    region={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
  )
}



export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} options={{tabBarIcon:({color,size})=>(<Entypo name="home" size={size} color={color}/>)}}/>
        <Tab.Screen name="List" component={ListScreen} options={{tabBarIcon:({color,size})=>(<Entypo name="list" size={size} color={color}/>)}}/>
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


//API testing
// API Call



 

  
