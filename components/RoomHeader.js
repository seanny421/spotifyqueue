import {SafeAreaView, ImageBackground, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function RoomHeader(){
  return(
    <ImageBackground imageStyle={{opacity: 0.6}} style={styles.header} resizeMode='cover' source={require('../images/bg.png')}>
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
    height: 250,
  },
  container: {
    flex: 1,
    position: 'relative',
    width: 1000,
  },
  titleText: {
    fontWeight: 'bold',
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
