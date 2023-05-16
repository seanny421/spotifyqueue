import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import RoomHeader from './RoomHeader';

export default function RoomCreator({navigation}) {
  return (
      <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={styles.gradient}>
      <View style={styles.container}>
        <RoomHeader/>
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
  buttonsContainer: {
    marginTop: 50,
  },
  titleText: {
    fontSize: 30,
    color: "#BC7AF7"
  }


});
