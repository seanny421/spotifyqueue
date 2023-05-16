import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonComponent from './ButtonComponent';

export default function Home({navigation}) {
  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.container}>
      <View style={styles.container}>
            <Ionicons name='people-circle' size={150} color={'#BC7AF7'}/>
            <Text style={styles.titleText}>
              <Text>Queue</Text>
              <Text style={{fontWeight: 'bold'}}>Hub</Text>
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('RoomCreator')}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginTop: 50,
  },
  titleText: {
    fontSize: 30,
    color: "#BC7AF7"
  }


});
