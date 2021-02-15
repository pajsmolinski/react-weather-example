import React from "react";

import style from "./UnitSwitch.module.css";

interface UnitSwitchProps {
    units: string;
    onChange: (units: string) => void;
}

export const UnitSwitch: React.ComponentType<UnitSwitchProps> = ({units, onChange}) => {

    const onClick = () => {
        onChange(units === 'metric' ? 'imperial' : 'metric');
    }

    const switchClasses = [style.switch];

    if (units === 'imperial') {
        switchClasses.push(style.switchActive);
    }

    return (
        <div className={style.wrapper} onClick={onClick}>
            <span className={style.label}>°C</span>
            <div className={switchClasses.join(' ')}>
                <div className={style.switchDot}/>
            </div>
            <span className={style.label}>°F</span>
        </div>
    )
}
