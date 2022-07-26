import { useEffect, useState } from 'react'

import { fetchCity } from '../redux/citiesSlice'
import { useAppDispatch, useAppSelector } from './useReduxTypes'

export default function usePrefillCities() {
  const [isPrefillCompleted, setIsPrefillCompleted] = useState(false)
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)

  // Load any cities data to prefill app
  useEffect(() => {
    dispatch(fetchCity({ cityName: 'London', country: 'GB' }))
    dispatch(fetchCity({ cityName: 'Turin', country: 'IT' }))
    dispatch(fetchCity({ cityName: 'Rome', country: 'IT' }))
  }, [dispatch])

  useEffect(() => {
    if (state.cities.ids.length === 3) {
      setIsPrefillCompleted(true)
    }
  }, [state])

  return isPrefillCompleted
}
