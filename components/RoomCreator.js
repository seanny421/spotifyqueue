import { StyleSheet, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RoomHeader from './RoomHeader';
import {useState} from 'react';
import QueueItem from './QueueItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchModal from './SearchModal';
import RoomSettingsModal from './RoomSettingsModal';


export default function RoomCreator({navigation}) {
  //FIXME - TEMP
  const [songData, setSongData] = useState([
    {name: "Still Beating", artist: "Mac Demarco", image: require("../assets/mac-demarco.png")},
    {name: "Glitter", artist: "Benee", image: require("../assets/benee.png")},
    {name: "Goodie Bag", artist: "Still Woozy", image: require("../assets/still-woozy.png")},
    {name: "I Kissed a Girl", artist: "Katy Perry", image: require("../assets/katy-perry.png")},
    {name: "Heart of Gold", artist: "Neil Young", image: require("../assets/neil-young.png")},
    {name: "Hey Joe", artist: "Jimi Hendrix", image: require("../assets/hendrix.png")},
  ])
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const [roomSettingsModalVisible, setRoomSettingsModalVisible] = useState(false)

  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.gradient}>
      <View style={[styles.container]}>
        <RoomHeader setRoomSettingsModalVisible={setRoomSettingsModalVisible}/>
        <SearchModal isVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} />
        <RoomSettingsModal isVisible={roomSettingsModalVisible} setRoomSettingsModalVisible={setRoomSettingsModalVisible} navigation={navigation}/>

        <SafeAreaView style={{flex: 1}}>
          <DraggableFlatList
            ListHeaderComponent={() => <Ionicons onPress={() => setSearchModalVisible(true)} name='md-add-circle' style={{textAlign: 'center', padding: 10}}  size={50} color={'#BC7AF7'}/>}
            data={songData}
            onDragEnd={({data}) => setSongData(data)}
            renderItem={({item, isActive, drag, getIndex}) => <QueueItem image={item.image} isActive={isActive} drag={drag} first={getIndex() === 0} name={item.name} artist={item.artist}/>}
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
