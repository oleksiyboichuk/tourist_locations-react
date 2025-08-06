import * as XLSX from 'xlsx';
import {GoogleLocationsModifiedModel} from "../models/google-location.model";

export const generateExcelUtil = (data: GoogleLocationsModifiedModel[] | null) => {
    if (!data) return null;

    try {
        const excelData = data.map((item: GoogleLocationsModifiedModel) => [
            item.country_id,
            item.city_id,
            JSON.stringify(item.address_multi_language),
            JSON.stringify(item.title_multi_language),
            JSON.stringify(item.description_multi_language),
            JSON.stringify(item.geometry.location),
            item.category_id,
        ]);

        const headers = [
            "CountryId",
            "CityId",
            "AddressMultiLanguage",
            "TitleMultiLanguage",
            "DescriptionMultiLanguage",
            "Location",
            "CategoryId",
        ];

        const sheetData = [headers, ...excelData];

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, "tourist_locations.xlsx");
    } catch (error) {
        console.error("Error generating excel file:", error);
    }
}
