import {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Tab} from "@headlessui/react";
import {Button} from "@headlessui/react";
import {getLocationById, updateLocationById} from "../../../services/tourist-location.service.ts";
import {GoogleLocationsModifiedModel} from "../../../models/google-location.model.ts";

import {RiAiGenerate2} from "react-icons/ri";

const UpdateLocationModal = ({
                                 id,
                                 onClose,
                             }: {
    id: string;
    onClose: (confirmed: boolean) => void;
}) => {
    const [location, setLocation] = useState<GoogleLocationsModifiedModel | null>(null);
    const {control, handleSubmit, setValue, getValues} = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await getLocationById(id);
                setLocation(locationData);

                if (locationData) {
                    setValue("city_name", locationData.city_name);
                    setValue("country_id", locationData.country_id);
                    setValue("city_id", locationData.city_id);
                    setValue("category_id", locationData.category_id);
                    setValue("location.lat", locationData.geometry.location.lat || "");
                    setValue("location.lng", locationData.geometry.location.lng || "");
                    setValue("type", locationData.types || []);

                    ["address_multi_language", "title_multi_language", "description_multi_language"].forEach(
                        (fieldKey) => {
                            Object.keys(locationData[fieldKey] || {}).forEach((lang) => {
                                setValue(`${fieldKey}.${lang}`, locationData[fieldKey][lang]);
                            });
                        }
                    );
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, setValue]);

    const onSubmit = async (data: any) => {
        const formattedData = {
            ...location,
            ...data,
            Location: {
                lat: data["location.lat"] || location?.geometry.location.lat,
                lng: data["location.lng"] || location?.geometry.location.lng,
            },
        }

        delete formattedData["location.lat"];
        delete formattedData["location.lng"];

        console.log("Updated Data:", formattedData);

        try {
            await updateLocationById(formattedData._id, formattedData);
        } catch (error) {
            console.log("Error updating data", error);
        }
        onClose(true);
    };


    if (!location) return <div>Loading...</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 transition-opacity duration-300"
                onClick={() => onClose(false)}
            ></div>

            <div
                className="relative bg-neutral-900 py-5 px-7 border-[1px] border-white/5 rounded shadow-lg z-10 transition-opacity duration-300 w-[50%]"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="text-white space-y-4">
                    <div>
                        <label>Ім'я міста</label>
                        <Controller
                            name="city_name"
                            control={control}
                            render={({field}) => (
                                <input
                                    disabled={true}
                                    {...field}
                                    className="w-full p-2 rounded bg-neutral-800 text-white/40"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label>Розташування</label>
                        <div className="space-y-2 w-full">
                            <Button className="bg-green-900 px-4 py-1 rounded transition-colors hover:bg-green-800"> <a
                                href={`https://www.google.com/maps?q=${location.geometry.location.lat},${location.geometry.location.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block no-underline"
                            >
                                Показати на карті
                            </a></Button>
                        </div>
                    </div>

                    <div>
                        <label>Тип</label>
                        <Controller
                            name="type"
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="w-full p-2 rounded bg-neutral-800"
                                />
                            )}
                        />
                    </div>

                    {["address_multi_language", "title_multi_language", "description_multi_language"].map(
                        (fieldKey) => (
                            <div key={fieldKey}>
                                <label>{fieldKey.replace("multi_language", "")}</label>
                                <Tab.Group>
                                    <Tab.List className="flex space-x-1 justify-between">
                                        <div>
                                            {Object.keys(location[fieldKey]).map((lang) => (
                                                <Tab
                                                    key={lang}
                                                    className={({selected}) =>
                                                        `px-3 py-1 rounded mr-1 mb-1 ${
                                                            selected ? "bg-green-800" : "bg-neutral-800"
                                                        }`
                                                    }
                                                >
                                                    {lang}
                                                </Tab>
                                            ))}
                                        </div>
                                        <span
                                            className="flex justify-center items-center px-2 py-1 rounded mb-1 bg-neutral-700 transition-colors hover:bg-rose-600 cursor-pointer"><RiAiGenerate2
                                            className="text-xl"/></span>
                                    </Tab.List>

                                    <Tab.Panels>
                                        {Object.keys(location[fieldKey]).map((lang) => (
                                            <Tab.Panel key={lang}>
                                                <Controller
                                                    name={`${fieldKey}.${lang}`}
                                                    control={control}
                                                    defaultValue={location[fieldKey][lang]}
                                                    render={({field}) => (
                                                        <textarea
                                                            {...field}
                                                            rows={fieldKey === 'description_multi_language' ? 6 : 3}
                                                            className="w-full p-2 rounded bg-neutral-800"
                                                        ></textarea>
                                                    )}
                                                />
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        )
                    )}

                    <div className="flex justify-end gap-3">
                        <Button
                            type="submit"
                            className="bg-green-800 text-white px-3 py-1 rounded transition-colors hover:bg-green-700/90"
                        >
                            Оновити
                        </Button>
                        <Button
                            type="button"
                            className="bg-neutral-700 text-white px-4 py-1 rounded transition-colors hover:bg-rose-600/90"
                            onClick={() => onClose(false)}
                        >
                            Закрити
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateLocationModal;
