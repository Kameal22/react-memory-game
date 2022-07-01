import "../styles/gameBoard.css";
import { numSquareSizes, iconSquareSizes } from "../data/Config";
import { useEffect, useState } from "react";
interface Props {
    backToMenu: () => void;
    theme: string,
    size: string,
    time: string
}

const GameBoard: React.FC<Props> = ({ backToMenu, theme, time, size }) => {
    const [gameSize, setGameSize] = useState<{
        boardSize: number;
        squareSize: number;
    } | undefined>()
    const [gameBoard, setGameBoard] = useState<{
        square: string;
        id: string;
    }[] | undefined>()
    const [minutes, setMinutes] = useState(parseInt(time[0]) - 1);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    useEffect(() => {
        if (theme === "numbers") {
            const selectedSize = numSquareSizes.find(gameSize => gameSize.boardSize === parseInt(size))
            const selectedBoard = selectedSize?.board

            setGameSize(selectedSize)
            setGameBoard(selectedBoard?.sort(() => 0.5 - Math.random()))

        } else if (theme === "icons") {
            const selectedSize = iconSquareSizes.find(gameSize => gameSize.boardSize === parseInt(size))
            const selectedBoard = selectedSize?.board

            setGameSize(selectedSize)
            setGameBoard(selectedBoard?.sort(() => 0.5 - Math.random()))
        }
    }, [])

    return (
        <div className="gameBoard">
            <div className="gameBoardOptions">
                <div className="countdown">{seconds > 9 ? <h3>0{minutes}:{seconds}</h3> : <h3>0{minutes}:0{seconds}</h3>}</div>
                <div className="buttons">
                    <button className="restartButton">Restart</button>
                    <button className="newGameButton" onClick={() => backToMenu()}>New game</button>
                </div>
            </div>

            <div style={{ gridTemplate: `repeat(${gameSize?.boardSize}, 1fr) / repeat(${gameSize?.boardSize}, 1fr)` }} className="game">
                {theme === "icons" ? gameBoard?.map(square => (
                    <div key={Math.random()} style={{ width: gameSize?.squareSize, height: gameSize?.squareSize }} id="square"><i className={square.square}></i></div>
                )) : gameBoard?.map(square => (
                    <div key={Math.random()} style={{ width: gameSize?.squareSize, height: gameSize?.squareSize }} id="square"><p>{square.square}</p></div>
                ))}
            </div>
        </div>
    )
}

export default GameBoard