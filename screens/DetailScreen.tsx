import { useHeaderHeight } from '@react-navigation/elements'
import { LinearGradient } from 'expo-linear-gradient'
// import { StatusBar } from 'expo-status-bar'
import I18n from 'i18n-js'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import CustomTabBar from '../components/CustomTabBar'
import ForecastCard from '../components/ForecastCard'
import TemperatureLine from '../components/TemperatureLine'
import WeatherIcon from '../components/WeatherIcon'
import { getDate } from '../helpers/timeUtils'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes'
import { fetchForecast, selectForecastById } from '../redux/forecastSlice'
import { selectWeatherById } from '../redux/weatherSlice'
import { RootStackScreenProps } from '../types'

const RootContainer = styled(LinearGradient)`
  flex: 1;
`

const MainWrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  background-color: transparent;
  margin-top: ${(props) => props.marginTop}px;
  padding-bottom: 20px;
  /* padding: 20px; */
`

const UpperSection = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    paddingBottom: 120,
  },
}))``
const FooterContainer = styled.View`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
`
const Header = styled.View`
  justify-content: flex-start;
  align-items: center;
`
const DateText = styled.Text`
  color: #ffffff;
  font-family: Poppins_500Medium;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  /* line-height: 18px; */
  text-align: center;
  /* margin-top: 10px; */
`

const WeatherDescription = styled.Text`
  color: #ffffff;
  font-family: Poppins_300Light;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 30px;
  text-align: center;
  margin-top: 15px;
`

const MainWeatherContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 60px;
`

const TempText = styled.Text`
  color: #ffffff;
  font-family: Poppins_700Bold;
  font-size: 110px;
  font-weight: bold;
  letter-spacing: 0;
  /* line-height: 166px; */
  text-align: right;
  margin-left: 40px;
`
const ForecastCards = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    paddingRight: 25,
  },
}))`
  padding-left: 5px;
`

const TemperatureLineContainer = styled.View`
  margin-vertical: 45px;
`

export default function DetailScreen({ route }: RootStackScreenProps<'Detail'>) {
  const headerHeight = useHeaderHeight()
  const currentWeather = useAppSelector((state) =>
    selectWeatherById(state, route.params.cityInternalId)
  )
  const forecastData = useAppSelector((state) =>
    selectForecastById(state, route.params.cityInternalId)
  )
  const currentDate = useMemo(
    () =>
      currentWeather == null
        ? ''
        : getDate(currentWeather.dt, currentWeather.timezone, I18n.locale.substring(0, 2)),
    [currentWeather]
  )

  // const currentTime = useMemo(
  //   () =>
  //     currentWeather == null
  //       ? ''
  //       : getTime(currentWeather.dt, currentWeather.timezone, I18n.locale.substring(0, 2)),
  //   [currentWeather]
  // )

  const cardsData = useMemo(() => {
    if (forecastData == null || forecastData.list.length < 1) {
      return []
    }
    const { list } = forecastData
    const today = list[0].dt_txt.substring(0, 10)

    const filtered = list.filter(
      (item) => item.dt_txt.substring(0, 10) !== today && item.dt_txt.substring(11) === '12:00:00'
    )
    return filtered
  }, [forecastData])

  const tempLineData = useMemo(() => {
    if (forecastData == null || forecastData.list.length < 1) {
      return []
    }
    const realList = forecastData.list.slice(0, 8).map((item) => ({
      dt: item.dt ?? 0,
      temp: item.main?.temp ?? 0,
      dt_txt: item.dt_txt ?? '',
    }))
    const triplicatedList = realList.flatMap((item) => {
      const plus1 = moment.unix(item.dt).utc().add(1, 'hours')
      const plus2 = moment.unix(item.dt).utc().add(2, 'hours')
      return [
        item,
        {
          ...item,
          dt: plus1.unix(),
          dt_txt: plus1.format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          ...item,
          dt: plus2.unix(),
          dt_txt: plus2.format('YYYY-MM-DD HH:mm:ss'),
        },
      ]
    })
    return triplicatedList
  }, [forecastData])

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!currentWeather) {
      return
    }
    const language = I18n.locale.substring(0, 2)
    dispatch(
      fetchForecast({
        cityInternalId: route.params.cityInternalId,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        language,
      })
    )
  }, [
    route.params.cityInternalId,
    dispatch,
    route.params.latitude,
    route.params.longitude,
    currentWeather,
  ])

  if (!currentWeather || !forecastData) {
    return null
  }

  const weatherDescription = currentWeather.weather?.[0]?.description ?? ''

  return (
    <RootContainer colors={['#5374E7', '#77B9F5']}>
      <MainWrapper marginTop={headerHeight ?? 0} edges={['bottom', 'left', 'right']}>
        <UpperSection showsVerticalScrollIndicator={false}>
          <Header>
            <DateText>{currentDate}</DateText>
            <WeatherDescription>
              {weatherDescription.length > 0
                ? weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
                : ''}
            </WeatherDescription>
            <MainWeatherContainer>
              <WeatherIcon iconId={currentWeather.weather?.[0]?.icon ?? '01a'} />
              <TempText>{Math.ceil(currentWeather.main.temp ?? 0)}°</TempText>
            </MainWeatherContainer>
          </Header>
          <TemperatureLineContainer>
            <TemperatureLine data={tempLineData} />
          </TemperatureLineContainer>
          <ForecastCards horizontal showsHorizontalScrollIndicator={false}>
            {cardsData.map((item) => (
              <ForecastCard
                key={item.dt_txt}
                iconId={item?.weather?.[0]?.icon ?? '01d'}
                dateTimestamp={item.dt}
                temperature={item?.main?.temp ?? 0}
              />
            ))}
          </ForecastCards>
        </UpperSection>
        <View>
          <FooterContainer>
            <CustomTabBar />
          </FooterContainer>
        </View>
      </MainWrapper>
    </RootContainer>
  )
}
