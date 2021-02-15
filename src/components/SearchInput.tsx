import React from "react";

import style from "./SearchInput.module.css";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput: React.ComponentType<SearchInputProps> = ({ value, onChange }) => {

    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={style.search}>
            <input className={style.searchInput} type="text" value={value} onInput={onSearchInput} placeholder={"Type in city name..."}/>
        </div>
    );
}
