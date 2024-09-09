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
            okLabel={text('@soknad.fortsettSøknadSenereDialog.avbrytSøknadLabel')}
            cancelLabel={text('@soknad.fortsettSøknadSenereDialog.fortsettSøknadLabel')}
            title={text('@soknad.fortsettSøknadSenereDialog.tittel')}
            onConfirm={onFortsettSøknadSenere}
            onCancel={onFortsettSøknad}>
            <p>{text('@soknad.fortsettSøknadSenereDialog.intro')}</p>
            <p>{text('@soknad.fortsettSøknadSenereDialog.spørsmål')}</p>
        </ConfirmationDialog>
    );
};
export default FortsettSøknadSenereDialog;
