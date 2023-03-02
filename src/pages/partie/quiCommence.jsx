import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/router';

const QuiCommence = ({ joueurs, setDialVisible, dialVisible, setSelectedJoueur, selectedJoueur, setDialVisibleFin, dialVisibleFin }) => {

    const router = useRouter();

    return (
        <>
            <Dialog
                id='whoStartDialog'
                header={
                    <div>
                        <p className='text-center text-color-black text-sm'>Selectionnez le Joueur qui commence</p>
                        <div className="flex flex-column align-items-center">
                            <Dropdown
                                className="text-xs mt-3"
                                options={joueurs}
                                value={selectedJoueur.value}
                                onChange={(e) => {
                                    setSelectedJoueur(joueurs.find(joueur => joueur.value === e.value))
                                }}
                                optionLabel="value"
                                placeholder="Joueurs"
                            />
                            <button
                                className="p-button p-button-success mt-4"
                                onClick={(e) => {
                                    if (!selectedJoueur.value) return;
                                    setDialVisible(false)
                                }}>Valider
                            </button>
                        </div>
                    </div>
                }
                visible={dialVisible}
                closable={false}
            />

            <Dialog
                id='confirmDialog'
                header={
                    <>
                        <h3 className='text-center'>Confirmer</h3>
                        <div className="flex gap-2">
                            <button
                                className="p-button p-button-danger mt-2"
                                onClick={() => setDialVisibleFin(false)}>Non
                            </button>
                            <button
                                className="p-button p-button-success mt-2"
                                onClick={() => router.push({
                                    pathname: '/partie/scores',
                                    query: {
                                        joueurs: JSON.stringify(joueurs)
                                    }
                                })}>Oui
                            </button>
                        </div>
                    </>
                }
                visible={dialVisibleFin}
                closable={false}
            />
        </>
    );
};

export default QuiCommence;
