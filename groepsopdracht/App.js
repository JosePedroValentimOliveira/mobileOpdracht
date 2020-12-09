import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView, {Marker} from "react-native-maps";


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

/*
 <View>
  <MapView style={styles.container} initialRegion={{latitude:50.878510004598574, longitude:4.378639994232532, latitudeDelta:0.12874,longitudeDelta:0.04888}}>
    {loadTrein.length > 0 && loadTrein.map((markers, index) => (
      
          <Marker
          key = {index}
            coordinate=
            {
              {
                latitude: markers.geometry.coordinates[1],
                longitude: markers.geometry.coordinates[0],
              }
            }
          />
  ))}
  </MapView>
</View>
*/

export default function App() {
  return (  
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Screen}/>
        <Tab.Screen name="List" component={Screen}/>
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
const [markers, setMarkers] = useState([]);

const loadTrein = async() => 
{
  try
  {
    //https://api.jsonbin.io/b/5fd10ec7bef8b7699e577379
    let response = await fetch('https://api.jsonbin.io/b/5fd10ec7bef8b7699e577379');
    let json = await response.json();
    setMarkers(json.features);
  } catch (error) 
    {
      console.error(error);
    }
};

 useEffect(() => 
 {
  LoadTrein();
 }, []);
 

  
