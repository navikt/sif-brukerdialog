import { Heading } from '@navikt/ds-react';
import { ConfirmationDialogType } from '../../../types/ConfirmationDialog';

type Props = Pick<ConfirmationDialogType, 'onCancel' | 'onConfirm'>;

export const getIngenFraværConfirmationDialog = (props: Props): ConfirmationDialogType => ({
    ...props,
    title: 'Ingen fravær registrert',
    okLabel: 'Ja, det stemmer',
    cancelLabel: 'Nei, det stemmer ikke',
    content: (
        <div style={{ maxWidth: '35rem' }}>
            <Heading level="1" size="medium">
                Fravær fra jobb
            </Heading>
            <p>
                Du har oppgitt at du jobber som normalt og ikke har fravær i dagene du søker for. For å ha rett til
                pleiepenger må du ha fravær fra jobb fordi du pleier noen. Stemmer det at du ikke har fravær fra jobb i
                dagene du søker for?
            </p>
        </div>
    ),
});
