import HomeScreen from '../HomeScreen'

describe('HomeScreen', () => {
  it('Renders', async () => {
    const { findByText } = renderWithProviders(<HomeScreen />)
    const mario = await findByText('Mario')
    // debug()
    expect(mario).toBeTruthy()
  })
})
