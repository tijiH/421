/** MAP [KEY,VALUE] AVEC [COMBINAISON DE DES, SCORE] **/
const scores = {
    111: 7,
    222: 5,
    333: 3,
    444: 0,
    555: 5,
    666: 6,

    121: 2,
    211: 2,
    112: 2,

    131: 3,
    311: 3,
    113: 3,

    141: 4,
    411: 4,
    114: 4,

    151: 5,
    511: 5,
    115: 5,

    161: 6,
    611: 6,
    116: 6,

    123: 7,
    132: 7,
    213: 7,
    231: 7,
    312: 7,
    321: 7,

    234: 3,
    243: 3,
    324: 3,
    342: 3,
    423: 3,
    432: 3,

    345: 4,
    354: 4,
    435: 4,
    453: 4,
    534: 4,
    543: 4,

    456: 5,
    465: 5,
    546: 5,
    564: 5,
    645: 5,
    654: 5,

    221: 0,
    122: 0,
    212: 0,

    441: 1,
    144: 1,
    414: 1,

    631: 1.5,
    613: 1.5,
    361: 1.5,
    316: 1.5,
    136: 1.5,
    163: 1.5,

    421: 9,
    412: 9,
    241: 9,
    214: 9,
    124: 9,
    142: 9
}

/** FONCTION DE CALCUL DES SCORES AVEC
 * @param lance : String => combinaison de dés
 * @param firstStrike : Boolean => premier lancé
 * @param streak : Boolean => le joueur est en streak
 * @return scoreToReturn : Double
 * **/
const calculerScore = (lance, firstStrike, streak) => {
    let scoreToReturn = scores[lance];
    if(firstStrike) scoreToReturn += 1;
    if(streak > 0) scoreToReturn += streak;
    return scoreToReturn;
}
