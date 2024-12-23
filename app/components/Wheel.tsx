"use client";

import { useState } from "react";
import styles from "./Wheel.module.css";
import { Slice } from "../wheeloffortune/page";

interface WheelProps {
  spinning: boolean;
  setSpinning: (arg0: boolean) => void;
  setSelectedSlice: (arg0: Slice) => void;
}

const Wheel = (props: WheelProps) => {
  const slices: Slice[] = [
    {
      color: "darkgreen",
      label: "Gedicht",
      value: 0,
      bonus: true,
      target: "pch",
    },
    {
      color: "teal",
      label: "Wahr / Falsch",
      value: 0,
      bonus: true,
      target: "cf",
    },
    {
      color: "purple",
      label: "Lieder trällern",
      value: 0,
      bonus: true,
      target: "ch",
    },
    {
      color: "darkblue",
      label: "Schätzen",
      value: 0,
      bonus: true,
      target: "cf",
    },
    {
      color: "darkgreen",
      label: "Gedicht",
      value: 0,
      bonus: true,
      target: "pch",
    },
    {
      color: "teal",
      label: "Wahr / Falsch",
      value: 0,
      bonus: true,
      target: "cf",
    },
    {
      color: "purple",
      label: "Lieder trällern",
      value: 0,
      bonus: true,
      target: "ch",
    },
    {
      color: "darkblue",
      label: "Schätzen",
      value: 0,
      bonus: true,
      target: "cf",
    },
  ];

  const [angle, setAngle] = useState<number>(0);

  const handleSpin = () => {
    if (props.spinning) {
      return;
    }
    setTimeout(() => {
      props.setSpinning(false);
    }, 4000);
    props.setSpinning(true);

    const sliceAmount = slices.length;
    const angleBySlice = 360 / sliceAmount;
    const offset = angleBySlice / 2;

    const randomAngle =
      Math.floor(Math.random() * sliceAmount) * angleBySlice + 360;
    const newAngle = angle + randomAngle;
    setAngle(newAngle);

    const deg = Math.abs(Math.round((newAngle + offset) % 360));

    const selectedIndex =
      (sliceAmount - Math.floor(deg / angleBySlice)) % sliceAmount;
    console.log(slices[selectedIndex].label);
    props.setSelectedSlice(slices[selectedIndex]);
  };

  return (
    <div className="w-2/5">
      <div className={`${styles.container}`}>
        <div className={`${styles.arrow}`} />
        <div
          className={`${styles.middlebutton} cursor-pointer`}
          onClick={handleSpin}
        ></div>
        <div
          className={`${styles.wheel}`}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {slices.map((slice, index) => (
            <div key={index} className="text-xl font-bold tracking-wide">
              <div
                className={styles.sector}
                style={{
                  backgroundColor: `${slice.color}`,
                  zIndex: -1,
                  transform: `rotate(${index * (360 / slices.length)}deg)`,
                  clipPath: `polygon(0% -2%, 50% 50%, 0% 50%)`,
                  borderRadius: "50%",
                  //line up text and slices
                  rotate: `${90 + 180 / slices.length}deg`,
                }}
              ></div>
              <div
                className={styles.sector}
                style={{
                  transform: `rotate(${index * (360 / slices.length)}deg)`,
                  //ghetto offset
                  rotate: "-0.5deg",
                }}
              >
                <p className={styles.bonusSector}> {slice.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wheel;
