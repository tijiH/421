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
        cartons: ["J", "R", "J", "J", "R"],
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
            if (selectedJoueur === joueur) {
                if (index === joueurs.length - 1) {
                    setSelectedJoueur(joueurs[0])
                    setPeutFumerCeTour(joueurs[0].peutFumer)

                } else {
                    setSelectedJoueur(joueurs[index + 1])
                    setPeutFumerCeTour((joueurs[0] + 1).peutFumer)
                }
            }
        })
    }

    const addCarton = (index, couleur) => {
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
                <div className="p-card p-card-player" hidden={visible}>
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
                    {peutFumerCeTour ? <p>Ce man peut fumer</p> : <p>Ce man ne peut pas fumer</p>}
                </div>
                <div className="flex container-bottom gap-2">
                    <button className="p-button col-6 h-fit" onClick={() => addCarton(joueurs[0], "Jaune")}>carton
                    </button>
                    <button className="p-button col-6 h-fit" onClick={nextPlayer}>Suivant</button>
                </div>
            </div>
        </>
    )
}

export default Partie
