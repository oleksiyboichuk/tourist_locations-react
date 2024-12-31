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
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
      </Field>
      <Field className="mb-4">
        <Label className="text-sm/6 font-medium text-white">Запит</Label>
        <Description className="text-sm/6 text-white/50">
          Запит поминен містити всю необхідні інформацію
        </Description>
        <Textarea
          className={clsx(
            "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          rows={3}
        />
      </Field>
      <Field>
        <Button
          className="inline-flex items-center gap-2 rounded-md bg-zinc-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
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
