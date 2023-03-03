import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';
import CartonButtons from "@/pages/partie/CartonsButtons";

function BoutonsJeu({ addCarton, score, setScore, firstTry, setFirstTry, nextPlayer,  setDialVisibleFin }) {
    const onKeyEventListener = (e) => {
        if (e.key === 'Enter') {
            nextPlayer();
        }
    };

    return (
        <div id="divButtons" className="flex container-bottom justify-content-between w-full">
            <CartonButtons addCarton={addCarton} />

            <div className='flex flex-column gap-2'>
                <InputNumber id="scoreInput" value={score} onValueChange={(e) => setScore(e.value)}
                             placeholder="Score (ex: 421)" min={100} size={12} maxLength={3}
                             onKeyPress={onKeyEventListener} />
                <ToggleButton onLabel="First Try" offLabel="First try" onIcon="pi pi-check"
                              offIcon="pi pi-times"
                              checked={firstTry} onChange={(e) => setFirstTry(e.value)} />
            </div>
            <div className="flex flex-column justify-content-between gap-2 mr-2">
                <button type='submit' className="p-button h-fit" onClick={nextPlayer}>Suivant</button>
                <button className="p-button h-fit" onClick={() => {
                    setDialVisibleFin(true)
                }} /**disabled={dernierTour}**/>Terminé
                </button>
            </div>
        </div>
    );
}

export default BoutonsJeu;
