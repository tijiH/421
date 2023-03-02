import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Dialog} from "primereact/dialog";
import {Dropdown} from 'primereact/dropdown';
import Image from "next/image";
import {InputNumber} from "primereact/inputnumber";
import {ToggleButton} from "primereact/togglebutton";
import {calculerScore} from "@/fonctions/scores";
import React, {useRef} from 'react';
import {Toast} from 'primereact/toast';
import {showPuffToSmoke} from '@/fonctions/puff';
import {Checkbox} from 'primereact/checkbox';
import {streakCustomHeader, streakBodyTemplate, peutFumerBodyTemplate} from '@/fonctions/dataTableTemplates';
import CartonButtons from "@/pages/boutons/CartonsButtons";
import ScoreTable from "@/pages/partie/scoreTable";
import Action333 from "@/pages/partie/action333";
import QuiCommence from "@/pages/partie/quiCommence";

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
    const [dernierTour, setDernierTour] = useState(false)
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
                    "score: ", score, "\n",
                    "calcul: ", calcul, "\n",
                    "streak: ", joueur.streak,
                    "\n_____________________________________")
                if (calcul <= 0 || calcul === undefined) {
                    joueur.streak = 0;
                    console.log("STREAK RESET", "\n_____________________________________")
                } else {
                    joueur.streak++;
                    joueur.scoreTotal += calcul;
                    console.log("FIRST TRY : ", firstTry, "\nSTREAK INCREMENT", "\n_____________________________________")
                    if (joueur.streak - 2 > joueur.meilleureStreak) joueur.meilleureStreak = joueur.streak - 2;
                }

                setPrevDiceThrow({value: joueur.value, score: calcul})
                showPuffToSmoke(joueur.scoreTotal, prevScore, score, peutFumerCeTour, toast)

                // popup choix du joueur a pénaliser
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
                    index === joueurs.length - 2 ? setDernierTour(true) : setDernierTour(false)
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
        if (prevDiceThrow.score !== -1) {
            let tempJoueur = joueurs.find(joueur => joueur.value === prevDiceThrow.value)
            tempJoueur.scoreTotal -= prevDiceThrow.score
            tempJoueur.streak -= 1
            setSelectedJoueur(tempJoueur)
            setPrevDiceThrow({value: "", score: -1})
            toast.current.show({severity: "info", summary: prevDiceThrow.value + " doit rejouer", life: 3000})
        }
    }

    return (
        <>
            <Toast ref={toast} position="center"/>
            <QuiCommence
                joueurs={joueurs}
                setDialVisible={setDialVisible}
                dialVisible={dialVisible}
                setSelectedJoueur={setSelectedJoueur}
                selectedJoueur={selectedJoueur}
                setDialVisibleFin={setDialVisibleFin}
                dialVisibleFin={dialVisibleFin}
            />


            <Action333 joueurs={joueurs}
                       setPlayerCannotSmoke={setPlayerCannotSmoke}
                       setSelectedJoueurTriple={setSelectedJoueurTriple}
                       selectedJoueurTriple={selectedJoueurTriple}
                       setDialVisibleTriple={setDialVisibleTriple}
                       dialVisibleTriple={dialVisibleTriple}
            />

            <div className="flex flex-column align-items-center mt-2">
                <ScoreTable
                    selectedJoueur={selectedJoueur}
                    dialVisible={dialVisible}
                    undoLastThrow={undoLastThrow}
                    joueurs={joueurs}
                    setJoueurs={setJoueurs}
                    checkScore={checkScore}
                    setCheckScore={setCheckScore}
                    setPlayerCannotSmoke={setPlayerCannotSmoke}
                    streakCustomHeader={streakCustomHeader} streakBodyTemplate={streakBodyTemplate}
                    peutFumerBodyTemplate={peutFumerBodyTemplate}
                />


                {/*BOUTONS DE JEU*/}
                <div id="divButtons" className="flex container-bottom justify-content-between w-full">
                    <CartonButtons addCarton={addCarton}/>

                    <div className='flex flex-column gap-2'>
                        <InputNumber id="scoreInput" value={score} onValueChange={(e) => setScore(e.value)}
                                     placeholder="Score (ex: 421)" min={100} size={12} maxLength={3}
                                     onKeyPress={onKeyEventListener}/>
                        <ToggleButton onLabel="First Try" offLabel="First try" onIcon="pi pi-check"
                                      offIcon="pi pi-times"
                                      checked={firstTry} onChange={(e) => setFirstTry(e.value)}/>
                    </div>
                    <div className="flex flex-column justify-content-between gap-2 mr-2">
                        <button type='submit' className="p-button h-fit" onClick={nextPlayer}>Suivant</button>
                        <button className="p-button h-fit" onClick={() => {
                            setDialVisibleFin(true)
                        }} disabled={dernierTour}>Termine
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartieOverview
