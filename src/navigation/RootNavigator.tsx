import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import StartGameScreen from '../screens/StartGameScreen';
import HomeScreen from '../screens/HomeScreen';
import SelectLevelsScreen from '../screens/SelectLevelsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import FailureScreen from '../screens/FailureScreen';
import RememberWordsScreen from '../screens/RememberWordsScreen';
import TakeTestScreen from '../screens/TakeTestScreen';
import HighScoreScreen from '../screens/HighScoreScreen';
import UserNameScreen from '../screens/UserNameScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="StartGameScreen" component={StartGameScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="FailureScreen" component={FailureScreen} />
        <Stack.Screen name="TakeTestScreen" component={TakeTestScreen} />
        <Stack.Screen name="HighScoreScreen" component={HighScoreScreen} />
        <Stack.Screen name="UserNameScreen" component={UserNameScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RememberWordsScreen"
          component={RememberWordsScreen}
        />
        <Stack.Screen
          name="SelectLevelsScreen"
          component={SelectLevelsScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
