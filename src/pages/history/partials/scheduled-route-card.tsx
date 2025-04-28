import dayjs from 'dayjs';
import { Map } from 'lucide-react';
import {
  Direction,
  Marker,
  StaticGoogleMap,
} from 'react-static-google-map-with-waypoints';

import { fromDate } from '@/lib/date-parser';
import { History } from '@/models/history.type';
import { LatLng } from '@/models/route.type';

import { Detail, SectionCard } from './history-cards';

export const ScheduledRouteCard = ({ history }: { history: History }) => {
  const estimatedDistance =
    (history.route.estimatedDistance! / 1000.0).toFixed(2) + ' Km';

  const elapsedDistance =
    history.odometerFinal && history.odometerInitial
      ? (history.odometerFinal - history.odometerInitial).toFixed(2) + ' Km'
      : undefined;

  const estimatedDuration = history.route.estimatedDuration
    ? Math.ceil(
        dayjs.duration(history.route.estimatedDuration, 'seconds').asMinutes()
      ) + ' minutos'
    : undefined;

  const elapsedDuration = history.startedAt
    ? Math.ceil(
        Math.abs(dayjs(history.startedAt).diff(history.endedAt, 'minutes'))
      ) + ' minutos'
    : undefined;

  const waypoints = [
    history.route.pathCoordinates?.origin,
    ...history.route.pathCoordinates?.stops,
    history.route.pathCoordinates?.destination,
  ];

  const getLatLng = (coordinates: LatLng) => {
    return `${coordinates.lat},${coordinates.lng}`;
  };

  return (
    <SectionCard
      className="col-span-2"
      icon={<Map size={16} />}
      title="Rota Planejada"
    >
      <div className="flex flex-col md:grid lg:grid-cols-2 gap-6">
        <div className="flex-[1]">
          <StaticGoogleMap
            size="640x360"
            apiKey="AIzaSyAtnsmelP2XXZQxSgDOnn9ra2RLv3LOKWA"
            className="max-w-full"
          >
            <Direction
              origin={getLatLng(history.route.pathCoordinates.origin)}
              waypoints={history.route.pathCoordinates.stops}
              destination={getLatLng(history.route.pathCoordinates.destination)}
            />

            {waypoints.map((waypoint, index) => {
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
          </StaticGoogleMap>
        </div>

        <div className="flex-[1] space-y-3">
          <Detail
            label="Origem"
            value={history.route.path?.origin.toUpperCase()}
          />

          <Detail
            label="Destino"
            value={history.route.path?.destination.toUpperCase()}
          />

          <Detail
            label="Partida"
            value={history.startedAt ? fromDate(history.startedAt) : undefined}
          />

          <Detail
            label="Chegada"
            value={history.endedAt ? fromDate(history.endedAt) : undefined}
          />

          <Detail label="Duração prevista" value={estimatedDuration} />

          <Detail label="Duração executada" value={elapsedDuration} />

          <Detail label="Distância prevista" value={estimatedDistance} />

          <Detail label="Distância percorrida" value={elapsedDistance} />
        </div>
      </div>
    </SectionCard>
  );
};
