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
import { playerBodyTemplate, peutFumerBodyTemplate } from '@/fonctions/dataTableTemplates';

const PartieOverview = () => {
    const toast = useRef(null);
    const [dialVisible, setDialVisible] = useState(true)
    const [dialVisibleFin, setDialVisibleFin] = useState(false)
    const [dialVisibleTriple, setDialVisibleTriple] = useState(false)
    const [checkScore, setCheckScore] = useState(false)
    const [joueurs, setJoueurs] = useState([{
        value: "",
        scoreTotal: 0,
        cartons: [""],
        streak: 0,
        meilleureStreak: 0,
        peutFumer: true
    }])
    const [selectedJoueur, setSelectedJoueur] = useState(joueurs[0])
    const [selectedJoueurTriple, setSelectedJoueurTriple] = useState(joueurs[0])
    const [peutFumerCeTour, setPeutFumerCeTour] = useState(true)
    const [score, setScore] = useState(null)
    const [firstTry, setFirstTry] = useState(false)
    const [prevDiceThrow, setPrevDiceThrow] = useState({
        value: "",
        score: -1
    })
    const router = useRouter()


    useEffect(() => {
        setJoueurs(JSON.parse(router.query.joueurs))
    }, [router.query]);

    const onKeyEventListener = (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed")
            nextPlayer()
        }
    }

    const nextPlayer = () => {
        console.log(
            "%cNextPlayer(): selected joueur",
            "color:red;font-family:system-ui;font-size:1.5rem;font-weight:bold"
        );
        joueurs.map((joueur, index) => {
            if (selectedJoueur.value === joueur.value) {
                let prevScore = selectedJoueur.scoreTotal;
                let calcul = calculerScore(score, firstTry, joueur.streak)
                console.log(
                    "joueur: ", joueur.value, "\n",
                    "score: ", score,"\n",
                    "calcul: ", calcul,"\n",
                    "streak: ", joueur.streak,
                    "\n_____________________________________")
                if (calcul <= 0 || calcul === undefined) {
                    joueur.streak = 0;
                    console.log("STREAK RESET", "\n_____________________________________")
                } else {
                    joueur.streak++;
                    joueur.scoreTotal += calcul;
                    console.log("FIRST TRY : ",firstTry, "\nSTREAK INCREMENT", "\n_____________________________________")
                    if (joueur.streak - 2 > joueur.meilleureStreak) joueur.meilleureStreak = joueur.streak - 2;
                }

                setPrevDiceThrow({value: joueur.value, score: calcul})
                showPuffToSmoke(joueur.scoreTotal, prevScore, score, peutFumerCeTour, toast)
                if (score === 333) {
                    setDialVisibleTriple(true)
                }

                // Reinitialisation des variables
                joueur.cartons = selectedJoueur.cartons
                joueur.peutFumer = true
                setScore(null)
                setPeutFumerCeTour(true)
                setFirstTry(false)

                // Affichage du joueur suivant
                if (index === joueurs.length - 1) {
                    console.table(joueurs)
                    console.log("TOUR SUIVANT", "\n_____________________________________")
                    setSelectedJoueur(joueurs[0])
                    setPeutFumerCeTour(joueurs[0].peutFumer)
                } else {
                    setSelectedJoueur(joueurs[index + 1])
                    setPeutFumerCeTour(joueurs[index + 1].peutFumer)
                }

            }
        })
    }

    const setPlayerCannotSmoke = (name) => {
        let newArr = new Array;
        console.log(name, " ne fume pas", "\n_____________________________________")

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
        console.log(couleur, " pour ", selectedJoueur.value, "\n_____________________________________")
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

    const undoLastThrow = () => {
        console.log("Retour dernier lancé", "\n_____________________________________")
        if (prevDiceThrow.score != -1) {
            let tempJoueur = joueurs.find(joueur => joueur.value === prevDiceThrow.value)
            tempJoueur.scoreTotal -= prevDiceThrow.score
            tempJoueur.streak -= 1
            setSelectedJoueur(tempJoueur)
            setPrevDiceThrow({value: "", score: -1})
            toast.current.show({ severity: "info", summary: prevDiceThrow.value + " doit rejouer", life: 3000})
        }
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
                                    setDialVisible(false)
                                }}>Valider
                            </button>
                        </div>
                    </div>
                }
                visible={dialVisible}
                closable={false}
            />
            <Dialog id='confirmDialog'
                header={
                    <>
                        <h3 className='text-center'>Confirmer</h3>
                        <div className="flex gap-2">
                            <button className="p-button p-button-danger mt-2"
                                onClick={() => setDialVisibleFin(false)}>Non
                            </button>
                            <button className="p-button p-button-success mt-2"
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
                closable={false}
                visible={dialVisibleFin}
            />
            <Dialog id='tripleDialog'
                header={
                    <div>
                        <p className='text-center text-color-black text-base'>Qui veux-tu baiser</p>
                        <div className="flex flex-column align-items-center">
                            <Dropdown
                                className="text-xs mt-3"
                                options={joueurs} value={selectedJoueurTriple.value} onChange={(e) => {
                                    setSelectedJoueurTriple(joueurs.find(joueur => joueur.value === e.value))
                                }}
                                optionLabel="value" placeholder="Joueurs"
                            />
                            <button className="p-button p-button-success mt-4"
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
                                    setSelectedJoueurTriple({ value: "", scoreTotal: 0, cartons: [""], streak: 0, meilleureStreak: 0, peutFumer: true })
                                    setDialVisibleTriple(false)
                                }}>Valider
                            </button>
                        </div>
                    </div>
                }
                closable={false}
                visible={dialVisibleTriple}
            />
            <div className="flex flex-column align-items-center mt-2">
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
                        <Column header="Fume" field='peutFumer'></Column>
                        <Column header="Joueur" body={playerBodyTemplate}></Column>
                        <Column header="Fume" body={(rowData) => peutFumerBodyTemplate(rowData, setPlayerCannotSmoke)}></Column>
                        {checkScore && <Column field="scoreTotal" header="Score" bodyClassName="text-center"></Column>}
                    </DataTable>
                </div>
                <div className="flex align-items-center">
                    <Checkbox className='m-2' onChange={(e) => setCheckScore(e.checked)} checked={checkScore} />
                    <label htmlFor="voirScore" className="m-2">Voir scores</label>
                </div>
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
                            placeholder="Score (ex: 421)" min={100} size={12} maxLength={3} onKeyPress={onKeyEventListener} />
                        <ToggleButton onLabel="First Try" offLabel="First try" onIcon="pi pi-check" offIcon="pi pi-times"
                            checked={firstTry} onChange={(e) => setFirstTry(e.value)} />
                    </div>
                    <div className="flex flex-column gap-2 mr-2">
                        <button type='submit' className="p-button h-fit" onClick={nextPlayer}>Suivant</button>
                        <button className="p-button h-fit" onClick={() => {setDialVisibleFin(true)}}>Termine</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartieOverview
