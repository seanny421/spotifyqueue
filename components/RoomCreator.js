import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RoomHeader from './RoomHeader';
import {useEffect, useState} from 'react';
import QueueItem from './QueueItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchModal from './SearchModal';
import RoomSettingsModal from './RoomSettingsModal';
import defaultImage from '../assets/bg.png';
import { ref, push, child, set } from 'firebase/database';
import { db } from '../firebaseConfig';


export default function RoomCreator({navigation}) {
  const [headerImage, setHeaderImage] = useState(Image.resolveAssetSource(defaultImage).uri)
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const [roomSettingsModalVisible, setRoomSettingsModalVisible] = useState(false)
  const [queue, setQueue] = useState([])
  const accessToken = navigation.getState().routes[1].params.accessToken

  useEffect(() => {
    addRoomToDB()
    getQueue()
  }, [])

  function addRoomToDB(){
    const dbRef = ref(db, '/1/accessToken')
    set(dbRef, accessToken)
  }

  async function getQueue(){
    await fetch('https://api.spotify.com/v1/me/player/queue', {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + accessToken 
      },
    })
      .then(res => res.json())
      .then(r => {
        setQueue(r.queue)
      })
      .catch(err => console.log(err))
  }

  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.gradient}>
      <View style={[styles.container]}>
        <RoomHeader headerImage={headerImage} setRoomSettingsModalVisible={setRoomSettingsModalVisible}/>
        <SearchModal accessToken={accessToken} isVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} />
        <RoomSettingsModal headerImage={headerImage} setHeaderImage={setHeaderImage} isVisible={roomSettingsModalVisible} setRoomSettingsModalVisible={setRoomSettingsModalVisible} navigation={navigation}/>
        <SafeAreaView style={{flex: 1}}>
          <DraggableFlatList
            ListHeaderComponent={() => <Ionicons onPress={() => setSearchModalVisible(true)} name='md-add-circle' style={{textAlign: 'center', padding: 10}}  size={50} color={'#BC7AF7'}/>}
            data={queue}
            onDragEnd={({data}) => {
              setQueue(data)
            }}
            renderItem={({item, isActive, drag, getIndex}) => <QueueItem image={item.album.images[0].url} isActive={isActive} drag={drag} first={getIndex() === 0} name={item.name} artist={item.artists[0].name}/>}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
      </View>
      </LinearGradient>
  );
}



const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },

});
