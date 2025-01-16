import {Button, Field} from "@headlessui/react";
import clsx from "clsx";

const DeleteConfirmModal = ({text}: {text: string}) => {
   return (
       <div className="absolute bg-neutral-900 py-5 px-7">
            <p>{text}</p>
            <div className="flex justify-between items-center">
               <Field>
                  <Button
                      className={clsx(
                          "button-base button-focus button-hover button-active button-disabled"
                      )}
                  >
                     Так
                  </Button>
                  <Button
                      className={clsx(
                          "button-base button-focus button-hover button-active button-disabled"
                      )}
                  >
                     Закрити
                  </Button>
               </Field>
            </div>
       </div>
   )
};

export default DeleteConfirmModal;
