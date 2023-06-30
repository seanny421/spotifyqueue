import {SafeAreaView, ImageBackground, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


export default function RoomHeader({headerImage, setRoomSettingsModalVisible, navigation}){
  const [roomId, setRoomId] = useState(null)
  AsyncStorage.getItem('roomId')
    .then((r) => setRoomId(r))

  return(
    <ImageBackground imageStyle={{opacity: 0.6, height: '100%'}} style={styles.header} resizeMode='cover' source={{uri: headerImage}}>
      <SafeAreaView style={styles.container}>
        {setRoomSettingsModalVisible !== false &&
          <Ionicons onPress={() => setRoomSettingsModalVisible(true)} name='information-circle-sharp' size={40} color={'#fff'} style={styles.topRight}/>
        }
        {setRoomSettingsModalVisible === false &&
          <Ionicons onPress={() => navigation.navigate('Home')} name='exit-outline' size={40} color={'#fff'} style={styles.topRight}/>
        }
        <Text style={[styles.titleText, styles.topLeft]}>Sean's Queue</Text>
        <Text style={[styles.titleText, styles.bottomRight]}>#{roomId}</Text>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: '30%',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  titleText: {
    fontFamily: 'Rubik One',
    textAlign: 'center',
    fontSize: 30,
    color: "#FFF",
  },
  topLeft: {
    position: 'absolute',
    top: 20,
    left: 20,

  },
  bottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  topRight: {
    position: 'absolute',
    top: 20,
    right: 20,
  }

});
