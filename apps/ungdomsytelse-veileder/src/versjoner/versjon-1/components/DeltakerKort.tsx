import { BodyShort, Box, HStack, Tag, VStack } from '@navikt/ds-react';
import { Deltaker, NyDeltaker } from '../../../api/types';
import PersonNøytral from '../illustrations/PersonNøytral';
import Fødselsnummer from './Fødselsnummer';
import Skeleton from 'react-loading-skeleton';

interface Props {
    deltaker: Deltaker | NyDeltaker;
}

const DeltakerKort = ({
    deltaker: {
        navn: { etternavn, fornavn, mellomnavn },
        deltakerIdent,
        id,
    },
}: Props) => (
    <HStack align={'center'} gap="4">
        <PersonNøytral width="4.5rem" height={'4.5rem'} />
        <VStack gap="2">
            <VStack>
                <BodyShort size="medium" weight="semibold">
                    {etternavn}, {mellomnavn} {fornavn} 
                </BodyShort>
                <HStack gap="2">
                    Ident: <Fødselsnummer fnr={deltakerIdent} />
                </HStack>
            </VStack>
            {!id ? (
                <Box>
                    <Tag variant="warning" size="small">
                        Ikke registrert som deltaker
                    </Tag>
                </Box>
            ) : null}
        </VStack>
    </HStack>
);

export const DeltakerKortSkeleton = () => (
    <Skeleton height="4.2rem" enableAnimation={true} borderRadius={6} highlightColor="#CBCFD5" baseColor="#ffffff" />
);

export default DeltakerKort;
