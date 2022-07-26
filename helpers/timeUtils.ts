import moment from 'moment'

export function getDate(dt: number = Date.now(), timezone: number = 0, lang: string) {
  if (lang === 'it') {
    return moment
      .unix(dt + timezone)
      .utc()
      .format('dddd D MMMM')
  } else {
    return moment
      .unix(dt + timezone)
      .utc()
      .format('dddd Do, MMMM')
  }
}

export function getTime(dt: number = Date.now(), timezone: number = 0, lang: string) {
  if (lang === 'it') {
    return moment
      .unix(dt + timezone)
      .utc()
      .format('LT')
  } else {
    return moment
      .unix(dt + timezone)
      .utc()
      .format('LT')
  }
}
