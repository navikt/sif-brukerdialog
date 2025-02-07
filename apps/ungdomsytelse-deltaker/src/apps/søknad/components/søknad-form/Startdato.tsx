import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    startdato: Date;
}

const Startdato = ({ startdato }: Props) => {
    return (
        <VStack gap="4">
            <Heading level="3" size="medium">
                Ungdomsprogrammet
            </Heading>
            <BodyShort>Startdato: {dateFormatter.dateShortMonthYear(startdato)}</BodyShort>
        </VStack>
    );
};

export default Startdato;
