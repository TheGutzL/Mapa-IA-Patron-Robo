import datetime
from typing import List


class Victima:
    def __init__(self, nombre: str, edad: int, sexo: str, estadoSalud: str):
        self.nombre = nombre
        self.edad = edad
        self.sexo = sexo
        self.estadoSalud = estadoSalud


class DetallesAsaltantes:

    def __init__(self, nombre: str, estadoSalud: str, edad: int, sexo: str):
        self.nombre = nombre
        self.estadoSalud = estadoSalud
        self.edad = edad
        self.sexo = sexo


class CasoAnterior:
    def __init__(self, fecha: str, detalle: str, ubicacion: str):
        self.fecha = datetime.datetime.strptime(fecha, "%Y-%m-%d")
        self.detalle = detalle
        self.ubicacion = ubicacion


class Coordenadas:
    def __init__(self, latitud: float, longitud: float):
        self.latitud = latitud
        self.longitud = longitud


class Incidente:

    def __init__(
        self,
        incidente: str,
        tipoIncidente: str,
        victimas: List[Victima],
        ubicacion: str,
        distrito: str,
        estado: str,
        fecha: str,
        hora: str,
        descripcion: str,
        detallesAsaltantes: List[DetallesAsaltantes],
        medioTransporte: str,
        reaccionVictima: str,
        testigos: str,
        medidasSeguridad: str,
        imagenes: str,
        casosAnteriores: List[CasoAnterior],
        medidasPrecaucion: str,
        enlace: str,
        coordenadas: Coordenadas,
    ):
        self.incidente = incidente
        self.tipoIncidente = tipoIncidente
        self.victimas = [Victima(**victima) for victima in victimas]
        self.ubicacion = ubicacion
        self.distrito = distrito
        self.estado = estado
        self.fecha = datetime.datetime.strptime(fecha, "%Y-%m-%d")
        self.hora = hora
        self.descripcion = descripcion
        self.detallesAsaltantes = [
            DetallesAsaltantes(**detalle) for detalle in detallesAsaltantes
        ]
        self.medioTransporte = medioTransporte
        self.reaccionVictima = reaccionVictima
        self.testigos = testigos
        self.medidasSeguridad = medidasSeguridad
        self.imagenes = imagenes
        self.casosAnteriores = [CasoAnterior(**caso) for caso in casosAnteriores]
        self.medidasPrecaucion = medidasPrecaucion
        self.enlace = enlace
        self.coordenadas = Coordenadas(**coordenadas)
