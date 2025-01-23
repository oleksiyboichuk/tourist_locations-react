import {useEffect, useState} from "react";
import {GoogleLocationsModel, GoogleLocationsResponseModel} from "../../models/google-location.model";
import {Button, Field} from "@headlessui/react";
import clsx from "clsx";
import {saveLocations, searchLocations} from "../../services/tourist-location.service.ts";
import {MdLibraryAddCheck} from "react-icons/md";
import {MdOutlineLibraryAddCheck} from "react-icons/md";
import {usePopup} from "../popup";

const TouristLocationTable = ({city, query}: { city: string; query: string }) => {
    const [locations, setLocations] = useState<GoogleLocationsModel[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
    const [allSelected, setAllSelected] = useState<boolean>(true); // Стан для кнопки toggle\

    const { showPopup, PopupContainer } = usePopup();

    useEffect(() => {
        const fetchLocations = async (): Promise<void> => {
            try {
                const response: GoogleLocationsResponseModel | null = await searchLocations(city, query);
                if (response && response.results) {

                    setLocations(response.results);
                    setNextPage(response.next_page_token || null);
                    setSelectedLocations(new Set(response.results.map((location: GoogleLocationsModel) => location.place_id)));

                    if(response.results.length <= 0) {
                        showPopup("info", `Локації не знайдено`);
                    } else {
                        showPopup("success", `Знайдено ${response.results.length} локацій!`);

                    }
                }
            } catch (error) {
                console.error(error);
                showPopup("error", "Помилка при пошуку локацій");
            }
        };

        fetchLocations();
    }, [city, query]);

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

    const toggleSelectAll = (): void => {
        if (allSelected) {
            setSelectedLocations(new Set());
        } else {
            setSelectedLocations(new Set(locations.map((location: GoogleLocationsModel) => location.place_id)));
        }
        setAllSelected(!allSelected);
    };

    const handleNextClick = async (): Promise<void> => {
        try {
            const selectedData: GoogleLocationsModel[] = locations.filter((location: GoogleLocationsModel) => selectedLocations.has(location.place_id));
            console.log("Selected Locations:", selectedData);

            if (!nextPage) return;

            const response: GoogleLocationsResponseModel | null = await searchLocations(city, query, nextPage);
            if (response && response.results) {
                setLocations(response.results);
                setNextPage(response.next_page_token || null);
                setSelectedLocations(new Set(response.results.map((location: GoogleLocationsModel) => location.place_id)));
                setAllSelected(true);

                if(response.results.length <= 0) {
                    showPopup("warning", `Локації не знайдено`);
                } else {
                    showPopup("success", `Знайдено ${response.results.length} нових локацій!`);

                }
            }

            if(selectedData.length !== 0) {
                const savedLocations = await saveSelectedLocations(selectedData, city);
                console.log(savedLocations);
                showPopup("success", 'Попередні локації успішно збережено!');

            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveSelectedLocations = async (locations: GoogleLocationsModel[], city: string) => {
        try {
            const savedLocations = await saveLocations(locations, city);
            if (!savedLocations) {
                console.log("Error save location");
                return;
            }
            return savedLocations;
        } catch (error) {
            console.log("Error inside saveSelectedLocations", error);
        }
    }

    return (
        <div>
            {locations.length > 0 && <div>
                <table className="w-full border-collapse text-white">
                    <thead>
                    <tr className="bg-neutral-900">
                        <th className="border border-neutral-600 p-2 text-center">
                            <Button
                                type="button"
                                onClick={toggleSelectAll}
                                className="bg-neutral-700 text-white px-4 py-2 rounded text-2xl transition-colors hover:bg-neutral-600/80"
                            >
                                {allSelected ? <MdLibraryAddCheck/> : <MdOutlineLibraryAddCheck/>}
                            </Button>
                        </th>
                        <th className="border border-neutral-600 p-2">Ім'я</th>
                        <th className="border border-neutral-600 p-2">Адреса</th>
                        <th className="border border-neutral-600 p-2">Тип</th>
                        <th className="border border-neutral-600 p-2">Бізнес статус</th>
                        <th className="border border-neutral-600 p-2">Рейтинг</th>
                    </tr>
                    </thead>
                    <tbody>
                    {locations.map((location: GoogleLocationsModel) => (
                        <tr key={location.place_id} className="bg-transparent">
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
                            <td className="border border-neutral-600 p-2">{location.name}</td>
                            <td className="border border-neutral-600 p-2">{location.formatted_address}</td>
                            <td className="border border-neutral-600 p-2">{location.types.join(", ")}</td>
                            <td className="border border-neutral-600 p-2">{location.business_status}</td>
                            <td className="border border-neutral-600 p-2 text-center">{location.rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Field className="my-4">
                    <Button
                        type="button"
                        onClick={handleNextClick}
                        className={clsx(
                            "button-base button-focus button-hover button-active button-disabled"
                        )}
                    >
                        Наступні локації
                    </Button>
                </Field>

            </div>}
            <PopupContainer/>
        </div>
    );
};

export default TouristLocationTable;
