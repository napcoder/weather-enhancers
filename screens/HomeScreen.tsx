import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import CustomTabBar from '../components/CustomTabBar'
import { RootTabScreenProps } from '../types'

const RootContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  /* background-color: #09f482; */
  padding: 20px;
`
const Title = styled.Text`
  color: #01175f;
  /* font-family: Poppins; */
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
  margin-top: 30px;
`
const MainContainer = styled.View``
const FooterContainer = styled.View``

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
  /* font-family: Poppins; */
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 30px;
  text-align: center;
`

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <RootContainer>
      <HeaderContainer>
        <TitleContainer>
          <Title>Good morning!</Title>
          <Title>Mario</Title>
        </TitleContainer>
        <AddCityContainer>
          <AddCityImage source={require('../assets/images/Plus.png')} />
          <AddCityLabel>Aggiungi città</AddCityLabel>
        </AddCityContainer>
      </HeaderContainer>
      <MainContainer />
      <FooterContainer>
        <CustomTabBar />
      </FooterContainer>
    </RootContainer>
  )
}
