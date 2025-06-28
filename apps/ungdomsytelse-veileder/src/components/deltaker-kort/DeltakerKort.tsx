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
        <Box.New
            className="rounded-md p-4 items-center w-full"
            background="info-soft"
            borderColor="info-subtle"
            borderWidth="2">
            <HGrid columns={{ xs: 'auto 2rem', sm: '4.5rem auto 2rem' }} align="start" gap="4">
                <Show above="sm">
                    <PersonNøytral width="4.5rem" height="4.5rem" />
                </Show>
                <VStack gap="2" flexGrow="2">
                    <VStack gap="1">
                        {diskresjonskoder.length > 0 && (
                            <Box marginBlock="0 2">
                                <DiskresjonskoderTags koder={diskresjonskoder} />
                            </Box>
                        )}
                        <BodyShort size="medium" weight="semibold">
                            {etternavn}, {mellomnavn} {fornavn}
                        </BodyShort>
                        <HStack gap="2">
                            Ident: <Fødselsnummer fnr={deltakerIdent} />
                        </HStack>
                        <HStack gap="2">
                            Født: {dateFormatter.compact(fødselsdato)} ({alder} år){' '}
                        </HStack>
                    </VStack>
                    {!registrert ? (
                        <Box marginBlock="2 0">
                            <Tag variant="info" size="small">
                                Ikke registrert som deltaker
                            </Tag>
                        </Box>
                    ) : null}
                </VStack>
                {onClose ? (
                    <Bleed marginBlock="2 0" marginInline="0 2">
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
        </Box.New>
    );
};
export const DeltakerKortSkeleton = () => (
    <Skeleton height="4.2rem" enableAnimation={true} borderRadius={6} highlightColor="#CBCFD5" baseColor="#ffffff" />
);

export default DeltakerKort;
