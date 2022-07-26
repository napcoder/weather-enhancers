import { LinearGradient } from 'expo-linear-gradient'
import I18n from 'i18n-js'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes'
import { fetchWeather, selectWeatherById } from '../redux/weatherSlice'
import WeatherIcon from './WeatherIcon'

interface Props {
  cityInternalId: string
  name: string
  index: number
  latitude: number
  longitude: number
  onPress: (cityInternalId: string) => void
}

const RootContainer = styled.TouchableOpacity`
  background-color: transparent;
  min-height: 150px;
  border-radius: 25px;
  margin-bottom: 20px;
  margin-horizontal: 20px;
  shadow-color: #000;
  ${Platform.select({
    ios: `
      shadow-offset: 5px 10px;
      shadow-radius: 20px;
      shadow-opacity: 0.17;
    `,
    android: `
      elevation: 24;
    `,
  })};
`

const Gradient = styled(LinearGradient)`
  border-radius: 25px;
  flex-direction: row;
  min-height: 150px;

  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`

const CityName = styled.Text`
  color: #fff;
  font-family: Poppins_600SemiBold;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 39px;
`

const LeftContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 1;
`

const DateText = styled.Text`
  color: #fff;
  font-family: Poppins_500Medium;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
`

const Time = styled.Text`
  color: #fff;
  font-family: Poppins_300Light;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 18px;
`

const Temperature = styled.Text`
  color: #ffffff;
  font-family: Poppins_700Bold;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 76px;
  text-align: right;
`

const IconContainer = styled.View`
  margin-horizontal: 15px;
`
/**
 * color palette for card gradient, 3 static styles cycling
 */
const colors = [
  ['#011354', '#5B9FE3'],
  ['#5374E7', '#77B9F5'],
  ['#464C64', '#99A9B9'],
]

/**
 * Get the date localized (current date preferred in this case)
 */
function getDate(dt: number = Date.now(), timezone: number = 0, lang: string) {
  if (lang === 'it') {
    return moment.utc(Date.now() + timezone * 1000).format('dddd D MMMM')
  } else {
    return moment.utc(Date.now() + timezone * 1000).format('dddd Do, MMMM')
  }
}

/**
 * Get the time localized (current time preferred in this case)
 */
function getTime(dt: number = Date.now(), timezone: number = 0, lang: string) {
  if (lang === 'it') {
    return moment.utc(Date.now() + timezone * 1000).format('LT')
  } else {
    return moment.utc(Date.now() + timezone * 1000).format('LT')
  }
}

/**
 * Card representing City data in home
 */
export default function CityCard({
  cityInternalId,
  name,
  index,
  latitude,
  longitude,
  onPress,
}: Props) {
  const dispatch = useAppDispatch()

  // start fetch thunk action to get current weather data
  useEffect(() => {
    const language = I18n.locale.substring(0, 2)
    dispatch(fetchWeather({ cityInternalId, latitude, longitude, language }))
  }, [cityInternalId, dispatch, latitude, longitude])

  // get result of fetch, when available
  const currentWeather = useAppSelector((state) => selectWeatherById(state, cityInternalId))

  // memoized date
  const date = useMemo(
    () =>
      currentWeather == null
        ? ''
        : getDate(currentWeather.dt, currentWeather.timezone, I18n.locale.substring(0, 2)),
    [currentWeather]
  )

  // memoized time
  const time = useMemo(
    () =>
      currentWeather == null
        ? ''
        : getTime(currentWeather.dt, currentWeather.timezone, I18n.locale.substring(0, 2)),
    [currentWeather]
  )

  // avoid to draw anithing with no data
  if (!currentWeather) {
    return null
  }

  const selectedColors = colors[index % 3]
  return (
    <RootContainer onPress={onPress}>
      <Gradient colors={selectedColors} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
        <LeftContainer>
          <CityName>{name}</CityName>
          <DateText>{date}</DateText>
          <Time>{time}</Time>
        </LeftContainer>
        <IconContainer>
          <WeatherIcon iconId={currentWeather.weather?.[0]?.icon ?? '01d'} />
        </IconContainer>
        <Temperature>
          {currentWeather.main.temp != null ? Math.ceil(currentWeather.main.temp) : '-'}°
        </Temperature>
      </Gradient>
    </RootContainer>
  )
}
