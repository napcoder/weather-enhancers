import I18n from 'i18n-js'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import CityCard from '../components/CityCard'
import CustomTabBar from '../components/CustomTabBar'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes'
import { resetCityError, selectAllCities, selectCitiesLoadingState } from '../redux/citiesSlice'
import { RootStackScreenProps } from '../types'

const RootContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  background-color: transparent;
`

const UpperSection = styled.View``

const Title = styled.Text`
  color: #01175f;
  font-family: Poppins_600SemiBold;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 42px;
  text-align: center;
`

const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
`

const HeaderContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
`
const MainContainer = styled.View`
  margin-top: 40px;
`

const FooterContainer = styled.View`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
`

const AddCityContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
const AddCityImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`
const AddCityLabel = styled.Text`
  color: #01175f;
  font-family: Poppins_600SemiBold;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 30px;
  text-align: center;
`

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const loadingState = useAppSelector(selectCitiesLoadingState)
  const dispatch = useAppDispatch()
  const allCities = useAppSelector(selectAllCities)
  const locale = I18n.locale
  const localeMin = I18n.locale.substring(0, 2)
  console.log({ locale, localeMin })

  useEffect(() => {
    if (loadingState.error && !alertOpen) {
      setAlertOpen(true)
      Alert.alert(I18n.t('error'), I18n.t('home.errorGettingCity'), [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetCityError())
            setAlertOpen(false)
          },
        },
      ])
    }
  }, [loadingState.error, dispatch, alertOpen])

  return (
    <RootContainer edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'space-between', paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}>
        <UpperSection>
          <HeaderContainer>
            <TitleContainer>
              <Title>{I18n.t('home.welcomeTitle')}</Title>
              <Title>Mario</Title>
            </TitleContainer>
            <AddCityContainer disabled={loadingState.loading}>
              <AddCityImage source={require('../assets/images/Plus.png')} />
              <AddCityLabel>{I18n.t('home.addCity')}</AddCityLabel>
            </AddCityContainer>
          </HeaderContainer>
          <MainContainer>
            {allCities.map((city, index) => {
              const name =
                city.local_names?.[locale] ??
                city.local_names?.[localeMin] ??
                city.local_names?.en ??
                city.name
              return (
                <CityCard
                  key={city.cityInternalId}
                  cityInternalId={city.cityInternalId}
                  name={name}
                  index={index}
                  latitude={city.lat}
                  longitude={city.lon}
                  onPress={() => {
                    navigation.navigate('Detail', {
                      cityInternalId: city.cityInternalId,
                      name,
                      latitude: city.lat,
                      longitude: city.lon,
                    })
                  }}
                />
              )
            })}
          </MainContainer>
        </UpperSection>
      </ScrollView>
      <View>
        <FooterContainer>
          <CustomTabBar />
        </FooterContainer>
      </View>
    </RootContainer>
  )
}
