import { StatusBar, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonComponent from './ButtonComponent';
import { useEffect } from 'react';
//auth
// import * as AuthSession from 'expo-auth-session';
import { useAuthRequest, ResponseType } from 'expo-auth-session';
import {CLIENT_ID} from '@env'

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function Home({navigation}) {

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: [
        "streaming",
        "app-remote-control",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-private",
        "user-read-email",
      ],
      usePKCE: false,
      //production
      // redirectUri: "exp://exp.host/@seanmcgeachie/queuehub?release-channel=default",
      redirectUri: "exp://192.168.0.22:19000/",
    },
    discovery
  );

  useEffect(() => {
    if(response?.type === 'success'){
      const {access_token} = response.params;
      navigation.navigate('RoomCreator', {accessToken: access_token})
    }
  }, [response])

  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.container}>
      <StatusBar hidden/>
      <View style={styles.container}>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name='people-circle' size={150} color={'#BC7AF7'}/>
              <Text style={styles.titleText}>
                <Text style={{fontFamily: 'Rubik'}}>Queue</Text>
                <Text style={{fontWeight: 'bold'}}>Hub</Text>
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => promptAsync()}>
                <ButtonComponent name='Create'/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Join')}>
                <ButtonComponent name='Join'/>
              </TouchableOpacity>
            </View>
      </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginTop: 50,
    width: '60%',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 30,
    color: "#BC7AF7",
    fontFamily: 'Rubik One'
  }
});
