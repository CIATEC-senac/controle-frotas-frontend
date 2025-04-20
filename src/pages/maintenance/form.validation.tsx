import { z } from 'zod';

import { fromISO } from '@/lib/date-parser';
import { Maintenance } from '@/models/maintenance.type';

export const maintenanceSchema = z.object({
  // ID
  id: z.string().optional(),
  // Descrição
  description: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
  // Tipo
  type: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
  vehicles: z
    .array(z.string({ message: 'Veículo é obrigatório' }))
    .min(1, { message: 'Ao menos 1 veículo deve ser selecionado' }),
  // Hora de Partida
  date: z
    .string({ message: 'Campo obrigatório' })
    .regex(/\d{2}\/\d{2}\/\d{4} \d{2}\:\d{2}/g, {
      message: 'Data deve estar no seguinte padrão XX/XX/XXXX XX:XX',
    }),
});

export const toZod = (maintenance?: Maintenance) => {
  return {
    id: maintenance?.id?.toString() ?? '',
    type: maintenance?.type.toString() ?? '',
    date: maintenance?.date ? fromISO(maintenance.date) : '',
    description: maintenance?.description ?? '',
    vehicles: (maintenance?.vehicles ?? []).map(({ id }) => id.toString()),
  };
};
