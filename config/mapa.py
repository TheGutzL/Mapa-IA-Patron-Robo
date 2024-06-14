from typing import List
from models.Incidente import Incidente, Coordenadas
from folium.plugins import HeatMap
from folium import Map
from folium.features import GeoJsonTooltip
from datetime import datetime
from config.prediccion import entrenar_modelo, hacer_predicciones
from folium.plugins import GroupedLayerControl
import folium
import locale
import models.Incidente
import pandas as pd

def crear_mapa():
    mapa = folium.Map(location=[-14.0946, -75.7139], zoom_start=10)
    return mapa


def crear_capa(nombre: str, mostrar: bool):
    capa = folium.FeatureGroup(name=nombre, show=mostrar)
    return capa

def agregar_marcadores(mapa, datos: List[Incidente], fecha_inicio=None, fecha_fin=None):
    locale.setlocale(locale.LC_TIME, "es_ES.UTF-8")
    
    # Crear un diccionario para las subcapas
    subcapas = {}

    for incidente in datos:
        
        fecha_incidente = datetime.strptime(incidente.fecha, "%Y-%m-%d").date()
        
        if fecha_inicio is not None and fecha_fin is not None and not fecha_inicio <= fecha_incidente <= fecha_fin:
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
            
            # Si la subcapa para este tipo de incidente no existe, crearla
            if incidente.incidente not in subcapas:
                subcapas[incidente.incidente] = folium.FeatureGroup(name=incidente.incidente)

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
            ).add_to(subcapas[incidente.incidente])  # Añadir el marcador a la subcapa correspondiente
        else:
            print(
                f"Formato de coordenadas no reconocido para el incidente: {incidente}"
            )

    # Añadir todas las subcapas al mapa
    for subcapa in subcapas.values():
        mapa.add_child(subcapa)

    # Crear un diccionario para el control de capas agrupadas
    grouped_layer_control = {
        'Tipo de Robo': list(subcapas.values())
    }

    # Añadir el control de capas agrupadas al mapa
    GroupedLayerControl(grouped_layer_control).add_to(mapa)
    

def agregar_mapa_calor(mapa, datos: List[Incidente], capa):
    heat_data = [[incidente.coordenadas.latitud, incidente.coordenadas.longitud] for incidente in datos if isinstance(incidente.coordenadas, Coordenadas)]
    
    HeatMap(heat_data).add_to(capa)
    
    mapa.add_child(capa)
    

def agregar_geojson(capa, geojson_data):
    def style_function(feature):
        return {
            'fillOpacity': 0,  # Sin relleno
            'weight': 2,
            'color': 'black',  # Líneas negras
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

def agregar_color_seguridad(capa, geojson_data, style_function):
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
            icon=folium.Icon(color="blue", icon="info-sign"),
        ).add_to(capa)
    mapa.add_child(capa)

def agregar_control_capas(mapa):
    folium.LayerControl().add_to(mapa)
    


