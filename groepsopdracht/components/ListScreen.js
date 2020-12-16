import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { ActivityIndicator} from 'react-native-paper';

import apiCall from '../assets/js/apiCall';
import Detail from './DetailScreen';
import CameraScreen from './CameraScreen';
import {colors} from '../assets/js/colors';





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
          <View style={styles.itemContainer}>
            <Text style={{fontWeight:"bold",color:colors.secondary}}>{item.naam}</Text>
            <Text style={{color:colors.grey}}>{status}</Text>
          </View>
        </TouchableHighlight>
        )
      }
    
      const keyExtractor = (item)=>{return item.naam};

    return(
      <View style={styles.container}>
        {loading?<ActivityIndicator size="large" color={colors.primary}/>:<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}/>}
      </View>
    )
}

const Stack = createStackNavigator();
const options ={headerStyle:{backgroundColor:colors.primary},headerTintColor:colors.secondary};

export default()=>{
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="Stations" component={List} options={options}/>
      <Stack.Screen name="Detail" component={Detail} options={options}/>
      <Stack.Screen name="Camera" component={CameraScreen} options={options}/>
    </Stack.Navigator>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding:10
    },
    itemContainer:{
      borderWidth:2,borderColor:colors.primary,padding:15,margin:2,backgroundColor:colors.primary,borderRadius:10
    }
  });