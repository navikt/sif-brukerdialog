import { BodyShort, VStack } from '@navikt/ds-react';
import Dato from '../../../atoms/Dato';

interface Props {
    deltakernavn: string;
    opprinneligStartdato: Date;
    nyStartdato: Date;
}

const BekreftEndretStartdatoInfo = ({ deltakernavn, opprinneligStartdato, nyStartdato }: Props) => (
    <VStack gap="2">
        <BodyShort weight="semibold">Bekreft endring av deltakerperiode</BodyShort>
        <BodyShort>
            Dato {deltakernavn} går inn i programmet skal endres fra <Dato dato={opprinneligStartdato} /> til {` `}
            <Dato dato={nyStartdato} />
        </BodyShort>
    </VStack>
);

export default BekreftEndretStartdatoInfo;
