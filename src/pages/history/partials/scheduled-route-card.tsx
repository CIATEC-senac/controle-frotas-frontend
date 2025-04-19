import dayjs from 'dayjs';
import { Map } from 'lucide-react';
import { Direction, Marker, StaticGoogleMap } from 'react-static-google-map';

import { fromDate } from '@/lib/date-parser';
import { History } from '@/models/history.type';
import { LatLng } from '@/models/route.type';
import { Detail, SectionCard } from './history-cards';

export const ScheduledRouteCard = ({ history }: { history: History }) => {
  const estimatedDistance = (history.route.estimatedDistance! / 1000.0).toFixed(
    2
  );

  const elapsedDistance = (
    history.odometerFinal - history.odometerInitial
  ).toFixed(2);

  const estimatedDuration = Math.ceil(
    dayjs.duration(history.route.estimatedDuration!, 'seconds').asMinutes()
  );

  const elapsedDuration = Math.ceil(
    dayjs(history.startedAt).diff(history.endedAt, 'minutes')
  );

  const waypoints = [
    history.route.pathCoordinates.origin,
    ...history.route.pathCoordinates.stops,
    history.route.pathCoordinates.destination,
  ];

  const getLatLng = (coordinates: LatLng) => {
    return `${coordinates.lat},${coordinates.lng}`;
  };

  return (
    <SectionCard icon={<Map size={16} />} title="Rota Planejada">
      <div className="flex flex-wrap gap-6">
        <div className="flex-[1] min-w-[400px]">
          <StaticGoogleMap
            size="640x360"
            apiKey="AIzaSyAtnsmelP2XXZQxSgDOnn9ra2RLv3LOKWA"
          >
            <Direction
              origin={getLatLng(history.route.pathCoordinates.origin)}
              destination={getLatLng(history.route.pathCoordinates.destination)}
            />

            {waypoints.map((waypoint, index) => {
              return (
                <Marker
                  key={index}
                  location={{ lat: waypoint.lat, lng: waypoint.lng }}
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
          <Detail label="Origem" value={history.path.origin.toUpperCase()} />

          <Detail
            label="Destino"
            value={history.path.destination.toUpperCase()}
          />

          <Detail label="Partida" value={fromDate(history.startedAt)} />

          <Detail label="Chegada" value={fromDate(history.endedAt)} />

          <Detail
            label="Duração prevista"
            value={estimatedDuration + ' minutos'}
          />

          <Detail
            label="Duração executada"
            value={elapsedDuration + ' minutos'}
          />

          <Detail
            label="Distância prevista"
            value={estimatedDistance + ' Km'}
          />

          <Detail
            label="Distância percorrida"
            value={elapsedDistance + ' Km'}
          />
        </div>
      </div>
    </SectionCard>
  );
};
