import {useState} from "react";
import {useForm} from "react-hook-form";
import "./style.css";
import {
    Field,
    Input,
    Label,
    Button,
    Select,
} from "@headlessui/react";
import clsx from "clsx";

import {RiAiGenerate} from "react-icons/ri";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {IoChevronDownOutline} from "react-icons/io5";

import {LocationModel} from "../../models/location.model";
import {promptConfig} from "../../config/prompt.config.ts";

import {generateTouristLocations} from "../../services/tourist-location.service.ts";

const AddLocationForm = () => {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState<LocationModel[]>([]);

    const {register, handleSubmit, formState: { errors }} = useForm({mode: "onSubmit"});

    const onSubmit = async (data: any): Promise<void> => {
        setLoading(true);

        const newLocations: LocationModel[] = await generateTouristLocations(data);
        setLocations(newLocations);
        setLoading(false);
    };

    return (
        <div className="flex">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md px-6 py-10 my-10 border-[1px] border-white/10 rounded-xl"
            >
                <Field className="mb-6">
                    <Label className="text-sm/6 font-medium text-white">
                        Ім'я міста
                    </Label>
                    <Input
                        {...register("cityName", { required: true })}
                        className={clsx(
                            "input-base input-focus",
                            errors.cityName && "border-red-500"
                        )}
                    />
                    {errors.cityName && (
                        <span className="text-red-500 text-xs">Це поле обов'язкове</span>
                    )}
                </Field>

                <Field className="mb-6">
                    <Label className="text-sm/6 font-medium text-white">
                        Генерація малих текстів
                    </Label>
                    <div className="relative">
                        <Select
                            {...register("translationPrompt", { required: true })}
                            className={clsx(
                                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                errors.smallTextGeneration && "border-red-500"
                            )}
                        >
                            <option value={`${promptConfig.translationValue}`}>Назва та адреса міста</option>
                        </Select>
                        {errors.smallTextGeneration && (
                            <span className="text-red-500 text-xs">Це поле обов'язкове</span>
                        )}
                        <IoChevronDownOutline
                            className="group pointer-events-none absolute top-2.5 text-white/30 right-2.5 size-4"
                            aria-hidden="true"
                        />
                    </div>
                </Field>

                <Field className="mb-6">
                    <Label className="text-sm/6 font-medium text-white">
                        Генерація великих текстів
                    </Label>
                    <div className="relative">
                        <Select
                            {...register("descriptionPrompt", { required: true })}
                            className={clsx(
                                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                errors.largeTextGeneration && "border-red-500"
                            )}
                        >
                            <option value={`${promptConfig.descriptionValue}`}>Опис міста</option>
                        </Select>
                        {errors.largeTextGeneration && (
                            <span className="text-red-500 text-xs">Це поле обов'язкове</span>
                        )}
                        <IoChevronDownOutline
                            className="group pointer-events-none absolute top-2.5 text-white/30 right-2.5 size-4"
                            aria-hidden="true"
                        />
                    </div>
                </Field>

                <Field className="mb-6">
                    <Label className="text-sm/6 font-medium text-white">
                        Версія GPT
                    </Label>
                    <div className="relative">
                        <Select
                            {...register("model", {required: true})}
                            className={clsx(
                                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                errors.gptVersion && "border-red-500"
                            )}
                        >
                            <option value="gpt-4o-mini">GPT 4o-mini</option>
                            <option value="gpt-4">GPT 4</option>
                            <option value="gpt-4o">GPT 4o</option>
                        </Select>
                        {errors.gptVersion && (
                            <span className="text-red-500 text-xs">Це поле обов'язкове</span>
                        )}
                        <IoChevronDownOutline
                            className="group pointer-events-none absolute top-2.5 text-white/30 right-2.5 size-4"
                            aria-hidden="true"
                        />
                    </div>
                </Field>

                <Field>
                    <Button
                        type="submit"
                        className={clsx(
                            "button-base button-focus button-hover button-active button-disabled"
                        )}
                    >
                        Генерувати
                        {loading ? (
                            <AiOutlineLoading3Quarters
                                color="white"
                                className="animate-custom-spin"
                            />
                        ) : (
                            <RiAiGenerate color="white" />
                        )}
                    </Button>
                </Field>
            </form>
            {/*{locations && (*/}
            {/*    <div className="px-6 py-10 my-10">*/}
            {/*        <LocationInfo locationInfo={locations} />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default AddLocationForm;
