import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { BostedUtland } from '.';
import { BostedUtlandForm } from './BostedUtlandForm';

interface Props {
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (bosted: BostedUtland) => void;
}

export const BostedUtlandFormDialog = ({ isOpen, bosted, alleBosteder, onValidSubmit, onCancel }: Props) => {
    const formId = 'bostedUtlandForm';

    return (
        <Dialog open={isOpen} onOpenChange={onCancel} size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BostedUtlandForm
                        alleBosteder={alleBosteder}
                        formId={formId}
                        bosted={bosted}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId}>
                        {bosted ? (
                            <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
