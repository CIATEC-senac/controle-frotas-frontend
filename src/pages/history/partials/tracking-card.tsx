import { Map } from 'lucide-react';
import {
  Direction,
  Marker,
  StaticGoogleMap,
} from 'react-static-google-map-with-waypoints';

import { History } from '@/models/history.type';
import { LatLng } from '@/models/route.type';

import { SectionCard } from './history-cards';

export const TrackingCard = ({ history }: { history: History }) => {
  if (!history.track) {
    return null;
  }

  const getLatLng = (coordinates: LatLng) => {
    return `${coordinates.lat},${coordinates.lng}`;
  };

  const origin = history.track.at(0)?.coordinate!;
  const destination = history.track.at(-1)?.coordinate!;

  const waypoints = history.track
    .slice(0, 24)
    .map(({ coordinate }) => coordinate);

  waypoints.splice(0, 1);
  waypoints.splice(waypoints.length - 1, 1);

  const route = [origin, destination];

  return (
    <SectionCard
      className="col-span-2"
      icon={<Map size={16} />}
      title="Rota Executada"
    >
      <div className="flex flex-col md:grid lg:grid-cols-2 gap-6">
        <div className="flex-[1]">
          <StaticGoogleMap
            size="640x360"
            apiKey="AIzaSyAtnsmelP2XXZQxSgDOnn9ra2RLv3LOKWA"
            className="max-w-full"
          >
            <Direction
              origin={getLatLng(origin)}
              waypoints={waypoints}
              destination={getLatLng(destination)}
            />

            {route.map((waypoint, index) => {
              return (
                <Marker
                  key={index}
                  location={waypoint}
                  color="red"
                  // Transforma número em caractere ascii
                  // Referência: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
                  label={String.fromCharCode(65 + index)}
                />
              );
            })}

            {history.unplannedStops.map((waypoint, index) => {
              return (
                <Marker
                  key={index}
                  location={waypoint.coordinates}
                  color="red"
                  // Transforma número em caractere ascii
                  // Referência: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
                  label={String.fromCharCode(65 + index)}
                />
              );
            })}
          </StaticGoogleMap>
        </div>
      </div>
    </SectionCard>
  );
};
