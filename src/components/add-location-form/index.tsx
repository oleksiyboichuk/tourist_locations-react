import { useState } from "react";
import "./style.css";
import {
  Description,
  Field,
  Input,
  Textarea,
  Label,
  Button,
  Select,
} from "@headlessui/react";
import clsx from "clsx";

import { RiAiGenerate } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";

import LocationInfo from "../location-info";
import { LocationModel } from "../../models/location.model";

import { mockLocations } from "../../config/location.config";

const AddLocationForm = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const params = [...mockLocations];

  const generateLocationsHandler = async (): Promise<void> => {
    setLoading(true);
    // const newLocations = await generateTouristLocations(params);
    // setLocations(newLocations);
    // setLoading(false);
  };

  return (
    <div className="flex">
      <div className="w-full max-w-md px-6 py-10 my-10 border-[1px] border-white/5 rounded-xl">
        <Field className="mb-6">
          <Label className="text-sm/6 font-medium text-white">Ім'я міста</Label>
          <Input
            className={clsx("input-base", "input-focus")}
            defaultValue="Івано-Франківськ"
          />
        </Field>
        <Field className="mb-6">
          <Label className="text-sm/6 font-medium text-white">
            Опис адреси та назви міста
          </Label>
          <Description className="text-sm/6 text-white/30">
            Опишіть запит для генерації адреси та назви міста
          </Description>
          <Textarea
            className={clsx("textarea-base", "textarea-focus")}
            rows={4}
          />
        </Field>
        <Field className="mb-6">
          <Label className="text-sm/6 font-medium text-white">
            Повний опис міста
          </Label>
          <Description className="text-sm/6 text-white/30">
            Опишіть запит для генерації опису міста
          </Description>
          <Textarea
            className={clsx("textarea-base", "textarea-focus")}
            rows={7}
          />
        </Field>

        <Field className="mb-6">
          <Label className="text-sm/6 font-medium text-white">Версія GPT</Label>
          <div className="relative">
            <Select
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                "*:text-black"
              )}
            >
              <option value="gpt-3.5-turbo">GPT 3.5-turbo</option>
              <option value="gpt-4">GPT 4</option>
              <option value="gpt-4o-mini">GPT 4o-mini</option>
              <option value="gpt-4o">GPT 4o</option>
            </Select>
            <IoChevronDownOutline
              className="group pointer-events-none absolute top-2.5 text-white right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>

        <Field>
          <Button
            className={clsx(
              "button-base",
              "button-focus",
              "button-hover",
              "button-active",
              "button-disabled"
            )}
            onClick={generateLocationsHandler}
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
      </div>
      {locations && (
        <div className="px-6 py-10 my-10">
          <LocationInfo locationInfo={params} />
        </div>
      )}
    </div>
  );
};

export default AddLocationForm;
