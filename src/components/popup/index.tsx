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
        success: "bg-green-800 text-white border-green-300 shadow-sl shadow-green-300/30",
        error: "bg-rose-800 text-white border-rose-300 shadow-sl shadow-rose-300/30",
        info: "bg-cyan-800 text-white border-cyan-300 shadow-sl shadow-cyan-300/30",
        warning: "bg-yellow-800 text-white border-yellow-300 shadow-sl shadow-yellow-300/30",
    };

    return (
        <Transition
            show={show}
            enter="transform transition duration-500 ease-out"
            enterFrom="translate-y-[-10px] scale-95 opacity-0"
            enterTo="translate-y-0 scale-100 opacity-100"
            leave="transform transition duration-500 ease-in"
            leaveFrom="translate-y-0 scale-100 opacity-100"
            leaveTo="translate-y-[-10px] scale-95 opacity-0"
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