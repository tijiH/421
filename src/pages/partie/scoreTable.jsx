import React from "react";
import Image from "next/image";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';

const ScoreTable = ({ selectedJoueur, dialVisible, undoLastThrow, joueurs, setJoueurs, checkScore, setCheckScore, setPlayerCannotSmoke, streakCustomHeader, streakBodyTemplate, peutFumerBodyTemplate }) => {
    return (
        <>
            <div id="divEntete" className='flex align-items-center justify-content-center w-full gap-2'>
                <div className='p-button' onClick={() => undoLastThrow()}>
                    <i className='pi pi-undo'></i>
                </div>
                <div id="divNomJoueurs" className="p-card p-card-player" hidden={dialVisible}>
                    <h3>{selectedJoueur.value}</h3>
                </div>
            </div>
            <div id="divCartons">
                {selectedJoueur.cartons.length > 1 ?
                    selectedJoueur.cartons.map((carton) => {
                        if (carton === "J") return (
                            <Image className="mt-2" priority src="/carton_jaune.png" alt='logo' width={40}
                                   height={40} hidden={dialVisible} />)
                        if (carton === "R") return (
                            <Image className="mt-2" priority src="/carton_rouge.png" alt='logo' width={40}
                                   height={40} hidden={dialVisible} />)
                    })
                    :
                    <p>Ce man est clean</p>
                }
            </div>
            <div id="divDataTable" className="mt-2 flex gap-2">
                <DataTable value={joueurs} reorderableColumns reorderableRows onRowReorder={(e) => setJoueurs(e.value)}>
                    <Column rowReorder style={{ width: '1rem' }} />
                    <Column header="Joueur" field='value' ></Column>
                    <Column header="Fume" body={(rowData) => peutFumerBodyTemplate(rowData, setPlayerCannotSmoke)}></Column>
                    <Column header={streakCustomHeader} body={streakBodyTemplate}></Column>
                    {checkScore && <Column field="scoreTotal" header="Score" bodyClassName="text-center"></Column>}
                </DataTable>
            </div>
            <div className="flex align-items-center">
                <Checkbox className='m-2' onChange={(e) => setCheckScore(e.checked)} checked={checkScore} />
                <label htmlFor="voirScore" className="m-2">Voir scores</label>
            </div>
        </>
    );
};

export default ScoreTable;
