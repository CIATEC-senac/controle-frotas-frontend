import { DetailedRoute } from '@/models/route.type';
import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  MapCameraChangedEvent,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

type Poi = { key: string; location: google.maps.LatLngLiteral };

const PoiMarkers = (props: { pois: Poi[] }) => {
  return (
    <React.Fragment>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin scale={0.9} background={'red'} glyphColor={'darkred'} />
        </AdvancedMarker>
      ))}
    </React.Fragment>
  );
};

const Direction = ({ route }: { route: DetailedRoute }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  const [directionsService, setDirectionService] =
    useState<google.maps.DirectionsService>();

  const [directionsRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();

  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) {
      return;
    }

    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) {
      return;
    }

    directionsService
      .route({
        origin: route.path.origin,
        destination: route.pathCoordinates.destination,
        waypoints: route.path.stops.map((stop) => ({ location: stop })),
        optimizeWaypoints: true,
        provideRouteAlternatives: false,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  return null;

  if (!leg) {
    return null;
  }

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
    </div>
  );
};

export const Map = ({ route: route }: { route: DetailedRoute }) => {
  const locations: Poi[] = route.pathCoordinates.stops.map((stop, index) => {
    return {
      key: route.path.stops[index],
      location: stop,
    } as Poi;
  });

  locations.push({
    key: route.path.origin,
    location: route.pathCoordinates.origin,
  });

  locations.push({
    key: route.path.origin,
    location: route.pathCoordinates.destination,
  });

  return (
    <APIProvider
      apiKey={'AIzaSyAtnsmelP2XXZQxSgDOnn9ra2RLv3LOKWA'}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <GoogleMap
        mapTypeControl={false}
        streetViewControl={false}
        mapId="196197bb7ce887bf"
        defaultZoom={17}
        defaultCenter={route.pathCoordinates.origin}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            'camera changed:',
            ev.detail.center,
            'zoom:',
            ev.detail.zoom
          )
        }
      >
        {/* <PoiMarkers pois={locations} /> */}
        <Direction route={route} />
      </GoogleMap>
    </APIProvider>
  );
};
