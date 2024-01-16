import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

export interface Props {
    synlig: boolean;
    onFortsettSøknadSenere: () => void;
    onFortsettSøknad: () => void;
}

const FortsettSøknadSenereDialog = (props: Props) => {
    const { text } = useSoknadIntl();
    const { synlig, onFortsettSøknad, onFortsettSøknadSenere } = props;
    return (
        <ConfirmationDialog
            open={synlig}
            okLabel={text('fortsettSøknadSenereDialog.avbrytSøknadLabel')}
            cancelLabel={text('fortsettSøknadSenereDialog.fortsettSøknadLabel')}
            title={text('fortsettSøknadSenereDialog.tittel')}
            onConfirm={onFortsettSøknadSenere}
            onCancel={onFortsettSøknad}>
            <p>{text('fortsettSøknadSenereDialog.intro')}</p>
            <p>{text('fortsettSøknadSenereDialog.spørsmål')}</p>
        </ConfirmationDialog>
    );
};
export default FortsettSøknadSenereDialog;
