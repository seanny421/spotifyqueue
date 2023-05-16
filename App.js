import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home.js';
import Join from './components/Join';
import RoomCreator from './components/RoomCreator.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Join' component={Join}/>
        <Stack.Screen name='RoomCreator' component={RoomCreator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

