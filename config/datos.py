import json
from typing import List

from models.Incidente import Incidente


def cargar_datos(ruta: str) -> List[Incidente]:
    with open(ruta, "r", encoding="utf-8") as archivo:
        datos_json = json.load(archivo)

    datos = [Incidente(**incidente) for incidente in datos_json]
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
