import { Bleed, BodyShort, Box, Button, HStack, Tag, VStack } from '@navikt/ds-react';
import Skeleton from 'react-loading-skeleton';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Deltaker, UregistrertDeltaker } from '@navikt/ung-common';
import PersonNøytral from '../../illustrations/PersonNøytral';
import Fødselsnummer from '../../atoms/Fødselsnummer';

interface Props {
    deltaker: Deltaker | UregistrertDeltaker;
    onClose?: () => void;
}

const DeltakerKort = ({
    deltaker: {
        registrert,
        navn: { etternavn, fornavn, mellomnavn },
        deltakerIdent,
    },
    onClose,
}: Props) => (
    <HStack align={'start'} gap="4">
        <PersonNøytral width="4.5rem" height={'4.5rem'} />
        <VStack gap="2" flexGrow={'2'}>
            <VStack>
                <BodyShort size="medium" weight="semibold">
                    {etternavn}, {mellomnavn} {fornavn}
                </BodyShort>
                <HStack gap="2">
                    Ident: <Fødselsnummer fnr={deltakerIdent} />
                </HStack>
            </VStack>
            {!registrert ? (
                <Box>
                    <Tag variant="warning" size="small">
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
                    icon={<XMarkIcon width="1.5rem" height="1.5rem" />}
                    aria-label={`Lukk ${fornavn}`}
                    onClick={onClose}
                />
            </Bleed>
        ) : null}
    </HStack>
);

export const DeltakerKortSkeleton = () => (
    <Skeleton height="4.2rem" enableAnimation={true} borderRadius={6} highlightColor="#CBCFD5" baseColor="#ffffff" />
);

export default DeltakerKort;
