import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Arbeidsgiver } from '../../../../types';
import FrilansoppdragListe from './FrilansoppdragListe';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragInfo: React.FunctionComponent<Props> = ({ frilansoppdrag }) => (
    <Block padBottom="m">
        {/* <FormattedMessage id="frilansoppdragInfo.tittel" values={{ antall: frilansoppdrag.length }} />
        <Block margin="l">
            <FormattedMessage id="frilansoppdragInfo.tittel.1" />
        </Block> */}
        <FrilansoppdragListe frilansoppdrag={frilansoppdrag} />
    </Block>
);

export default FrilansoppdragInfo;
