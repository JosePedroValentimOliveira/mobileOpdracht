
import React , {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View,Button ,Image, Alert} from 'react-native';
import {Camera} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as FileSystem from 'expo-file-system';
import {dirPictures} from '../assets/js/dirStorage';










export default ({route})=>{
    const {id} = route.params;
    //camera middleware
    const [hasPermission,setHasPermission] = useState();
    const [image,setImage] = useState();
    const camera = useRef();

    useEffect(()=>{
        (async()=>{const {status} = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted") })()
    },[])

    if(hasPermission === null){
        return <View/>
    }
    if(hasPermission === false){
        return <Text>No access to Camera</Text>
    }

    const saveImage = async(uri)=>{
      
      
       try {
        await AsyncStorage.setItem(`image_${id}`,JSON.stringify(uri));
        
       } catch (error) {
         
       }
  }

    const takePicture = async()=>{
        let picture = await camera.current.takePictureAsync();
        saveImage(picture.uri)
    }
    


    
  return(
    <View style={styles.container}>
        <Camera style={{flex:1}} type={Camera.Constants.Type.front} ref={camera} type={Camera.Constants.Type.back}></Camera>


        <Button title="Take Picture" onPress={takePicture}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
  });