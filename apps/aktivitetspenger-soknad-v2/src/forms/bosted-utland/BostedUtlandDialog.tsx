import { Button, Dialog } from '@navikt/ds-react';

import { BostedUtland } from '.';
import { BostedUtlandForm } from './BostedUtlandForm';

interface Props {
    bosted?: BostedUtland;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (bosted: BostedUtland) => void;
}

export const BostedUtlandFormDialog = ({ isOpen, bosted, onValidSubmit, onCancel }: Props) => {
    const formId = 'bostedUtlandForm';

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>Bosted i utlandet</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BostedUtlandForm formId={formId} bosted={bosted} onValidSubmit={onValidSubmit} />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            Avbryt
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId}>{bosted ? 'Oppdater' : 'Legg til'}</Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
