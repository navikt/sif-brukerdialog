import { HGrid, Skeleton, VStack } from '@navikt/ds-react';

const DeltakerPageContentSkeleton = () => {
    return (
        <VStack gap="10" paddingBlock="8 0">
            <VStack gap="4">
                <Skeleton width="8rem" height="2rem" variant="rectangle" />
                <Skeleton width="100%" height="10rem" variant="rectangle" />
            </VStack>

            <VStack gap="4">
                <Skeleton width="11rem" height="2rem" variant="rectangle" />
                <HGrid columns="1fr 1fr" gap="8">
                    <Skeleton height="10.5rem" variant="rectangle" />
                    <Skeleton height="10.5rem" variant="rectangle" />
                </HGrid>
            </VStack>
        </VStack>
    );
};

export default DeltakerPageContentSkeleton;
