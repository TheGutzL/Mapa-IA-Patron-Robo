import { RoboSchemaInfer } from "@/models/Robo";
import axios from "./axios";

export const getRobosRequest = async (): Promise<RoboSchemaInfer[]> =>
  (await axios.get(`/robbery`)).data;

export const createRoboRequest = (robo: RoboSchemaInfer) =>
  axios.post(`/robbery`, robo);
