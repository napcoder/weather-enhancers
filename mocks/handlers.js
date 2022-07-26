import { rest } from 'msw'

import londonForecst from './londonForecast.json'
import londonWeather from './londonWeather.json'

// We use msw to intercept the network request during the test,
export const handlers = [
  rest.get('http://api.openweathermap.org/data/2.5/weather', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(londonWeather))
  }),
  rest.get('http://api.openweathermap.org/data/2.5/forecast', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(londonForecst))
  }),
]
