import React from 'react';

import './input.scss';

const Input = props => {
    const { type, placeholder, value, onChange } = props;

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange ? (event) => onChange(event) : null}
        />
    )
}

export default Input;