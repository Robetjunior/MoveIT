import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
  const {currentExperience, experienceToNextLevel} = useContext(ChallengeContext)

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{maxWidth: `${percentToNextLevel}%`}}>
          <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience} xp</span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}