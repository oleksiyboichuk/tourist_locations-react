import axios from "axios";
import {CityListModel} from "../models/location.model";
import {
    GoogleLocationsModel,
    GoogleLocationsModifiedModel,
    GoogleLocationsResponseModel
} from "../models/google-location.model";

const isServer = typeof window === 'undefined';
const backendUrl = 'http://localhost:3001/api';

const getApiUrl = (path: string) => {
    return isServer ? `${backendUrl}${path}` : `/api${path}`;
};

export const searchLocations = async(city: string, query: string, next?: string): Promise<GoogleLocationsResponseModel | null> => {
    const url = getApiUrl('/search');
    return axios
        .get<GoogleLocationsResponseModel | null>(url, {
            params: { cityName: city, query, next: next || '' },
        })
        .then((response) => response.data);
}

export const saveLocations = async(locations: GoogleLocationsModel[], cityName: string): Promise<string | null>  => {
    const url = getApiUrl('/location');
    return axios
        .post<string>(url, {
            locations,
            cityName
        })
        .then((response) => response.data);
}

export const generateDescription = async (field: Record<string, string>): Promise<string | null> => {
    const url = getApiUrl('/location/generate');
    return axios
        .post<string>(url, field)
        .then((response) => response.data);
}

export const getLocationList = async(city: string): Promise<GoogleLocationsModifiedModel[] | null> => {
    const url = getApiUrl('/location');
    return axios
        .get<GoogleLocationsModifiedModel[] | null>(url, {
            params: { cityName: city },
        })
        .then((response) => response.data);
}

export const getLocationById = async(id: string): Promise<GoogleLocationsModifiedModel | null> => {
    const url = getApiUrl(`/location/${id}`);
    return axios
        .get<GoogleLocationsModifiedModel | null>(url)
        .then((response) => response.data);
}

export const updateLocationById = async(id: string, location: GoogleLocationsModifiedModel) => {
    const url = getApiUrl(`/location/${id}`);
    return axios
        .patch(url, location)
        .then((response) => response.data);
}

export const deleteLocation = async (id: string): Promise<any> => {
    const url = getApiUrl(`/location/${id}`);
    return axios
        .delete<any>(url)
        .then((response) => response.data);
};

export const getCityList = async (): Promise<CityListModel[] | null> => {
    const url = getApiUrl('/cities');
    return axios
        .get<CityListModel[]>(url)
        .then((response) => response.data);
};