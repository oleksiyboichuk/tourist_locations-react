import {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Tab} from "@headlessui/react";
import {Button} from "@headlessui/react";
import {getLocationById, updateLocationById} from "../../../services/tourist-location.service.ts";
import {LocationResponseModel} from "../../../models/location.model.ts";

const UpdateLocationModal = ({
                                 id,
                                 onClose,
                             }: {
    id: string;
    onClose: (confirmed: boolean) => void;
}) => {
    const [location, setLocation] = useState<LocationResponseModel | null>(null);
    const {control, handleSubmit, setValue, getValues} = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await getLocationById(id);
                setLocation(locationData);

                if (locationData) {
                    setValue("CityName", locationData.CityName);
                    setValue("CountryId", locationData.CountryId);
                    setValue("CityId", locationData.CityId);
                    setValue("CategoryId", locationData.CategoryId);
                    setValue("Location.lat", locationData.Location?.lat || "");
                    setValue("Location.lng", locationData.Location?.lng || "");
                    setValue("Type", locationData.Type || []);

                    ["AddressMultiLanguage", "TitleMultiLanguage", "DescriptionMultiLanguage"].forEach(
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
                lat: data["Location.lat"] || location?.Location?.lat,
                lng: data["Location.lng"] || location?.Location?.lng,
            },
        }

        delete formattedData["Location.lat"];
        delete formattedData["Location.lng"];

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
                className="relative bg-neutral-900 py-5 px-7 border-[1px] border-white/5 rounded shadow-lg z-10 transition-opacity duration-300"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="text-white space-y-4">
                    <div>
                        <label>City Name</label>
                        <Controller
                            name="CityName"
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
                        <label>Location</label>
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="Location.lat"
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        placeholder="Latitude"
                                        {...field}
                                        value={field.value || ""}
                                        className="w-full p-2 rounded bg-neutral-800"
                                    />
                                )}
                            />
                            <Controller
                                name="Location.lng"
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        placeholder="Longitude"
                                        {...field}
                                        value={field.value || ""}
                                        className="w-full p-2 rounded bg-neutral-800"
                                    />
                                )}
                            />

                        </div>
                    </div>

                    <div>
                        <label>Type</label>
                        <Controller
                            name="Type"
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

                    {["AddressMultiLanguage", "TitleMultiLanguage", "DescriptionMultiLanguage"].map(
                        (fieldKey) => (
                            <div key={fieldKey}>
                                <label>{fieldKey.replace("MultiLanguage", "")}</label>
                                <Tab.Group>
                                    <Tab.List className="flex space-x-1">
                                        {Object.keys(location[fieldKey]).map((lang) => (
                                            <Tab
                                                key={lang}
                                                className={({selected}) =>
                                                    `px-3 py-1 rounded mb-1 ${
                                                        selected ? "bg-green-700" : "bg-neutral-800"
                                                    }`
                                                }
                                            >
                                                {lang}
                                            </Tab>
                                        ))}
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
                                                            rows={4}
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
                            className="bg-rose-700 text-white px-4 py-1 rounded transition-colors hover:bg-rose-600/90"
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
