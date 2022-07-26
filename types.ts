import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/*********** REACT NAVIGATION ***************/

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined
  Detail: { cityInternalId: string; name: string; latitude: number; longitude: number }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

/********** OPEN WEATHER MAP API **********/
export type OWMCoord = {
  lat: number
  lon: number
}

type OWMWeatherSubItem = {
  id: number
  main: string
  description: string
  icon: string
}

// Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
export type OWMUnit = 'default' | 'metric' | 'imperial'

type OWMWeatherMain = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
  temp_kf?: unknown
}

type OWMWind = {
  speed: number
  deg: number
  gust: number
}

type OWMClouds = {
  all: number
}

type OWMPrecipitations = {
  '1h': number
  '3h': number
}

type OWMPrecipitations3h = Pick<OWMPrecipitations, '3h'>

type OWMSysWeather = {
  type: number
  id: number
  message: unknown
  country: string
  sunrise: number
  sunset: number
}

type OWMSysForecast = {
  pod: 'd' | 'n'
}

/**
 * Parameters
coord
coord.lon City geo location, longitude
coord.lat City geo location, latitude
weather (more info Weather condition codes)
weather.id Weather condition id
weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
weather.description Weather condition within the group. You can get the output in your language. Learn more
weather.icon Weather icon id
base Internal parameter
main
main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
main.humidity Humidity, %
main.temp_min Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.temp_max Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.sea_level Atmospheric pressure on the sea level, hPa
main.grnd_level Atmospheric pressure on the ground level, hPa
visibility Visibility, meter. The maximum value of the visibility is 10km
wind
wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
wind.deg Wind direction, degrees (meteorological)
wind.gust Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
clouds
clouds.all Cloudiness, %
rain
rain.1h Rain volume for the last 1 hour, mm
rain.3h Rain volume for the last 3 hours, mm
snow
snow.1h Snow volume for the last 1 hour, mm
snow.3h Snow volume for the last 3 hours, mm
dt Time of data calculation, unix, UTC
sys
sys.type Internal parameter
sys.id Internal parameter
sys.message Internal parameter
sys.country Country code (GB, JP etc.)
sys.sunrise Sunrise time, unix, UTC
sys.sunset Sunset time, unix, UTC
timezone Shift in seconds from UTC
id City ID
name City name
cod Internal parameter
 */

interface OWMCurrentWeatherInternal {
  coord: OWMCoord
  weather: Partial<OWMWeatherSubItem>[]
  base: unknown
  main: Partial<OWMWeatherMain>
  visibility: number
  wind: Partial<OWMWind>
  clouds: Partial<OWMClouds>
  pop?: number
  rain: Partial<OWMPrecipitations>
  snow: Partial<OWMPrecipitations>
  dt: number
  sys: Partial<OWMSysWeather>
  timezone: number
  id: number
  name: string
  cod: unknown
}

interface OWMForecastListItem extends Omit<OWMCurrentWeatherInternal, 'sys' | 'rain' | 'snow'> {
  sys: Partial<OWMSysForecast>
  rain: Partial<OWMPrecipitations3h>
  snow: Partial<OWMPrecipitations3h>
  dt_txt: string
}

export type OWMCurrentWeather = Partial<OWMCurrentWeatherInternal>

/*
name Name of the found location
local_names
local_names.[language code] Name of the found location in different languages. The list of names can be different for different locations
local_names.ascii Internal field
local_names.feature_name Internal field
lat Geographical coordinates of the found location (latitude)
lon Geographical coordinates of the found location (longitude)
country Country of the found location
state
*/

export type OWMCityOldApi = {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country?: string
  state?: string
}

export type OWMCity = {
  id: number
  name: string
  coord: OWMCoord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

type OWMForecastInternal = {
  cod: unknown
  message: unknown
  cnt: number
  list: Partial<OWMForecastListItem>[]
  city: Partial<OWMCity>
}

export type OWMForecast = Partial<OWMForecastInternal>

/******* INTERNAL TYPES ********/

type CityInternalId = string

export interface City extends OWMCityOldApi {
  cityInternalId: CityInternalId
  addedTime: number
}

export interface Weather
  extends Pick<OWMCurrentWeatherInternal, 'timezone' | 'main' | 'weather' | 'dt'> {
  cityInternalId: CityInternalId
}

export type Forecast = {
  cityInternalId: CityInternalId
  cnt: number
  list: Pick<OWMForecastListItem, 'dt' | 'timezone' | 'main' | 'weather' | 'dt_txt'>[]
}
