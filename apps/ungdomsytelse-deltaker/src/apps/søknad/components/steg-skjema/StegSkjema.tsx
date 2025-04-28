import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Box, Button, HGrid } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
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

const StegSkjema = ({ forrige, neste, children }: Props) => {
    return (
        <form>
            {children}
            <Box marginBlock="8 0">
                <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
                    {forrige && (
                        <Button variant="secondary" icon={<ArrowLeftIcon aria-hidden />} iconPosition="left">
                            {forrige.tittel}
                        </Button>
                    )}
                    {neste && (
                        <Button
                            variant="primary"
                            type="submit"
                            icon={neste.erSendInn ? <PaperplaneIcon aria-hidden /> : <ArrowRightIcon aria-hidden />}
                            iconPosition="right">
                            {neste.tittel}
                        </Button>
                    )}
                </HGrid>
            </Box>
        </form>
    );
};

export default StegSkjema;
