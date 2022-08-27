import { LatLng } from 'leaflet'
import { createContext, ReactNode, useState } from 'react'

type LocationContextType = {
  onPositionChange?: (position: LatLng) => void
}

type LocationProviderProps = {
  children: ReactNode
  onPositionChange?: (position: LatLng) => void
}

export const LocationContext = createContext({} as LocationContextType)

export const LocationProvider: React.FC<LocationProviderProps> = ({ children, onPositionChange }) => {
  return (
    <LocationContext.Provider value={{ onPositionChange }}>
      {children}
    </LocationContext.Provider>
  )
}