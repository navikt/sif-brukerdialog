import { Heading, Link, List, VStack } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';

const RettOgPliktURL = 'https://www.nav.no/endringer#du-har-plikt-til-a-gi-nav-riktige-opplysninger';

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
                    submitButtonLabel={submitButtonLabel || text('@soknad.samtykkeform.submitButtonLabel')}
                    includeValidationSummary={true}
                    formErrorHandler={getIntlFormErrorHandler(intl, '@soknad.samtykkeForm')}>
                    <VStack gap="4">
                        <ConfirmationCheckbox
                            label={<span data-testid="bekreft-label">{text('@soknad.samtykkeForm.bekreftLabel')}</span>}
                            name={SamtykkeFormFields.harForståttRettigheterOgPlikter}
                            validate={getCheckedValidator()}>
                            <Heading level="2" size="small" spacing={true}>
                                {text('@soknad.samtykkeForm.ansvar.tittel')}
                            </Heading>
                            <List>
                                <List.Item>{text('@soknad.samtykkeForm.ansvar.list.1')}</List.Item>
                                <List.Item>
                                    {text('@soknad.samtykkeForm.ansvar.list.2', {
                                        a: (msg) => (
                                            <Link href={RettOgPliktURL} target="_blank" key="link">
                                                {msg}
                                            </Link>
                                        ),
                                    })}
                                </List.Item>
                            </List>
                        </ConfirmationCheckbox>
                    </VStack>
                </Form>
            )}
        />
    );
};

export default SamtykkeForm;
