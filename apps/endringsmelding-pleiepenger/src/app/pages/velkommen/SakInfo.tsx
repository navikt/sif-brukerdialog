import { BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { Sak } from '../../types/Sak';

interface Props {
    sak: Sak;
}
const SakInfo: React.FunctionComponent<Props> = ({ sak }) => {
    const { fornavn, mellomnavn, etternavn, fødselsdato } = sak.barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                Din pleiepenger
            </Heading>
            <BodyShort as="div">
                <div>
                    <strong>{barnetsNavn}</strong>
                </div>
                <div>Født {dateFormatter.full(fødselsdato)}</div>
            </BodyShort>
        </>
    );
};

export default SakInfo;
