import { StyleSheet, TextInput, View, Modal, Pressable, Text} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import ButtonComponent from "./ButtonComponent";
import { useState } from "react";

export default function SearchModal({isVisible, setSearchModalVisible}){
  //FIXME - TEMP
  const [searchText, setSearchText] = useState('')
  return (
      <Modal
        animationType="fade"
        visible={isVisible}
        transparent={true}
        onRequestClose={() => {
          setSearchModalVisible(!isVisible);
        }}>
          <View style={styles.modalContainer}>
          <LinearGradient colors={['#3A305B', '#000000']} start={[0.5,0]} end={[1, 0.85]} style={[styles.modalView]}>
            <View>
              <TextInput inputMode='text' placeholder='What we listening to?' value={searchText} onChangeText={setSearchText} style={styles.searchInput}/>
              <ButtonComponent name="Search"/>
            </View>
            <Pressable style={({pressed}) => [{marginBottom: '10%', width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={() => setSearchModalVisible(false)}  >
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
    height: '78%', 
  },
  modalView: {
    marginVertical: 50,
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
