
import React , {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import {Camera} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../assets/js/colors';

export default ({route,navigation})=>{
    const {id} = route.params;
    //camera middleware
    const [hasPermission,setHasPermission] = useState();
    const camera = useRef();

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }
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
       } catch (error) {}
    }
    const takePicture = async()=>{
        let picture = await camera.current.takePictureAsync();
        saveImage(picture.uri)
    }
    
  return(
    <View style={styles.container}>
        <Camera style={{flex:1}} type={Camera.Constants.Type.front} ref={camera} type={Camera.Constants.Type.back}/>
        <Button title="Take Picture" color={colors.primary} onPress={()=>{takePicture(); wait(2000).then(()=>{navigation.goBack()}); }}/>
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