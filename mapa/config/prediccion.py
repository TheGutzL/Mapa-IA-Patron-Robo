import tensorflow as tf
from keras._tf_keras.keras.models import Sequential
from keras._tf_keras.keras.layers import Dense, Input

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
import json
import re


def entrenar_modelo():
    # Leer datos desde el archivo JSON
    file_path = "data/noticias-datos-manuales.json"
    with open(file_path, "r") as file:
        data = json.load(file)

    # Conversión a DataFrame
    df = pd.DataFrame(data)

    # Preprocesamiento de datos
    df["fecha"] = pd.to_datetime(df["fecha"])
    df["año"] = df["fecha"].dt.year
    df["mes"] = df["fecha"].dt.month
    df["día"] = df["fecha"].dt.day

    def normalize_hour(hour_str):
        match = re.match(r"(\d{1,2})(?::(\d{2}))?", hour_str)
        if match:
            hour, minute = match.groups()
            if not minute:
                minute = "00"
            return f"{int(hour):02d}:{minute}"
        return "00:00"

    df["hora"] = df["hora"].apply(normalize_hour)
    df["hora"] = pd.to_datetime(df["hora"], format="%H:%M").dt.hour
    df["día_semana"] = df["fecha"].dt.dayofweek

    df[["latitud", "longitud"]] = df["coordenadas"].apply(pd.Series)

    features = ["año", "mes", "día", "hora", "día_semana"]
    X = df[features]
    y = df[["latitud", "longitud"]]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    scaler_X = StandardScaler()
    X_train_scaled = scaler_X.fit_transform(X_train)

    scaler_y = StandardScaler()
    y_train_scaled = scaler_y.fit_transform(y_train)

    model = Sequential()
    model.add(Input(shape=(X_train_scaled.shape[1],)))
    model.add(Dense(64, activation="relu"))
    model.add(Dense(32, activation="relu"))
    model.add(Dense(2, activation="linear"))

    model.compile(loss="mse", optimizer="adam", metrics=["mae"])

    warnings.filterwarnings('ignore')
    model.fit(
        X_train_scaled, y_train_scaled, epochs=50, batch_size=10, validation_split=0.2, verbose=0
    )

    return scaler_X, scaler_y, model, X_test


def hacer_predicciones(scaler_X, scaler_y, model, X_test):
    X_test_scaled = scaler_X.transform(X_test)
    predicciones = model.predict(X_test_scaled)
    predicciones_desnormalizadas = scaler_y.inverse_transform(predicciones)
    return predicciones_desnormalizadas
