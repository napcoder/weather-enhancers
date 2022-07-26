import { useState, useCallback } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

import CustomTabBarItem from './CustomTabBarItem'

type Ids = 'Home' | 'Location' | 'Search'

const RootContainer = styled.View`
  margin-horizontal: 20px;
  min-height: 78px;
  border-radius: 25px;
  background-color: #ffffff;
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
`

/**
 * This component shows a tab bar with 3 button
 * Buttons are easily pluggable but not plugged yet
 */
export default function CustomTabBar() {
  const [selectedId, setSelectedId] = useState<Ids>('Home')
  const handleSelect = useCallback((id: Ids) => {
    setSelectedId(id)
  }, [])
  return (
    <RootContainer accessibilityRole="menubar">
      {['Home', 'Search', 'Location'].map((value) => {
        const id: Ids = value as Ids
        return (
          <CustomTabBarItem key={id} id={id} isActive={selectedId === id} onSelect={handleSelect} />
        )
      })}
    </RootContainer>
  )
}
