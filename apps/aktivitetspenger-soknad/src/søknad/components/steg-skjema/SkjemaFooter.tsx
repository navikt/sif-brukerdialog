import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Button, HGrid } from '@navikt/ds-react';

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
        disabled?: boolean;
    };
}

const SkjemaFooter = ({ forrige, submit, pending }: Props) => (
    <div>
        <HGrid gap={{ xs: "space-16", sm: "space-32 space-16" }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
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
                    disabled={submit.disabled || pending}
                    icon={submit.erSendInn ? <PaperplaneIcon aria-hidden /> : <ArrowRightIcon aria-hidden />}
                    iconPosition="right">
                    {submit.tittel}
                </Button>
            )}
        </HGrid>
    </div>
);

export default SkjemaFooter;
