import { getCityList } from "@/services/tourist-location.service";
import MainPage from "@/components/main-page";
import { CityListModel } from "@/models/location.model";

export default async function Home() {
    let cities: CityListModel[] = [];

    try {
        const cityList = await getCityList();
        if (cityList) {
            cities = cityList;
        }
    } catch (error) {
        console.error("Failed to fetch city list:", error);
        // The page will render with an empty city list
    }

    return <MainPage cities={cities} />;
}
