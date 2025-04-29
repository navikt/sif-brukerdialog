import { FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, HGrid } from '@navikt/ds-react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';
import { useState } from 'react';

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

const StegFooter = ({ fortsettSenere, slett }: Props) => {
    const [visFortsettSenereDialog, setVisFortsettSenereDialog] = useState(false);
    const [visSlettDialog, setVisSlettDialog] = useState(false);
    return (
        <>
            <Box marginBlock="8 0">
                <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
                    {fortsettSenere && (
                        <Box asChild marginBlock={{ xs: '4 0', sm: '0' }}>
                            <Button
                                type="button"
                                onClick={() => setVisFortsettSenereDialog(true)}
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
                            onClick={() => setVisSlettDialog(true)}
                            variant="tertiary"
                            icon={<TrashIcon aria-hidden />}
                            iconPosition="left">
                            {slett.tittel}
                        </Button>
                    )}
                </HGrid>
            </Box>
            {fortsettSenere && visFortsettSenereDialog && (
                <ConfirmationDialog
                    open={true}
                    title="Fortsett senere"
                    onConfirm={fortsettSenere.onClick}
                    cancelLabel="Nei"
                    okLabel="Ja, fortsett senere"
                    onCancel={() => setVisFortsettSenereDialog(false)}>
                    <BodyLong spacing>
                        Vi lagrer utkastet ditt for deg i 72 timer. Du finner den igjen på Min side.
                    </BodyLong>
                    <BodyLong>Vil du avslutte nå og fortsette senere?</BodyLong>
                </ConfirmationDialog>
            )}
            {slett && visSlettDialog && (
                <ConfirmationDialog
                    open={true}
                    title="Slett søknaden"
                    okLabel="Ja, slett"
                    cancelLabel="Nei"
                    onConfirm={slett.onClick}
                    onCancel={() => setVisSlettDialog(false)}>
                    <BodyLong spacing>
                        Informasjonen du har fylt ut blir slettet, og du kommer tilbake til velkomstsiden.
                    </BodyLong>
                    <BodyLong>Ønsker du å slette søknaden?</BodyLong>
                </ConfirmationDialog>
            )}
        </>
    );
};

export default StegFooter;
