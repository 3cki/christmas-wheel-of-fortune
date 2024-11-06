"use client";

import { useState } from 'react';
import styles from './Wheel.module.css'

type Slice = { color: string, label: string, value: number, bonus: boolean }

interface WheelProps {
  spinning: boolean
  setSpinning: (arg0: boolean) => void
}

const Wheel = (props: WheelProps) => {

  const slices: Slice[] = [
    { color: 'var(--one)', label: '1', value: 2, bonus: false },
    { color: 'var(--five)', label: '5', value: 3, bonus: false },
    { color: 'var(--two)', label: '2', value: 5, bonus: false },
    { color: 'var(--ten)', label: '10', value: 10, bonus: false },
    { color: 'var(--one)', label: '1', value: 2, bonus: false },
    { color: 'var(--pch)', label: 'Pachinko', value: 3, bonus: true },
    { color: 'var(--one)', label: '1', value: 5, bonus: false },
    { color: 'var(--two)', label: '2', value: 10, bonus: false },
    { color: 'var(--five)', label: '5', value: 2, bonus: false },
    { color: 'var(--one)', label: '1', value: 3, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--cf)', label: 'Coin Flip', value: 5, bonus: true },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--ten)', label: '10', value: 2, bonus: false },
    { color: 'var(--one)', label: '1', value: 2, bonus: false },
    { color: 'var(--five)', label: '5', value: 3, bonus: false },
    { color: 'var(--one)', label: '1', value: 5, bonus: false },
    { color: 'var(--ch)', label: 'Cash Hunt', value: 10, bonus: true },
    { color: 'var(--one)', label: '1', value: 2, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--five)', label: '5', value: 5, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 2, bonus: false },
    { color: 'var(--cf)', label: 'Coin Flip', value: 3, bonus: true },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--one)', label: '1', value: 5, bonus: false },
    { color: 'var(--ten)', label: '10', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 2, bonus: false },
    { color: 'var(--one)', label: '1', value: 5, bonus: false },
    { color: 'var(--ct)', label: 'Crazy Time', value: 5, bonus: true },
    { color: 'var(--one)', label: '1', value: 5, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--five)', label: '5', value: 5, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--pch)', label: 'Pachinko', value: 3, bonus: true },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--five)', label: '5', value: 5, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--cf)', label: 'Coin Flip', value: 10, bonus: true },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--ten)', label: '10', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--ch)', label: 'Cash Hunt', value: 3, bonus: true },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--two)', label: '2', value: 3, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--five)', label: '5', value: 5, bonus: false },
    { color: 'var(--one)', label: '1', value: 10, bonus: false },
    { color: 'var(--cf)', label: 'Coin Flip', value: 10, bonus: true }
  ]

  const [angle, setAngle] = useState<number>(0)
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  const handleSpin = () => {
    if (props.spinning) {
      return
    }
    setTimeout(() => {
      props.setSpinning(false)
    }, 8000)
    props.setSpinning(true)
    const randomAngle = Math.round(Math.random() * 360 * 9) + 360;
    const newAngle = angle + randomAngle;
    const sliceAmount = slices.length
    const angleBySlice = 360 / sliceAmount
    const offset = angleBySlice / 2
    setAngle(newAngle);

    const deg = Math.abs(Math.round((newAngle + offset) % 360));

    const selectedIndex = (sliceAmount - Math.floor(deg / angleBySlice)) % sliceAmount;
    console.log(selectedIndex)
    setSelectedSlice(selectedIndex);
  }

  return (
    <div>
      <div className={`${styles.container}`}>
        <div className={`${styles.arrow}`}/>
        <div className={`${styles.middlebutton}`}
          onClick={handleSpin}
        >Spin</div>
        <div className={`${styles.wheel}`} style={{ transform: `rotate(${angle}deg)` }}>
          {slices.map((slice, index) => (
            <div
              key={index} >
              <div
                className={styles.sector}
                style={{
                  backgroundColor: `${slice.color}`,
                  zIndex: -1,
                  transform: `rotate(${index * (360 / slices.length)}deg)`,
                  clipPath: "polygon(50% 50%, -7.7% 100%, 4% 100%)",
                  borderRadius: "50%",
                  //ghetto offset
                  rotate: "133.7deg"
                }}
              >
              </div>
              <div
                className={styles.sector}
                style={{ transform: `rotate(${index * (360 / slices.length)}deg)`,
                  //ghetto offset
                  rotate: "-0.5deg"
                }}
              >
                <p className={slice.bonus ? styles.bonusSector : ''}>{slice.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wheel
