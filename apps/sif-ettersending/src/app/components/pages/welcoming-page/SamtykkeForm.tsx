import { Button, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import ApplicationFormComponents from '../../../application/ApplicationFormComponents';
import { ApplicationFormField } from '../../../types/ApplicationFormData';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

interface Props {
    onConfirm: () => void;
    onOpenDinePlikterModal: () => void;
    openBehandlingAvPersonopplysningerModal: () => void;
}

const SamtykkeForm = ({ onConfirm, onOpenDinePlikterModal, openBehandlingAvPersonopplysningerModal }: Props) => {
    const intl = useIntl();
    return (
        <ApplicationFormComponents.Form
            onValidSubmit={onConfirm}
            includeButtons={false}
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
            <FormBlock>
                <FormBlock>
                    <ApplicationFormComponents.ConfirmationCheckbox
                        label={intlHelper(intl, 'welcomingPage.samtykke.tekst')}
                        name={ApplicationFormField.harForst√•ttRettigheterOgPlikter}
                        validate={getCheckedValidator()}>
                        <FormattedMessage
                            id="welcomingPage.samtykke.harForst√•ttLabel"
                            values={{
                                plikterLink: (
                                    <Link href="#" onClick={onOpenDinePlikterModal}>
                                        {intlHelper(intl, 'welcomingPage.samtykke.harForst√•ttLabel.lenketekst')}
                                    </Link>
                                ),
                            }}
                        />
                    </ApplicationFormComponents.ConfirmationCheckbox>
                </FormBlock>
                <FormBlock>
                    <div className="text-center">
                        <Button>{intlHelper(intl, 'step.button.g√•Videre')}</Button>
                    </div>
                </FormBlock>
                <FormBlock>
                    <div className="text-center">
                        <Link href="#" onClick={openBehandlingAvPersonopplysningerModal}>
                            <FormattedMessage id="welcomingPage.personopplysninger.lenketekst" />
                        </Link>
                    </div>
                </FormBlock>
            </FormBlock>
        </ApplicationFormComponents.Form>
    );
};
export default SamtykkeForm;
