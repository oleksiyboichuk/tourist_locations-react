import axios from "axios";
import {CityListModel, LocationResponseModel} from "../models/location.model";
import {GoogleLocationsModel, GoogleLocationsResponseModel} from "../models/google-location.model.ts";

const baseURL = "http://localhost:3001/api";

export const searchLocations = async(city: string, query: string, next?: string): Promise<GoogleLocationsResponseModel | null> => {
    return axios
        .get<GoogleLocationsResponseModel | null>(`${baseURL}/location/search?cityName=${city}&query=${query}&next=${next ? next : ''}`, {})
        .then((response) => response.data);
}

export const saveLocations = async(locations: GoogleLocationsModel[], cityName: string): Promise<string | null>  => {
    return axios
        .post<string>(`${baseURL}/location`, {
            locations,
            cityName
        })
        .then((response) => response.data);
}

// export const generateTouristLocations = async (
//     params: LocationPayloadModel
// ): Promise<LocationModel[]> => {
//     return axios
//         .post<LocationModel[]>(`${baseURL}/location`, {
//             params,
//         })
//         .then((response) => response.data);
// };

export const getLocationList = async(city: string): Promise<LocationResponseModel[] | null> => {
    return axios
        .get<LocationResponseModel[] | null>(`${baseURL}/location?cityName=${city}`, {})
        .then((response) => response.data);
}

export const getLocationById = async(id: string): Promise<LocationResponseModel | null> => {
    return axios
        .get<LocationResponseModel | null>(`${baseURL}/location/${id}`, {})
        .then((response) => response.data);
}

export const updateLocationById = async(id: string, location: LocationResponseModel) => {
    return axios
        .patch(`${baseURL}/location/${id}`, location)
        .then((response) => response.data);
}

export const deleteLocation = async (id: string): Promise<any> => {
    return axios
        .delete<any>(`${baseURL}/location/${id}`, {})
        .then((response) => response.data);
};

export const getCityList = async (): Promise<CityListModel[] | null> => {
    return axios
        .get<CityListModel[]>(`${baseURL}/cities`, {})
        .then((response) => response.data);
};