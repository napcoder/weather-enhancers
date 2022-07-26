import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'

import { setupStore } from '../../redux/store'

export function renderWithRedux(renderedComponent) {
  const store = setupStore()

  render(<Provider store={store}>{renderedComponent}</Provider>)
}
