import json
from typing import List
from models.Incidente import Incidente, CasosAnteriores, Coordenadas
import pandas as pd
import requests

def cargar_datos(url: str) -> List[Incidente]:
    response = requests.get(url)
    if response.status_code == 200:
        datos_json = response.json()
    else:
        raise Exception("Error al obtener los datos del endpoint")

    datos = []
    for incidente in datos_json:
        incidente["casosAnteriores"] = [
            CasosAnteriores(**caso) for caso in incidente["casosAnteriores"]
        ]
        if incidente["coordenadas"] is not None:
            incidente["coordenadas"] = Coordenadas(**incidente["coordenadas"])
        else:
            incidente["coordenadas"] = Coordenadas(latitud=0.0, longitud=0.0)
        datos.append(Incidente(**incidente))

    return datos

def cargar_geojson(ruta: str):
    with open(ruta, "r", encoding="utf-8") as archivo:
        datos_geojson = json.load(archivo)
    return datos_geojson


def filtrar_geojson(geojson_data, distritos):
    filtered_features = []
    for feature in geojson_data["features"]:
        if (
            feature["properties"]["nombprov"].upper() == "ICA"
            and feature["properties"]["nombdist"].lower() in distritos
        ):
            filtered_features.append(feature)
    geojson_data["features"] = filtered_features
    return geojson_data

def contar_robos_por_distrito(datos: List[Incidente]) -> pd.Series:
    robos = [incidente for incidente in datos if incidente.incidente == 'robo']
    robos_por_distrito = pd.Series([robo.distrito for robo in robos]).value_counts()
    return robos_por_distrito

def calcular_porcentaje_robos(robos_por_distritos: pd.Series) -> pd.DataFrame:
    total_robos = robos_por_distritos.sum()
    porcentaje_robos = (robos_por_distritos / total_robos) * 100
    df_porcentaje_robos = pd.DataFrame({'Distrito': porcentaje_robos.index, 'Porcentaje de robos': porcentaje_robos.values})
    return df_porcentaje_robos

def guardar_porcentaje_robos_csv(df_porcentaje_robos: pd.DataFrame, ruta: str):
    df_porcentaje_robos.to_csv(ruta, index=False)
    