from typing import List
from dataclasses import dataclass


@dataclass
class CasosAnteriores:
    fecha: str
    detalle: str
    ubicacion: str


@dataclass
class Coordenadas:
    latitud: float
    longitud: float


@dataclass
class Incidente:
    incidente: str
    tipoIncidente: str
    ubicacion: str
    distrito: str
    fecha: str
    hora: str
    descripcion: str
    casosAnteriores: List[CasosAnteriores]
    coordenadas: Coordenadas
