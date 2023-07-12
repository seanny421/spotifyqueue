import { StyleSheet, View, SafeAreaView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RoomHeader from './RoomHeader';
import {useEffect, useState} from 'react';
import QueueItem from './QueueItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchModal from './SearchModal';
import defaultImage from '../assets/bg.png';


export default function RoomJoiner({navigation}) {
  const [headerImage, setHeaderImage] = useState(Image.resolveAssetSource(defaultImage).uri)
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const accessToken = navigation.getState().routes[2].params.accessToken
  const [queue, setQueue] = useState([])

  useEffect(() => {
    getQueue()
  }, [])

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
        <RoomHeader navigation={navigation} headerImage={headerImage} setRoomSettingsModalVisible={false}/>
        <SearchModal accessToken={accessToken} isVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} />

        <SafeAreaView style={{flex: 1}}>
          <FlatList
            ListHeaderComponent={() => <Ionicons onPress={() => setSearchModalVisible(true)} name='md-add-circle' style={{textAlign: 'center', padding: 10}}  size={50} color={'#BC7AF7'}/>}
            data={queue}
            renderItem={({item, index}) => <QueueItem accessToken={accessToken} image={item.album.images[0].url} isActive={false} drag={false} first={index === 0}  name={item.name} artist={item.artists[0].name}/>}
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
