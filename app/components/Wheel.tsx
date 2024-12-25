"use client";

import { useState } from "react";
import styles from "./Wheel.module.css";
import { Slice } from "../wheeloffortune/page";
import FaceImageSrc from "@/public/img/face.png";
import Image from "next/image";

interface WheelProps {
  spinning: boolean;
  setSpinning: (arg0: boolean) => void;
  setSelectedSlice: (arg0: Slice) => void;
}

const Wheel = (props: WheelProps) => {
  const slices: Slice[] = [
    {
      color: "#cf4762",
      label: "Vervollständige",
      type: "gedicht",
    },
    {
      color: "#308060",
      label: "Wahr / Falsch",
      type: "wahr_falsch",
    },
    {
      color: "#1683b0",
      label: "Lieder trällern",
      type: "lieder",
    },
    {
      color: "#c57e4d",
      label: "Schätzen",
      type: "schaetzen",
    },
    {
      color: "#cf4762",
      label: "Vervollständige",
      type: "gedicht",
    },
    {
      color: "#308060",
      label: "Wahr / Falsch",
      type: "wahr_falsch",
    },
    {
      color: "#1683b0",
      label: "Lieder trällern",
      type: "lieder",
    },
    {
      color: "#c57e4d",
      label: "Schätzen",
      type: "schaetzen",
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
          className={`${styles.middlebutton} text-5xl cursor-pointer`}
          onClick={handleSpin}
        >
          <Image alt="" src={FaceImageSrc} />
        </div>
        <div
          className={`${styles.wheel}`}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {slices.map((slice, index) => (
            <div key={index} className="text-xl font-bold tracking-wide">
              <div
                className={`${styles.sector}`}
                style={{
                  zIndex: -1,
                  transform: `rotate(${index * (360 / slices.length)}deg)`,
                  clipPath: `polygon(0% -2%, 50% 50%, 0% 50%)`,
                  borderRadius: "50%",
                  backgroundColor: slice.color,
                  //line up text and slices
                  rotate: `${90 + 180 / slices.length}deg`,
                }}
              ></div>
              <div
                className={styles.sector}
                style={{
                  transform: `rotate(${index * (360 / slices.length)}deg)`,
                  //ghetto offset
                  rotate: "0.75deg",
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
