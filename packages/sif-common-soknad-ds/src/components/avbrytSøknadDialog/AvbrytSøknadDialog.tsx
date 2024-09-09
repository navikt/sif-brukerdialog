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
            okLabel={text('@soknad.avbrytSøknadDialog.avbrytSøknadLabel')}
            cancelLabel={text('@soknad.avbrytSøknadDialog.fortsettSøknadLabel')}
            onConfirm={onAvbrytSøknad}
            onCancel={onFortsettSøknad}
            title={text('@soknad.avbrytSøknadDialog.tittel')}>
            <p>{text('@soknad.avbrytSøknadDialog.intro')}</p>
            <p>{text('@soknad.avbrytSøknadDialog.spørsmål')}</p>
        </ConfirmationDialog>
    );
};
export default AvbrytSøknadDialog;
