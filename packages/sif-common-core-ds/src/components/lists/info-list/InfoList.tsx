import React from 'react';
import './infolist.css';

const InfoList: React.FunctionComponent<React.HTMLAttributes<HTMLUListElement> & { className?: string }> = (props) => (
    <ul {...props} className={`infoList ${props.className ? props.className : ''}`} />
);

export default InfoList;
