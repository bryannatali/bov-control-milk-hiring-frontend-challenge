import { CheckList } from '@app-types/Checklist'
import { LatLng } from 'leaflet'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

type LocationMarkerProps = {
  checklist?: CheckList
  position: LatLng
  setPosition: (position: LatLng) => void
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  checklist,
  position,
  setPosition,
}) => {
  const map = useMapEvents({
    click: !checklist ? (event) => {
      setPosition(event.latlng)
      map.flyTo(event.latlng, map.getZoom())
    } : undefined,
  })

  return (
    <Marker position={position}>
      {checklist && (
        <Popup>
          {checklist.farmer.name}
        </Popup>
      )}
    </Marker>
  )
}