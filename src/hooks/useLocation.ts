import { useContext } from 'react'

import { LocationContext } from '@contexts/LocationContext'

export function useLocation() {
  const { onPositionChange } = useContext(LocationContext)

  return { onPositionChange }
}