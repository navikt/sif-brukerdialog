import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import EndreStartdatoInfo from '../forms/endre-startdato/EndreStartdatoInfo';
import EndreSluttdatoInfo from '../forms/endre-sluttdato/EndreSluttdatoInfo';

const HandlingerInfo = () => (
    <VStack gap="8">
        <EndreStartdatoInfo />
        <EndreSluttdatoInfo />
        <VStack gap="2">
            <Heading level="3" size="small">
                Slette deltakelse
            </Heading>
            <BodyShort size="medium">
                Corporis porro explicabo vel qui atque veritatis assumenda, magni illo ratione? Lorem ipsum dolor sit
                amet consectetur,
            </BodyShort>
        </VStack>
    </VStack>
);

export default HandlingerInfo;
