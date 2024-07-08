import ipywidgets as widgets
from IPython.display import display
from config.mapa import agregar_marcadores, limpiar_marcador, crear_capa
from folium import Map

def create_date_picker(description):
    date_picker = widgets.DatePicker(
        description=description,
        disabled=False
    )
    return date_picker

def create_button(start_date_picker, end_date_picker, mapa: Map, datos_incidentes, capa_marcadores):
    button = widgets.Button(description="Filtrar Fechas")
    
    def on_button_clicked(b):
        fecha_inicio = start_date_picker.value
        fecha_fin = end_date_picker.value
        agregar_marcadores(mapa, datos_incidentes, fecha_inicio, fecha_fin)

    button.on_click(on_button_clicked)
    
    return button

def create_ui(mapa, datos_incidentes, capa_marcadores):
    start_date_picker = create_date_picker('Fecha de inicio')
    end_date_picker = create_date_picker('Fecha de fin')
    button = create_button(start_date_picker, end_date_picker, mapa, datos_incidentes, capa_marcadores)
    display(start_date_picker)
    display(end_date_picker)
    display(button)