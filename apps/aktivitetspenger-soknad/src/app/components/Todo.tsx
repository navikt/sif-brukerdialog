import { Box, InfoCard, VStack } from '@navikt/ds-react';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';

interface Props {
    spacing?: boolean;
    children: React.ReactNode;
}

export const Todo = ({ children, spacing = true }: Props) => (
    <Box marginBlock={spacing ? 'space-0 space-24' : 'space-0'}>
        <VStack gap="space-16">
            <InfoCard data-color="info" size="small">
                <InfoCard.Message icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                    TODO: {children}
                </InfoCard.Message>
            </InfoCard>
        </VStack>
    </Box>
);
