"use client";

import { useState } from 'react';
import styles from './Wheel.module.css'

type Slice = { color: string, label: string, value: number }

const Wheel = () => {
  const [slices, setSlices] = useState<Slice[]>([
    { color: '#365b58', label: '1', value: 2 },
    { color: '#79612b', label: '5', value: 3 },
    { color: '#51262e', label: '2', value: 5 },
    { color: '#2d254b', label: '10', value: 10 },
    { color: '#365b58', label: '1', value: 2 },
    { color: '#d290d9', label: 'pch', value: 3 },
    { color: '#365b58', label: '1', value: 5 },
    { color: '#51262e', label: '2', value: 10 },
    { color: '#79612b', label: '5', value: 2 },
    { color: '#365b58', label: '1', value: 3 },
    { color: '#51262e', label: '2', value: 3 },
    { color: 'blue', label: 'cf', value: 5 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#2d254b', label: '10', value: 2 },
    { color: '#365b58', label: '1', value: 2 },
    { color: '#79612b', label: '5', value: 3 },
    { color: '#365b58', label: '1', value: 5 },
    { color: 'green', label: 'ch', value: 10 },
    { color: '#365b58', label: '1', value: 2 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#79612b', label: '5', value: 5 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#51262e', label: '2', value: 2 },
    { color: 'blue', label: 'cf', value: 3 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#365b58', label: '1', value: 5 },
    { color: '#2d254b', label: '10', value: 10 },
    { color: '#51262e', label: '2', value: 2 },
    { color: '#365b58', label: '1', value: 5 },
    { color: 'red', label: 'ct', value: 5 },
    { color: '#365b58', label: '1', value: 5 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#79612b', label: '5', value: 5 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#d290d9', label: 'pch', value: 3 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#79612b', label: '5', value: 5 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#365b58', label: '1', value: 10 },
    { color: 'blue', label: 'cf', value: 10 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#2d254b', label: '10', value: 10 },
    { color: '#51262e', label: '2', value: 3 },
    { color: 'green', label: 'ch', value: 3 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#51262e', label: '2', value: 3 },
    { color: '#365b58', label: '1', value: 10 },
    { color: '#79612b', label: '5', value: 5 },
    { color: '#365b58', label: '1', value: 10 },
    { color: 'blue', label: 'cf', value: 10 },
  ])

  const [angle, setAngle] = useState<number>(0)
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  const handleSpin = () => {
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
                  clipPath: "polygon(50% 50%, -9% 100%, 4% 100%)",
                  //ghetto offset
                  rotate: "133.7deg"
                }}
              />
              <div
                className={styles.sector}
                style={{ transform: `rotate(${index * (360 / slices.length)}deg)`,
                  //ghetto offset
                  rotate: "-0.5deg"
                }}
              >
                <div>{slice.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedSlice &&
        <div>
          {slices[selectedSlice].label}
        </div>
      }
    </div>
  )
}

export default Wheel
