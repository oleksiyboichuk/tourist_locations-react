import { Select } from '@headlessui/react';
import React, { FC, useEffect, useState } from "react";
import { getCityList } from "../../services/tourist-location.service.ts";
import { CityListModel } from "../../models/location.model.ts";

interface CitySelectorProps {
    onCitySelect: (selectedCity: string) => void;
}

const CitySelector: FC<CitySelectorProps> = ({ onCitySelect }) => {
    const [cities, setCities] = useState<CityListModel[] | null>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cities = await getCityList();
                setCities(cities);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        setSelectedCity(city);
        onCitySelect(city);
    };

    return (
        <Select
            name="city-selector"
            aria-label="Select a city"
            value={selectedCity}
            onChange={handleCityChange}
        >
            <option value="" disabled>Select a city</option>
            {cities && cities.map((city: CityListModel) => (
                <option key={city.CityName} value={city.CityName}>
                    {city.CityName}
                </option>
            ))}
        </Select>
    );
}

export default CitySelector;
