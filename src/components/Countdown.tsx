import { useState, useEffect, useContext } from 'react'

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css'

export function Countdown(){
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    resetCountodwn 
  } = useContext(CountdownContext)

  const [minutesLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

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