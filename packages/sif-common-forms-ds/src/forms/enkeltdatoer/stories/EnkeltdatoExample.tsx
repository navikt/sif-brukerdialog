import { Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import EnkeltdatoForm, { EnkeltdatoFormErrors } from '../EnkeltdatoForm';
import EnkeltdatoListAndDialog from '../EnkeltdatoListAndDialog';
import { enkeltdatoMessages } from '../enkeltdatoMessages';
import { Enkeltdato } from '../types';

enum FormField {
    'enkeltdato' = 'enkeltdato',
}

interface FormValues {
    [FormField.enkeltdato]: Enkeltdato[];
}
const initialValues: FormValues = { enkeltdato: [] };

const EnkeltdatoExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Enkeltdato> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <Tabs defaultValue="list">
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="list" label="ListAndDialog" />
                    <Tabs.Tab value="form" label="Form" />
                    <Tabs.Tab value="messages" label="Tekster" />
                    <Tabs.Tab value="validationMessages" label="Valideringsmeldinger" />
                </Tabs.List>
                <Tabs.Panel value="list" style={{ maxWidth: '50rem' }}>
                    <TypedFormikWrapper<FormValues>
                        initialValues={initialValues}
                        onSubmit={setListFormValues}
                        renderForm={() => {
                            return (
                                <TypedFormikForm<FormValues, ValidationError>
                                    includeButtons={true}
                                    submitButtonLabel="Valider skjema"
                                    formErrorHandler={getFormErrorHandler(intl)}>
                                    <EnkeltdatoListAndDialog<FormField>
                                        name={FormField.enkeltdato}
                                        minDate={getDate1YearAgo()}
                                        maxDate={getDate1YearFromNow()}
                                        validate={getListValidator({ required: true })}
                                        labels={{
                                            addLabel: 'Legg til dato',
                                            listTitle: 'Registrerte datoer',
                                            modalTitle: 'Dato',
                                        }}
                                    />
                                </TypedFormikForm>
                            );
                        }}
                    />
                    <SubmitPreview values={listFormValues} />
                </Tabs.Panel>
                <Tabs.Panel value="form">
                    <StoryFormWrapper values={singleFormValues}>
                        <EnkeltdatoForm
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            enkeltdato={undefined}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <MessagesPreview messages={enkeltdatoMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(EnkeltdatoFormErrors)}
                        formName={'Enkeltdato'}
                        intlMessages={enkeltdatoMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default EnkeltdatoExample;
