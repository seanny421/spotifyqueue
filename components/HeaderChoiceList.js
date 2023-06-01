import {useState} from "react"
import { View, Image, StyleSheet, FlatList, Pressable} from "react-native"
//FIXME - temp solution
import option1 from '../assets/option-bg-1.jpeg'
import option2 from '../assets/option-bg-2.gif'
import option3 from '../assets/option-bg-3.jpeg'
import option4 from '../assets/option-bg-4.webp'
import option5 from '../assets/option-bg-5.jpeg'
import option6 from '../assets/optional-bg-6.jpeg'
import option7 from '../assets/option-bg-7.jpeg'

export default function HeaderChoiceList({ setHeaderImage, handleClose}){
  //FIXME - temp solution
  const images = [ 
    Image.resolveAssetSource(option1).uri,
    Image.resolveAssetSource(option2).uri,
    Image.resolveAssetSource(option3).uri,
    Image.resolveAssetSource(option4).uri,
    Image.resolveAssetSource(option5).uri,
    Image.resolveAssetSource(option6).uri,
    Image.resolveAssetSource(option7).uri,
  ]
  return(
    <View style={styles(false).container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        columnWrapperStyle={{flexShrink: 1}}
        contentContainerStyle={{justifyContent: 'space-around'}}
        numColumns={2}
        data={images}
        renderItem={({item}) => {
          return(
            <HeaderImage setHeaderImage={setHeaderImage} handleClose={handleClose} image={item}/>
          )
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

function HeaderImage({setHeaderImage, image, handleClose}){
  const [pressed, setPressed] = useState(false)
  function handleImagePress(){
    setPressed(!pressed)
    setHeaderImage(image)
  }

  function closeWindow(){
    handleClose()
  }

  return(
      <View style={styles(pressed).imageContianer}>
        <Pressable onPress={closeWindow} onPressIn={handleImagePress} onPressOut={handleImagePress}>
          <Image source={{uri: image}} resizeMode='cover' style={{borderRadius: 10, width: '100%', height: 100}}/>
        </Pressable>
      </View>

  )
}

const styles = (pressed) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  imageContianer: {
    height: 100, 
    opacity: pressed ? 0.5: 1,
    margin: 5, 
    marginVertical: 10, 
    flex: 0.5, 
    borderColor: 'red', 
    borderWidth: 0
  }

})
