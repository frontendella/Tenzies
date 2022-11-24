import './style.css';
import { Dice } from './Dice';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from './useWindowSize';

export const Main = () => {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const { width, height } = useWindowSize()

    useEffect(() => {
        const allHeld = dice.every(dice => dice.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(dice => dice.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }

    }, [dice])

    function generateNewDice() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }


    function allNewDice() {
        const diceArray = []
        for (
            let i = 0; i < 10; i++

        ) diceArray.push(generateNewDice())
        return diceArray

    }


    const rollDice = () => {
        if (!tenzies) {
            setDice(oldDices =>

                oldDices.map(eachDice => {
                    return eachDice.isHeld ?
                        eachDice : generateNewDice()

                }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    const holdDice = (id) => {
        setDice(oldDices =>
            oldDices.map(eachDice => {
                return eachDice.id === id ? {
                    ...eachDice, isHeld: !eachDice.isHeld
                } : eachDice
            })
        )
    }
    const diceElements = dice.map(eachDice => {
        return <Dice id={eachDice.id} key={eachDice.id} eachDice={eachDice.value} isHeld={eachDice.isHeld} holdDice={() => holdDice(eachDice.id)} />
    })
    return (

        <main>
            {tenzies && <Confetti
                width={width}
                height={height}

            />}
            <h1 className="title">
                Tenzies
            </h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className='dice--container'>
                {diceElements}
            </div>

            <button className='roll--dice' onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}