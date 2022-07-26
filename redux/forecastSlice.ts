import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
// import type { EntityState } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

import { getForecast } from '../api'
import type { Forecast, OWMForecast } from '../types'
import { RootState } from './store'

interface Params {
  cityInternalId: string
  latitude: number
  longitude: number
  language?: string
}

export const fetchForecast = createAsyncThunk<Forecast, Params>(
  'forecast/fetchForecast',
  // Declare the type your function argument here:
  async ({ latitude, longitude, cityInternalId, language = 'en' }) => {
    const response: OWMForecast = await getForecast(latitude, longitude, language)
    // console.log({ response })
    return {
      cityInternalId,
      cnt: response.cnt,
      list: response.list?.map((item) => ({
        dt: item?.dt,
        timezone: item?.timezone,
        main: item?.main,
        weather: item?.weather,
        dt_txt: item?.dt_txt,
      })),
    } as Forecast
  }
)

const forecastAdapter = createEntityAdapter<Forecast>({
  selectId: (item) => item.cityInternalId,
})

const initialState = forecastAdapter.getInitialState()

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.fulfilled, forecastAdapter.addOne)
  },
})

// Action creators are generated for each case reducer function
// export const {} = forecastSlice.actions

export default forecastSlice.reducer

// Can create a set of memoized selectors based on the location of this entity state
const forecastSelectors = forecastAdapter.getSelectors<RootState>((state) => state.forecast)

export const {
  selectById: selectForecastById,
  selectIds: selectForecastIds,
  selectEntities: selectForecastEntities,
  selectAll: selectAllForecast,
  selectTotal: selectTotalForecast,
} = forecastSelectors
