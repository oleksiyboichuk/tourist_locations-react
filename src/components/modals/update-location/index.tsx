import {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Tab} from "@headlessui/react";
import {Button} from "@headlessui/react";
import {
    deleteImage,
    generateDescription,
    getLocationById,
    updateLocationById
} from "../../../services/tourist-location.service.ts";
import {GoogleLocationsModifiedModel} from "../../../models/google-location.model.ts";

import {RiAiGenerate2} from "react-icons/ri";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import { FaRegImage } from "react-icons/fa6";

import {usePopup} from "../../popup";
import ImageSliderModal from "../image-slider";


const UpdateLocationModal = ({
                                 id,
                                 onClose,
                             }: {
    id: string;
    onClose: (confirmed: boolean) => void;
}) => {
    const [location, setLocation] = useState<GoogleLocationsModifiedModel | null>(null);
    const {control, handleSubmit, setValue, getValues} = useForm();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [photos, setPhotos] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const {showPopup, PopupContainer} = usePopup();

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
                    setValue("place_photos", locationData.place_photos || []);

                    if(locationData.place_photos) {
                        setPhotos(locationData.place_photos || []);
                        console.log('photos', photos);
                    }

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

    const handleImages = () => {
        setIsImageModalOpen(true);
    };

    const handleImageModalClose = async (images: {updatedPhotos: string[], deletedPhotos: string[]} | null) => {
        if(!images) {
            setIsImageModalOpen(false);
            return;
        }
        const {updatedPhotos, deletedPhotos} = images;

        setIsImageModalOpen(false);
        if (updatedPhotos) {
            setPhotos(updatedPhotos);
            setValue("place_photos", updatedPhotos);
            console.log("Updated place_photos in form:", getValues("place_photos"));
        }
        if(deletedPhotos) {
            console.log('deletedPhotos', deletedPhotos);
            const result = await deleteImage(deletedPhotos);
            console.log('deleteImage', result);
        }
    };

    const onSubmit = async () => {
        if (!location) {
            console.error("Location data is missing.");
            return;
        }

        const currentValues = getValues();

        const formattedData: GoogleLocationsModifiedModel = {
            ...location,
            geometry: {
                ...location.geometry,
                location: {
                    lat: parseFloat(currentValues["location.lat"] || location.geometry.location.lat.toString()),
                    lng: parseFloat(currentValues["location.lng"] || location.geometry.location.lng.toString()),
                },
            },
            address_multi_language: {
                ...location.address_multi_language,
                ...currentValues.address_multi_language,
            },
            title_multi_language: {
                ...location.title_multi_language,
                ...currentValues.title_multi_language,
            },
            description_multi_language: {
                ...location.description_multi_language,
                ...currentValues.description_multi_language,
            },

            place_photos: currentValues.place_photos || [],
        };

        console.log("Formatted Data for Update:", formattedData);

        try {
            await updateLocationById(formattedData._id, formattedData);
            onClose(true);
        } catch (error) {
            console.error("Error updating location:", error);
            showPopup("error", "Помилка при оновлені даних!");
        }
    };

    const regenerateDescription = async (currentDescription: Record<string, string>) => {
        setLoading(true);

        try {
            const newDescription = await generateDescription(currentDescription);
            const parsedDescription = newDescription && JSON.parse(newDescription);

            if (newDescription) {
                showPopup("success", "Опис успішно згенеровано!")
            } else {
                showPopup("error", "Не вдалося оновити опис!")
            }

            Object.keys(parsedDescription).forEach((lang) => {
                setValue(`description_multi_language.${lang}`, parsedDescription[lang]);
            });

            setLocation((prev) => ({
                ...prev!,
                description_multi_language: {
                    ...prev!.description_multi_language,
                    ...parsedDescription,
                },
            }));

        } catch (error) {
            console.error("Error generating description:", error);
        } finally {
            setLoading(false);
        }
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
                                <label>{fieldKey.replace("_multi_language", "")}</label>
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

                                        {fieldKey === 'description_multi_language' && <span
                                            onClick={() => regenerateDescription(location?.description_multi_language)}
                                            className={`flex justify-center items-center px-2 py-1 rounded mb-1 bg-rose-700 transition-colors hover:bg-rose-600 cursor-pointer ${loading ? 'animate-pulse' : ''}`}>{loading ?
                                            <AiOutlineLoading3Quarters className="text-xl animate-spin"/> :
                                            <RiAiGenerate2
                                                className="text-xl"/>}</span>}
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
                                                            rows={fieldKey === "description_multi_language" ? 6 : 3}
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

                    <div className="flex justify-between gap-3">
                        <div className="flex justify-center items-center">
                            <Button
                                className={`text-neutral-900 px-3 py-1 rounded transition-colors hover:text-neutral-800 ${location.place_photos.length === 0 ? 'bg-gray-400' : 'bg-orange-400 hover:bg-orange-500/90'}`}
                                onClick={handleImages}
                                disabled={location.place_photos.length === 0}
                            >
                                <FaRegImage className="text-2xl"/>
                            </Button>
                        </div>
                        <div className="flex justify-center items-center gap-2">
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
                    </div>
                </form>
            </div>

            {isImageModalOpen && (
                <ImageSliderModal
                    images={photos}
                    onClose={handleImageModalClose}
                />
            )}
            <PopupContainer/>
        </div>
    );
};

export default UpdateLocationModal;
