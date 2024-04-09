import { useEffect, useState } from "react"
import styles from './StopWatch.module.css'

const StopWatch = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    const secondsElapsed = Math.floor(elapsedTime / 1000)
    const minutesElapsed = Math.floor(secondsElapsed / 60)
    const hoursElapsed = Math.floor(minutesElapsed / 60)

    const milliSeconds = String(elapsedTime % 1000).padStart(3, '0')
    const seconds = String(secondsElapsed % 60).padStart(2, '0')
    const minutes = String(minutesElapsed % 60).padStart(2, '0')
    const hours = String(hoursElapsed % 60).padStart(2, '0')

    const reset = () => {
        setIsPaused(true)
        setElapsedTime(0);
    }

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setElapsedTime(elapsedTime => elapsedTime + 10);
            }, 10)

            return () => clearInterval(interval)
        }
    }, [isPaused, setElapsedTime])

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
                <button onClick={() => setIsPaused((state) => !state)}>
                    {isPaused ? `${elapsedTime === 0 ? "Start" : "Resume"}` : "Pause"}
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch
