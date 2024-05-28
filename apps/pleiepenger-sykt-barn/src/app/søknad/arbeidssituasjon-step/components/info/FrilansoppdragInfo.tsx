import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Arbeidsgiver } from '../../../../types';
import FrilansoppdragListe from './FrilansoppdragListe';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragInfo: React.FunctionComponent<Props> = ({ frilansoppdrag }) => (
    <Block padBottom="m">
        <FrilansoppdragListe frilansoppdrag={frilansoppdrag} />
    </Block>
);

export default FrilansoppdragInfo;
