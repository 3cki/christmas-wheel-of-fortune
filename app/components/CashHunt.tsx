'use client';
import React, { useEffect, useState } from 'react'
import { BonusGameProps } from '../types/BonusgameTypes'
import styles from './CashHunt.module.css'
import { useBalance } from '../contexts/balanceContext'

const CashHunt = (props: BonusGameProps) => {
  const balance = useBalance()
  const [multiplierChoices, setMultiplierChoices] = useState<number[]>([])

  useEffect(() => {

    //multiplier randomizer
    const multiplierList: number[] = [5, 7, 10, 15, 20, 25, 30, 35, 50, 75, 100]
    const weights: number[] = [40, 30, 20, 10, 5, 3, 2, 1, 0.5]
    const getRandomMultiplier = (multiplierList: number[]): number => {
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
      let random = Math.random() * totalWeight
      for (let i = 0; i < multiplierList.length; i++) {
        if (random < weights[i]) {
          return multiplierList[i]
        }
        random -= weights[i]
      }
      return multiplierList[0]
    }

    //multiplier generator
    const createMultipliers = () => {
      const bufferList: number[] = []
      for (let i=0; i<25; i++) {
        bufferList.push(getRandomMultiplier(multiplierList))
      }
      setMultiplierChoices(bufferList)
    }
    createMultipliers()
  }, [])

  const handleChoice = (multiplier: number) => {

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.multipliers}>
          {multiplierChoices.map((multiplier, index) => (
            <div onClick={() => handleChoice(multiplier)} className={styles.multiplierItem} key={index}>
              {multiplier}x
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CashHunt
