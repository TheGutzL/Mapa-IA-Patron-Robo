import axios from "./axios";

export const getMapWithPredictionsRequest = async () => await axios.get(`map/mapa-predicciones`)

export const updateMapRequest = async () => await axios.post(`/map/update`);
