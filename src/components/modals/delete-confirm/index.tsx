import {useEffect, useState} from "react";
import {Button} from "@headlessui/react";

const DeleteConfirmModal = ({
                                message,
                                onClose,
                            }: {
    message: string;
    onClose: (confirmed: boolean) => void;
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleClose = (confirmed: boolean) => {
        setVisible(false);

        setTimeout(() => {
            onClose(confirmed);
        }, 200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`
          absolute inset-0 bg-black
          transition-opacity duration-300
          ${visible ? "opacity-60" : "opacity-0"}
        `}
                onClick={() => handleClose(false)}
            ></div>

            <div
                className={`
          relative bg-neutral-900 py-5 px-7 border-[1px] border-white/5 rounded shadow-lg z-10
          transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}
        `}
            >
                <p className="mb-4 text-white">{message}</p>
                <div className="flex justify-end items-center gap-3">
                    <Button
                        className="bg-green-800 text-white px-3 py-1 rounded transition-colors hover:bg-green-700/90"
                        onClick={() => handleClose(true)}
                    >
                        Так
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

export default DeleteConfirmModal;
