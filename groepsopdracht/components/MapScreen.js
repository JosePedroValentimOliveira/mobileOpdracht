import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';
import { ActivityIndicator} from 'react-native-paper';
import apiCall from '../assets/js/apiCall';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import { colors } from '../assets/js/colors';


export default ({navigation})=>{
    const [location, LocationPermission] = useState(null);
    const [errorMessage, setError] = useState(null);
    const [detailPopup, setPopup] = useState(false);
    const [popupInfo, setInfo] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [gegevens, setGegevens]= useState([]);

    

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
            {/*Marker voor locatie gebruiker */}
                <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.04, longitudeDelta:0.1}}>
                    <View style={styles.marker}>
                        <MaterialCommunityIcons name="human-male" size={30} color={colors.tertiary}/>
                    </View>
                </Marker>
            {/*Markers voor stations */}
            {markers.map((marker, index) => (
                <Marker onPress={()=>{ setPopup(true);setInfo(gegevens[index])}} key={index} coordinate={{latitude: marker[1],longitude: marker[0]}}>
                    <View style={styles.marker}>
                        <MaterialIcons name="train" size={25} color={colors.primary}/>
                    </View>
                </Marker>
            ))}
            </MapView>
            {detailPopup &&
               <View style={styles.popup}>
                    <TouchableOpacity style={{flexDirection: 'row-reverse'}} onPress={() => {setPopup(false)}}>
                        <Text style={{fontSize:15,color:colors.secondary}}>X</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize:15,fontWeight:'bold',alignSelf:'center',color:colors.secondary}}>{popupInfo.naam}</Text>
                    </View>
                    <Button title="Details" color={colors.grey} onPress={() => navigation.navigate("Stations",{screen:"Detail",initial:false,params:{station:popupInfo}})} ></Button>
               </View>
             } 
        </View>
      )
    }
    else {
        return (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color={colors.primary}/>
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
      alignItems:"center",
      backgroundColor:'#fff'
    },
    popup: {
      width:"80%",height:100,position:"absolute",bottom:10,alignSelf:"center",backgroundColor:colors.primary,borderRadius:20,padding:10
    },
    marker:{
      borderRadius:20,backgroundColor:colors.secondary
    }
  });