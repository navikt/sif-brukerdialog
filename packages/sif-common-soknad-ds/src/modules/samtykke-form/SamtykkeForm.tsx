import { Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

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
    const { text } = useSoknadIntl();
    return (
        <ConfirmationCheckbox
            label={<span data-testid="bekreft-label">{text('scs.samtykkeForm.bekreftLabel')}</span>}
            name={SamtykkeFormFields.harForståttRettigheterOgPlikter}
            validate={getCheckedValidator()}>
            <Heading level="2" size="small">
                {text('scs.samtykkeForm.ansvar.tittel')}
            </Heading>
            <InfoList>
                <li>{text('scs.samtykkeForm.ansvar.list.1')}</li>
                <li>
                    {text('scs.samtykkeForm.ansvar.list.2', {
                        a: (msg) => (
                            <Link href={RettOgPliktURL} target="_blank">
                                {msg}
                            </Link>
                        ),
                    })}
                </li>
            </InfoList>
        </ConfirmationCheckbox>
    );
};

const SamtykkeForm: React.FunctionComponent<Props> = ({ onValidSubmit, submitButtonLabel }) => {
    const { text } = useSoknadIntl();
    const intl = useIntl();
    return (
        <FormikWrapper
            initialValues={{ harForståttRettigheterOgPlikter: false }}
            onSubmit={onValidSubmit}
            renderForm={() => (
                <Form
                    includeButtons={true}
                    submitButtonLabel={submitButtonLabel || text('scs.samtykkeform.submitButtonLabel')}
                    formErrorHandler={getIntlFormErrorHandler(intl, 'scs.samtykkeForm')}>
                    <FormBlock>
                        <SamtykkeFormPart />
                    </FormBlock>
                </Form>
            )}
        />
    );
};

export default SamtykkeForm;
