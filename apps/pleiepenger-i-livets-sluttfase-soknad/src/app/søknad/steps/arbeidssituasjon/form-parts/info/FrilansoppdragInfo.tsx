import React from 'react';
import FrilansoppdragListe from '../frilansoppdrag-liste/FrilansoppdragListe';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Arbeidsgiver } from '../../../../../types/Arbeidsgiver';
import { Heading } from '@navikt/ds-react';
import { AppText } from '../../../../../i18n';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragInfo: React.FunctionComponent<Props> = ({ frilansoppdrag }) => (
    <Block padBottom="m">
        <Heading level="2" size="small">
            <AppText id="frilansoppdragInfo.tittel" />
        </Heading>
        <FrilansoppdragListe frilansoppdrag={frilansoppdrag} />
        <p style={{ marginTop: 0 }}>
            <AppText id="frilansoppdragInfo.tekst" />
        </p>
    </Block>
);

export default FrilansoppdragInfo;
