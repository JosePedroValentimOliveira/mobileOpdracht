import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Button } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';

import apiCall from '../assets/js/apiCall';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default ({navigation})=>{
    const [location, LocationPermission] = useState(null);
    const [errorMessage, setError] = useState(null);
    const [detailPopup, setPopup] = useState(false);
    const [popupInfo, setInfo] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [gegevens, setGegevens]= useState([]);
    const region={
        latitude: 51.231107,
        longitude: 4.415127,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    useEffect(()=>{

        apiCall().then(data=>{
            let coords = [];
            let namen = [];
            data.features.forEach(element=>{
                let geo = element.geometry;
                
                coords.push([geo.x,geo.y]);
                namen.push(element.attributes);
            })
            setMarkers(coords);
            setGegevens(namen);            
        });
        (async () => {
          let {status} = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setError('Permission denied');
          }
          
          let location = await Location.getCurrentPositionAsync({});
          LocationPermission(location);
          console.log(location);
        })();    
        
    },[])

    let loadingText = 'Location loaded....';
    // If an error message exists load error message into loading text
    if(errorMessage){
      loadingText = errorMessage;
      return(
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          {loadingText}
        </Text>
      </View>)
    } else if (location)
    {
      // detail pagina navigation, gegevens mee geven met als variabele station
      /* navigation.navigate("Detail",{station:gegevens[index]})  */
      //{latitude:location.coords.latitude,longitude:location.coords.longitude} Probleem met laden van locatie voordat die de map probeert te openen dus krijg je errors
      return(
        location &&
        <View style={styles.container}>
             <MapView style={styles.mapStyle} initialRegion={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.04, longitudeDelta:0.1}}>
             <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.04, longitudeDelta:0.1}}></Marker>
             {markers.map((marker, index) => (
                    <Marker onPress={()=>{ 
                      setPopup(true);
                      setInfo({
                        title: gegevens[index].naam
                      })
                      console.log(gegevens[index]); }} key={index} coordinate={{latitude: marker[1],longitude: marker[0]}}/>
            ))}
             </MapView>
             {
               detailPopup &&
               <View>
                 <TouchableOpacity style={{flexDirection: 'row-reverse'}} onPress={() => {setPopup(false)}}>
                   <Text style={{fontSize:20, padding:0}}>X</Text>
                 </TouchableOpacity>
                 <View>
             <Text style={{fontSize:20}}>Title: {popupInfo.title}</Text>
                 </View>
                 <Button title="Details" color="red" onPress={() => navigation.navigate("Detail",{station:popupInfo.title})} ></Button>
               </View>
             } 
        </View>
      )
    }
    else {
        return (
          <View style={styles.activity}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        
        );
    }   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    mapStyle:{
      flex:1,
    },
    LoadingText:
    {
      flex:1,
      color: '#000'
    },
    activity:
    {
      flex:1,
      justifyContent:'center',
      backgroundColor:'#fff'
    }
  });