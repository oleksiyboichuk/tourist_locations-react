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
    CityName: string;
    LocationTranslation: string;
    LocationDescription: string;
}

export interface LocationFormData {
    cityName: string;
    translationPrompt: string;
    descriptionPrompt: string;
    model: string;
}
