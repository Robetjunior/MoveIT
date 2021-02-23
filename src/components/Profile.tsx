import styles from '../styles/components/Profile.module.css'

export function Profile(){
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/robetjunior.png" alt="Jose Roberto"/>
      <div>
        <strong>Jose Roberto</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}