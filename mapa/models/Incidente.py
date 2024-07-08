from typing import List
from dataclasses import dataclass


@dataclass
class CasosAnteriores:
    id: int
    fecha: str
    detalle: str
    ubicacion: str


@dataclass
class Coordenadas:
    latitud: float
    longitud: float


@dataclass
class Incidente:
    id: int
    incidente: str
    tipoIncidente: str
    ubicacion: str
    distrito: str
    fecha: str
    hora: str
    descripcion: str
    casosAnteriores: List[CasosAnteriores]
    coordenadas: Coordenadas
    createdAt: str
