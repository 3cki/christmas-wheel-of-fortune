'use client';
import Wheel from '@/app/components/Wheel'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

const Page = () => {

  const [balance, setBalance] = useState<number>(100)
  type Bet = 1 | 2 | 5 | 10

  const [currentBet, setCurrentBet] = useState<Bet>(1)
  const [spinning, setSpinning] = useState<boolean>(false)

  useEffect(() => {
    if (spinning) {
      console.log('spinning')
      return
    }
      console.log('spin complete')
  }, [spinning])

  const handleBet = (betAmount: Bet, multiplier: number) => {
    console.log(betAmount * multiplier + betAmount)
  }

  return (
    <div>
      <Wheel spinning={spinning} setSpinning={setSpinning} />
      <div className='flex justify-center mt-6 font-mono'>Balance: {balance}</div>
      <div className={`${styles.multipliersContainer}`}>
        <div className={`${styles.multipliers}`}>
          <div onClick={() => handleBet(currentBet, 1)} className={`${styles.betItem} bg-one`}>1</div>
          <div onClick={() => handleBet(currentBet, 2)} className={`${styles.betItem} bg-two`}>2</div>
          <div onClick={() => handleBet(currentBet, 5)} className={`${styles.betItem} bg-five`}>5</div>
          <div onClick={() => handleBet(currentBet, 10)} className={`${styles.betItem} bg-ten`}>10</div>
        </div>
        <div className={`${styles.multipliers}`}>
          <div className="flex justify-center border-2 rounded border-base-content items-center bg-cf">coinflip</div>
          <div className="flex justify-center border-2 rounded border-base-content items-center bg-pch">pachinko</div>
          <div className="flex justify-center border-2 rounded border-base-content items-center bg-ch">cashhunt</div>
          <div className="flex justify-center border-2 rounded border-base-content items-center bg-ct">crazytime</div>
        </div>
      </div>
    </div>
  )
}

export default Page
