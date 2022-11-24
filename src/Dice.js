import './style.css';


export const Dice = ({ id, eachDice, isHeld, setDice, holdDice }) => {


    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }


    return (
        <div className="dice" style={styles} onClick={holdDice}>
            <h2 className='dice-num' >{eachDice}</h2>
        </div >
    )
}

