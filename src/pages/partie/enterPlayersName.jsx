import { Button } from 'primereact/button'
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import Router from 'next/router';

const EnterPlayersName = () => {
    const inputArr = [{ value: "", score: 0, cartons: 0 }];
    const [arr, setArr] = useState(inputArr);

    const addInput = () => {
        if (arr.length > 9) return;
        setArr(s => {
            return [...s, { value: "", score: 0, cartons: 0 }];
        });
    };

    const removeInput = () => {
        if (arr.length === 1) return;
        setArr(arr.slice(0, -1))
    };

    const handleChange = e => {
        e.preventDefault();
        const index = e.target.id;

        setArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            return newArr;
        });
    };

    const submitPlayers = (e) => {
        e.preventDefault();
        Router.push({
            pathname: '/partie/partie',
            query: { joueurs: JSON.stringify(arr) }
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
                    {arr.map((item, i) => {
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
                        Jouer
                    </button>
                </form>
            </div>
        </>

    )
}

export default EnterPlayersName;