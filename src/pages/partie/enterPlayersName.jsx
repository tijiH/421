import { Button } from 'primereact/button'
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import Router from 'next/router';

const EnterPlayersName = () => {
    const inputArr = [{ value: "", scoreTotal: 0, cartons: ["J","R", "J", "J", "R"], streak: 0 }];
    const [joueurs, setJoueurs] = useState(inputArr);

    const addInput = () => {
        if (joueurs.length > 9) return;
        setJoueurs(s => {
            return [...s, { value: "", scoreTotal: 0, cartons: ["J","R", "J", "J", "R"], streak: 0 }];
        });
    };

    const removeInput = () => {
        if (joueurs.length === 1) return;
        setJoueurs(joueurs.slice(0, -1))
    };

    const handleChange = e => {
        e.preventDefault();
        const index = e.target.id;

        setJoueurs(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            return newArr;
        });
    };

    const submitPlayers = (e) => {
        e.preventDefault();
        Router.push({
            pathname: '/partie/partie',
            query: { joueurs: JSON.stringify(joueurs) }
        })
    }

    return (
        <>
            <div className="flex flex-column align-items-center gap-2">
                <h2 className='text-color-black'>Joueurs</h2>
                <div className='flex gap-2'>
                    <Button icon="pi pi-plus" aria-label="Filter" onClick={addInput} />
                    <Button icon="pi pi-minus" aria-label="Filter" onClick={removeInput} />
                </div>
                <form className='flex flex-column align-items-center gap-2' onSubmit={submitPlayers} method='post'>
                    {joueurs.map((item, i) => {
                        return (
                            <InputText
                                key={i}
                                onChange={handleChange}
                                value={item.value}
                                id={i}
                                type={item.type}
                                size="25"
                                maxLength={20}
                                required
                                placeholder="Entrer un nom"
                                onInvalid={e => e.target.setCustomValidity('Donne ton nom bâtard')}
                                onInput={e => e.target.setCustomValidity('')}
                            />
                        );
                    })}
                    <button type='submit' className='p-button'>
                        CA FUME
                    </button>
                </form>
            </div>
        </>

    )
}

export default EnterPlayersName;
