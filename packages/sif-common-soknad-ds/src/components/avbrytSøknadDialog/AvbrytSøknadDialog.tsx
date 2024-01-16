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
            okLabel={text('avbrytSøknadDialog.avbrytSøknadLabel')}
            cancelLabel={text('avbrytSøknadDialog.fortsettSøknadLabel')}
            onConfirm={onAvbrytSøknad}
            onCancel={onFortsettSøknad}
            title={text('avbrytSøknadDialog.tittel')}>
            <p>{text('avbrytSøknadDialog.intro')}</p>
            <p>{text('avbrytSøknadDialog.spørsmål')}</p>
        </ConfirmationDialog>
    );
};
export default AvbrytSøknadDialog;
