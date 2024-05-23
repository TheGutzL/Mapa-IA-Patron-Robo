from typing import List
import folium
from folium.plugins import MarkerCluster
import models
from models.Incidente import Incidente


def crear_mapa():
    mapa = folium.Map(location=[-14.0946, -75.7139], zoom_start=10)
    return mapa


def crear_capa(nombre):
    capa = folium.FeatureGroup(name=nombre)
    return capa


def agregar_marcadores(mapa, capa, datos: List[Incidente]):
    for incidente in datos:
        coordenadas_data = incidente.coordenadas
        ubicacion = incidente.ubicacion
        if isinstance(coordenadas_data, models.Incidente.Coordenadas):
            coordenadas = [coordenadas_data.latitud, coordenadas_data.longitud]
            # Agrega más información al popup con HTML y CSS
            contenido_popup = f"""
                <div style="color: red; font-size: 16px; font-weight: bold;">Descripción:</div>
                <div style="color: black; font-size: 14px;">{incidente.descripcion}</div>
                <div style="color: red; font-size: 16px; font-weight: bold;">Ubicación:</div>
                <div style="color: black; font-size: 14px;">{ubicacion}</div>
                <!-- Agrega más campos aquí -->
            """
            # Limita la longitud del texto del tooltip
            descripcion_corta = (
                (incidente.descripcion[:30] + "...")
                if len(incidente.descripcion) > 30
                else incidente.descripcion
            )
            folium.Marker(
                location=coordenadas,
                popup=folium.Popup(
                    folium.Html(
                        contenido_popup,
                        script=True,
                    ),
                    max_width=250,
                ),
                tooltip=descripcion_corta,  # Agrega un tooltip
                icon=folium.Icon(color="red", icon="info-sign"),
            ).add_to(capa)
        else:
            print(
                f"Formato de coordenadas no reconocido para el incidente: {incidente}"
            )
    mapa.add_child(capa)


def agregar_geojson(capa, geojson_data, style_function):
    folium.GeoJson(geojson_data, style_function=style_function).add_to(capa)


def agregar_control_capas(mapa):
    folium.LayerControl().add_to(mapa)
