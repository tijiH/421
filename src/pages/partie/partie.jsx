import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dialog } from "primereact/dialog";
import { Dropdown } from 'primereact/dropdown';
import Image from "next/image";
import { InputNumber } from "primereact/inputnumber";
import { ToggleButton } from "primereact/togglebutton";
import { calculerScore } from "@/fonctions/scores";
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { showPuffToSmoke } from '@/fonctions/puff';
import { Checkbox } from 'primereact/checkbox';
import { Tag } from 'primereact/tag';

const Partie = () => {
    const toast = useRef(null);
    const [visible, setVisible] = useState(true)
    const [visibleFin, setVisibleFin] = useState(false)
    const [checkScore, setCheckScore] = useState(false)
    const [joueurs, setJoueurs] = useState([{
        value: "",
        scoreTotal: 0,
        cartons: [""],
        streak: 0,
        peutFumer: true
    }])
    const [selectedJoueur, setSelectedJoueur] = useState(joueurs[0])

    const [peutFumerCeTour, setPeutFumerCeTour] = useState(true)
    const [score, setScore] = useState(null)
    const [firstTry, setFirstTry] = useState(false)

    const router = useRouter()


    useEffect(() => {
        setJoueurs(JSON.parse(router.query.joueurs))
    }, [router.query]);

    const onKeyEventListener = (e) => {
        if (e.key === "Enter") {
            nextPlayer()
        }
    }

    const nextPlayer = () => {

        joueurs.map((joueur, index) => {
            if (selectedJoueur.value === joueur.value) {
                let prevScore = selectedJoueur.scoreTotal;
                let calcul = calculerScore(score, firstTry, joueur.streak)
                console.log(
                    "Joueur: ", joueur.value,
                    "score: ", score,
                    "calcul: ", calcul,
                    "streak: ", joueur.streak)
                if (calcul <= 0 || calcul === undefined) {
                    joueur.streak = 0;
                } else {
                    joueur.streak++;
                    joueur.scoreTotal += calcul;
                }

                showPuffToSmoke(joueur.scoreTotal, prevScore, score, peutFumerCeTour, toast)

                joueur.cartons = selectedJoueur.cartons
                joueur.peutFumer = true
                setScore(null)
                setPeutFumerCeTour(true)
                setFirstTry(false)

                if (index === joueurs.length - 1) {
                    setSelectedJoueur(joueurs[0])
                    setPeutFumerCeTour(joueurs[0].peutFumer)
                } else {
                    setSelectedJoueur(joueurs[index + 1])
                    setPeutFumerCeTour(joueurs[index + 1].peutFumer)
                }
            }
        })
    }

    const streakBodyTemplate = (rowData) => {
        return (
            <div className='text-center'>
                <Tag severity={"danger"} className='ml-2 cursor-pointer' onClick={() => {
                            let name = ""
                            let newArr = new Array;
                            joueurs.forEach(joueur => {
                                if (joueur.value === rowData.value) {
                                    joueur.streak = 0;
                                    name = joueur.value
                                }
                                newArr.push(joueur);
                            })
                            setJoueurs(newArr)
                            toast.current.show({ severity: 'info', summary: "Streak de " + name + ' casse', life: 3000 })
                        }
                    }>
                    {rowData.streak >= 3 ? rowData.streak - 2 : 0}
                </Tag>
            </div>
        )
    }

    const peutFumerBodyTemplate = (rowData) => {
        return (
            <div className='text-center'>
                <Tag severity={rowData.peutFumer ? "success" : "danger"} onClick={() => setPlayerCannotSmoke(rowData.value)}>
                    {rowData.peutFumer?
                    <i className='pi pi-times cursor-pointer'/>
                    :    
                    <i className='pi pi-check cursor-pointer'/>                
                    }
                </Tag>;
            </div>
        )
    }

    const setPlayerCannotSmoke = (name) => {
        let newArr = new Array;

        joueurs.forEach(joueur => {
            if (joueur.value === name) {
                joueur.peutFumer = !joueur.peutFumer
                if (selectedJoueur.value === name) {
                    setPeutFumerCeTour(joueur.peutFumer)
                }
            }
            newArr.push(joueur);
        })
        setJoueurs(newArr)
    }

    const addCarton = (couleur) => {
        let caTireOuPas = (
            couleur === "Rouge" ?
                false :
                (couleur === "Jaune" && selectedJoueur.cartons.filter(carton => carton === "J").length % 2 === 0)
        )
    
        if (peutFumerCeTour === true) {
            setSelectedJoueur(joueur => {
                return {
                    ...joueur,
                    cartons: [...joueur.cartons, couleur === "Jaune" ? "J" : "R"],
                    peutFumer: caTireOuPas
                }
            })
            setPeutFumerCeTour(caTireOuPas)
            if (!caTireOuPas) setPlayerCannotSmoke(selectedJoueur.value)
        } else {
            setSelectedJoueur(joueur => {
                return {
                    ...joueur,
                    cartons: [...joueur.cartons, couleur === "Jaune" ? "J" : "R"],
                    peutFumer: false
                }
            })
        }
    }

    const toggleEndDialog = () => {
        setVisibleFin(true)
    }

    return (
        <>
            <Toast ref={toast} position="center" />
            <Dialog id='whoStartDialog'
                header={
                    <div>
                        <p className='text-center text-color-black text-sm'>Selectionnez le Joueur qui commence</p>
                        <div className="flex flex-column align-items-center">
                            <Dropdown
                                className="text-xs mt-3"
                                options={joueurs} value={selectedJoueur.value} onChange={(e) => {
                                    setSelectedJoueur(joueurs.find(joueur => joueur.value === e.value))

                                }}
                                optionLabel="value" placeholder="Joueurs"
                            />
                            <button className="p-button p-button-success mt-4"
                                onClick={(e) => {
                                    if (!selectedJoueur.value) return;
                                    setVisible(false)
                                }}>Valider
                            </button>
                        </div>
                    </div>
                }
                visible={visible}
                closable={false}
            />
            <Dialog id='confirmDialog'
                header={
                    <>
                        <h3 className='text-center'>Confirmer</h3>
                        <div className="flex gap-2">
                            <button className="p-button p-button-danger mt-2"
                                onClick={() => setVisibleFin(false)}>Non
                            </button>
                            <button className="p-button p-button-success mt-2"
                                onClick={() => router.push({
                                    pathname: '/partie/scores',
                                    query: { joueurs: JSON.stringify(joueurs) }
                                })}>Oui
                            </button>
                        </div>
                    </>
                }
                closable={false}
                visible={visibleFin}
            />
            <div className="flex flex-column align-items-center mt-2">
                <div id="divNomJoueurs" className="p-card p-card-player" hidden={visible}>
                    <h3>{selectedJoueur.value}</h3>
                </div>
                <div id="divCartons">
                    {selectedJoueur.cartons.length > 1 ?
                        selectedJoueur.cartons.map((carton) => {
                            if (carton === "J") return (
                                <Image className="mt-2" priority src="/carton_jaune.png" alt='logo' width={40}
                                    height={40} hidden={visible} />)
                            if (carton === "R") return (
                                <Image className="mt-2" priority src="/carton_rouge.png" alt='logo' width={40}
                                    height={40} hidden={visible} />)
                        })
                        :
                        <p>Ce man est clean</p>
                    }
                </div>
                <div id="divDataTable" className="mt-2 flex gap-2">
                    <DataTable value={joueurs} reorderableColumns reorderableRows onRowReorder={(e) => setJoueurs(e.value)}>
                        <Column rowReorder style={{ width: '1rem' }} />
                        <Column field="value" header="Joueur"></Column>
                        <Column header="Streak" body={streakBodyTemplate} ></Column>
                        <Column header="Fume" body={peutFumerBodyTemplate}></Column>
                        {checkScore && <Column field="scoreTotal" header="Score"></Column>}
                    </DataTable>
                </div>
                <Checkbox className='mt-2' onChange={(e) => setCheckScore(e.checked)} checked={checkScore}></Checkbox>
                {/* <div className="p-5"> {peutFumerCeTour ? <Message severity="success" text="Ce man peut fumer" /> :
                    <Message severity="error" text="Ce man ne peut pas fumer" />}
                </div> */}
                <div id="divButtons" className="flex container-bottom justify-content-between w-full">
                    <div className="ml-2 mb-5 flex flex-column gap-2">
                        <button className="p-button" onClick={() => addCarton("Jaune")}>
                            <Image className="" priority src="/carton_jaune.png" alt='logo' width={30} height={30} />
                        </button>
                        <button className="p-button" onClick={() => addCarton("Rouge")}>
                            <Image priority src="/carton_rouge.png" alt='logo' width={30} height={30} />
                        </button>
                    </div>
                    <div className='flex flex-column gap-2'>
                        <InputNumber id="scoreInput" value={score} onValueChange={(e) => setScore(e.value)}
                            placeholder="Score" size={12} maxLength={3} onKeyPress={onKeyEventListener} />
                        <ToggleButton onLabel="First Try" offLabel="First try" onIcon="pi pi-check" offIcon="pi pi-times"
                            checked={firstTry} onChange={(e) => setFirstTry(e.value)} />
                    </div>
                    <div className="flex flex-column gap-2 mr-2">
                        <button type='submit' className="p-button h-fit" onClick={nextPlayer}>Suivant</button>
                        <button className="p-button h-fit" onClick={toggleEndDialog}>Termine</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Partie
