import { useEffect, useState } from "react";
import { LocationResponseModel } from "../../models/location.model";
import { getLocationList } from "../../services/tourist-location.service.ts";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TouristLocationTable = ({ city }: { city: string }) => {
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
        <div className="my-10">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-700">
                    <thead className="bg-neutral-800/30 text-white">
                    <tr>
                        <th className="px-4 py-2 border border-gray-700">Назва</th>
                        <th className="px-4 py-2 border border-gray-700">Адреса</th>
                        <th className="px-4 py-2 border border-gray-700">Координати</th>
                        <th className="px-4 py-2 border border-gray-700">Редагувати</th>
                        <th className="px-4 py-2 border border-gray-700">Видалити</th>
                    </tr>
                    </thead>
                    <tbody className="bg-transparent text-white">
                    {locations && locations.map((location) => (
                        <tr key={location._id} className="border border-gray-700">
                            <td className="px-4 py-2 border border-gray-700">{location.TitleMultiLanguage['uk']}</td>
                            <td className="px-4 py-2 border border-gray-700">{location.AddressMultiLanguage['uk']}</td>
                            <td className="px-4 py-2 border border-gray-700">
                                {`Lat: ${location.Location.lat}, Lng: ${location.Location.lng}`}
                            </td>
                            <td className="px-4 py-2 border border-gray-700 text-center">
                                <FaRegEdit className="inline-block text-xl text-blue-500 cursor-pointer" />
                            </td>
                            <td className="px-4 py-2 border border-gray-700 text-center">
                                <RiDeleteBin6Line className="inline-block text-xl text-red-500 cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TouristLocationTable;
