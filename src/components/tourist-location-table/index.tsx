import { useEffect, useState } from "react";
import {deleteLocation, getLocationList} from "../../services/tourist-location.service.ts";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateLocationModal from "../modals/update-location";
import {GoogleLocationsModel, GoogleLocationsModifiedModel} from "../../models/google-location.model.ts";
import {usePopup} from "../popup";
import {Button} from "@headlessui/react";

import {MdLibraryAddCheck, MdOutlineLibraryAddCheck} from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";

import {generateExcelUtil} from "../../utils/excel.util.ts";
import {getCorrectWord} from "../../utils/word.util.ts";
import ConfirmModal from "../modals/delete-confirm";
import Loader from "../loader";

const TouristLocationTable = ({ city }: { city: string }) => {
    const [locations, setLocations] = useState<GoogleLocationsModifiedModel[] | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const [updateLocationModal, setUpdateLocationModal] = useState(false);
    const [updateTarget, setUpdateTarget] = useState<string | null>(null);

    const [allSelected, setAllSelected] = useState<boolean>(true); // Стан для кнопки toggle\
    const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());

    const [excelModal, setExcelModal] = useState(false);
    const [excelTarget, setExcelTarget] = useState('');

    const [selectedData, setSelectedData] = useState<GoogleLocationsModifiedModel[] | null>(null);

    const [loading, setLoading] = useState(false);

    const { showPopup, PopupContainer } = usePopup();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const locations: GoogleLocationsModifiedModel[] | null = await getLocationList(city);
                setLocations(locations);
                setLoading(false);
                setSelectedLocations(new Set(locations && locations.map((location: GoogleLocationsModel) => location.place_id)));
                console.log('locations', locations);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    const handleDeleteClick = (id: string) => {
        console.log("Модалка відкривається для ID:", id);
        setDeleteTarget(id);
        setDeleteModalOpen(true);
    };

    const handleCheckboxChange = (placeId: string): void => {
        setSelectedLocations(prev => {
            const updated = new Set(prev);
            if (updated.has(placeId)) {
                updated.delete(placeId);
            } else {
                updated.add(placeId);
            }
            return updated;
        });
    };

    const handleDeleteConfirm = async (confirmed: boolean) => {
        setDeleteModalOpen(confirmed);
        if (confirmed && deleteTarget) {
            try {
                await deleteLocation(deleteTarget);
                const updatedLocations: GoogleLocationsModifiedModel[] | null = await getLocationList(city);
                setLocations(updatedLocations);
                showPopup("success", "Локацію успішно видалено!");

            } catch (error) {
                console.log('Помилка при видаленні локації: ', error);
                showPopup("error", "Помилка при видаленні локації!");
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

    const handleUpdateClose = (value: boolean) => {
        setUpdateTarget(null);
        setUpdateLocationModal(false);

        if(value) {
            showPopup("success", "Дані успішно оновлено!");
        }
    };

    const toggleSelectAll = (): void => {
        if (allSelected) {
            setSelectedLocations(new Set());
        } else {
            setSelectedLocations(new Set(locations && locations.map((location: GoogleLocationsModel) => location.place_id)));
        }
        setAllSelected(!allSelected);
    };

    const generateExcel = () => {
        const filteredData = locations?.filter((location: GoogleLocationsModel) =>
            selectedLocations.has(location.place_id)
        );

        if (filteredData && filteredData.length > 0) {
            const message = getCorrectWord(filteredData.length);

            setSelectedData(filteredData);
            setExcelModal(true);
            setExcelTarget(`Експортувати ${filteredData.length} ${message}?`);
        } else {
            console.error("No data selected for export.");
            showPopup("error", "Виберіть дані для експорту!");
        }
    };

    const excelModalClose = (confirmed: boolean) => {
        setExcelModal(false);

        if (confirmed && selectedData) {
            generateExcelUtil(selectedData);
            setSelectedData(null);
        } else if (!confirmed) {
            console.log("Excel export canceled.");
        }
    };


    return (
       <>
           {loading && <Loader/>}
           {locations && locations?.length > 0 && <div className="my-10">
               <div className="overflow-x-auto">
                   <table className="min-w-full table-auto border-collapse border border-neutral-700">
                       <thead className="bg-neutral-800/30 text-white">
                       <tr>
                           <th className="border border-neutral-600 p-2 text-center">
                               <Button
                                   type="button"
                                   onClick={toggleSelectAll}
                                   className="bg-neutral-700 text-white px-4 py-2 rounded text-2xl transition-colors hover:bg-neutral-600/80"
                               >
                                   {allSelected ? <MdLibraryAddCheck/> : <MdOutlineLibraryAddCheck/>}
                               </Button>
                           </th>
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
                               <td className="border border-neutral-600 p-2 text-center">
                                   <label className="relative inline-flex items-center">
                                       <input
                                           type="checkbox"
                                           checked={selectedLocations.has(location.place_id)}
                                           onChange={() => handleCheckboxChange(location.place_id)}
                                           className="peer appearance-none h-5 w-5 border border-neutral-500 rounded-sm bg-neutral-800 checked:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       />
                                       <span
                                           className="absolute inset-0 flex items-center justify-center text-white pointer-events-none peer-checked:opacity-100 opacity-0">
                                        ✓
                                    </span>
                                   </label>
                               </td>
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
                   <ConfirmModal
                       onClose={handleDeleteConfirm}
                       message="Ви впевнені, що хочете видалити дане поле?"
                   />
               )}
               <Button
                   className="text-white bg-green-800 px-3 py-1 rounded mt-4 transition-colors hover:bg-green-700 active:bg-green-900"
                   onClick={() => generateExcel()}
               ><div className="flex justify-center items-center gap-2">
                   <p className="text-[17px]">Експортувати</p>
                  <RiFileExcel2Line className="text-xl"/>
               </div></Button>
           </div>}
           {excelModal && <ConfirmModal message={excelTarget} onClose={excelModalClose}/>}
           <PopupContainer/>
       </>
    );
};

export default TouristLocationTable;
