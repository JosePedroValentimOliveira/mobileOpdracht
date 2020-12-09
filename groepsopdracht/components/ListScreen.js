import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';


import apiCall from '../assets/js/apiCall';





const Detail = ({route})=>{
    const {station}= route.params; 
   
    return(
      <View style={styles.container} >
        <Text  style={ {fontSize:40,color:'black'}}>{station[0].value}</Text>
        
        {
          station.map((item,key)=>(
            
            <View key={key} style={{padding:15,margin:2}}>
            <Text style={{fontWeight:"bold"}}>{(item.key).charAt(0).toUpperCase() + (item.key).slice(1)}:</Text>
            <Text>{item.value}</Text>
          </View>
          ))
        }
        
      </View>
    )
}


const List = ({navigation})=>{
    const [data,setData] = useState();
    
    useEffect(()=>{
        apiCall().then(data=>{
            let namen = [];
            data.features.forEach(element => {
                namen.push(element.attributes);
            });
            
            setData(namen);
        });
    },[])
    
    const renderItem = ({item})=>{
      
      const itemStatus = item.status;
      const connectieAntwerpen = item.reistijd_antw;
    
      let status = "";
      if(itemStatus == "bestaand"){status = "Station is in gebruik"}
      else{status = "Station is niet meer in gebruik"}
      const details = [
        {key: "naam" ,value:item.naam},
        {key: "status" ,value:status},
        {key: "niveau" ,value:item.niveau},
        {key: "planning" ,value:item.planning},
        {key: "GISID" ,value:item.GISID},
        {key: "reistijd" ,value:item.reistijd_antw}        
      ]
      return(
        <TouchableHighlight onPress={()=>{navigation.navigate('Detail',{station:details})}} >
          <View style={{borderWidth:2,borderColor:"black",padding:15,margin:2}}>
            <Text style={{fontWeight:"bold"}}>{item.naam}</Text>
            <Text>{status}</Text>
          </View>
        </TouchableHighlight>
        )
      }
    
      const keyExtractor = (item)=>item.naam;

    return(
      <View style={styles.container}>
      
        <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
        
      </View>
    )

}

const Stack = createStackNavigator();

export default()=>{
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="AppName" component={List} options={{title:"App Name"}}/>
      <Stack.Screen name="Detail" component={Detail}/>
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