import { HGrid, Skeleton, VStack } from '@navikt/ds-react';

const DeltakerPageContentSkeleton = () => {
    return (
        <VStack gap="space-40" paddingBlock="space-32 space-0">
            <VStack gap="space-16">
                <Skeleton width="8rem" height="2rem" variant="rectangle" />
                <Skeleton width="100%" height="10rem" variant="rectangle" />
            </VStack>
            <VStack gap="space-16">
                <Skeleton width="11rem" height="2rem" variant="rectangle" />
                <HGrid columns="1fr 1fr" gap="space-32">
                    <Skeleton height="10.5rem" variant="rectangle" />
                    <Skeleton height="10.5rem" variant="rectangle" />
                </HGrid>
            </VStack>
        </VStack>
    );
};

export default DeltakerPageContentSkeleton;
