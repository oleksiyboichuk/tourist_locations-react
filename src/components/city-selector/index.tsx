"use client";

import { Select } from '@headlessui/react';
import React, { FC, useEffect, useState } from "react";
import { CityListModel } from "@/models/location.model";

interface CitySelectorProps {
    cities: CityListModel[];
    onCitySelect: (selectedCity: string) => void;
}

const CitySelector: FC<CitySelectorProps> = ({ cities, onCitySelect }) => {
    const [selectedCity, setSelectedCity] = useState<string>("");

    const handleCityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
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
