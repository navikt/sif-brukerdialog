import React from 'react';
import './checklist.scss';

const Checklist: React.FunctionComponent<React.HTMLAttributes<HTMLUListElement> & { className?: string }> = (props) => (
    <ul {...props} className={`checklist ${props.className}`} />
);

export default Checklist;
