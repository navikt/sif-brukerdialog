import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';

export interface Props {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}

const AvbrytSøknadDialog = (props: Props) => {
    const intl = useIntl();
    const { synlig, onFortsettSøknad, onAvbrytSøknad } = props;
    return (
        <ConfirmationDialog
            open={synlig}
            okLabel={intlHelper(intl, 'avbrytSøknadDialog.avbrytSøknadLabel')}
            cancelLabel={intlHelper(intl, 'avbrytSøknadDialog.fortsettSøknadLabel')}
            onConfirm={onAvbrytSøknad}
            onCancel={onFortsettSøknad}
            title={intlHelper(intl, 'avbrytSøknadDialog.tittel')}>
            <p>
                <FormattedMessage id="avbrytSøknadDialog.intro" />
            </p>
            <p>
                <FormattedMessage id="avbrytSøknadDialog.spørsmål" />
            </p>
        </ConfirmationDialog>
    );
};
export default AvbrytSøknadDialog;
