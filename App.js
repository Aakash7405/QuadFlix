/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import BottomTab from './Screens/BottomTab';
import Details from './Screens/Details';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomTab"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="DetailsScreen" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
