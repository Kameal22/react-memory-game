import "../styles/gameBoard.css";
import { numSquareSizes, iconSquareSizes } from "../data/Config";
import { useEffect, useState } from "react";

interface Props {
    backToMenu: () => void;
    theme: string;
    size: string;
    time: string;
}

interface Square {
    square: string;
    id: string;
    selected: boolean;
    matched: boolean;
}

const GameBoard: React.FC<Props> = ({ backToMenu, theme, time, size }) => {
    const [gameSize, setGameSize] = useState<
        | {
            boardSize: number;
            squareSize: number;
        }
        | undefined
    >();
    const [gameBoard, setGameBoard] = useState<
        | {
            square: string;
            id: string;
            selected: boolean;
            matched: boolean;
        }[]
        | undefined
    >();
    const [minutes, setMinutes] = useState(parseInt(time[0]) - 1);
    const [seconds, setSeconds] = useState(59);
    const [squaresToCompare, setSquaresToCompare] = useState<Square[]>([]);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    useEffect(() => {
        if (theme === "numbers") {
            const selectedSize = numSquareSizes.find(
                (gameSize) => gameSize.boardSize === parseInt(size)
            );
            const selectedBoard = selectedSize?.board;

            setGameSize(selectedSize);
            setGameBoard(selectedBoard?.sort(() => 0.5 - Math.random()));
        } else if (theme === "icons") {
            const selectedSize = iconSquareSizes.find(
                (gameSize) => gameSize.boardSize === parseInt(size)
            );
            const selectedBoard = selectedSize?.board;

            setGameSize(selectedSize);
            setGameBoard(selectedBoard?.sort(() => 0.5 - Math.random()));
        }
    }, []);

    useEffect(() => {
        // If EVERY square value in a gameBoard has selected === true - set game end.
    }, [gameBoard]);

    const checkSquaresEquality = (squares: Square[]) => {
        if (squares.every((square) => square.square === squares[0].square)) {
            squares.forEach(square => {
                const matchedGameBoard = gameBoard?.map(gameSquare => {
                    if (gameSquare.square === square.square) {
                        return { ...gameSquare, matched: true }
                    }
                    return gameSquare
                });
                setGameBoard(matchedGameBoard)
            })
        } else {
            const testOne = gameBoard?.find(square => square.id === squares[0].id)
            const testTwo = gameBoard?.find(square => square.id === squares[1].id)

            const notMachedGameBoard = gameBoard?.map(gameSquare => {
                if (gameSquare.square === testOne?.square) {
                    return { ...gameSquare, selected: false }
                }
                return gameSquare
            })
            setGameBoard(notMachedGameBoard)
            console.log("They are different");
        }
        setSquaresToCompare([]);
    };

    const selectSquare = (id: string) => {
        // This function shows what's on "the other side" of a square. And now I can unlimitly check every square.
        const selectedSquare = gameBoard?.map((square) => {
            if (square.id === id) {
                return { ...square, selected: true };
            }
            return square;
        });
        setGameBoard(selectedSquare);
    };

    const addSquaresToCompare = (square: { // If sqare us already MATCHED - prevent from adding it there.
        square: string;
        id: string;
        selected: boolean;
        matched: boolean;
    }) => {
        if (squaresToCompare.length < 2) {
            setSquaresToCompare((squares) => [...squares, square]); // If there are less than 2 - add squares to compare.
        }
    };

    useEffect(() => {
        if (squaresToCompare.length === 2) {
            checkSquaresEquality(squaresToCompare);
        }
    }, [squaresToCompare]);

    return (
        <div className="gameBoard">
            <div className="gameBoardOptions">
                <div className="countdown">
                    {seconds > 9 ? (
                        <h3>
                            0{minutes}:{seconds}
                        </h3>
                    ) : (
                        <h3>
                            0{minutes}:0{seconds}
                        </h3>
                    )}
                </div>
                <div className="buttons">
                    <button className="restartButton">Restart</button>
                    <button className="newGameButton" onClick={() => backToMenu()}>
                        New game
                    </button>
                </div>
            </div>

            <div
                style={{
                    gridTemplate: `repeat(${gameSize?.boardSize}, 1fr) / repeat(${gameSize?.boardSize}, 1fr)`,
                }}
                className="game"
            >
                {theme === "icons"
                    ? gameBoard?.map((square) => (
                        <div
                            key={Math.random()}
                            style={{
                                width: gameSize?.squareSize,
                                height: gameSize?.squareSize,
                            }}
                            id="square"
                        >
                            <i className={square.square}></i>
                        </div>
                    ))
                    : gameBoard?.map((square) => (
                        <div
                            onClick={() => {
                                selectSquare(square.id);
                                addSquaresToCompare(square);
                            }}
                            key={Math.random()}
                            style={{
                                width: gameSize?.squareSize,
                                height: gameSize?.squareSize,
                            }}
                            id="square"
                        >
                            <p>{square.selected ? square.square : null}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default GameBoard;
