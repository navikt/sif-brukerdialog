import React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { Element } from 'nav-frontend-typografi';
import { Arbeidsgiver } from '../../../../types';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
    kompakt?: boolean;
}

const renderTidsrom = ({ ansattFom, ansattTom }: Arbeidsgiver) => {
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
    return null;
};

const FrilansoppdragListe: React.FunctionComponent<Props> = ({ frilansoppdrag, kompakt }) =>
    kompakt ? (
        <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
            {frilansoppdrag.map((oppdrag) => (
                <li key={oppdrag.id}>{oppdrag.navn}</li>
            ))}
        </ul>
    ) : (
        <ul style={{ margin: 0, padding: '1rem 0 0 1rem' }}>
            {frilansoppdrag.map((oppdrag) => (
                <li key={oppdrag.id}>
                    <Element tag="h3">{oppdrag.navn}</Element>
                    <Box padBottom="l">
                        <FormattedMessage
                            id="frilansoppdragListe.oppdrag"
                            values={{ tidsrom: renderTidsrom(oppdrag) }}
                        />
                    </Box>
                </li>
            ))}
        </ul>
    );

export default FrilansoppdragListe;
