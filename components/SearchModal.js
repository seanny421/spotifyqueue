import { StyleSheet, TextInput, View, Modal, Pressable, Text, FlatList} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import ButtonComponent from "./ButtonComponent";
import QueueItem from "./QueueItem";
import { useState } from "react";

export default function SearchModal({accessToken, isVisible, setSearchModalVisible}){
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([]);

  async function fetchSongsFromText(){
    await fetch('https://api.spotify.com/v1/search?q=' + searchText + '&type=track', {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + accessToken 
      },
    })
      .then(res => res.json())
      .then(r => {
        setSearchResult(r.tracks.items)
      })
      .catch(err => console.log(err))
  }

  if(searchResult.length > 0){
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
              <FlatList
                data={searchResult}
                onDragEnd={({data}) => {
                  setQueue(data)
                }}
                renderItem={({item, isActive, index}) => <QueueItem accessToken={accessToken} image={item.album.images[0].url} uri={item.uri} drag={false} search={true} isActive={isActive} first={false} name={item.name} artist={item.artists[0].name}/>}
                keyExtractor={(item, index) => index}
              />
              <Pressable style={({pressed}) => [{marginBottom: '10%', width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={() => setSearchResult([])}  >
                <ButtonComponent name="Close"/>
              </Pressable>
            </LinearGradient>
            </View>
        </Modal>
    )
  }
  else {
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
                <Pressable onPress={fetchSongsFromText}>
                  <ButtonComponent name="Search" />
                </Pressable>
              </View>
              <Pressable style={({pressed}) => [{marginBottom: '10%', width: '100%', alignItems: 'flex-start', opacity: pressed ? 0.5 : 1 }]} onPress={() => setSearchModalVisible(false)}  >
                <ButtonComponent name="Close"/>
              </Pressable>
            </LinearGradient>
            </View>
        </Modal>
    )

  }


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
