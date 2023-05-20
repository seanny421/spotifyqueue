import { StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RoomHeader from './RoomHeader';
import {useEffect, useState} from 'react';
import QueueItem from './QueueItem';
import DraggableFlatList from 'react-native-draggable-flatlist';

export default function RoomCreator({navigation}) {
  //FIXME - TEMP
  const [songData, setSongData] = useState([])

  useEffect(() => {
    for(let i = 0; i < 4; i++){
      if(i % 2 == 0)
        setSongData((songData) => [...songData, {name: "Airbender", artist: "Avatar"}])
      else
        setSongData((songData) => [...songData, {name: "Sandstorm", artist: "Darude"}])
    }
  }, [])


  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.gradient}>
      <View style={styles.container}>
        <RoomHeader/>
        <SafeAreaView>
          <DraggableFlatList
            data={songData}
            onDragEnd={({data}) => setSongData(data)}
            renderItem={({item, isActive, drag, getIndex}) => <QueueItem isActive={isActive} drag={drag} first={getIndex() === 0} name={item.name} artist={item.artist}/>}
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
