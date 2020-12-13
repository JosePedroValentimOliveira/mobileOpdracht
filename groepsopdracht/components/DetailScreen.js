import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Button,Image,ScrollView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';






export default ({route,navigation})=>{
    const {station} = route.params; 
    const [data,setData] = useState(false);
    const [buttonText,setButtonText] = useState("Voeg toe aan favorieten");
    const [image,setImage]= useState();

    

    //AsyncStorage functions
    const getFavorite = async()=>{
        try {
            let STORAGE_KEY = `@${station.GISID}`;
            return await AsyncStorage.getItem(STORAGE_KEY);
        } catch (error) {}
    }
    const addFavorite = async()=>{
        try {
            let STORAGE_KEY = `@${station.GISID}`;
            await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(station));
            
        } catch (error) {}
    }
    const removeFavorite = async()=>{
        try {
            let STORAGE_KEY = `@${station.GISID}`;
            await AsyncStorage.removeItem(STORAGE_KEY);

        } catch (error) {}
    }
    const getImage = async()=>{
        try {
            let uri =JSON.parse(await AsyncStorage.getItem(`image_${station.GISID}`));
            setImage(uri);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        (async()=>{
            
            let value = await getFavorite();
            if(value == null){
                setData(false);
            }
            else{setData(true);setButtonText("Verwijder uit favorieten")}

        })()
        navigation.addListener('focus',()=>{
            getImage();
        })
        getImage();
    },[])

     
    return(
        <View style={styles.container} >
            {image == null ?<View/>:<Image style={styles.image} source={{uri:image}}/>}
            
          <ScrollView>
        
        <Text style={ {fontSize:20,color:'black'}}>{station.naam}</Text>
        {
            Object.keys(station).map((key,i)=>(
                <View key={i} style={{padding:2,margin:1}}>
                    <Text style={{fontWeight:"bold"}}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                    <Text>{station[key]}</Text>
                </View>
        ))
        }
        <Text>{data}</Text>
        
        <Button title={buttonText} onPress={async()=>{
                if(data){
                    removeFavorite();
                    setData(false);
                    setButtonText("Voeg toe aan favorieten");
                    await getFavorite()
                }
                else{
                    await addFavorite();
                    setData(true);
                    setButtonText("Verwijder uit favorieten");
                    await getFavorite()
                }
            } 
        }/>
        <Button title="Neem een foto" onPress={()=>{
            navigation.navigate("Camera",{id:station.GISID});
        }}/>
       </ScrollView>
      </View>
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
        image:{
            height:200,
        }
    });