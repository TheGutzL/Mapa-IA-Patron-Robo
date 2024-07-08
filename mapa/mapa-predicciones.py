from IPython.display import display
from config.mapa import (
    crear_mapa,
    crear_capa,
    agregar_marcadores,
    agregar_geojson,
    agregar_control_capas,
    agregar_mapa_calor,
    agregar_color_seguridad,
    agregar_predicciones,
    agregar_control_localizacion,
    agregar_geocoder,
    agregar_minimapa,
    agregar_posicion_mouse,
    agregar_dibujos
)
from config.datos import cargar_datos, filtrar_geojson, cargar_geojson, calcular_porcentaje_robos, \
    contar_robos_por_distrito, guardar_porcentaje_robos_csv
from helper import distritos
from config.ui import create_ui
from config.prediccion import entrenar_modelo, hacer_predicciones
from folium import Map
import os


def main():
    directorio_actual = os.path.dirname(__file__)
    ruta_geojson = os.path.join(directorio_actual, "data", "distritos-peru.geojson")
    ruta_porcentaje_robos = os.path.join(directorio_actual, "data", "porcentaje_robos.csv")
    ruta_guardado_html = os.path.join(directorio_actual, "build", "mapa-predicciones.html")
    
    mapa: Map = crear_mapa()
    geojson_data = cargar_geojson(ruta_geojson)
    datos_incidentes = cargar_datos("http://localhost:3000/robbery")

    scaler_X, scaler_y, model, X_test = entrenar_modelo(datos_incidentes)
    predicciones = hacer_predicciones(scaler_X, scaler_y, model, X_test)

    robos_por_distrito = contar_robos_por_distrito(datos_incidentes)
    df_porcentaje_robos = calcular_porcentaje_robos(robos_por_distrito)
    df_porcentaje_robos['Distrito'] = df_porcentaje_robos['Distrito'].str.lower()
    guardar_porcentaje_robos_csv(df_porcentaje_robos, ruta_porcentaje_robos)

    dict_porcentaje_robos = df_porcentaje_robos.set_index('Distrito')['Porcentaje de robos'].to_dict()

    capa_marcadores = crear_capa(nombre="Incidencias", mostrar=True)
    capa_geojson = crear_capa(nombre="Distritos de Ica", mostrar=True)
    capa_futuros_robos = crear_capa(nombre="Futuros Robos", mostrar=True)
    capa_mapa_calor = crear_capa(nombre="Mapa de Calor", mostrar=False)
    capa_color_seguridad = crear_capa(nombre="Color de Seguridad", mostrar=False)

    # create_ui(mapa, datos_incidentes, capa_marcadores)
    
    agregar_marcadores(mapa, capa_marcadores, datos_incidentes)
    agregar_mapa_calor(mapa, datos_incidentes, capa_mapa_calor)
    agregar_geojson(mapa, capa_geojson, geojson_data)
    agregar_color_seguridad(capa_color_seguridad, geojson_data, dict_porcentaje_robos)
    agregar_predicciones(mapa, capa_futuros_robos, predicciones)
    agregar_control_localizacion(mapa, auto_start=False)
    agregar_geocoder(mapa)
    agregar_minimapa(mapa)
    agregar_posicion_mouse(mapa)
    agregar_dibujos(mapa)

    geojson_data = filtrar_geojson(geojson_data, distritos.distritos_ica)
    mapa.add_child(capa_geojson)
    mapa.add_child(capa_mapa_calor)
    mapa.add_child(capa_color_seguridad)

    agregar_control_capas(mapa)
    mapa.save(ruta_guardado_html)


if __name__ == "__main__":
    main()

