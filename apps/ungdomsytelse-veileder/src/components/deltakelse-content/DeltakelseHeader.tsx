import { BodyShort, Heading, HGrid, HStack, Tag } from '@navikt/ds-react';
import { Deltakelse } from '../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

interface Props {
    deltakelse: Deltakelse;
}

const getDeltakelseStatus = (deltakelse: Deltakelse) => {
    if (deltakelse.harSøkt === false) {
        return (
            <Tag variant="warning" size="small">
                Ikke søkt
            </Tag>
        );
    }

    if (dayjs().isBefore(deltakelse.fraOgMed)) {
        return (
            <Tag variant="alt1-filled" size="small">
                Ikke startet
            </Tag>
        );
    }
    if (deltakelse.tilOgMed && dayjs().isAfter(deltakelse.tilOgMed)) {
        return (
            <Tag variant="alt3-filled" size="small">
                Avsluttet
            </Tag>
        );
    }
    if (
        (dayjs().isSameOrAfter(deltakelse.fraOgMed) && !!deltakelse.fraOgMed) ||
        dayjs().isSameOrBefore(deltakelse.tilOgMed)
    ) {
        return (
            <Tag variant="success-filled" size="small">
                Aktiv
            </Tag>
        );
    }
};

const DeltakelseHeader = ({ deltakelse }: Props) => (
    <HGrid
        columns={'1fr auto'}
        gap="4"
        className="bg-gray-100 rounded-t p-4 pt-3 pb-3 border-b-2 border-gray-300"
        align="center">
        <HStack gap="8">
            <Heading level="2" size="medium">
                Deltakerperiode
            </Heading>
            {getDeltakelseStatus(deltakelse)}
        </HStack>
        <HStack gap="6">
            <HStack gap="2">
                Startdato: <BodyShort weight="semibold">{dateFormatter.compact(deltakelse.fraOgMed)}</BodyShort>
            </HStack>

            <HStack gap="2">
                Sluttdato:{' '}
                <BodyShort weight="semibold">
                    {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : <></>}
                </BodyShort>
            </HStack>
            <HStack gap="2">
                Dager brukt: <BodyShort weight="semibold">TODO</BodyShort>
            </HStack>
        </HStack>
    </HGrid>
);

export default DeltakelseHeader;
