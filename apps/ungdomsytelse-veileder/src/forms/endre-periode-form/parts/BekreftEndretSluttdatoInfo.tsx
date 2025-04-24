import { BodyShort, VStack } from '@navikt/ds-react';
import Dato from '../../../atoms/Dato';

interface Props {
    deltakernavn: string;
    opprinneligSluttdato?: Date;
    nySluttdato: Date;
}

const BekreftEndretSluttdatoInfo = ({ deltakernavn, opprinneligSluttdato, nySluttdato }: Props) => (
    <VStack gap="2">
        <BodyShort weight="semibold">Bekreft endring av deltakerperiode</BodyShort>
        {opprinneligSluttdato ? (
            <BodyShort>
                Dato {deltakernavn} går ut av programmet skal endres fra <Dato dato={opprinneligSluttdato} /> til {` `}
                <Dato dato={nySluttdato} />
            </BodyShort>
        ) : (
            <BodyShort>
                {deltakernavn} skal gå ut av programmet <Dato dato={nySluttdato} />
            </BodyShort>
        )}
    </VStack>
);

export default BekreftEndretSluttdatoInfo;
