import preloadedState from '../../helpers/testHelpers/preloadedState'
import CityCard from '../CityCard'

describe('CityCard', () => {
  it('Renders', async () => {
    const { findByText } = renderWithProviders(
      <CityCard
        cityInternalId="51.5073219_-0.1276474"
        name="London"
        index={0}
        latitude={0}
        longitude={0}
        // latitude={51.5073219}
        // longitude={-0.1276474}
        onPress={() => {}}
      />,
      {
        preloadedState,
      }
    )
    const element = await findByText('London')
    expect(element).toBeTruthy()
  })
})
