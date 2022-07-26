import { render, screen } from '@testing-library/react-native'
import * as React from 'react'
import renderer from 'react-test-renderer'

import CustomTabBar from '../CustomTabBar'

describe('CustomTabBar', () => {
  describe('Testing library', () => {
    it('Renders correctly', () => {
      render(<CustomTabBar />)
      const element = screen.queryByRole('menubar')
      expect(element).toBeTruthy()
    })
    it('Renders 3 items', () => {
      render(<CustomTabBar />)
      const elements = screen.queryAllByRole('menuitem')
      expect(elements).toHaveLength(3)
    })
    it('Only 1 selected', () => {
      render(<CustomTabBar />)
      const elements = screen.queryAllByAccessibilityState({ selected: true })
      expect(elements).toHaveLength(1)
    })
  })

  describe('Snapshots', () => {
    it(`renders correctly`, () => {
      const tree = renderer.create(<CustomTabBar />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
