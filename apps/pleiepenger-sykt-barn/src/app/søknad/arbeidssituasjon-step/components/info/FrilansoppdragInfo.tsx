import React from 'react';
import { Arbeidsgiver } from '../../../../types';
import FrilansoppdragListe from './FrilansoppdragListe';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragInfo: React.FunctionComponent<Props> = ({ frilansoppdrag }) => (
    <FrilansoppdragListe frilansoppdrag={frilansoppdrag} />
);

export default FrilansoppdragInfo;
