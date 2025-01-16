export interface LocationModel {
    CountryId: string;
    CityId: string;
    AddressMultiLanguage: string;
    TitleMultiLanguage: string;
    DescriptionMultiLanguage: string;
    Location: string;
    CategoryId: string;
}

export interface LocationPayloadModel {
    cityName: string;
    translationPrompt: string;
    descriptionPrompt: string;
    model: string;
}

export interface CityListModel {
    CityId: string;
    CityName: string;
}

export interface LocationResponseModel {
    CountryId: string;
    CityId: string;
    CityName: string;
    CategoryId: string;
    AddressMultiLanguage: Record<string, string>;
    TitleMultiLanguage: Record<string, string>;
    DescriptionMultiLanguage: Record<string, string>;
    Location: object;
    Type: string[]
}