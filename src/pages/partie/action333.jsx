import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {useState} from 'react';

const Action333 = ({
                       joueurs,
                       setPlayerCannotSmoke,
                       setSelectedJoueurTriple,
                       selectedJoueurTriple,
                       setDialVisibleTriple,
                       dialVisibleTriple
                   }) => {
    return (
        <Dialog
            id='tripleDialog'
            header={
                <div>
                    <p className='text-center text-color-black text-base'>Qui veux-tu baiser</p>
                    <div className="flex flex-column align-items-center">
                        <Dropdown
                            className="text-xs mt-3"
                            options={joueurs}
                            value={selectedJoueurTriple.value}
                            onChange={(e) => {
                                setSelectedJoueurTriple(joueurs.find(joueur => joueur.value === e.value))
                            }}
                            optionLabel="value"
                            placeholder="Joueurs"
                        />
                        <button
                            className="p-button p-button-success mt-4"
                            onClick={() => {
                                if (!selectedJoueurTriple.value) return;
                                joueurs.map((joueur) => {
                                    if (joueur.value === selectedJoueurTriple.value) {
                                        if (joueur.streak >= 3) {
                                            joueur.streak = 0;
                                        } else {
                                            setPlayerCannotSmoke(selectedJoueurTriple.value)
                                        }
                                    }
                                })
                                setSelectedJoueurTriple({
                                    value: "",
                                    scoreTotal: 0,
                                    cartons: [""],
                                    streak: 0,
                                    meilleureStreak: 0,
                                    peutFumer: true
                                })
                                setDialVisibleTriple(false)
                            }}
                        >
                            Valider
                        </button>
                    </div>
                </div>
            }
            closable={false}
            visible={dialVisibleTriple}
        />
    )
}

export default Action333;
