import axios from 'axios'
import Constants from 'expo-constants'

import type { OWMCityOldApi, OWMCurrentWeather, OWMForecast } from '../types'

const OPENWEATHERMAP_API_KEY = Constants?.manifest?.extra?.openWeatherMapApiKey

/**
 * OpenWeatherMap API
 */
const api = axios.create({
  baseURL: 'http://api.openweathermap.org',
  timeout: 1000,
})

/**
 * Make a direct geocoding query to find city coordinates and metadata
 */
export async function findCity(cityName: string, country?: string) {
  const query = cityName + (country ? `,${country}` : '')
  const result = await api.request<OWMCityOldApi[]>({
    method: 'get',
    url: '/geo/1.0/direct',
    params: {
      appId: OPENWEATHERMAP_API_KEY,
      q: query,
    },
  })
  if (result.data?.length > 0) {
    return result.data[0]
  }
  throw new Error('City not found')
}

/**
 * Get current weather for specified coordinates and language
 */
export async function getCurrentWeather(
  latitude: number,
  longitude: number,
  language: string = 'en'
) {
  const result = await api.request<OWMCurrentWeather>({
    method: 'get',
    url: '/data/2.5/weather',
    params: {
      appId: OPENWEATHERMAP_API_KEY,
      units: 'metric',
      lat: latitude,
      lon: longitude,
      lang: language,
    },
  })
  return result.data
}

/**
 * Get 5 days / 3 hours forecast for specified coordinates and language
 */
export async function getForecast(latitude: number, longitude: number, language: string = 'en') {
  const result = await api.request<OWMForecast>({
    method: 'get',
    url: '/data/2.5/forecast',
    params: {
      appId: OPENWEATHERMAP_API_KEY,
      units: 'metric',
      lat: latitude,
      lon: longitude,
      lang: language,
    },
  })
  // console.log('forecast result', result)
  return result.data
}
