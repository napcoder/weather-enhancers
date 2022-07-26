import { LinearGradient } from 'expo-linear-gradient'
import I18n from 'i18n-js'
import moment from 'moment'
import { useMemo } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Line = styled(LinearGradient)`
  height: 5px;
  width: 1150px;
  border-radius: 2px;
  margin-vertical: 20px;
  margin-horizontal: 25px;
`

const HoursRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  wrap: nowrap;
`

const TempsRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  wrap: nowrap;
`

const Box = styled.View`
  width: 50px;
  align-items: center;
`

const HoursText = styled.Text`
  color: #fff;
  font-family: Poppins_300Light;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0;
  text-align: center;
`

const HoursFirstText = styled.Text`
  color: #fff;
  font-family: Poppins_700Bold;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  text-align: center;
`

const TempFirstText = styled.Text`
  color: #fff;
  font-family: Poppins_700Bold;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 0;
  text-align: right;
`

const TempText = styled.Text`
  color: #fff;
  font-family: Poppins_300Light;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
  text-align: right;
`

const RootContainer = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    // alignItems: 'flex-start',
    paddingRight: 20,
    paddingLeft: 20,
  },
}))``

const FirstBall = styled.View`
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 13px;
  position: absolute;
  top: 10.5px;
  left: 12.5px;
`

const WhiteBall = styled.View`
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 15.5px;
  left: ${(props) => 17.5 + 50 * props.index}px;
`

interface Data {
  dt: number
  dt_txt: string
  temp: number
}

interface Props {
  data: Data[]
}

export default function TemperatureLine({ data }: Props) {
  const temps = useMemo(() => {
    return data.map((item) => ({
      key: item.dt,
      temp: Math.ceil(item.temp),
      hour: moment.unix(item.dt).utc().format('h a'),
    }))
  }, [data])

  return (
    <RootContainer horizontal showsHorizontalScrollIndicator={false}>
      <HoursRow>
        {temps.map((item, index) => (
          <Box key={item.key}>
            {index === 0 ? (
              <HoursFirstText>{I18n.t('detail.now')}</HoursFirstText>
            ) : (
              <HoursText>{item.hour}</HoursText>
            )}
          </Box>
        ))}
      </HoursRow>
      <View>
        <Line
          colors={['#fff', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
        {temps.map((item, index) => {
          if (index === 0) {
            return <FirstBall key={item.key} />
          }
          return <WhiteBall index={index} key={item.key} />
        })}
      </View>
      <TempsRow>
        {temps.map((item, index) => (
          <Box key={item.key}>
            {index === 0 ? (
              <TempFirstText>{item.temp}°</TempFirstText>
            ) : (
              <TempText>{item.temp}°</TempText>
            )}
          </Box>
        ))}
      </TempsRow>
    </RootContainer>
  )
}
