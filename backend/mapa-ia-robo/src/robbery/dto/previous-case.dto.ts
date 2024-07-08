import { IsNotEmpty, IsString } from "class-validator";

export class PreviousCaseDto {
  @IsNotEmpty()
  @IsString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  detalle: string;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;
}
