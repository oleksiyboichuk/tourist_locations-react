import { useState } from "react";
import "./style.css";
import {
  Description,
  Field,
  Input,
  Textarea,
  Label,
  Button,
} from "@headlessui/react";
import clsx from "clsx";
import { RiAiGenerate } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
    <>
      <div className="w-full max-w-md px-6 py-10 my-10 border-[1px] border-white/5 rounded-md">
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
            Опишіть запит для генерації опису міста
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
        <div>
          <LocationInfo locationInfo={locations} />
        </div>
      )}
    </>
  );
};

export default AddLocationForm;
