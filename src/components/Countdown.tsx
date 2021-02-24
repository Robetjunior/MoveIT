import { useState, useEffect, useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
  const { startNewChallenge } = useContext(ChallengeContext)

  const [time, setTime] = useState(0.1 *  60);
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountodwn(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60)
  }

  useEffect(()=> {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=> {
        setTime(time - 1)
      },1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          type="button" 
          className={styles.startCountdownButton}
          onClick={resetCountodwn}
        >
          Ciclo encerrado
        </button>
      ) : (
         <>
            {isActive ? (
              <button 
              type="button" 
              className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}
              onClick={resetCountodwn}
              >
                Abandonar ciclo
              </button>
            ): (
              <button 
            type="button" 
            className={styles.startCountdownButton}
            onClick={startCountdown}
          >
              Iniciar um ciclo
          </button>
          )}
         </>
      )}

    </div>
  )
}