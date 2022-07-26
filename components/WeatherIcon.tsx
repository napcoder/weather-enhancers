import { useMemo } from 'react'
import styled from 'styled-components/native'

const ActualImage = styled.Image`
  width: 84px;
`

interface Props {
  iconId: string
}

export default function WeatherIcon({ iconId }: Props) {
  const icon = useMemo(() => {
    switch (iconId) {
      case '01d':
      case '01n':
        return require('../assets/images/Sunny.png')
      case '02d':
      case '02n':
        return require('../assets/images/PartlyCloudyDay.png')
      case '03d':
      case '03n':
      case '04d':
      case '04n':
      case '50d':
      case '50n':
        return require('../assets/images/Cloudy.png')
      case '10d':
      case '10n':
        return require('../assets/images/ModRainSwrsDay.png')
      case '09d':
      case '09n':
      case '11d':
      case '11n':
      case '13d':
      case '13n':
        return require('../assets/images/OccLightRain.png')
      default:
        return require('../assets/images/Sunny.png')
    }
  }, [iconId])
  return <ActualImage source={icon} resizeMode="contain" />
}
