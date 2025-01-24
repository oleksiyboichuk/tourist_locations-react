import { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import { FaRegTrashAlt } from "react-icons/fa";
import {usePopup} from "../../popup";
import {Button} from "@headlessui/react";

const ImageSliderModal = ({
                              images,
                              onClose,
                          }: {
    images: string[];
    onClose: (updatedPhotos: string[] | null) => void;
}) => {
    const [localImages, setLocalImages] = useState(images);
    const {showPopup, PopupContainer} = usePopup();


    const settings = {
        dots: true,
        infinite: localImages.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        beforeChange: (_, next) => {
            const slides = document.querySelectorAll(".slick-slide");
            slides.forEach((slide) => {
                slide.setAttribute("tabindex", "-1");
            });
        },
        afterChange: (current) => {
            const activeSlide = document.querySelector(
                `.slick-slide[data-index="${current}"]`
            );
            if (activeSlide) {
                activeSlide.setAttribute("tabindex", "0");
            }
        },
    };

    const handleRemove = (index: number) => {
        const updatedPhotos = localImages.filter((_, i) => i !== index);
        setLocalImages(updatedPhotos);
        showPopup("success", "Фото успішно видалено!");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/90"
                onClick={() => onClose(null)}
            ></div>
            <div className="relative bg-neutral-900 p-6 rounded shadow-lg w-[50%] border-[0.5px] border-neutral-50/10">
                <Slider {...settings}>
                    {localImages.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt={`Фото ${index + 1}`}
                                className="w-full max-h-[500px] object-contain rounded"
                            />
                            <Button
                                onClick={() => handleRemove(index)}
                                className="absolute top-2 right-2 bg-rose-500 text-white p-2 rounded shadow-4xl transition-colors hover:bg-rose-600"
                            >
                                <FaRegTrashAlt className="text-xl text-white" />
                            </Button>
                        </div>
                    ))}
                </Slider>
                <div className="mt-[50px] flex justify-end gap-4">
                    <Button
                        onClick={() => onClose(localImages)}
                        className="bg-green-800 px-3 py-1 rounded text-white transition-colors hover:bg-green-700/90"
                    >
                        Підтвердити
                    </Button>
                    <Button
                        onClick={() => onClose(null)}
                        className="bg-neutral-700 px-3 py-1 rounded text-white transition-colors hover:bg-rose-600/90"
                    >
                        Закрити
                    </Button>
                </div>
            </div>
            <PopupContainer/>
        </div>
    );
};

export default ImageSliderModal;
