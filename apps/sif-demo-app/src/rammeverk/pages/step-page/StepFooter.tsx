import { FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';

interface StepFooter {
    onAbort?: () => void;
    onResumeLater?: () => void;
}

export const StepFooter = ({ onAbort, onResumeLater }: StepFooter) => {
    if (!onAbort && !onResumeLater) {
        return null;
    }
    return (
        <Box
            paddingBlock="space-24 space-0"
            borderColor="neutral-subtle"
            borderWidth="1 0 0 0"
            style={{ borderStyle: 'dashed' }}>
            <HStack gap="space-16">
                {onResumeLater && (
                    <Button
                        type="button"
                        variant="tertiary"
                        icon={<FloppydiskIcon aria-hidden={true} />}
                        onClick={onResumeLater}>
                        Lagre og fortsett senere
                    </Button>
                )}
                {onAbort && (
                    <Button type="button" variant="tertiary" onClick={onAbort} icon={<TrashIcon aria-hidden={true} />}>
                        Avbryt
                    </Button>
                )}
            </HStack>
        </Box>
    );
};
