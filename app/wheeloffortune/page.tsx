'use client';
import Wheel from '@/app/components/Wheel'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import currency from 'currency.js';
import PokerChipSVG from '@/public/pokerchip.svg'
import WinningsModal from '../components/WinningsModal';

const Page = () => {

  const [balance, setBalance] = useState<number>(100)
  type Bets = {
    [key: string]: number
  }
  type BetChoices = 0.1 | 0.2 | 0.5 | 1 | 2
  interface Slice {
    color: string;
    label: string;
    value: number;
    bonus: boolean;
    target: keyof Bets;
  }

  //format placed bets
  const startingBets: Bets = { one: 0, two: 0, five: 0, ten: 0, ct: 0, ch: 0, pch: 0, cf: 0 }
  const betOptions: BetChoices[] = [0.1, 0.2, 0.5, 1, 2]

  const [totalBets, setTotalBets] = useState<Bets>(startingBets)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [selectedBet, setSelectedBet] = useState<BetChoices>(0.1)
  const [selectedSlice, setSelectedSlice] = useState<Slice | null>(null);
  const [winnings, setWinnings] = useState<number | null>(null);

  useEffect(() => {
    if (!spinning && selectedSlice) {
      const currentBetOnResult = totalBets[selectedSlice?.target]
      const calculatedWinnings = currency(selectedSlice?.value).multiply(currentBetOnResult).add(currentBetOnResult).value
      console.log(selectedSlice)
      console.log('currentBetOnResult', currentBetOnResult)
      console.log('calculatedWinnings', calculatedWinnings)
      if (calculatedWinnings > 0) {
        setWinnings(calculatedWinnings)
        const winningModal = document.getElementById("winningsModal") as HTMLDialogElement | null
        if (winningModal) {
          winningModal.showModal()
        }
        setBalance(prevBalance => currency(prevBalance).add(calculatedWinnings).value)
        console.log(`Congratulations you got ${calculatedWinnings}€`)
      }
      //reset Bets
      const resetBets = startingBets
      setTotalBets(resetBets)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning])

  const handleBet = (betAmount: number, multiplier: keyof Bets) => {
    if (!spinning) {
      const newBalance = currency(balance).subtract(betAmount).value
      if (newBalance < 0) {
        return
      }
      setBalance(newBalance)
      setTotalBets(prevBets => ({
        ...prevBets, [multiplier]: currency(prevBets[multiplier]).add(betAmount).value
      }))
    }
  }

  //control sector bet multipliers/bonus
  const sectors = {
    one: 1,
    two: 2,
    cf: 'Coin Flip',
    pch: 'Pachinko',
    five: 5,
    ten: 10,
    ch: 'Cash Hunt',
    ct: 'Crazy Time',
  };

  const sectorColors = {
    one: 'bg-one',
    two: 'bg-two',
    cf: 'bg-cf',
    pch: 'bg-pch',
    five: 'bg-five',
    ten: 'bg-ten',
    ch: 'bg-ch',
    ct: 'bg-ct',
  };

  const pokerChipColors = {
    0.1: 'fill-0.1',
    0.2: 'fill-0.2',
    0.5: 'fill-0.5',
    1: 'fill-1',
    2: 'fill-2',
  };

  return (
    <div>
      <WinningsModal winnings={winnings} />
      <Wheel
        spinning={spinning} setSpinning={setSpinning}
        setSelectedSlice={setSelectedSlice}
      />
      <div className='flex justify-center mt-6 font-mono'>Balance: {`${balance}`}</div>
      <div className={`${styles.multipliersContainer}`}>
        <div className={`${styles.multipliers}`}>
          {Object.entries(sectors).map((sector, index) => (
            <div
              key={index}
              onClick={() => handleBet(selectedBet, sector[0])}
              className={`${styles.betItem} ${sectorColors[sector[0] as keyof typeof sectorColors]}`}
            >
              <p>{sector[1]}</p>
              {totalBets[sector[0]] > 0 && (
                <div className='text-lg'>{`${totalBets[sector[0]]}`}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-4 mt-6 justify-center'>
        {(betOptions).map((betValue, index) => (
          <div key={index}
            className={`
              ${styles.betOption} 
              ${pokerChipColors[betValue]} 
              ${selectedBet === betValue ? 'opacity-100' : 'opacity-50'}
            `}
            onClick={() => setSelectedBet(betValue)}
          >
            <p className='font-bold text-xl'>{betValue}</p>
            <PokerChipSVG className={`${styles.pokerchipSvg} `} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
