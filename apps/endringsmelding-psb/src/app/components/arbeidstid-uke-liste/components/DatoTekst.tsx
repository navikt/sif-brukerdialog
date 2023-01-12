import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib';

const DatoTekst = ({ dato }: { dato: Date }) => {
    return <span style={{ textTransform: 'capitalize' }}>{dateFormatter.compact(dato)}</span>;
};

export default DatoTekst;
