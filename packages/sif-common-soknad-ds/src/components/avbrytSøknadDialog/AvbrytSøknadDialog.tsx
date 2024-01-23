import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

export interface Props {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}

const AvbrytSøknadDialog = (props: Props) => {
    const { text } = useSoknadIntl();
    const { synlig, onFortsettSøknad, onAvbrytSøknad } = props;
    return (
        <ConfirmationDialog
            open={synlig}
            okLabel={text('scs.avbrytSøknadDialog.avbrytSøknadLabel')}
            cancelLabel={text('scs.avbrytSøknadDialog.fortsettSøknadLabel')}
            onConfirm={onAvbrytSøknad}
            onCancel={onFortsettSøknad}
            title={text('scs.avbrytSøknadDialog.tittel')}>
            <p>{text('scs.avbrytSøknadDialog.intro')}</p>
            <p>{text('scs.avbrytSøknadDialog.spørsmål')}</p>
        </ConfirmationDialog>
    );
};
export default AvbrytSøknadDialog;
