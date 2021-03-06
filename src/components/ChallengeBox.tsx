import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
  const { resetCountodwn } = useContext(CountdownContext)

  function handleChallengeSuccesseded(){
    completeChallenge()
    resetCountodwn()
  }

  function handleChallengeFailed(){
    resetChallenge()
    resetCountodwn()
  }

  return(
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>Novo desafio!</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccessedButton}
              onClick={handleChallengeSuccesseded}
            >
              Completei
            </button>
          </footer>
          
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo para receber desafios a serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}