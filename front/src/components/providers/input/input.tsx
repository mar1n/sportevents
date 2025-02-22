import React, { FC } from "react"

interface inputProps {
    name: string;
    className: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;

}
const Input:FC<inputProps> = ({ name, className, type, placeholder, value, onChange}) => {
    return <input />
}

export default Input