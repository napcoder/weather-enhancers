import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import type { EntityState } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

import { findCity } from '../api'
import type { City, OWMCityOldApi } from '../types'
import { RootState } from './store'

interface Params {
  cityName: string
  country?: string
  // addedTime: number
}

interface InitialState extends EntityState<City> {
  loading: boolean
  error: any | null
  query: any
}

export const fetchCity = createAsyncThunk<City, Params>(
  'cities/fetchCity',
  // Declare the type your function argument here:
  async ({ cityName, country }) => {
    const response: OWMCityOldApi = await findCity(cityName, country)
    // console.log({ response })
    return {
      ...response,
      cityInternalId: response.lat + '_' + response.lon,
      addedTime: Date.now(),
    } as City
  }
)

const citiesAdapter = createEntityAdapter<City>({
  selectId: (city) => city.cityInternalId,
  sortComparer: (a, b) => a.addedTime - b.addedTime,
})

const initialState: InitialState = citiesAdapter.getInitialState({
  loading: false,
  error: null,
  query: null,
})

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    removeCity: citiesAdapter.removeOne,
    resetCityError: (state) => {
      state.loading = false
      state.error = null
      state.query = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCity.pending, (state, action) => {
      state.loading = true
      state.error = null
      state.query = action.meta.arg
    })
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.loading = false
      state.query = null
      citiesAdapter.addOne(state, action)
    })
    builder.addCase(fetchCity.rejected, (state, { error }) => {
      state.loading = false
      state.error = error
    })
  },
})

// Action creators are generated for each case reducer function
export const { removeCity, resetCityError } = citiesSlice.actions

export default citiesSlice.reducer

// Can create a set of memoized selectors based on the location of this entity state
const citiesSelectors = citiesAdapter.getSelectors<RootState>((state) => state.cities)

export const {
  selectById: selectCityById,
  selectIds: selectCityIds,
  selectEntities: selectCityEntities,
  selectAll: selectAllCities,
  selectTotal: selectTotalCities,
} = citiesSelectors

export const selectCitiesLoadingState = (state: RootState) => ({
  loading: state.cities.loading,
  error: state.cities.error,
  query: state.cities.query,
})
