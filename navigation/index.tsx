/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import { RootStackParamList } from '../types'

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation, route }) => ({
          title: route.params.name,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 32,
            fontWeight: '600',
            letterSpacing: 0,
            lineHeight: 48,
            textAlign: 'center',
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Image
                style={{ width: 23, height: 19 }}
                source={require('../assets/images/ArrowLeft.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/PlusWhite.png')}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  )
}
