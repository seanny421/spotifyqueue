import { Text, View, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function QueueItem(props){//multiple optional props such as search (used when the list is a search result)
  const [favourite, setFavourite] = useState(false)

  function addToQueue(){
    console.log(props.uri)
    fetch('https://api.spotify.com/v1/me/player/queue?uri=' + props.uri, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + props.accessToken 
      },
    })
      .catch(err => console.log(err))
  }

  return (
    <View>
      <View style={[styles(props.drag).container, {opacity: props.isActive ? 0.5 : 1}]}>
        <ImageBackground imageStyle={{borderBottomLeftRadius: 15, borderTopLeftRadius: 15}} style={styles(props.drag).header} resizeMode='cover' source={{uri: props.image}}>
        <View style={styles(props.drag).albumCoverContainer}>
        </View>
        </ImageBackground>
        <LinearGradient colors={['#855DAB', '#1A0D40']} start={[0,0]} end={[1, 0.9]} style={styles(props.drag).gradient}>
          <View style={{width: '80%'}}>
              <Text style={styles(props.drag).songName}>{props.name}</Text>
              <Text style={styles(props.drag).artist}>{props.artist}</Text>
            </View>
          {props.drag !== false &&
            <Pressable onPressIn={props.drag} disabled={props.isActive}>
              <Ionicons name='ios-menu-outline' size={30} color={'#BC7AF7'}/>
            </Pressable>
          }
          {props.drag == false && !props.search &&
            <Pressable onPressIn={() => setFavourite(!favourite)} disabled={props.isActive}>
              <Ionicons name={favourite ? 'heart' : 'heart-outline'} size={30} color={'#BC7AF7'}/>
            </Pressable>
          }
          {props.drag == false && props.search &&
            <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1 }]} onPress={addToQueue}  >
              <Ionicons name={'add-circle'} size={35} color={'#BC7AF7'}/>
            </Pressable>
          }

        </LinearGradient>
      </View>
    </View>
  )
}

const styles = (drag) => StyleSheet.create({
  albumCoverContainer: {
    width: 100,
    height: 'auto',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: drag ? 0 : 15,
    margin: drag ? 10 : 0,
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
