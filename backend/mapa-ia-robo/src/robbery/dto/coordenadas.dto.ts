import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CoordenadasDto {
  @IsNotEmpty()
  @IsLatitude()
  latitud: number;

  @IsNotEmpty()
  @IsLongitude()
  longitud: number;
}
