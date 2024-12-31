import axios from "axios";

const baseURL = "http:localhost:3001";

export const generateTouristLocations = (params: any): Promise<any> => {
  return axios.post<any>(`${baseURL}/locations`, {
    body: {
      params,
    },
  });
};
