import { BodyShort, Heading, HGrid, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '@navikt/ung-common';

interface Props {
    deltakelse: Deltakelse;
}
const DeltakelsePeriodeInfo = ({ deltakelse }: Props) => {
    return (
        <VStack gap="2">
            <Heading level="2" size="medium">
                Deltakerperiode
            </Heading>
            <HGrid gap="4" columns={'1fr 1fr 1fr'}>
                <VStack className="bg-gray-50 p-5 rounded-md" gap="2">
                    <Heading level="3" size="xsmall">
                        <BodyShort as="span">Startdato</BodyShort>
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="text-2xl">
                        {dateFormatter.compact(deltakelse.fraOgMed)}
                    </BodyShort>
                </VStack>
                <VStack className="bg-gray-50 p-5 rounded-md" gap="2">
                    <Heading level="3" size="xsmall">
                        <BodyShort as="span">Sluttdato</BodyShort>
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="text-2xl">
                        {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : '-'}
                    </BodyShort>
                </VStack>
                <VStack className="bg-gray-50 p-5 rounded-md" gap="2">
                    <Heading level="3" size="xsmall">
                        <BodyShort as="span">Antall dager brukt</BodyShort>
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="text-2xl">
                        0 (TODO)
                    </BodyShort>
                </VStack>
            </HGrid>
        </VStack>
    );
};

export default DeltakelsePeriodeInfo;
