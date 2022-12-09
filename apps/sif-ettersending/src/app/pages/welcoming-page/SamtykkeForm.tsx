import { Button, Link } from '@navikt/ds-react';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SoknadFormField } from '../../../types/SoknadFormData';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SoknadFormComponents from '../../../soknad/SoknadFormComponents';

interface Props {
    onStart: () => void;
    onOpenDinePlikterModal: () => void;
    openBehandlingAvPersonopplysningerModal: () => void;
}

const SamtykkeForm = ({ onStart, onOpenDinePlikterModal, openBehandlingAvPersonopplysningerModal }: Props) => {
    const intl = useIntl();
    const [pending, setPending] = useState(false);
    return (
        <SoknadFormComponents.Form
            onValidSubmit={() => {
                setPending(true);
                onStart();
            }}
            includeButtons={false}
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
            <FormBlock>
                <FormBlock>
                    <SoknadFormComponents.ConfirmationCheckbox
                        label={
                            <span data-testid="bekreft-label">{intlHelper(intl, 'welcomingPage.samtykke.tekst')}</span>
                        }
                        name={SoknadFormField.harForståttRettigheterOgPlikter}
                        validate={getCheckedValidator()}>
                        <FormattedMessage
                            id="welcomingPage.samtykke.harForståttLabel"
                            values={{
                                plikterLink: (
                                    <Link href="#" onClick={onOpenDinePlikterModal}>
                                        {intlHelper(intl, 'welcomingPage.samtykke.harForståttLabel.lenketekst')}
                                    </Link>
                                ),
                            }}
                        />
                    </SoknadFormComponents.ConfirmationCheckbox>
                </FormBlock>
                <FormBlock>
                    <div className="text-center">
                        <Button loading={pending} type="submit" data-testid="samtykke-button">
                            {intlHelper(intl, 'step.button.startSøknad')}
                        </Button>
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
        </SoknadFormComponents.Form>
    );
};
export default SamtykkeForm;
