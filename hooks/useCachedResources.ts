import {
  // Poppins_100Thin,
  // Poppins_100Thin_Italic,
  // Poppins_200ExtraLight,
  // Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  // Poppins_300Light_Italic,
  Poppins_400Regular,
  // Poppins_400Regular_Italic,
  Poppins_500Medium,
  // Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  // Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  // Poppins_700Bold_Italic,
  // Poppins_800ExtraBold,
  // Poppins_800ExtraBold_Italic,
  // Poppins_900Black,
  // Poppins_900Black_Italic,
  // useFonts,
} from '@expo-google-fonts/poppins'
import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          Poppins_300Light,
          Poppins: Poppins_400Regular,
          Poppins_500Medium,
          Poppins_600SemiBold,
          Poppins_700Bold,
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
