import React from "react";

import style from "./Error.module.css";

interface ErrorProps {
    message: string
}

export const Error: React.ComponentType<ErrorProps> = ({message}) => {
    return <div className={style.error}>{message}</div>
}
