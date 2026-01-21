import { Bleed, BodyShort, Box, Button, HGrid, HStack, Show, Tag, VStack } from '@navikt/ds-react';
import Skeleton from 'react-loading-skeleton';
import { XMarkIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Fødselsnummer from '../../atoms/Fødselsnummer';
import PersonNøytral from '../../atoms/PersonNøytral';
import { Deltaker, UregistrertDeltaker } from '../../types/Deltaker';
import DiskresjonskoderTags from '../diskresjonskode-tag/DiskresjonskoderTags';

interface Props {
    deltaker: Deltaker | UregistrertDeltaker;
    onClose?: () => void;
}

const DeltakerKort = ({
    deltaker: {
        registrert,
        navn: { etternavn, fornavn, mellomnavn },
        deltakerIdent,
        fødselsdato,
        diskresjonskoder,
    },
    onClose,
}: Props) => {
    const alder = dayjs().diff(dayjs(fødselsdato), 'year');

    return (
        <Box
            className="rounded-md p-4 items-center w-full"
            background="info-soft"
            borderColor="info-subtle"
            borderWidth="2">
            <HGrid columns={{ xs: 'auto 2rem', sm: '4.5rem auto 2rem' }} align="start" gap="space-16">
                <Show above="sm">
                    <PersonNøytral width="4.5rem" height="4.5rem" />
                </Show>
                <VStack gap="space-8" flexGrow="2">
                    <VStack gap="space-4">
                        {diskresjonskoder.length > 0 && (
                            <Box marginBlock="space-0 space-8">
                                <DiskresjonskoderTags koder={diskresjonskoder} />
                            </Box>
                        )}
                        <BodyShort size="medium" weight="semibold">
                            {etternavn}, {mellomnavn} {fornavn}
                        </BodyShort>
                        <HStack gap="space-8">
                            Ident: <Fødselsnummer fnr={deltakerIdent} />
                        </HStack>
                        <HStack gap="space-8">
                            Født: {dateFormatter.compact(fødselsdato)} ({alder} år){' '}
                        </HStack>
                    </VStack>
                    {!registrert ? (
                        <Box marginBlock="space-8 space-0">
                            <Tag variant="info" size="small">
                                Ikke registrert som deltaker
                            </Tag>
                        </Box>
                    ) : null}
                </VStack>
                {onClose ? (
                    <Bleed marginBlock="space-8 space-0" marginInline="space-0 space-8">
                        <Button
                            variant="tertiary-neutral"
                            size="small"
                            icon={<XMarkIcon width="1.5rem" height="1.5rem" aria-hidden={true} />}
                            aria-label={`Lukk ${fornavn}`}
                            onClick={onClose}
                        />
                    </Bleed>
                ) : null}
            </HGrid>
        </Box>
    );
};
export const DeltakerKortSkeleton = () => (
    <Skeleton height="4.2rem" enableAnimation={true} borderRadius={6} highlightColor="#CBCFD5" baseColor="#ffffff" />
);

export default DeltakerKort;
