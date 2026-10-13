import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { Virksomhet } from './types';
import { VirksomhetDialogForm } from './VirksomhetDialogForm';

interface Props {
    virksomhet?: Virksomhet;
    harFlereVirksomheter?: boolean;
    skipOrgNumValidation?: boolean;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (virksomhet: Virksomhet) => void;
}

export const VirksomhetFormDialog = ({
    isOpen,
    virksomhet,
    harFlereVirksomheter,
    skipOrgNumValidation,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'virksomhetForm';

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}
            size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.virksomhet.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VirksomhetDialogForm
                        formId={formId}
                        virksomhet={virksomhet}
                        harFlereVirksomheter={harFlereVirksomheter}
                        skipOrgNumValidation={skipOrgNumValidation}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.virksomhet.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {virksomhet ? (
                            <SifSoknadFormsText id="@sifSoknadForms.virksomhet.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.virksomhet.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
