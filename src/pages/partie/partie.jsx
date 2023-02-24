import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Dialog} from "primereact/dialog";
import {Dropdown} from 'primereact/dropdown';
import Image from "next/image";

const Partie = () => {
    const [visible, setVisible] = useState(true)
    const [joueurs, setJoueurs] = useState([{
        value: "",
        scoreTotal: 0,
        cartons: [""],
        streak: 0,
        peutFumer: true
    }])
    const [peutFumerCeTour, setPeutFumerCeTour] = useState(true)
    const [selectedJoueur, setSelectedJoueur] = useState(joueurs[0])
    const router = useRouter()


    useEffect(() => {
        setJoueurs(JSON.parse(router.query.joueurs))
    }, [router.query]);


    const nextPlayer = () => {
        joueurs.map((joueur, index) => {
            if (selectedJoueur.value === joueur.value) {
                joueur.cartons = selectedJoueur.cartons
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
        if (peutFumerCeTour === true) {
            setSelectedJoueur(joueur => {
                return {
                    ...joueur,
                    cartons: [...joueur.cartons, couleur === "Jaune" ? "J" : "R"],
                        peutFumer: !(couleur === "Rouge" || (couleur === "Jaune" && joueur.cartons.filter(carton => carton === "J").length % 2 === 1))
                }
            })
            setPeutFumerCeTour(false)
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
                {selectedJoueur.cartons.length > 1 ?
                    selectedJoueur.cartons.map((carton, index) => {
                        if(carton === "J") return (<Image className="mt-2" priority src="/carton_jaune.png" alt='logo' width={40} height={40} hidden={visible}/>)
                        if(carton === "R") return (<Image className="mt-2" priority src="/carton_rouge.png" alt='logo' width={40} height={40} hidden={visible}/>)
                    })
                    :
                    <p>Ce joueur est clean... BIZARRE</p>
                }
                </div>
                <div id="divDataTable" className="mt-2">
                    <DataTable value={joueurs} >
                        <Column field="value" header="Joueur"></Column>
                        <Column field="streak" header="Streak"></Column>
                    </DataTable>
                </div>
                {peutFumerCeTour ? <p>Ce man peut fumer</p> : <p>Ce man ne peut pas fumer</p>}
                <div id="divButtons" className="flex container-bottom justify-content-between w-full">
                    <div className="ml-2">
                        <button className="p-button w-5" onClick={() => addCarton("Jaune")}>
                            <Image className="mr-3" priority src="/carton_jaune.png" alt='logo' width={30} height={30}/>
                        </button>
                        <button className="p-button w-5 ml-2" onClick={() => addCarton("PasJaune")}>
                            <Image priority src="/carton_rouge.png" alt='logo' width={30} height={30}/>
                        </button>
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
