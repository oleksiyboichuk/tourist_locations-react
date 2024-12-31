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

const AddLocationForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-md px-4 my-10">
      <Field className="mb-4">
        <Label className="text-sm/6 font-medium text-white">Ім'я міста</Label>
        <Input className={clsx("input-base", "input-focus")} />
      </Field>
      <Field className="mb-4">
        <Label className="text-sm/6 font-medium text-white">Prompt</Label>
        <Description className="text-sm/6 text-white/50">
          Опишіть запит для генерації опису міста
        </Description>
        <Textarea
          className={clsx("textarea-base", "textarea-focus")}
          rows={5}
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
          onClick={() => setLoading(true)}
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
  );
};

export default AddLocationForm;