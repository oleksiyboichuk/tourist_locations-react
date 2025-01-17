import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import {getLocationById} from "../../../services/tourist-location.service.ts";
import {LocationResponseModel} from "../../../models/location.model.ts";

const UpdateLocationModal = ({
                                 id,
                                onClose,
                            }: {
    id: string;
    onClose: (confirmed: boolean) => void;
}) => {
    const [location, setLocation] = useState<LocationResponseModel | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const location = await getLocationById(id);
                setLocation(location);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleClose = (confirmed: boolean) => {
        onClose(confirmed);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`
          absolute inset-0 bg-black
          transition-opacity duration-300
         
        `}
                onClick={() => handleClose(false)}
            ></div>

            <div
                className={`
          relative bg-neutral-900 py-5 px-7 border-[1px] border-white/5 rounded shadow-lg z-10
          transition-opacity duration-300
       
        `}
            >
                <p className="mb-4 text-white">Content</p>
                <div className="flex justify-end items-center gap-3">
                    <Button
                        className="bg-green-800 text-white px-3 py-1 rounded transition-colors hover:bg-green-700/90"
                        onClick={() => handleClose(true)}
                    >
                        Оновити
                    </Button>
                    <Button
                        className="bg-rose-700 text-white px-4 py-1 rounded transition-colors hover:bg-rose-600/90"
                        onClick={() => handleClose(false)}
                    >
                        Закрити
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateLocationModal;
