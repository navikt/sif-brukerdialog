import React from 'react';
import './iconText.css';

interface Props {
    icon: React.ReactNode;
    children: React.ReactNode;
}

const IconText = ({ icon, children }: Props) => (
    <span className="iconText">
        <span className="iconText__icon">{icon}</span>
        <span className="iconText__text">{children}</span>
    </span>
);

export default IconText;
