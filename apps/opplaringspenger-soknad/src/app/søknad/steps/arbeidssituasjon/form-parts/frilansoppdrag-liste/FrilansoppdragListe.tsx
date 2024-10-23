import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../../../types/Arbeidsgiver';
import { AppText } from '../../../../../i18n';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
    kompakt?: boolean;
}

const renderKurs = ({ ansattFom, ansattTom }: Arbeidsgiver) => {
    if (ansattFom && ansattTom) {
        return (
            <AppText
                id="frilansoppdragListe.kurs.avsluttet"
                values={{ fra: prettifyDateExtended(ansattFom), til: prettifyDateExtended(ansattTom) }}
            />
        );
    }
    if (ansattFom) {
        return <AppText id="frilansoppdragListe.kurs.pågående" values={{ fra: prettifyDateExtended(ansattFom) }} />;
    }
    return null;
};

const FrilansoppdragListe: React.FC<Props> = ({ frilansoppdrag, kompakt }) =>
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
                    <BodyLong size="large">{oppdrag.navn}</BodyLong>
                    <Block padBottom="l">
                        <AppText id="frilansoppdragListe.oppdrag" values={{ kurs: renderKurs(oppdrag) }} />
                    </Block>
                </li>
            ))}
        </ul>
    );

export default FrilansoppdragListe;
