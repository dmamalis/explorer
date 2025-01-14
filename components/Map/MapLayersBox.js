import classNames from 'classnames'
import { useCallback } from 'react'
import useMapLayer from '../../hooks/useMapLayer'

const MapLayersBox = () => {
  const {
    showMapLayers,
    setMapLayer,
    mapLayer,
    toggleMapLayers,
  } = useMapLayer()

  const handleClick = useCallback(
    (clickedLayer) => () => {
      if (mapLayer === clickedLayer) {
        setMapLayer(null)
        return
      }

      setMapLayer(clickedLayer)
    },
    [mapLayer, setMapLayer],
  )

  const layers = [
    // {
    //   title: 'New Hotspots',
    //   id: 'added',
    // },
    {
      title: 'Default',
      id: 'default',
      iconPath: '/images/hex-green.png',
    },
    {
      title: 'Transmit Scales',
      id: 'rewardScale',
      iconPath: '/images/reward-scale.svg',
    },
    // {
    //   title: 'Owner',
    //   id: 'owner',
    // },
    // {
    //   title: 'Offline',
    //   id: 'offline',
    // },
  ]

  return (
    <div
      className={classNames(
        'fixed right-0 bottom-8 md:bottom-0 p-4 md:p-8 md:pr-4 transform-gpu transition-all duration-300 ease-in-out',
        {
          'opacity-0 pointer-events-none': !showMapLayers,
        },
      )}
    >
      <div className="relative">
        <div
          onClick={toggleMapLayers}
          className="cursor-pointer w-10 h-10 flex items-center justify-center self-end transform-gpu transition-transform duration-300 ease-in-out"
          style={{
            transform: showMapLayers
              ? `translateY(-${50 * layers.length}px)`
              : 'translateY(0)',
          }}
        >
          <img src="/images/close.svg" />
        </div>
        {layers.map(({ title, id, iconPath }, i) => (
          <Layer
            key={id}
            title={title}
            iconPath={iconPath}
            onClick={handleClick(id)}
            active={mapLayer === id}
            style={{
              transform: showMapLayers
                ? `translateY(-${50 * i}px)`
                : 'translateY(0)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

const Layer = ({ title, onClick, iconPath, active = false, style }) => (
  <div
    className="flex items-center justify-end space-x-2 cursor-pointer absolute bottom-0 right-0 w-96 transform-gpu transition-transform duration-300 ease-in-out"
    onClick={onClick}
    style={style}
  >
    <span
      className={classNames('text-sm', {
        'text-white font-semibold': active,
        'text-gray-600': !active,
      })}
    >
      {title}
    </span>
    <div
      className={classNames(
        'w-10 h-10 rounded-full mb-1 flex items-center justify-center',
        { 'bg-gray-700': !active, 'bg-gray-200': active },
      )}
    >
      <img className="w-5 h-5" src={iconPath} />
    </div>
  </div>
)

export default MapLayersBox
