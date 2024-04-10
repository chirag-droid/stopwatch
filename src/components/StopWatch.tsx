import { useEffect, useState } from "react"
import styles from './StopWatch.module.css'

const StopWatch = () => {
    const [startTime, setStartTime] = useState(-1);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        let animationId: number | undefined;

        const updateTimer = () => {
            const now = Date.now();
            setElapsedTime(now - startTime);
        };

        if (!isPaused) {
            if (startTime <= 0) {
                setStartTime(Date.now() - elapsedTime);
            }
            animationId = requestAnimationFrame(updateTimer)
        } else {
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }

        return () => { 
            if (animationId) cancelAnimationFrame(animationId) 
        };
    }, [isPaused, startTime, elapsedTime]);

    const secondsElapsed = Math.floor(elapsedTime / 1000);
    const minutesElapsed = Math.floor(secondsElapsed / 60);
    const hoursElapsed = Math.floor(minutesElapsed / 60);

    const milliSeconds = String(elapsedTime % 1000).padStart(3, '0');
    const seconds = String(secondsElapsed % 60).padStart(2, '0');
    const minutes = String(minutesElapsed % 60).padStart(2, '0');
    const hours = String(hoursElapsed).padStart(2, '0');

    const reset = () => {
        setIsPaused(true);
        setStartTime(-1);
        setElapsedTime(0);
    }

    return (
        <div className={styles.topContainer}>
            <div className={styles.container}>

                <div className={styles.hour}>{hours}</div>

                <div className={styles.separator}></div>

                <div className={styles.minute}>{minutes}</div>

                <div className={styles.separator}></div>

                <div className={styles.second}>{seconds}</div>

                <div className={styles.separator}></div>

                <div className={styles.milliSecond}>{milliSeconds}</div>
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={() => setIsPaused(!isPaused)}>
                    {isPaused ? `${elapsedTime === 0 ? "Start" : "Resume"}` : "Pause"}
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch;
