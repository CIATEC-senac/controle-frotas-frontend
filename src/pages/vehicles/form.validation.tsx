import { z } from 'zod';

import { Vehicle } from '@/models/vehicle.type';

export const vehicleSchema = z.object({
  // ID
  id: z.string().optional(),
  // Modelo
  model: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Modelo deve conter ao menos 1 caractere' })
    .max(30, { message: 'Modelo deve conter no máximo 30 caracteres' }),
  // Capacidade
  capacity: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Capacidade deve ser superior à 1' })
    .max(50, { message: 'Capacidade deve ser igual ou inferior à 50' }),
  // Placa
  plate: z
    .string({ message: 'Campo obrigatório' })
    .regex(/([A-Z]{3}[0-9][0-9A-Z][0-9]{2}|[A-Z]{3}[0-9]{4})/g, {
      message: 'Placa deve estar no seguite padrão AAA0A00, AAA0000',
    }),
  // Tipo
  type: z.string({ message: 'Campo obrigatório' }),
  // Ano
  year: z.string({ message: 'Campo obrigatório' }),
  // Empresa
  enterprise: z
    .string({ message: 'Uma empresa deve ser selecionada' })
    .min(1, { message: 'Uma empresa deve ser selecionada' }),
  // Status
  status: z.boolean(),
});

export const toZod = (vehicle?: Vehicle) => {
  return {
    id: vehicle?.id.toString() ?? '',
    model: vehicle?.model ?? '',
    capacity: vehicle?.capacity.toString() ?? '',
    plate: vehicle?.plate ?? '',
    type: vehicle?.type ?? '',
    year: vehicle?.year.toString() ?? '',
    status: vehicle?.status ?? true,
    enterprise: vehicle?.enterprise?.id?.toString() ?? '',
  };
};
