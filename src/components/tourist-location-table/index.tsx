import { useEffect, useState } from "react";
import {deleteLocation, getLocationList} from "../../services/tourist-location.service.ts";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmModal from "../modals/delete-confirm";
import UpdateLocationModal from "../modals/update-location";
import {GoogleLocationsModifiedModel} from "../../models/google-location.model.ts";

const TouristLocationTable = ({ city }: { city: string }) => {
    const [locations, setLocations] = useState<GoogleLocationsModifiedModel[] | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const [updateLocationModal, setUpdateLocationModal] = useState(false);
    const [updateTarget, setUpdateTarget] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations: GoogleLocationsModifiedModel[] | null = await getLocationList(city);
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
                const updatedLocations: GoogleLocationsModifiedModel[] | null = await getLocationList(city);
                setLocations(updatedLocations);
            } catch (error) {
                console.log('Помилка при видаленні локації: ', error);
            }
            setDeleteModalOpen(false);
        } else {
            setDeleteModalOpen(false);
        }
    };

    const updateTouristLocation = (id: string) => {
        setUpdateTarget(id);
        setUpdateLocationModal(true);
    };

    const handleUpdateClose = () => {
        setUpdateTarget(null);
        setUpdateLocationModal(false);
    };

    return (
        <div className="my-10">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-neutral-700">
                    <thead className="bg-neutral-800/30 text-white">
                    <tr>
                        <th className="px-4 py-2 border border-neutral-700">Назва</th>
                        <th className="px-4 py-2 border border-neutral-700">Адреса</th>
                        <th className="px-4 py-2 border border-neutral-700">Координати</th>
                        <th className="px-4 py-2 border border-neutral-700">Редагувати</th>
                        <th className="px-4 py-2 border border-neutral-700">Видалити</th>
                    </tr>
                    </thead>
                    <tbody className="bg-transparent text-white">
                    {locations && locations.map((location: GoogleLocationsModifiedModel) => (
                        <tr key={location._id} className="border border-neutral-700">
                            <td className="px-4 py-2 border border-neutral-700">{location.title_multi_language['uk']}</td>
                            <td className="px-4 py-2 border border-neutral-700">{location.address_multi_language['uk']}</td>
                            <td className="px-4 py-2 border border-neutral-700">
                                {`Lat: ${location.geometry.location.lat}, Lng: ${location.geometry.location.lng}`}
                            </td>
                            <td className="px-4 py-2 border border-neutral-700 text-center">
                                <div
                                    className="inline-block p-3 cursor-pointer rounded transition-all hover:text-neutral-700 group"
                                    onClick={() => updateTouristLocation(location._id)}
                                >
                                    <FaRegEdit
                                        className="text-xl text-neutral-500 transition-colors group-hover:text-neutral-400"/>
                                </div>
                            </td>
                            <td className="px-4 py-2 border border-neutral-700 text-center">
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
            {updateLocationModal && updateTarget && (
                <UpdateLocationModal
                    id={updateTarget}
                    onClose={handleUpdateClose}
                />
            )}
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
