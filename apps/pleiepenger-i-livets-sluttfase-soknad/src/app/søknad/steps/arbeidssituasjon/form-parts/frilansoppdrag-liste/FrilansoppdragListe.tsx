import { BodyShort, List } from '@navikt/ds-react';
import React from 'react';
import { FormLayout } from '@navikt/sif-common-ui';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText } from '../../../../../i18n';
import { Arbeidsgiver } from '../../../../../types/Arbeidsgiver';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
    kompakt?: boolean;
}

const renderTidsrom = ({ ansattFom, ansattTom }: Arbeidsgiver) => {
    if (ansattFom && ansattTom) {
        return (
            <AppText
                id="frilansoppdragListe.tidsrom.avsluttet"
                values={{ fra: prettifyDateExtended(ansattFom), til: prettifyDateExtended(ansattTom) }}
            />
        );
    }
    if (ansattFom) {
        return <AppText id="frilansoppdragListe.tidsrom.pågående" values={{ fra: prettifyDateExtended(ansattFom) }} />;
    }
    return null;
};

const FrilansoppdragListe: React.FC<Props> = ({ frilansoppdrag }) => (
    <FormLayout.Panel>
        <List>
            {frilansoppdrag.map((oppdrag) => (
                <List.Item key={oppdrag.id}>
                    <BodyShort as="div" weight="semibold">
                        {oppdrag.navn}
                    </BodyShort>
                    <AppText id="frilansoppdragListe.oppdrag" values={{ tidsrom: renderTidsrom(oppdrag) }} />
                </List.Item>
            ))}
        </List>
    </FormLayout.Panel>
);

export default FrilansoppdragListe;
