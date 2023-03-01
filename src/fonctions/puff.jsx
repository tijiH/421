const scoresNeFumePas = [
    441,
    221,
]

const steps = [20, 40, 60, 80, 100,
    120, 140, 160, 180, 200,
    220, 240, 260, 280, 300,
    320, 340, 360, 380, 400,
    420, 440, 460, 480, 500]


export const showPuffToSmoke = (score, prevScore, diceScore, peutFumerCeTour, toast) => {
    if (peutFumerCeTour === false) {
        toast.current.show({ severity: 'error', summary: 'Ce man ne peut pas fumer', life: 4000 })
        console.log("ne fume pas", "\n_____________________________________")
        return
    } else if (diceScore === scoresNeFumePas[0]) {
        toast.current.show({ severity: 'error', summary: 'CATIN', life: 4000 })
        console.log("ne fume pas", "\n_____________________________________")
        return
    } else if (diceScore === scoresNeFumePas[1]) {
        toast.current.show({ severity: 'error', summary: 'NENETTE', life: 4000 })
        console.log("ne fume pas", "\n_____________________________________")
        return
    }
    steps.forEach((step) => {
        if (Number(prevScore) < step && Number(score) >= step) {
            if ((step % 100) === 0) {
                toast.current.show({ severity: 'warn', summary: 'ce man fume 3 puff', life: 3000 })
                console.log("3 lattes", "\n_____________________________________")
                return
            } else {
                toast.current.show({ severity: 'warn', summary: 'ce man fume 2 puff', life: 3000 })
                console.log("2 lattes", "\n_____________________________________")
                return
            }
        }
    })
}
