/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler'; // Navigation
import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { appDark, appRed } from '../Styles/Styles';
import MainScreen from '../Screens/MainScreen';
import ListVideo from '../Screens/ListVideo';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        ...Platform.select({
          ios: {
            headerStyle: {
              backgroundColor: appDark,
              height: 110,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTintColor: appRed,
          },
          android: {
            headerStyle: {
              backgroundColor: appDark,
              height: 65,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTintColor: '#fff',
          },
        }),
        cardStyle: { backgroundColor: appDark },
      }}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        // title: 'App Name'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListVideo"
        component={ListVideo}
        options={{
          headerShown: false,
          title: 'Resultados',
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
