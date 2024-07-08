import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CoordenadasDto } from './coordenadas.dto';
import { PreviousCaseDto } from './previous-case.dto';

export class CreateRobberyDto {
  @IsNotEmpty()
  @IsString()
  incidente: string;

  @IsNotEmpty()
  @IsString()
  tipoIncidente: string;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsString()
  distrito: string;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreviousCaseDto)
  casosAnteriores?: PreviousCaseDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordenadasDto)
  coordenadas?: CoordenadasDto;
}
