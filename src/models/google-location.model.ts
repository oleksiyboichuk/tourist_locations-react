export interface GoogleLocationsResponseModel {
    next_page_token: string;
    results: GoogleLocationsModel[]
}

export interface GoogleLocationsModel {
    business_status: string;
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        },
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            },
            southwest: {
                lat: number;
                lng: number;
            }
        }
    },
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours?: {
        open_now: boolean;
    },
    photos: [
        {
            height: number;
            html_attributions: string[];
            photo_reference: string;
            width: number[];
        }
    ],
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    },
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
}

export interface GoogleLocationsModifiedModel extends GoogleLocationsModel {
    _id: string;
    country_id: string;
    city_name: string;
    city_id: string;
    category_id: string;
    address_multi_language: MultiLanguageMap;
    title_multi_language: MultiLanguageMap;
    description_multi_language: MultiLanguageMap;
}

export interface MultiLanguageMap {
    [key: string]: string;
}