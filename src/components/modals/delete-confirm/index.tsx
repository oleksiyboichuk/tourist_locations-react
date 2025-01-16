import {Button} from "@headlessui/react";

const DeleteConfirmModal = ({
                                message,
                                onClose,
                            }: {
    message: string;
    onClose: (confirmed: boolean) => void;
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60"
                onClick={() => onClose(false)}
            ></div>

            <div className="relative bg-neutral-900 py-5 px-7 border-[1px] border-white/5 rounded shadow-lg z-10">
                <p className="mb-4 text-white">{message}</p>
                <div className="flex justify-end items-center gap-3">
                    <Button
                        className="bg-green-800 text-white px-3 py-1 rounded transition-colors hover:bg-green-700/90"
                        onClick={() => onClose(true)}
                    >
                        Так
                    </Button>
                    <Button
                        className="bg-rose-700 text-white px-4 py-1 rounded transition-colors hover:bg-rose-600/90"
                        onClick={() => onClose(false)}
                    >
                        Закрити
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
