import * as Localization from 'expo-localization'
import { StatusBar } from 'expo-status-bar'
import i18n from 'i18n-js'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import 'moment/locale/it'

import useCachedResources from './hooks/useCachedResources'
import usePrefillCities from './hooks/usePrefillCities'
import { en, it } from './i18n/supportedLanguages'
import Navigation from './navigation'
import { setupStore } from './redux/store'

i18n.fallbacks = true
i18n.translations = { en, it }
i18n.locale = Localization.locale

if (Localization.locale.substring(0, 2) === 'it') {
  moment.locale('it')
} else {
  moment.locale('en')
}

const store = setupStore()

export default function App() {
  const isLoadingComplete = useCachedResources()
  // const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <PrefilledApp />
      </Provider>
    )
  }
}

function PrefilledApp() {
  usePrefillCities()
  // const isPrefilledWithCities = usePrefillCities()

  // console.log({ isPrefilledWithCities })

  // console.log('returning app')
  return (
    <SafeAreaProvider>
      <Navigation />
      {/* <Navigation colorScheme={colorScheme} /> */}
      <StatusBar />
    </SafeAreaProvider>
  )
}
