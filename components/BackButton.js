import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';

export default function BackButton({navigation}){
  return (
    <View style={{position: 'absolute', bottom: 20, left: 20}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name='arrow-back-circle' size={40} color={'#BC7AF7'}/>
      </TouchableOpacity>
    </View>
  )

}
