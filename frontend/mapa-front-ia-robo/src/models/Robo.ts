import { z } from "zod";

export const CasoAnteriorSchema = z.object({
  id: z.number().optional(),
  fecha: z.string(),
  detalle: z.string(),
  ubicacion: z.string(),
});

export const CoordenadasSchema = z.object({
  latitud: z.number(),
  longitud: z.number(),
});

export const RoboSchema = z.object({
  id: z.number().optional(),
  incidente: z.string(),
  tipoIncidente: z.string(),
  ubicacion: z.string(),
  distrito: z.string(),
  fecha: z.date(),
  hora: z.string(),
  descripcion: z.string().max(500),
  casosAnteriores: z.array(z.lazy(() => CasoAnteriorSchema)).optional(),
  coordenadas: CoordenadasSchema.optional(),
  createdAt: z.date().optional(),
});

export type RoboSchemaInfer = z.infer<typeof RoboSchema>;
