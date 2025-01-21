import {useState} from "react";
import {useForm} from "react-hook-form";
import {
    Field,
    Input,
    Label,
    Button,
    Select,
} from "@headlessui/react";
import clsx from "clsx";
import './style.css';

import {IoChevronDownOutline, IoSearch} from "react-icons/io5";

import GoogleLocationsTable from "../google-locations-table";

const SearchLocationsForm = () => {
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedQuery, setSelectedQuery] = useState<string>('');

    const {register, handleSubmit, formState: { errors }} = useForm({mode: "onSubmit"});

    const onSubmit = async (data: any): Promise<void> => {
        setSelectedCity(data.cityName);
        setSelectedQuery(data.query);
    };

    return (
        <>
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
                            {...register("cityName", {required: true})}
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
                            Тип пошуку
                        </Label>
                        <div className="relative">c
                            <Select
                                {...register("query", {required: true})}
                                className={clsx(
                                    "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                    errors.smallTextGeneration && "border-red-500"
                                )}
                            >
                                <option value={"туристичні локації"}>Туристичні локації</option>
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

                    <Field>
                        <Button
                            type="submit"
                            className={clsx(
                                "button-base button-focus button-hover button-active button-disabled"
                            )}
                        >
                            Шукати
                            <IoSearch/>
                        </Button>
                    </Field>
                </form>
            </div>
            {selectedCity && selectedQuery && <GoogleLocationsTable city={selectedCity} query={selectedQuery}/>}
        </>
    );
};

export default SearchLocationsForm;
