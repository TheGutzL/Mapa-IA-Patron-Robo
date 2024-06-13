from typing import List
from models.Incidente import Incidente, Coordenadas
from folium.plugins import HeatMap
from folium import Map
from folium.features import GeoJsonTooltip
import folium
import locale
import models.Incidente
import pandas as pd


def crear_mapa():
    mapa = folium.Map(location=[-14.0946, -75.7139], zoom_start=10)
    return mapa


def crear_capa(nombre):
    capa = folium.FeatureGroup(name=nombre)
    return capa


def agregar_marcadores(mapa, capa, datos: List[Incidente]):
    locale.setlocale(locale.LC_TIME, "es_ES.UTF-8")
    for incidente in datos:
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
                icon=folium.Icon(color="red", icon="info-sign"),
            ).add_to(capa)
        else:
            print(
                f"Formato de coordenadas no reconocido para el incidente: {incidente}"
            )
    mapa.add_child(capa)

def agregar_mapa_calor(mapa, datos: List[Incidente], capa):
    heat_data = [[incidente.coordenadas.latitud, incidente.coordenadas.longitud] for incidente in datos if isinstance(incidente.coordenadas, Coordenadas)]
    
    HeatMap(heat_data).add_to(capa)
    
    mapa.add_child(capa)
    

def agregar_geojson(capa, geojson_data, style_function):
    folium.GeoJson(
        geojson_data, 
        style_function=style_function, 
        tooltip=GeoJsonTooltip(
            fields=['nombdist'],
            aliases=['Distrito'],
            localize=True
        )
    ).add_to(capa)


def agregar_control_capas(mapa):
    folium.LayerControl().add_to(mapa)
    


