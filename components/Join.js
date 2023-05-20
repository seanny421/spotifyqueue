import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import ButtonComponent from './ButtonComponent';
import {useState} from 'react';
import BackButton from './BackButton';

export default function Join({navigation}) {
  const [roomCode, setroomCode] = useState('')
  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.container}>
      <View style={styles.container}>
            <Text style={styles.titleText}>
              <Text>Enter given code to join room</Text>
            </Text>
            <View style={styles.buttonsContainer}>
              <TextInput inputMode='numeric' placeholder='#1234' value={roomCode} onChangeText={setroomCode} style={styles.roomCodeInput}/>
                
              <TouchableOpacity onPress={() => navigation.navigate('Join')}>
                <ButtonComponent name='Join'/>
              </TouchableOpacity>
            </View>
            <BackButton navigation={navigation}/>
      </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomCodeInput: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    padding: 15,
    paddingHorizontal: 80,
    borderRadius: 100,
    fontSize: 25
  },
  buttonsContainer: {
    marginTop: 50,
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    fontSize: 30,
    color: "#BC7AF7"
  }


});
