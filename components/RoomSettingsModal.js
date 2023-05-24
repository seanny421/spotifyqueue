import { Modal, View, StyleSheet, Pressable, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonComponent from "./ButtonComponent";

export default function RoomSettingsModal({isVisible, setRoomSettingsModalVisible, navigation}){
  return(
      <Modal
        animationType="fade"
        visible={isVisible}
        transparent={true}
        onRequestClose={() => {
          setRoomSettingsModalVisible(!isVisible);
        }}>
          <View style={styles.modalContainer}>
          <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={[styles.modalView]}>
            <ImageBackground imageStyle={{borderBottomLeftRadius: 15, borderTopLeftRadius: 15}} style={styles.header} resizeMode='contain' source={require('../assets/qr.png')}>
              <View style={{width: 10, height: '40%'}}>
              </View>
            </ImageBackground>
            <View>
              <Pressable onPress={() => console.log('yo')}>
                <ButtonComponent name="Change header image"/>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Home')}>
                <ButtonComponent name="End Session" color={'#F93943'}/>
              </Pressable>
            </View>
            <Pressable style={({pressed}) => [{ width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={() => setRoomSettingsModalVisible(false)}  >
              <ButtonComponent name="Close"/>
            </Pressable>
          </LinearGradient>
          </View>
      </Modal>
  )

}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%', 
    position: 'absolute',
    bottom: 0,
    height: '100%', 
  },
  modalView: {
    padding: 35,
    height: '100%',
    justifyContent: 'space-between'
  },
  searchInput: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    paddingVertical: 15,
    width: '100%',
    textAlign: 'center',
    borderRadius: 100,
    fontSize: 20
  },
});
