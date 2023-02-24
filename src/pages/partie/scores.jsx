import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/router";
import Image from "next/image";

const Scores = () => {
    const router = useRouter()
    const [joueurs, setJoueurs] = useState([{
        value: "",
        scoreTotal: 0,
        cartons: [""],
        streak: 0,
        peutFumer: true
    }]);
    const [winner, setWinner] = useState("Eliot");

    useEffect(() => {
        setJoueurs(JSON.parse(router.query.joueurs))
        findWinner();
    }, [router.query]);

    const findWinner = () => {
        let bestScore = 0;

        joueurs.forEach(joueur => {
            if (joueur.scoreTotal > bestScore) {
                bestScore = joueur.score
                setWinner(joueur.value);
            }
        })
    }

    return (
        <div className="m-4">
            <div className="flex flex-column align-items-center text-color-black mb-2">
                <Image priority src="/couronne.png" alt='logo' width={80} height={80}/>
                <h1 className="mt-0">{winner}</h1>
            </div>
            <DataTable value={joueurs} >
                <Column field="value" header="Joueur" />
                <Column field="scoreTotal" header="Score total" />
                <Column field="streak" header="Streak" />
                <Column field="cartons" header="Cartons" />
            </DataTable>
        </div>
    )
}

export default Scores;