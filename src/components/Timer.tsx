import { useEffect } from "react";

interface Props {
    minutes: number;
    seconds: number;
    setMinutes: React.Dispatch<React.SetStateAction<number>>
    setSeconds: React.Dispatch<React.SetStateAction<number>>
}

const Timer: React.FC<Props> = ({ minutes, seconds, setMinutes, setSeconds }) => {

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

    return (
        <div className="countdown">{seconds > 9 ? (
            <h3>
                0{minutes}:{seconds}
            </h3>
        ) : (
            <h3>
                0{minutes}:0{seconds}
            </h3>
        )}</div>
    )
}

export default Timer
