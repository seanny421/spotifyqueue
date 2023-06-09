import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function ButtonComponent(props){
  return (
    <LinearGradient colors={[props.color ? props.color : '#BC7AF7', '#28184E']} start={[0,0]} end={[1,1]} style={styles.gradient}>
        <Text style={styles.text}>{props.name}</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 100,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Rubik'
  }
});
