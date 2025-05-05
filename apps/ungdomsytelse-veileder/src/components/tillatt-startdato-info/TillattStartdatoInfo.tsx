import { Alert, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltaker, formaterNavn } from '@navikt/ung-common';

interface Props {
    deltaker: Deltaker;
}

const TillattStartdatoInfo = ({ deltaker }: Props) => {
    return (
        <VStack gap="2">
            <Alert variant="info" inline>
                Første mulige startdato for {formaterNavn(deltaker.navn)} er{' '}
                {dateFormatter.compact(deltaker.førsteMuligeInnmeldingsdato)}. Siste mulige startdato er{' '}
                {dateFormatter.compact(deltaker.sisteMuligeInnmeldingsdato)}.
            </Alert>
            <Alert variant="info" inline>
                Startdato kan ikke være før ungdomsprogrammet ble tilgjengelig.
            </Alert>
            <Alert variant="info" inline>
                Startdato kan ikke settes til en dato som er utenfor 6 måneder fra dagens dato.
            </Alert>
        </VStack>
    );
};

export default TillattStartdatoInfo;
