import os
from datetime import datetime
from typing import List

import folium
import folium.plugins
from folium import Map
from folium.features import GeoJsonTooltip
from folium.plugins import HeatMap, MarkerCluster, LocateControl, Geocoder, MiniMap, MousePosition, Draw

from models.Incidente import Incidente, Coordenadas


def crear_mapa() -> Map:
    mapa = folium.Map(location=[-14.0946, -75.7139], zoom_start=10, tiles='CartoDB positron')
    return mapa


def agregar_geocoder(mapa: Map):
    Geocoder().add_to(mapa)


def agregar_posicion_mouse(mapa: Map):
    MousePosition().add_to(mapa)


def agregar_minimapa(mapa: Map):
    MiniMap(toggle_display=True).add_to(mapa)

def agregar_dibujos(mapa: Map):
    Draw(export=True).add_to(mapa)

def crear_capa(nombre: str, mostrar: bool):
    capa = folium.FeatureGroup(name=nombre, show=mostrar)
    return capa


def agregar_marcadores(mapa, capa, datos: List[Incidente], fecha_inicio=None, fecha_fin=None):
    cluster = MarkerCluster().add_to(capa)

    for incidente in datos:
        fecha_incidente = datetime.strptime(incidente.fecha, "%Y-%m-%d").date()
        if fecha_inicio and fecha_fin and not fecha_inicio <= fecha_incidente <= fecha_fin:
            continue

        coordenadas_data = incidente.coordenadas
        if isinstance(coordenadas_data, Coordenadas):
            coordenadas = [coordenadas_data.latitud, coordenadas_data.longitud]
            contenido_popup = f"""
                <div style="color: red; font-size: 16px; font-weight: bold;">Descripción:</div>
                <div style="color: black; font-size: 14px;">{incidente.descripcion}</div>
                <div style="color: red; font-size: 16px; font-weight: bold;">Ubicación:</div>
                <div style="color: black; font-size: 14px;">{incidente.ubicacion}</div>
                <div style="color: red; font-size: 16px; font-weight: bold;">Fecha:</div>
                <div style="color: black; font-size: 14px;">{incidente.fecha}</div>
            """
            descripcion_corta = (
                (incidente.descripcion[:30] + "...")
                if len(incidente.descripcion) > 30
                else incidente.descripcion
            )

            # Obtén la ruta del directorio actual del script
            directorio_actual = os.path.dirname(__file__)
            # Construye la ruta absoluta al archivo
            ruta_icono = os.path.join(directorio_actual, '..', 'images', 'pistola_icon.png')

            icon_pistola = folium.CustomIcon(
                ruta_icono,
                icon_size=(38, 38),
                icon_anchor=(19, 19),
                shadow_size=(50, 50),
                shadow_anchor=(25, 25),
                popup_anchor=(-3, -30),
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
                tooltip=descripcion_corta,
                icon=icon_pistola,
            ).add_to(cluster)

    mapa.add_child(capa)


def agregar_mapa_calor(mapa, datos: List[Incidente], capa):
    heat_data = [[incidente.coordenadas.latitud, incidente.coordenadas.longitud] for incidente in datos if
                 isinstance(incidente.coordenadas, Coordenadas)]

    HeatMap(heat_data).add_to(capa)

    mapa.add_child(capa)


def agregar_geojson(mapa: Map, capa, geojson_data):
    def style_function(feature):
        return {
            'fillOpacity': 0,  # Sin relleno
            'weight': 2,
            'color': 'black',  # Líneas negras
        }

    folium.GeoJson(
        geojson_data,
        style_function=style_function,
        name="GeoJSON Data",
        tooltip=GeoJsonTooltip(
            fields=['nombdist'],
            aliases=['Distrito'],
            localize=True
        )
    ).add_to(capa)


def agregar_color_seguridad(capa, geojson_data, dict_porcentaje_robos):
    def style_function(feature):
        distrito = feature['properties']['nombdist'].lower()
        porcentaje_robos = dict_porcentaje_robos.get(distrito)

        if porcentaje_robos is None:
            color = 'grey'
        elif porcentaje_robos > 50:
            color = 'red'  # Inseguro
        elif porcentaje_robos > 20:
            color = 'orange'  # Moderadamente seguro
        else:
            color = 'green'  # Seguro

        return {
            'fillColor': color,
            'color': 'black',
            'weight': 2,
            'fillOpacity': 0.5,
            'dashArray': '5, 5',
        }

    folium.GeoJson(
        geojson_data,
        style_function=style_function,
        tooltip=GeoJsonTooltip(
            fields=['nombdist'],
            aliases=['Distrito'],
            localize=True
        )
    ).add_to(capa)


def agregar_predicciones(mapa, capa, predicciones):
    for lat, lon in predicciones:
        folium.Marker(
            location=[lat, lon],
            popup=f"Posible robo futuro: {lat}, {lon}",
            icon=folium.Icon(color="red", icon="info-sign"),
        ).add_to(capa)
    mapa.add_child(capa)


def agregar_control_capas(mapa):
    folium.LayerControl().add_to(mapa)


def agregar_control_localizacion(mapa, auto_start=False, zoom_level=14):
    LocateControl(auto_start=auto_start, zoom=zoom_level).add_to(mapa)


def limpiar_marcador(mapa, capa):
    mapa.remove_child(capa)


