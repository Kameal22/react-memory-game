import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameConfiguration from './components/GameConfiguration';
import './styles/App.css';

function App() {
  const [gameStart, setGameStart] = useState(false);

  const [gameReady, setGameReady] = useState(false);

  const [gameTheme, setGameTheme] = useState("");
  const [gameBoardSize, setGameBoardSize] = useState("");
  const [gameTime, setGameTime] = useState("");
  // If gameStart - show GameBoard. Else show GameConfiguration.

  useEffect(() => {
    if (gameTheme && gameBoardSize && gameTime) {
      setGameReady(true)
    }
  }, [gameTheme, gameBoardSize, gameTime])

  const selectTheme = (theme: string) => {
    setGameTheme(theme)
  }

  const selectBoardSize = (size: string) => {
    setGameBoardSize(size)
  }

  const selectTime = (time: string) => {
    setGameTime(time)
  }

  const startTheGame = () => {
    setGameStart(true)
  }

  const goBackToMenu = () => {
    window.location.reload()
  }

  return (
    <div className="App">
      <h1 className="gameHeading">Memory</h1>
      {!gameStart ? <GameConfiguration selectTheme={selectTheme} selectSize={selectBoardSize} selectTime={selectTime} selectedTheme={gameTheme} selectedSize={gameBoardSize} selectedTime={gameTime} gameReady={gameReady} startGame={startTheGame} /> : <GameBoard size={gameBoardSize} time={gameTime} theme={gameTheme} backToMenu={goBackToMenu} />}
    </div>
  );
}

export default App;
