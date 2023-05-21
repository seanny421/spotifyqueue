import {SafeAreaView, ImageBackground, StyleSheet, Text } from 'react-native';
import { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync()


export default function RoomHeader(){
  const [fontsLoaded] = useFonts({
    'Rubik One': require('../assets/fonts/RubikOne-Regular.ttf'),
    'Rubik': require('../assets/fonts/Rubik-Regular.ttf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return(
    <ImageBackground imageStyle={{opacity: 0.6, height: '100%'}} style={styles.header} resizeMode='cover' source={require('../images/bg.png')}>
      <SafeAreaView style={styles.container}>
          <Ionicons name='information-circle-sharp' size={40} color={'#fff'} style={styles.topRight}/>
          <Text style={[styles.titleText, styles.topLeft]}>Sean's Queue</Text>
          <Text style={[styles.titleText, styles.bottomRight]}>#1234</Text>
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
    fontWeight: 'bold',
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
