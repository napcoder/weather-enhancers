import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
// import type { EntityState } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

import { getCurrentWeather } from '../api'
import type { Weather, OWMCurrentWeather } from '../types'
import { RootState } from './store'

interface Params {
  cityInternalId: string
  latitude: number
  longitude: number
  language?: string
}

export const fetchWeather = createAsyncThunk<Weather, Params>(
  'weather/fetchWeather',
  // Declare the type your function argument here:
  async ({ latitude, longitude, cityInternalId, language = 'en' }) => {
    const response: OWMCurrentWeather = await getCurrentWeather(latitude, longitude, language)
    // console.log({ response })
    return {
      cityInternalId,
      timezone: response.timezone,
      dt: response.dt,
      main: response.main,
      weather: response.weather,
    } as Weather
  }
)

const weatherAdapter = createEntityAdapter<Weather>({
  selectId: (item) => item.cityInternalId,
})

const initialState = weatherAdapter.getInitialState()

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, weatherAdapter.addOne)
  },
})

// Action creators are generated for each case reducer function
// export const {} = weatherSlice.actions

export default weatherSlice.reducer

// Can create a set of memoized selectors based on the location of this entity state
const weatherSelectors = weatherAdapter.getSelectors<RootState>((state) => state.weather)

export const {
  selectById: selectWeatherById,
  selectIds: selectWeatherIds,
  selectEntities: selectWeatherEntities,
  selectAll: selectAllWeather,
  selectTotal: selectTotalWeather,
} = weatherSelectors
