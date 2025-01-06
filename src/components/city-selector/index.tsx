import { Select } from '@headlessui/react'
import {FC, useEffect} from "react";

interface CitySelectorProps {

}

const CitySelector:FC<CitySelectorProps> = () => {

    useEffect(() => {

    }, []);

    return(
        <Select name="status" aria-label="Project status">
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
        </Select>
    );
}

export default CitySelector;