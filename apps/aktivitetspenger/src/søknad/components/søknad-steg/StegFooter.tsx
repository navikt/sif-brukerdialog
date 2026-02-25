import { TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, HGrid } from '@navikt/ds-react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';

import { useState } from 'react';
import { AppText, useAppIntl } from '../../../i18n';

interface Props {
    slett?: {
        tittel: string;
        onClick: () => void;
    };
}

const StegFooter = ({ slett }: Props) => {
    const { text } = useAppIntl();
    const [visSlettDialog, setVisSlettDialog] = useState(false);
    return (
        <>
            <div>
                <HGrid
                    gap={{ xs: 'space-16', sm: 'space-32 space-16' }}
                    columns={{ xs: 1, sm: 2 }}
                    width={{ sm: 'fit-content' }}>
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
            </div>
            {slett && visSlettDialog && (
                <ConfirmationDialog
                    open={true}
                    title={text('søknadApp.slettSøknad.tittel')}
                    okLabel={text('søknadApp.slettSøknad.ja.label')}
                    cancelLabel={text('søknadApp.slettSøknad.nei.label')}
                    onConfirm={slett.onClick}
                    onCancel={() => setVisSlettDialog(false)}>
                    <BodyLong spacing>
                        <AppText id="søknadApp.slettSøknad.tekst" />
                    </BodyLong>
                    <BodyLong>
                        <AppText id="søknadApp.slettSøknad.tekst" />
                    </BodyLong>
                </ConfirmationDialog>
            )}
        </>
    );
};

export default StegFooter;
