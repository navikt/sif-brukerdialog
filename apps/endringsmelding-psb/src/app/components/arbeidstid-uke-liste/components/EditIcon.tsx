import React from 'react';
import { Edit } from '@navikt/ds-icons';

interface Props {
    multiple?: boolean;
}

const EditMultipleSVG = () => (
    <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        focusable={false}
        aria-label="Endre">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.074.514a1.754 1.754 0 0 1 0 2.48L3.562 9.508.3 10.588l-.301-.3 1.08-3.262L7.593.514a1.754 1.754 0 0 1 2.481 0Zm-1.86 3.101-1.241-1.24-5.125 5.124-.615 1.856 1.856-.616 5.125-5.124Zm1.24-2.481a.877.877 0 0 0-1.192-.045l-.048.045-.62.62 1.24 1.24.62-.62A.877.877 0 0 0 9.5 1.182l-.045-.048ZM14.78 5.219a1.754 1.754 0 0 1 0 2.48l-6.513 6.513-3.26 1.081-.301-.3 1.08-3.262L12.3 5.22a1.755 1.755 0 0 1 2.481 0ZM12.92 8.32l-1.241-1.24-5.125 5.124-.615 1.856 1.856-.616 5.124-5.124Zm1.24-2.48a.877.877 0 0 0-1.193-.045l-.048.044-.62.62 1.24 1.24.62-.62a.877.877 0 0 0 .045-1.192l-.044-.048ZM19.486 9.926a1.754 1.754 0 0 1 0 2.48l-6.513 6.513L9.713 20l-.301-.3 1.08-3.262 6.513-6.512a1.755 1.755 0 0 1 2.481 0Zm-1.86 3.101-1.241-1.24-5.125 5.124-.615 1.856 1.856-.616 5.124-5.124Zm1.24-2.48a.877.877 0 0 0-1.193-.045l-.048.044-.62.62 1.24 1.24.621-.62a.877.877 0 0 0 .045-1.192l-.045-.048Z"
            fill="#fff"
        />
    </svg>
);

const EditIcon: React.FunctionComponent<Props> = ({ multiple }) => {
    return multiple ? <EditMultipleSVG /> : <Edit aria-label={`Endre`} />;
};

export default EditIcon;
