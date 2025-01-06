import axios from "axios";
import {CityListModel, LocationModel, LocationPayloadModel} from "../models/location.model";

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

export const getCityList = async (): Promise<CityListModel[]> => {
    return axios
        .get<CityListModel[]>(`${baseURL}/api/location`, {})
        .then((response) => response.data);
};
