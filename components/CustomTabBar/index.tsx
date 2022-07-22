import { Platform } from 'react-native'
import styled from 'styled-components/native'

const StyledView = styled.View`
  background-color: papayawhip;
`

const StyledText = styled.Text`
  color: palevioletred;
`

const RootContainer = styled.View`
  /* margin: 30px; */
  min-height: 78px;
  /* width: 374px; */
  border-radius: 25px;
  background-color: #ffffff;
  /* box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.17); */
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  shadow-color: #000;
  ${Platform.select({
    ios: `
      shadow-offset: 5px 10px;
      // shadow-color: #000;
      shadow-radius: 20px;
      shadow-opacity: 0.17;
    `,
    android: `
      elevation: 24;
    `,
  })};
  /* shadow-color: rgba(0, 0, 0, 0.17); */
`

export default function CustomTabBar() {
  return (
    <RootContainer>
      <StyledText>Prova</StyledText>
    </RootContainer>
  )
}
