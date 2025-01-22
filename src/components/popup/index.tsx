import React, {useState, useEffect} from "react";
import {Transition} from "@headlessui/react";

interface PopupProps {
    type?: "success" | "error" | "info" | "warning";
    message: string;
    duration?: number;
}

interface PopupData extends PopupProps {
    id: string;
}

const Popup: React.FC<PopupProps> = ({type = "info", message, duration = 3000}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const typeStyles: Record<string, string> = {
        success: "bg-green-100 text-green-800 border-green-300",
        error: "bg-red-100 text-red-800 border-red-300",
        info: "bg-blue-100 text-blue-800 border-blue-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };

    return (
        <Transition
            show={show}
            enter="transform transition duration-300 ease-in-out"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transform transition duration-300 ease-in-out"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-2 opacity-0"
        >
            <div
                className={`fixed top-4 right-4 z-50 max-w-sm p-4 border rounded shadow-lg ${
                    typeStyles[type] || typeStyles.info
                }`}
            >
                <p className="text-sm font-medium">{message}</p>
            </div>
        </Transition>
    );
};

export const usePopup = () => {
    const [popups, setPopups] = useState<PopupData[]>([]);

    const showPopup = (type: "success" | "error" | "info" | "warning", message: string, duration: number = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setPopups((prev) => [...prev, {id, type, message, duration}]);

        setTimeout(() => {
            setPopups((current) => current.filter((popup) => popup.id !== id));
        }, duration);
    };

    const PopupContainer: React.FC = () => (
        <>
            {popups.map((popup) => (
                <Popup
                    key={popup.id}
                    type={popup.type}
                    message={popup.message}
                    duration={popup.duration}
                />
            ))}
        </>
    );

    return {showPopup, PopupContainer};
};
