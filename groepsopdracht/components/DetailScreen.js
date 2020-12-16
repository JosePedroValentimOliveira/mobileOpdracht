import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Button,Image,ScrollView,ImageBackground,TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/js/colors';







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
            <ImageBackground style={styles.backgroundImage} source={{uri:image}}>
            
            <View style={styles.innerContainer}>
            <ScrollView>
                <View style={{backgroundColor:colors.primary,borderRadius:10,padding:15,opacity:0.8}}>
                <Text style={{...styles.boldText, fontSize:20}}>{station.naam}</Text>
                {Object.keys(station).map((key,i)=>(
                    <View key={i} style={{padding:2,margin:1}}>
                        <Text style={styles.boldText}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                        <Text style={{color:colors.grey}}>{station[key]}</Text>
                    </View>
                ))}
                </View>
            </ScrollView>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={async()=>{
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
            } }>
                <Text style={{color:colors.secondary}}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCam} onPress={()=>{navigation.navigate("Camera",{id:station.GISID});}}>
                <Text style={{color:colors.secondary}}>Neem een foto</Text>
            </TouchableOpacity>
       </ImageBackground> 
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
    innerContainer: {
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            padding:30
           
    },
    backgroundImage: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
    },
    buttonCam:{backgroundColor:colors.primary,borderRadius:5,padding:10,alignItems:'center',position:"absolute",bottom:0,alignSelf:'center',width:"80%",margin:20},
    buttonFav:{backgroundColor:colors.primary,borderRadius:5,padding:10,alignItems:'center',position:"absolute",bottom:50,alignSelf:'center',width:"80%",margin:20},
    boldText:{color:colors.secondary,fontWeight:'bold'}
    });