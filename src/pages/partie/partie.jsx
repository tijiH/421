import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Dialog} from "primereact/dialog";
import {Dropdown} from 'primereact/dropdown';
import Image from "next/image";
import {Message} from "primereact/message";
import {InputNumber} from "primereact/inputnumber";
import {ToggleButton} from "primereact/togglebutton";
import {calculerScore} from "@/fonctions/scores";

const Partie = () => {
    const [visible, setVisible] = useState(true)
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


    const nextPlayer = () => {

        joueurs.map((joueur, index) => {
            if (selectedJoueur.value === joueur.value) {

                joueur.cartons = selectedJoueur.cartons
                calculerScore(score, false, 0) > 0 ? joueur.streak++ : joueur.streak = 0
                console.log(calculerScore(score, firstTry, joueur.streak), score, firstTry, joueur.streak)
                joueur.scoreTotal += calculerScore(score, firstTry, joueur.streak)

                console.log(joueur.scoreTotal)

                joueur.peutFumer = true
                setScore(null)
                setPeutFumerCeTour(true)

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


    return (
        <>
            <Dialog
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
                                    onClick={() => setVisible(false)}>Valider
                            </button>
                        </div>
                    </div>
                }
                visible={visible}
                closable={false}
            />
            <div className="flex flex-column align-items-center mt-2">
                <div id="divNomJoueurs" className="p-card p-card-player" hidden={visible}>
                    <h3>{selectedJoueur.value}</h3>
                </div>
                <div id="divCartons">
                    {selectedJoueur.cartons.length > 0 ?
                        selectedJoueur.cartons.map((carton, index) => {
                            if (carton === "J") return (
                                <Image className="mt-2" priority src="/carton_jaune.png" alt='logo' width={40}
                                       height={40} hidden={visible}/>)
                            if (carton === "R") return (
                                <Image className="mt-2" priority src="/carton_rouge.png" alt='logo' width={40}
                                       height={40} hidden={visible}/>)
                        })
                        :
                        <p>Ce joueur est clean... BIZARRE</p>
                    }
                </div>
                <div id="divDataTable" className="mt-2">
                    <DataTable value={joueurs}>
                        <Column field="value" header="Joueur"></Column>
                        <Column field="streak" header="Streak"></Column>
                    </DataTable>
                </div>
                <div className="p-5"> {peutFumerCeTour ? <Message severity="success" text="Ce man peut fumer"/> :
                    <Message severity="error" text="Ce man ne peut pas fumer"/>} </div>
                <div id="divButtons" className="flex container-bottom justify-content-between w-full">
                    <div className="ml-2">
                        <button className="p-button w-5" onClick={() => addCarton("Jaune")}>
                            <Image className="mr-3" priority src="/carton_jaune.png" alt='logo' width={30} height={30}/>
                        </button>
                        <button className="p-button w-5 ml-2" onClick={() => addCarton("Rouge")}>
                            <Image priority src="/carton_rouge.png" alt='logo' width={30} height={30}/>
                        </button>
                    </div>

                    <div>
                    <span className="p-float-label">
                        <InputNumber id="scoreInput" value={score} onValueChange={(e) => setScore(e.value)}/>
                        <label htmlFor="scoreInput">Score</label>
                    </span>
                        <ToggleButton onLabel="First Try 🤪" offLabel="Pas first try 😳" onIcon="pi pi-check" offIcon="pi pi-times"
                                      checked={firstTry} onChange={(e) => setFirstTry(e.value)} />
                    </div>


                    <div className="flex justify-content-center mr-2 mt-2">
                        <button className="p-button h-fit" onClick={nextPlayer}>Suivant</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Partie
