import moment from 'moment'
import { useMemo } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

import WeatherIcon from './WeatherIcon'

const RootContainer = styled.View`
  height: 230px;
  width: 180px;
  border-radius: 25px;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  margin-left: 15px;
  margin-bottom: 30px;
  shadow-color: #000;
  ${Platform.select({
    ios: `
      background-color: rgba(255, 255, 255, 0.1);
      shadow-offset: 5px 10px;
      shadow-radius: 20px;
      shadow-opacity: 0.17;
    `,
    android: `
      background-color: rgba(119, 165, 237, 1);
      elevation: 4;
    `,
  })};
`

const WeekDay = styled.Text`
  color: #fff;
  font-family: Poppins_600SemiBold;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 33px;
  text-align: center;
`

const Temperature = styled.Text`
  color: #fff;
  font-family: Poppins_600SemiBold;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 55px;
  text-align: center;
`

interface Props {
  dateTimestamp: number
  temperature: number
  iconId: string
}

export default function ForecastCard({ dateTimestamp, temperature, iconId }: Props) {
  const day = useMemo(() => moment.unix(dateTimestamp).utc().format('dddd'), [dateTimestamp])
  // console.log({ dateTimestamp, day })
  return (
    <RootContainer>
      <WeekDay>{day}</WeekDay>
      <Temperature>{Math.ceil(temperature)}°</Temperature>
      <WeatherIcon iconId={iconId} />
    </RootContainer>
  )
}
