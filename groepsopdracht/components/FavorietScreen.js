import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator} from 'react-native-paper';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Detail from './DetailScreen';


const favorietenList = ({navigation})=>{
    const [values,setValues] = useState();
    const [loading,setLoading]= useState(true);
    const getAllKeys = async()=>{
            try {
                const allKeys = await AsyncStorage.getAllKeys();
                let keys = [];
                allKeys.forEach(key=>{
                  if(key.charAt(0) == "@"){
                    keys.push(key);
                  }
                })
                keys.sort();
                const result = await AsyncStorage.multiGet(keys);
                
                let array = [];
                result.map(station=>{
                  
                  array.push(JSON.parse(station[1]))
                });
                setValues(array);
                setLoading(false);
            } catch (error) {
                
            }
           

            
            
    }
    useEffect(()=>{
      navigation.addListener('focus',()=>{
           getAllKeys();
       })
        
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
      {loading?<ActivityIndicator size="large" color="#0000ff"/>:<FlatList data={values} renderItem={renderItem} keyExtractor={keyExtractor}/>}
      
      
    </View>
    )
    
}
const Stack = createStackNavigator();
export default ()=>{
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="Favorieten" component={favorietenList}/>
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