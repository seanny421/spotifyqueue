import { Modal, View, StyleSheet, Pressable, ImageBackground, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonComponent from "./ButtonComponent";
import { useRef, useState } from "react";
import HeaderChoiceList from "./HeaderChoiceList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {ref, set} from "firebase/database";
import { db } from "../firebaseConfig";

export default function RoomSettingsModal({headerImage, setHeaderImage, isVisible, setRoomSettingsModalVisible, navigation}){
  const [changeHeaderImage, setChangeHeaderImage] = useState(false)//show the change header image list
  const slideAnimation = useRef(new Animated.Value(2000)).current

  function slideUp(){
    Animated.timing(slideAnimation, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }

  function slideDown(duration){
    Animated.timing(slideAnimation, {
      toValue: 2000,
      useNativeDriver: true,
      duration: duration ? duration : 700,
    }).start();
  }

  function handleClose(){
    slideDown()
    setTimeout(() => {
      setChangeHeaderImage(false)
    }, 400)
  }

  function handleOpen(){
    slideUp()
    setChangeHeaderImage(true)
  }

  function closeAll(){
    slideDown(200)
    setChangeHeaderImage(false)
    setRoomSettingsModalVisible(false)
  }

  async function handleChooseImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })
    if(!result.canceled){
      slideDown(200)
      setHeaderImage(result.assets[0].uri)
    }
  }

  async function handleExit(){
    const roomId = await AsyncStorage.getItem('roomId')
    //remove from firebase
    const dbRef = ref(db, '/' + roomId);
    set(dbRef, null)
    //remove from localstorage
    await AsyncStorage.removeItem('roomId')
    navigation.navigate('Home')
  }

  return(
      <Modal
        animationType="fade"
        visible={isVisible}
        transparent={true}
        onRequestClose={() => {
          closeAll()
        }}>
            <View style={styles.modalContainer}>
            <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={[styles.modalView]}>
              <ImageBackground imageStyle={{borderBottomLeftRadius: 15, borderTopLeftRadius: 15}}  resizeMode='contain' source={require('../assets/qr.png')}>
                <View style={{width: 10, height: '40%'}}>
                </View>
              </ImageBackground>
              <View>
                <Pressable onPress={handleOpen} style={({pressed}) => [{ width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]}>
                  <ButtonComponent name="Change header image"/>
                </Pressable>
                <Pressable onPress={handleExit}>
                  <ButtonComponent name="End Session" color={'#F93943'}/>
                </Pressable>
              </View>
              <Pressable style={({pressed}) => [{ width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={() => setRoomSettingsModalVisible(false)}  >
                <ButtonComponent name="Close"/>
              </Pressable>
            </LinearGradient>
            </View>
          {changeHeaderImage && 
            <Animated.View style={[styles.modalContainer, {transform: [{translateY: slideAnimation}]}]}>
            <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={[styles.modalView]}>
                <HeaderChoiceList headerImage={headerImage} setHeaderImage={setHeaderImage} handleClose={handleClose} setChangeHeaderImage={setChangeHeaderImage}/>
              <View>
                <Pressable style={({pressed}) => [{ width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={handleChooseImage}>
                  <ButtonComponent name="Choose custom"/>
                </Pressable>
                <Pressable style={({pressed}) => [{ width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={handleClose}>
                  <ButtonComponent name="Close"/>
                </Pressable>
              </View>
            </LinearGradient>
            </Animated.View>
          }
      </Modal>
  )

}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%', 
    position: 'absolute',
    bottom: 0,
    height: '100%', 
  },
  modalView: {
    padding: 35,
    height: '100%',
    justifyContent: 'space-between'
  },
  searchInput: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    paddingVertical: 15,
    width: '100%',
    textAlign: 'center',
    borderRadius: 100,
    fontSize: 20
  },
});
