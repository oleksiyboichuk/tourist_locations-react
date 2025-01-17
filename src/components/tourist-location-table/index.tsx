import { useEffect, useState } from "react";
import { LocationResponseModel } from "../../models/location.model";
import {deleteLocation, getLocationList} from "../../services/tourist-location.service.ts";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmModal from "../modals/delete-confirm";

const TouristLocationTable = ({ city }: { city: string }) => {
    const [locations, setLocations] = useState<LocationResponseModel[] | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

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

    const handleDeleteClick = (id: string) => {
        console.log("Модалка відкривається для ID:", id);
        setDeleteTarget(id);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async (confirmed: boolean) => {
        setDeleteModalOpen(confirmed);
        if (confirmed && deleteTarget) {
            try {
                await deleteLocation(deleteTarget);
                const updatedLocations: LocationResponseModel[] | null = await getLocationList(city);
                setLocations(updatedLocations);
            } catch (error) {
                console.log('Помилка при видаленні локації: ', error);
            }
            setDeleteModalOpen(false);
        } else {
            setDeleteModalOpen(false);
        }
    };

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
                    {locations && locations.map((location: LocationResponseModel) => (
                        <tr key={location._id} className="border border-gray-700">
                            <td className="px-4 py-2 border border-gray-700">{location.TitleMultiLanguage['uk']}</td>
                            <td className="px-4 py-2 border border-gray-700">{location.AddressMultiLanguage['uk']}</td>
                            <td className="px-4 py-2 border border-gray-700">
                                {`Lat: ${location.Location.lat}, Lng: ${location.Location.lng}`}
                            </td>
                            <td className="px-4 py-2 border border-gray-700 text-center">
                                <div
                                    className="inline-block p-3 cursor-pointer rounded transition-all hover:text-neutral-700 group">
                                    <FaRegEdit
                                        className="text-xl text-neutral-500 transition-colors group-hover:text-neutral-400"/>
                                </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-700 text-center">
                                <div
                                    className="inline-block p-3 cursor-pointer rounded transition-all hover:text-rose-500 group"
                                    onClick={() => handleDeleteClick(location._id)}
                                >
                                    <RiDeleteBin6Line
                                        className="text-xl text-rose-800 transition-colors group-hover:text-rose-500"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {deleteModalOpen && (
                <DeleteConfirmModal
                    onClose={handleDeleteConfirm}
                    message="Ви впевнені, що хочете видалити дане поле?"
                />
            )}
        </div>
    );
};

export default TouristLocationTable;
