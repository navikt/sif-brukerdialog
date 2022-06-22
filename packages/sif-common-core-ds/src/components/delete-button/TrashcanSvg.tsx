import React from 'react';

interface Props {
    size?: number;
}
function Trashcan({ size = 24 }: Props) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" focusable={false}>
            <title>{'S\xF8ppelkasse'}</title>
            <path
                d="M3.516 3.5h16v20h-16zm4-3h8v3h-8zm-6.5 3h22M7.516 7v12m4-12v12m4-12v12"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                fill="none"
            />
        </svg>
    );
}

export default Trashcan;
