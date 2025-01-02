import axios from "axios";
import {LocationModel, LocationPayloadModel} from "../models/location.model";

const baseURL = "http://localhost:3001";

export const generateTouristLocations = async (
    params: LocationPayloadModel
): Promise<LocationModel[]> => {
    return axios
        .post<LocationModel[]>(`${baseURL}/api/location`, {
            params,
        })
        .then((response) => response.data);
};
