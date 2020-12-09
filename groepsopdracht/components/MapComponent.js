import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from "react-native-maps";

import apiCall from '../assets/js/apiCall';


export default ({navigation})=>{
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
    },[])
    // detail pagina navigation, gegevens mee geven met als variabele station
    /* navigation.navigate("Detail",{station:gegevens[index]})  */
    return(
        <View style={styles.container}>
             <MapView style={styles.mapStyle} initialRegion={region}>
             {markers.map((marker, index) => (

                    <Marker onPress={()=>{ console.log(gegevens[index]); }} key={index} coordinate={{latitude: marker[1],longitude: marker[0]}}/>
            ))}
            </MapView> 
            
            
        </View>
    )
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
    }
  });