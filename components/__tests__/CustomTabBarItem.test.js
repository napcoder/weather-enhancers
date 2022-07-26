import * as React from 'react'
import renderer from 'react-test-renderer'

import CustomTabBarItem from '../CustomTabBar/CustomTabBarItem'

describe('CustomTabBarItem', () => {
  describe('Snapshots', () => {
    it(`Active renders correctly`, () => {
      const tree = renderer.create(<CustomTabBarItem isActive id="Home" />).toJSON()

      expect(tree).toMatchSnapshot()
    })
    it(`Inactive renders correctly`, () => {
      const tree = renderer.create(<CustomTabBarItem id="Location" />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
