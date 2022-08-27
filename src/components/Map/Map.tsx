import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Icon, LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import { CheckList } from '@app-types/Checklist'

import { LocationMarker } from '@components/LocationMarker'
import { useLocation } from '@hooks/useLocation'

type Position = LatLng | null

export type MapProps = {
  checklist?: CheckList
}

const Map: React.FC<MapProps> = ({ checklist }) => {
  const [position, setPosition] = useState<Position>(null)

  const { onPositionChange } = useLocation()

  useEffect(() => {
    Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl.src,
      iconUrl: iconUrl.src,
      shadowUrl: shadowUrl.src,
    })
  }, [])

  useEffect(() => {
    if (checklist) {
      const checklistPosition = new LatLng(
        checklist.location.latitude,
        checklist.location.longitude
      )

      setPosition(checklistPosition)
      onPositionChange?.(checklistPosition)
      return
    }

    navigator.geolocation.getCurrentPosition(currentPosition => {
      const { latitude, longitude } = currentPosition.coords
      const currentMapPosition = new LatLng(latitude, longitude)

      setPosition(currentMapPosition)
      onPositionChange?.(currentMapPosition)
    })
  }, [checklist, onPositionChange])

  useEffect(() => {
    if (position) {
      onPositionChange?.(position)
    }
  }, [position, onPositionChange])

  if (!position) {
    return <p style={{ margin: '1rem 0' }}>Carregando mapa...</p>
  }

  return (
    <MapContainer
      style={{
        height: '100%',
        minHeight: 500,
        margin: '3rem 0',
      }}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        checklist={checklist}
        position={position}
        setPosition={setPosition}
      />
    </MapContainer>
  )
}

export default Map