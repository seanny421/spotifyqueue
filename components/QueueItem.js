import { Text, View, StyleSheet, ImageBackground, Pressable } from "react-native"
import { useCallback } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

export default function QueueItem(props){
  const [fontsLoaded] = useFonts({
    'Rubik One': require('../assets/fonts/RubikOne-Regular.ttf'),
    'Rubik': require('../assets/fonts/Rubik-Regular.ttf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //open the modal to allow main user to search & add to queue  
  function openSearchModal(){

  }

  return (
    <View>
      {props.first &&
        <Ionicons onPress={() => openSearchModal()} name='md-add-circle' style={{textAlign: 'center', padding: 10}}  size={50} color={'#BC7AF7'}/>
      }
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
          <Ionicons name='ios-menu-outline' style={{}} size={30} color={'#BC7AF7'}/>
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
    fontWeight: 'bold',
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
