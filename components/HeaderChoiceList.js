import {useState} from "react"
import { View, Text, Image, StyleSheet, FlatList, Pressable} from "react-native"

export default function HeaderChoiceList({setChangeHeaderImage}){
  //FIXME - temp solution
  const images = [ 
    require("../assets/option-bg-1.jpeg"),
    require("../assets/option-bg-2.gif"),
    require("../assets/option-bg-3.jpeg"),
    require("../assets/option-bg-4.webp"),
    require("../assets/option-bg-5.jpeg"),
    require("../assets/optional-bg-6.jpeg"),
    require("../assets/option-bg-7.jpeg"),
  ]
  return(
    <View style={styles(false).container}>
      <Text>Choose Header</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        columnWrapperStyle={{flexShrink: 1}}
        contentContainerStyle={{justifyContent: 'space-around'}}
        numColumns={2}
        data={images}
        renderItem={({item}) => {
          return(
            <HeaderImage setChangeHeaderImage={setChangeHeaderImage} image={item}/>
          )

        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  )

}

function HeaderImage({image, setChangeHeaderImage}){
  const [pressed, setPressed] = useState(false)
  function handleImagePress(){
    setPressed(!pressed)
    setTimeout(() => {
      setChangeHeaderImage(false)
    }, 200)
  }
  return(
      <View style={styles(pressed).imageContianer}>
        <Pressable onPressIn={handleImagePress} onPressOut={handleImagePress}>
          <Image source={image} resizeMode='cover' style={{borderRadius: 10, width: '100%', height: 100}}/>
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
    opacity: pressed ? '0.5': '1',
    margin: 5, 
    marginVertical: 10, 
    flex: 0.5, 
    borderColor: 'red', 
    borderWidth: 0
  }

})
