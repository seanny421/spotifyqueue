import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home.js';
import Join from './components/Join';
import RoomCreator from './components/RoomCreator.js';
import { View } from 'react-native'
import "react-native-gesture-handler";
import { useState, useEffect } from 'react';
// wrap whole app with <GestureHandlerRootView>
import { GestureHandlerRootView } from "react-native-gesture-handler";
//custom fonts
import { loadAsync } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts(){
      await loadAsync({
        'Rubik': require('./assets/fonts/Rubik-Regular.ttf'),
        'Rubik One': require('./assets/fonts/RubikOne-Regular.ttf'),
      }).then(() => setFontsLoaded(true))
    }
    loadFonts()
  }, [])

  if(fontsLoaded){
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Join' component={Join}/>
            <Stack.Screen name='RoomCreator' component={RoomCreator}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }
  else{
    return (
      <View></View>
    )
  }
}

