import { FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, Dialog, HStack } from '@navikt/ds-react';

import { RammeverkText } from '../../i18n';

interface StepFooterProps {
    onDelete?: () => void;
    onResumeLater?: () => void;
}

export const StepFooter = ({ onDelete, onResumeLater }: StepFooterProps) => {
    if (!onDelete && !onResumeLater) {
        return null;
    }
    return (
        <Box
            paddingBlock="space-24 space-0"
            borderColor="neutral-subtle"
            borderWidth="1 0 0 0"
            style={{ borderStyle: 'dashed' }}>
            <HStack gap="space-16">
                <ResumeLagerDialogAndTrigger onResumeLater={onResumeLater} />
                <DeleteDialogAndTrigger onDelete={onDelete} />
            </HStack>
        </Box>
    );
};

const ResumeLagerDialogAndTrigger = ({ onResumeLater }: Pick<StepFooterProps, 'onResumeLater'>) =>
    onResumeLater ? (
        <Dialog>
            <Dialog.Trigger>
                <Button type="button" variant="tertiary" icon={<FloppydiskIcon aria-hidden={true} />}>
                    <RammeverkText id="stepFooter.fortsettSenere.trigger.label" />
                </Button>
            </Dialog.Trigger>
            <Dialog.Popup width="small">
                <Dialog.Header>
                    <Dialog.Title>
                        <RammeverkText id="stepFooter.fortsettSenere.dialog.title" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong spacing>
                        <RammeverkText id="stepFooter.fortsettSenere.dialog.text.1" />
                    </BodyLong>
                    <BodyLong>
                        <RammeverkText id="stepFooter.fortsettSenere.dialog.text.2" />
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button variant="secondary">
                            <RammeverkText id="stepFooter.fortsettSenere.dialog.avbryt.label" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button onClick={onResumeLater}>
                        <RammeverkText id="stepFooter.fortsettSenere.dialog.confirm.label" />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    ) : null;

const DeleteDialogAndTrigger = ({ onDelete }: Pick<StepFooterProps, 'onDelete'>) =>
    onDelete ? (
        <Dialog>
            <Dialog.Trigger>
                <Button type="button" variant="tertiary" icon={<TrashIcon aria-hidden={true} />}>
                    <RammeverkText id="stepFooter.slettSøknad.trigger.label" />
                </Button>
            </Dialog.Trigger>
            <Dialog.Popup width="small">
                <Dialog.Header>
                    <Dialog.Title>
                        <RammeverkText id="stepFooter.slettSøknad.dialog.title" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong spacing>
                        <RammeverkText id="stepFooter.slettSøknad.dialog.text.1" />
                    </BodyLong>
                    <BodyLong>
                        <RammeverkText id="stepFooter.slettSøknad.dialog.text.2" />
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button variant="secondary">
                            <RammeverkText id="stepFooter.slettSøknad.dialog.avbryt.label" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button onClick={onDelete}>
                        <RammeverkText id="stepFooter.slettSøknad.dialog.confirm.label" />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    ) : null;
