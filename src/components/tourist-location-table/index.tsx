import {useEffect, useState} from "react";
import {LocationResponseModel} from "../../models/location.model";
import {getLocationList} from "../../services/tourist-location.service.ts";

const TouristLocationTable = ({city}: { city: string }) => {
    const [locations, setLocations] = useState<LocationResponseModel[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations: LocationResponseModel[] | null = await getLocationList(city);
                setLocations(locations);
                console.log('locations', locations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [city]);

    return (
        <div className="text-white">
            {locations && locations.map((location: LocationResponseModel) => (
                <div>{location.TitleMultiLanguage['uk']}</div>
            ))}
        </div>
    );
};

export default TouristLocationTable;
