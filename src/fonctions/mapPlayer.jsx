/** FONCTION D'INITIALISATION DES SCORES A 0 POUR UN TABLEAU DE JOUEURS **/
const initialisePlayerScores = (joueurs) => {
    let tableauScores = new Map()
    joueurs.forEach((p) => {
        tableauScores.set(p, 0)
    })
    return tableauScores
}
