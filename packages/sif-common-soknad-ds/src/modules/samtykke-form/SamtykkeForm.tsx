import { Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';

const RettOgPliktURL = 'https://nav.no/rettOgPlikt';

export enum SamtykkeFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface SamtykkeFormValues {
    [SamtykkeFormFields.harForståttRettigheterOgPlikter]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    SamtykkeFormFields,
    SamtykkeFormValues,
    ValidationError
>();

interface Props {
    submitButtonLabel?: string;
    onValidSubmit: () => void;
}

export const SamtykkeFormPart = () => {
    const intl = useIntl();
    return (
        <ConfirmationCheckbox
            label={<span data-testid="bekreft-label">{intlHelper(intl, 'samtykkeForm.bekreftLabel')}</span>}
            name={SamtykkeFormFields.harForståttRettigheterOgPlikter}
            validate={getCheckedValidator()}>
            <Heading level="2" size="small">
                <FormattedMessage id="samtykkeForm.ansvar.tittel" />
            </Heading>
            <InfoList>
                <li>
                    <FormattedMessage id="samtykkeForm.ansvar.list.1" />
                </li>
                <li>
                    <FormattedMessage id="samtykkeForm.ansvar.list.2.1" />{' '}
                    <Link href={RettOgPliktURL} target="_blank">
                        <FormattedMessage id="samtykkeForm.ansvar.list.2.2" />
                    </Link>
                </li>
            </InfoList>
        </ConfirmationCheckbox>
    );
};

const SamtykkeForm: React.FunctionComponent<Props> = ({ onValidSubmit, submitButtonLabel }) => {
    const intl = useIntl();
    return (
        <FormikWrapper
            initialValues={{ harForståttRettigheterOgPlikter: false }}
            onSubmit={onValidSubmit}
            renderForm={() => (
                <Form
                    includeButtons={true}
                    submitButtonLabel={submitButtonLabel || intlHelper(intl, 'samtykkeform.submitButtonLabel')}
                    formErrorHandler={getIntlFormErrorHandler(intl, 'samtykkeForm')}>
                    <FormBlock>
                        <SamtykkeFormPart />
                    </FormBlock>
                </Form>
            )}
        />
    );
};

export default SamtykkeForm;
