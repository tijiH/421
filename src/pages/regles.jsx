
const Regles = () => {
    return (
        <div className="flex flex-column align-items-center mt-2">
            <div className='flex align-items-center justify-content-center w-full gap-2'>
                <div id="divNomJoueurs" className="p-card p-card-player">
                    <h3>Regles du jeu</h3>
                </div>
            </div>
            <div className="flex flex-column align-items-center text-center m-2">
                <h3>Debut de la partie</h3>
                <p>Chaque joueur lance 1 des. Celui avec le chiffre le plus élevé commence.
                    Si égalité il y a, les joueurs ayant fait score similaire relancent jusqu à ce qu ils se soient départagé.</p>
                <h3>Déroulement de la partie</h3>
                <p>
                    L'objectif est de terminer la partie avec le plus gros score possible. (et de smoke un max)
                </p>
                <p>
                    Suite a venir.
                </p>
            </div>
        </div>
    )
}

export default Regles