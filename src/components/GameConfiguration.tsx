import "../styles/gameConfiguration.css";
import { themes, boardSizes, playTime } from "../data/Config";

interface Props {
    selectedTheme: string,
    selectedSize: string,
    selectedTime: string

    selectTheme: (theme: string) => void;
    selectSize: (size: string) => void;
    selectTime: (time: string) => void;

    gameReady: boolean

    startGame: () => void;
}

const GameConfiguration: React.FC<Props> = ({ selectTheme, selectSize, selectTime, selectedTheme, selectedTime, selectedSize, gameReady, startGame }) => {

    return (
        <div className="gameConfiguration">
            <div className="chooseGameStyle">
                <h3>Select theme</h3>

                <div className="themes">
                    {themes.map(theme => (
                        <button key={theme} style={{ backgroundColor: selectedTheme === theme ? "#293241" : "#91a0b0be" }} onClick={() => selectTheme(theme)} className="gameThemeChoice">{theme}</button>
                    ))}
                </div>
            </div>

            <div className="chooseGameStyle">
                <h3>Select board size</h3>

                <div className="styles">
                    {boardSizes.map(size => (
                        <button key={size.size} style={{ backgroundColor: selectedSize === size.size ? "#293241" : "#91a0b0be" }} onClick={() => selectSize(size.size)} className="gameSizeChoice">{size.text}</button>
                    ))}
                </div>
            </div>

            <div className="chooseGameStyle">
                <h3>Select game time</h3>

                <div className="styles">
                    {playTime.map(time => (
                        <button key={time} style={{ backgroundColor: selectedTime === time ? "#293241" : "#91a0b0be" }} onClick={() => selectTime(time)} className="gameSizeChoice">{time}</button>
                    ))}
                </div>
            </div>

            <button onClick={() => startGame()} disabled={!gameReady} className="startTheGame">Start the game</button>
        </div>
    )
}

export default GameConfiguration;