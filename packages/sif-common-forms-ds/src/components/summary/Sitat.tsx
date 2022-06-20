import React from 'react';

const Sitat: React.FunctionComponent = ({ children }) => (
    <span
        style={{
            display: 'block',
            paddingLeft: '.5rem',
            margin: '0.5rem 0',
            borderLeft: '2px solid #C6C2BF',
            fontStyle: 'italic',
        }}>
        {children}
    </span>
);

export default Sitat;
