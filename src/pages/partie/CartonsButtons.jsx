import React from "react";
import Image from "next/image";

const CartonButtons = ({ addCarton }) => {
    return (
        <div className="flex flex-column gap-2 ml-2">
            <button className="p-button" onClick={() => addCarton("Jaune")}>
                <Image className="" priority src="/carton_jaune.png" alt='logo' width={25} height={25} />
            </button>
            <button className="p-button" onClick={() => addCarton("Rouge")}>
                <Image priority src="/carton_rouge.png" alt='logo' width={25} height={25} />
            </button>
        </div>
    );
};

export default CartonButtons;
