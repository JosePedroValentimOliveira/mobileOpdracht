import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { ActivityIndicator} from 'react-native-paper';

import apiCall from '../assets/js/apiCall';
import Detail from './DetailScreen';
import CameraScreen from './CameraScreen';






const List = ({navigation})=>{
    const [data,setData] = useState();
    const [loading,setLoading]= useState(true);
    useEffect(()=>{
        apiCall().then(data=>{
            let namen = [];
            data.features.forEach(element => {
              namen.push(element.attributes);
            });
            
            setData(namen);
            setLoading(false);
        });
    },[])
    
    const renderItem = ({item})=>{
      
      const itemStatus = item.status;
      
      let status = "";
      if(itemStatus == "bestaand"){status = "Station is in gebruik"}
      else{status = "Station is niet meer in gebruik"}
    
      return(
        <TouchableHighlight onPress={()=>{navigation.navigate('Detail',{station:item})}} >
          <View style={{borderWidth:2,borderColor:"black",padding:15,margin:2}}>
            <Text style={{fontWeight:"bold"}}>{item.naam}</Text>
            <Text>{status}</Text>
          </View>
        </TouchableHighlight>
        )
      }
    
      const keyExtractor = (item)=>{return item.naam};

    return(
      <View style={styles.container}>
        {loading?<ActivityIndicator size="large" color="#0000ff"/>:<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}/>}
        
        
      </View>
    )

}

const Stack = createStackNavigator();

export default()=>{
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="Stations" component={List}/>
      <Stack.Screen name="Detail" component={Detail}/>
      <Stack.Screen name="Camera" component={CameraScreen}/>
    </Stack.Navigator>
    
  )
}

const styles = StyleSheet.create({
  generic:{
    flex:1,alignItems:"center",justifyContent:"center"
  },container: {
        margin:10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding:10
      },
  });