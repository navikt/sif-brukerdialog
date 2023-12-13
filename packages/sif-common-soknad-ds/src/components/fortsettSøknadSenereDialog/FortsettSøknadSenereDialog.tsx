import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

export interface Props {
    synlig: boolean;
    onFortsettSøknadSenere: () => void;
    onFortsettSøknad: () => void;
}

const FortsettSøknadSenereDialog = (props: Props) => {
    const intl = useIntl();
    const { synlig, onFortsettSøknad, onFortsettSøknadSenere } = props;
    return (
        <ConfirmationDialog
            open={synlig}
            okLabel={intlHelper(intl, 'fortsettSøknadSenereDialog.avbrytSøknadLabel')}
            cancelLabel={intlHelper(intl, 'fortsettSøknadSenereDialog.fortsettSøknadLabel')}
            title={intlHelper(intl, 'fortsettSøknadSenereDialog.tittel')}
            onConfirm={onFortsettSøknadSenere}
            onCancel={onFortsettSøknad}>
            <p>
                <FormattedMessage id="fortsettSøknadSenereDialog.intro" />
            </p>
            <p>
                <FormattedMessage id="fortsettSøknadSenereDialog.spørsmål" />
            </p>
        </ConfirmationDialog>
    );
};
export default FortsettSøknadSenereDialog;
