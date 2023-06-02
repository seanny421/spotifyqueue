import { Text, View, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import {useEffect, useState} from "react";

export default function QueueItem(props){
  const [favourite, setFavourite] = useState(false)

  useEffect(() => {
    console.log(favourite + ' ' + props.artist)
  }, [favourite])

  return (
    <View>
      <View style={[styles.container, {opacity: props.isActive ? 0.5 : 1}]}>
        <ImageBackground imageStyle={{borderBottomLeftRadius: 15, borderTopLeftRadius: 15}} style={styles.header} resizeMode='cover' source={props.image}>
        <View style={styles.albumCoverContainer}>
        </View>
        </ImageBackground>
        <LinearGradient colors={['#855DAB', '#1A0D40']} start={[0,0]} end={[1, 0.9]} style={styles.gradient}>
            <View>
              <Text style={styles.songName}>{props.name}</Text>
              <Text style={styles.artist}>{props.artist}</Text>
            </View>
          {props.drag !== false &&
            <Pressable onPressIn={props.drag} disabled={props.isActive}>
              <Ionicons name='ios-menu-outline' size={30} color={'#BC7AF7'}/>
            </Pressable>
          }
          {props.drag == false &&
            <Pressable onPressIn={() => setFavourite(!favourite)} disabled={props.isActive}>
              <Ionicons name={favourite ? 'heart' : 'heart-outline'} size={30} color={'#BC7AF7'}/>
            </Pressable>
          }
        </LinearGradient>
      </View>
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
    height: 70,
    paddingHorizontal: 20,
  },
  songName: {
    fontFamily: 'Rubik One',
    fontSize: 20,
    color: "#FFF",
  },
  artist: {
    fontFamily: 'Rubik',
    fontSize: 15,
    color: "#FFF",
  }

});
