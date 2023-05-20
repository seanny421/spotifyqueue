import { Text, View, StyleSheet, ImageBackground } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function QueueItem(props){
  return (
    <View style={styles.container}>
      <ImageBackground imageStyle={{borderBottomLeftRadius: 15, borderTopLeftRadius: 15}} style={styles.header} resizeMode='cover' source={require('../assets/mac-demarco.png')}>
      <View style={styles.albumCoverContainer}>
      </View>
      </ImageBackground>
      <LinearGradient colors={['#855DAB', '#1A0D40']} start={[0,0]} end={[1, 0.9]} style={styles.gradient}>
        <View>
          <Text style={styles.songName}>{props.name}</Text>
          <Text style={styles.artist}>{props.artist}</Text>
        </View>
        <Ionicons name='md-sync-circle' style={{transform: [{rotate: '90deg'}]}} size={40} color={'#BC7AF7'}/>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  albumCoverContainer: {
    width: 100,
    height: 'auto',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    height: 80,
    paddingHorizontal: 20,
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 25,
    color: "#FFF",
  },
  artist: {
    fontSize: 20,
    color: "#FFF",
  }


});
