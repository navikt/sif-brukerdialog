import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import FrilansIconSvg from '../../../../components/frilans-icon/FrilansIconSvg';
import { Arbeidsgiver } from '../../../../types';
import ArbeidssituasjonPanel from '../arbeidssituasjon-panel/ArbeidssituasjonPanel';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

export const renderTidsrom = ({ ansattFom, ansattTom }: Arbeidsgiver) => {
    if (ansattFom && ansattTom) {
        return (
            <FormattedMessage
                id="frilansoppdragListe.tidsrom.avsluttet"
                values={{ fra: prettifyDateExtended(ansattFom), til: prettifyDateExtended(ansattTom) }}
            />
        );
    }
    if (ansattFom) {
        return (
            <FormattedMessage
                id="frilansoppdragListe.tidsrom.pågående"
                values={{ fra: prettifyDateExtended(ansattFom) }}
            />
        );
    }
    return undefined;
};

const FrilansoppdragListe: React.FunctionComponent<Props> = ({ frilansoppdrag }) => (
    <ArbeidssituasjonPanel title="Frilansoppdrag registrert på deg:" titleIcon={<FrilansIconSvg />}>
        <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
            {frilansoppdrag.map((oppdrag) => (
                <li key={oppdrag.id}>
                    <Heading level="4" size="xsmall">
                        {oppdrag.navn}
                    </Heading>
                    <Block padBottom="l">{renderTidsrom(oppdrag)}</Block>
                </li>
            ))}
        </ul>
    </ArbeidssituasjonPanel>
);

export default FrilansoppdragListe;
