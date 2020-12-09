import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator}  from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import ListScreen from './components/ListScreen'
import { Entypo} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const Screen = ()=>{
  return(
    <View><Text>Hallo</Text></View>
  )
}

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Screen} options={{tabBarIcon:({color,size})=>(<Entypo name="home" size={size} color={color}/>)}}/>
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
  },
});
