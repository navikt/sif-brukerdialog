import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ArbeidsperiodeTekst from '../../../../components/arbeidsperiode-tekst/ArbeidsperiodeTekst';
import FrilansIconSvg from '../../../../components/frilans-icon/FrilansIconSvg';
import { Arbeidsgiver } from '../../../../types';
import ArbeidssituasjonPanel from '../arbeidssituasjon-panel/ArbeidssituasjonPanel';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragListe: React.FunctionComponent<Props> = ({ frilansoppdrag }) => (
    <ArbeidssituasjonPanel title="Frilansoppdrag registrert på deg:" titleIcon={<FrilansIconSvg />}>
        <p style={{ marginTop: '-.5rem' }}>
            Dette er informasjon hentet fra AA-registeret. Det kan være jobb som frilanser, eller andre oppdrag som
            regnes som frilansoppdrag: honorar, fosterhjemsgodtgjørelse eller omsorgsstønad fra kommunen.
        </p>

        <ul style={{ margin: '1rem 0 0 0 ', padding: '0 0 0 1rem' }}>
            {frilansoppdrag.map((oppdrag) => (
                <li key={oppdrag.id}>
                    <Heading level="4" size="xsmall">
                        {oppdrag.navn}
                    </Heading>
                    {oppdrag.ansattFom && (
                        <Block padBottom="l">
                            <ArbeidsperiodeTekst from={oppdrag.ansattFom} to={oppdrag.ansattTom} />
                        </Block>
                    )}
                </li>
            ))}
        </ul>
    </ArbeidssituasjonPanel>
);

export default FrilansoppdragListe;
