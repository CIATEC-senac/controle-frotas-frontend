import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Clock, MapPin, Ruler, Waypoints } from 'lucide-react';
import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router';
dayjs.extend(duration);

import { getBreadcrumbs, Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { API } from '@/lib/api';
import { getName } from '@/models/route.type';

import { Map } from './partials/map';
import { Detail } from './partials/route-details';
import { RouteWaypoints } from './partials/route-waypoints';

export const DetailedRoutePage = () => {
  const id = useParams().id;

  const { data: route } = useQuery(['route', id], () =>
    new API().getRoute(Number(id))
  );

  const duration = Math.ceil(
    dayjs.duration(route?.estimatedDuration ?? 0, 'seconds').asMinutes()
  ).toString();

  const title = [
    { label: 'Rotas', link: '/routes' },
    { label: (route && getName(route)) || '' },
  ];

  return (
    <Layout title={getBreadcrumbs(title)}>
      <div className="w-full h-full lg:relative">
        {route && (
          <React.Fragment>
            <div className="lg:absolute lg:top-[10px] lg:left-[10px] lg:z-10">
              <Card className="rounded shadow-none border-none lg:shadow-2xl">
                <CardContent className="flex flex-col gap-3 text-sm">
                  <h3>{getName(route)}</h3>

                  <Detail
                    icon={<MapPin size={14} />}
                    label="Origem"
                    value={route.path.origin.toUpperCase()}
                  />

                  <RouteWaypoints waypoints={route.path.stops} />

                  <Detail
                    icon={<MapPin size={14} />}
                    label="Destino"
                    value={route.path.destination.toUpperCase()}
                  />

                  <div className="grid grid-cols-3 gap-6">
                    <Detail
                      icon={<Ruler size={14} />}
                      label="Distância"
                      value={(route.estimatedDuration / 1000.0).toFixed(2)}
                      suffix="Km"
                    />

                    <Detail
                      icon={<Clock size={14} />}
                      label="Duração"
                      value={duration}
                      suffix="minutos"
                    />

                    <Detail
                      icon={<Waypoints size={14} />}
                      label="Paradas"
                      value={route.path.stops.length.toString()}
                      suffix="paradas"
                    />
                  </div>

                  <div>
                    <Button variant="link" className="p-0" asChild>
                      <Link to={`/routes/${route.id}/history`}>
                        Ver histórico
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <section className="w-full h-full">
              <Map route={route} />
            </section>
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};
