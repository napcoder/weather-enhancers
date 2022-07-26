import styled from 'styled-components/native'

type Ids = 'Home' | 'Location' | 'Search'

interface Props {
  id: Ids
  isActive: boolean
  onSelect: (id: Ids) => void
}

type ActiveProps = Pick<Props, 'isActive'>

type ItemIconProps = Pick<Props, 'id' | 'isActive'>

interface ItemImageProps extends ActiveProps {
  width: number
  height: number
}

const ItemImage = styled.Image<ItemImageProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`

function ItemIcon({ id, isActive }: ItemIconProps) {
  switch (id) {
    case 'Home':
      return (
        <ItemImage
          source={require('../../assets/images/Home.png')}
          width={24}
          height={24}
          isActive={isActive}
        />
      )
    case 'Search':
      return (
        <ItemImage
          source={require('../../assets/images/Search.png')}
          width={24}
          height={24}
          isActive={isActive}
        />
      )
    case 'Location':
      return (
        <ItemImage
          source={require('../../assets/images/Location.png')}
          width={22}
          height={26}
          isActive={isActive}
        />
      )
    default:
      return null
  }
}

const RootContainer = styled.TouchableOpacity<ActiveProps>`
  /* flex: 1; */
  justify-content: center;
  padding-horizontal: 22px;
  align-items: center;
  ${(props) =>
    props.isActive
      ? `
      border-bottom-width: 2px;
      border-bottom-color: #01175f;
  `
      : ``}
`

/**
 * Single button item to be used inside the CustomTabBar
 */
export default function CustomTabBarItem({ id, isActive = false, onSelect }: Props) {
  return (
    <RootContainer
      isActive={isActive}
      disabled={isActive}
      onPress={() => {}}
      accessibilityState={{ selected: isActive }}
      accessibilityRole="menuitem">
      <ItemIcon isActive={isActive} id={id} />
    </RootContainer>
  )
}
