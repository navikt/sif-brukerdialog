import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Box, Button, HGrid } from '@navikt/ds-react';

interface Props {
    pending?: boolean;
    disabled?: boolean;
    forrige?: {
        tittel: string;
        onClick: () => void;
    };
    submit?: {
        tittel: string;
        erSendInn: boolean;
    };
}

const SkjemaFooter = ({ forrige, submit, pending }: Props) => (
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
            {submit && (
                <Button
                    type="submit"
                    variant="primary"
                    loading={pending}
                    disabled={pending}
                    icon={submit.erSendInn ? <PaperplaneIcon aria-hidden /> : <ArrowRightIcon aria-hidden />}
                    iconPosition="right">
                    {submit.tittel}
                </Button>
            )}
        </HGrid>
    </Box>
);

export default SkjemaFooter;
