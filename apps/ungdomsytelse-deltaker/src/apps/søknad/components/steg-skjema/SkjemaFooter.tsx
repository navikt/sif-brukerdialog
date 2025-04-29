import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Box, Button, HGrid } from '@navikt/ds-react';

interface Props {
    pending?: boolean;
    disabled?: boolean;
    forrige?: {
        tittel: string;
        onClick: () => void;
    };
    neste?: {
        tittel: string;
        erSendInn: boolean;
        onClick: () => void;
    };
}

const SkjemaFooter = ({ forrige, neste, pending }: Props) => (
    <Box marginBlock="8 0">
        <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
            {forrige && (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={forrige.onClick}
                    disabled={pending}
                    icon={<ArrowLeftIcon aria-hidden />}
                    iconPosition="left">
                    {forrige.tittel}
                </Button>
            )}
            {neste && (
                <Button
                    variant="primary"
                    onClick={neste.onClick}
                    loading={pending}
                    disabled={pending}
                    icon={neste.erSendInn ? <PaperplaneIcon aria-hidden /> : <ArrowRightIcon aria-hidden />}
                    iconPosition="right">
                    {neste.tittel}
                </Button>
            )}
        </HGrid>
    </Box>
);

export default SkjemaFooter;
