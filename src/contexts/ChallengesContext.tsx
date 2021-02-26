import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number; 
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () =>  void;
  closeLevelUpModal: () => void;
}

interface  ChallengesProviderProps{
  children: ReactNode
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ??0)
  const [challengesCompleted, SetChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4,2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, currentExperience, challengesCompleted]);

  function levelUp(){
    setLevel(level + 1)
    setIsLevelUpModelOpen(true);
  }
  
  function closeLevelUpModal(){
    setIsLevelUpModelOpen(false);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎉🎉', {
        body: `\n/Valendo ${challenge.amount} exp!`,

      })
    }
  }
  
  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completeChallenge(){
    if(!activeChallenge){
      return
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    SetChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengeContext.Provider 
      value={{
        level, 
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      { isLevelUpModelOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
     
  )
}