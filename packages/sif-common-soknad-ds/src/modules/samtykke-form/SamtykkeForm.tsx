import { Heading, Link, List, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useIntl } from 'react-intl';

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
    submitPending?: boolean;
    onValidSubmit: () => void;
}

export const SamtykkeFormPart = () => {
    const { text } = useSoknadIntl();
    return (
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
                            <Link href={RettOgPliktURL} target="_blank" key="link" data-color="accent">
                                {msg}
                            </Link>
                        ),
                    })}
                </List.Item>
            </List>
        </ConfirmationCheckbox>
    );
};

const SamtykkeForm = ({ onValidSubmit, submitPending, submitButtonLabel }: Props) => {
    const { text } = useSoknadIntl();
    const intl = useIntl();
    return (
        <FormikWrapper
            initialValues={{ harForståttRettigheterOgPlikter: false }}
            onSubmit={onValidSubmit}
            renderForm={() => (
                <Form
                    includeButtons={true}
                    submitPending={submitPending}
                    submitButtonLabel={submitButtonLabel || text('@soknad.samtykkeform.submitButtonLabel')}
                    includeValidationSummary={true}
                    formErrorHandler={getIntlFormErrorHandler(intl, '@soknad.samtykkeForm')}>
                    <VStack gap="space-16">
                        <SamtykkeFormPart />
                    </VStack>
                </Form>
            )}
        />
    );
};

export default SamtykkeForm;
