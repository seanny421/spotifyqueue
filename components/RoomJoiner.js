import { StyleSheet, View, SafeAreaView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RoomHeader from './RoomHeader';
import {useState} from 'react';
import QueueItem from './QueueItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchModal from './SearchModal';
import RoomSettingsModal from './RoomSettingsModal';
import defaultImage from '../assets/bg.png';


export default function RoomJoiner({navigation}) {
  const [headerImage, setHeaderImage] = useState(Image.resolveAssetSource(defaultImage).uri)
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

  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.gradient}>
      <View style={[styles.container]}>
        <RoomHeader navigation={navigation} headerImage={headerImage} setRoomSettingsModalVisible={false}/>
        <SearchModal isVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} />

        <SafeAreaView style={{flex: 1}}>
          <FlatList
            ListHeaderComponent={() => <Ionicons onPress={() => setSearchModalVisible(true)} name='md-add-circle' style={{textAlign: 'center', padding: 10}}  size={50} color={'#BC7AF7'}/>}
            data={songData}
            renderItem={({item, index}) => <QueueItem image={item.image} isActive={false} drag={false} first={index === 0}  name={item.name} artist={item.artist}/>}
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
