"use client";
import Wheel from "@/app/components/Wheel";
import React, { useEffect, useState } from "react";
import currency from "currency.js";
import { useBalance } from "../contexts/balanceContext";

export type CurrentGame =
  | "normal"
  | "Coin Flip"
  | "Pachinko"
  | "Cash Hunt"
  | "Jackpot";

export type Bets = {
  [key: string]: number;
};
export type BetChoices = 0.1 | 0.2 | 0.5 | 1 | 2;
export interface Slice {
  color: string;
  label: string;
  value: number;
  bonus: boolean;
  target: keyof Bets;
}

const WheelOfFortune = () => {
  const balance = useBalance();
  //format placed bets
  const startingBets: Bets = {
    one: 0,
    two: 0,
    five: 0,
    ten: 0,
    ct: 0,
    ch: 0,
    pch: 0,
    cf: 0,
  };

  const [totalBets, setTotalBets] = useState<Bets>(startingBets);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selectedSlice, setSelectedSlice] = useState<Slice | null>(null);

  useEffect(() => {
    if (!spinning && selectedSlice) {
      const currentBetOnChoice = totalBets[selectedSlice?.target];
      const calculatedWinnings = currency(selectedSlice?.value).multiply(
        currentBetOnChoice
      ).value;

      //show winnings modal if won
      if (calculatedWinnings > 0 && !selectedSlice.bonus) {
        balance?.updateBalance(
          currency(balance.current)
            .add(calculatedWinnings)
            .add(currentBetOnChoice).value
        );
        const winningModal = document.getElementById(
          "winningsModal"
        ) as HTMLDialogElement | null;
        if (winningModal) {
          winningModal.showModal();
        }
      }

      //reset Bets
      const resetBets = startingBets;
      setTotalBets(resetBets);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  return (
    <div>
      <Wheel
        spinning={spinning}
        setSpinning={setSpinning}
        setSelectedSlice={setSelectedSlice}
      />
    </div>
  );
};

export default WheelOfFortune;
