import ipywidgets as widgets
from IPython.display import display
from config.mapa import agregar_marcadores

def create_date_picker(description):
    date_picker = widgets.DatePicker(
        description=description,
        disabled=False
    )
    return date_picker

def create_button(start_date_picker, end_date_picker, mapa, capa_marcadores, datos_incidentes):
    button = widgets.Button(description="Filtrar Fechas")
    
    def on_button_clicked(b):
        fecha_inicio = start_date_picker.value
        fecha_fin = end_date_picker.value
        agregar_marcadores(mapa, capa_marcadores, datos_incidentes, fecha_inicio, fecha_fin)

    button.on_click(on_button_clicked)
    
    return button

def create_ui(mapa, capa_marcadores, datos_incidentes):
    start_date_picker = create_date_picker('Fecha de inicio')
    end_date_picker = create_date_picker('Fecha de fin')
    button = create_button(start_date_picker, end_date_picker, mapa, capa_marcadores, datos_incidentes)
    display(start_date_picker)
    display(end_date_picker)
    display(button)