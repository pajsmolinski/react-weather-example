import React from "react";

import style from "./UnitSwitch.module.css";
import { Units } from "../weather/weather";

interface UnitSwitchProps {
  units: Units;
  onChange: (units: Units) => void;
}

export const UnitSwitch: React.ComponentType<UnitSwitchProps> = ({
  units,
  onChange,
}) => {
  const onClick = () => {
    onChange(units === Units.Metric ? Units.Imperial : Units.Metric);
  };

  const switchClasses = [style.switch];

  if (units === "imperial") {
    switchClasses.push(style.switchActive);
  }

  return (
    <div className={style.wrapper} onClick={onClick}>
      <span className={style.label}>°C</span>
      <div className={switchClasses.join(" ")}>
        <div className={style.switchDot} />
      </div>
      <span className={style.label}>°F</span>
    </div>
  );
};
