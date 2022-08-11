import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import InfoDialog from '@navikt/sif-common-core-ds/lib/components/dialogs/info-dialog/InfoDialog';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import SoknadFormComponents from '../../soknad/SoknadFormComponents';
import { SoknadFormField } from '../../types/SoknadFormData';
import DinePlikterContent from './dine-plikter/DinePlikter';
import BehandlingAvPersonopplysningerContent from './personopplysninger/Personopplysninger';

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

interface Props {
    onStart: () => void;
}

const VelkommenPageForm: React.FunctionComponent<Props> = ({ onStart }) => {
    const [dialogState, setDialogState] = useState<DialogState>({});
    const { dinePlikterModalOpen, behandlingAvPersonopplysningerModalOpen } = dialogState;
    const intl = useIntl();

    return (
        <SoknadFormComponents.Form onValidSubmit={onStart} includeButtons={false}>
            <FormBlock>
                <SoknadFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'samtykke.tekst')}
                    name={SoknadFormField.harForståttRettigheterOgPlikter}
                    validate={(value) => {
                        return value !== true
                            ? intlHelper(intl, 'validation.harForståttRettigheterOgPlikter.noValue')
                            : undefined;
                    }}>
                    <FormattedMessage
                        id="samtykke.harForståttLabel"
                        values={{
                            plikterLink: (
                                <Lenke href="#" onClick={(): void => setDialogState({ dinePlikterModalOpen: true })}>
                                    {intlHelper(intl, 'samtykke.harForståttLabel.lenketekst')}
                                </Lenke>
                            ),
                        }}
                    />
                </SoknadFormComponents.ConfirmationCheckbox>
                <Block textAlignCenter={true} margin="xl">
                    <Hovedknapp>{intlHelper(intl, 'step.velkommen.button.start')}</Hovedknapp>
                    <FormBlock>
                        <Lenke
                            href="#"
                            onClick={(): void => setDialogState({ behandlingAvPersonopplysningerModalOpen: true })}>
                            <FormattedMessage id="step.velkommen.personopplysninger.lenketekst" />
                        </Lenke>
                    </FormBlock>
                </Block>
            </FormBlock>

            <InfoDialog
                aria-label={intlHelper(intl, 'modal.dinePlikter.dialog.tittel')}
                open={dinePlikterModalOpen === true}
                onClose={(): void => setDialogState({ dinePlikterModalOpen: false })}>
                <DinePlikterContent />
            </InfoDialog>

            <InfoDialog
                aria-label={intlHelper(intl, 'modal.personopplysninger.dialogtittel')}
                open={behandlingAvPersonopplysningerModalOpen === true}
                onClose={(): void => setDialogState({ behandlingAvPersonopplysningerModalOpen: false })}>
                <BehandlingAvPersonopplysningerContent />
            </InfoDialog>
        </SoknadFormComponents.Form>
    );
};

export default VelkommenPageForm;
