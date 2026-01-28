import { Heading, VStack } from '@navikt/ds-react';

import InfoForsinkelse from './InfoForsinkelse';

interface Props {
    tittel: string;
}

const StatusISakHeading = ({ tittel }: Props) => {
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                {tittel}
            </Heading>
            <InfoForsinkelse />
        </VStack>
    );
};

export default StatusISakHeading;
