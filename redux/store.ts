import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'

import citiesReducers from './citiesSlice'
import forecastReducers from './forecastSlice'
import weatherReducers from './weatherSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  cities: citiesReducers,
  weather: weatherReducers,
  forecast: forecastReducers,
})

// const store = configureStore({
//   reducer: rootReducer,
// })

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
