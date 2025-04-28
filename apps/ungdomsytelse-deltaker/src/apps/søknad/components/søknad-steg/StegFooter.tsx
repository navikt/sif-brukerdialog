import { FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HGrid } from '@navikt/ds-react';

interface Props {
    fortsettSenere?: {
        tittel: string;
        onClick: () => void;
    };
    slett?: {
        tittel: string;
        onClick: () => void;
    };
}

const StegFooter = ({ fortsettSenere, slett }: Props) => (
    <Box marginBlock="8 0">
        <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
            {fortsettSenere && (
                <Box asChild marginBlock={{ xs: '4 0', sm: '0' }}>
                    <Button
                        type="button"
                        onClick={fortsettSenere.onClick}
                        variant="tertiary"
                        icon={<FloppydiskIcon aria-hidden />}
                        iconPosition="left">
                        {fortsettSenere.tittel}
                    </Button>
                </Box>
            )}
            {slett && (
                <Button
                    type="button"
                    onClick={slett.onClick}
                    variant="tertiary"
                    icon={<TrashIcon aria-hidden />}
                    iconPosition="left">
                    {slett.tittel}
                </Button>
            )}
        </HGrid>
    </Box>
);

export default StegFooter;
