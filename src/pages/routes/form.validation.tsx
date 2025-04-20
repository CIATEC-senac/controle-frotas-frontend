import { z } from 'zod';

import { Route } from '@/models/route.type';

export const routeSchema = z.object({
  // ID
  id: z.string().optional(),
  // Veículo
  vehicle: z.string({ message: 'Um veículo deve ser selecionado' }),
  // Veículo
  driver: z.string({ message: 'Um motorista deve ser selecionado' }),
  path: z.object({
    // Origem
    origin: z
      .string({ message: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' }),
    // Destino
    destination: z
      .string({ message: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' }),
    stops: z
      .array(
        z
          .string({ message: 'Campo parada é obrigatório' })
          .min(1, { message: 'Campo parada é obrigatório' })
      )
      .optional(),
  }),
  // Hora de Partida
  startAt: z
    .string({ message: 'Campo obrigatório' })
    .regex(/([0-9])\:([0-9])/g, {
      message: 'Horário deve estar no seguinte padrão XX:XX',
    }),
  // Status
  status: z.boolean().optional(),
});

export const toZod = (route?: Route) => {
  return {
    id: route?.id?.toString() ?? '',
    path: route?.path ?? {
      origin: '',
      destination: '',
      stops: [],
    },
    vehicle: route?.vehicle.id.toString(),
    driver: route?.driver.id.toString(),
    startAt: route?.startAt ?? '',
  };
};
