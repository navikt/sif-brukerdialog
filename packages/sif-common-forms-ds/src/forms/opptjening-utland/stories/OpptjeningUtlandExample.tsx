import { useState } from 'react';
import { useIntl } from 'react-intl';
import { getIntlFormErrorHandler, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import { OpptjeningUtland } from '../types';
import OpptjeningUtlandListAndDialog from '../OpptjeningUtlandListAndDialog';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { opptjeningUtlandMessages } from '../opptjeningUtlandMessages';
import OpptjeningUtlandForm, { OpptjeningUtlandFormErrors } from '../OpptjeningUtlandForm';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Tabs, VStack } from '@navikt/ds-react';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';

enum FormField {
    'opptjeningUtland' = 'opptjeningUtland',
}

interface FormValues {
    [FormField.opptjeningUtland]: OpptjeningUtland[];
}
const initialValues: FormValues = {
    opptjeningUtland: [],
};

const OpptjeningUtlandExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<OpptjeningUtland> | undefined>(undefined);
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
                                    formErrorHandler={getIntlFormErrorHandler(intl)}>
                                    <OpptjeningUtlandListAndDialog
                                        minDate={getDate1YearAgo()}
                                        maxDate={getDate1YearFromNow()}
                                        name={FormField.opptjeningUtland}
                                        validate={getListValidator({ required: true })}
                                        labels={{
                                            addLabel: 'Legg til jobb i annet EØS-land',
                                            listTitle: 'Registrert jobb i annet EØS-land',
                                            modalTitle: 'Jobb i annet EØS-land',
                                            emptyListText: 'Ingen jobb i annet EØS-land er lagt til',
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
                        <OpptjeningUtlandForm
                            opptjening={initialValues.opptjeningUtland[0]}
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <MessagesPreview messages={opptjeningUtlandMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(OpptjeningUtlandFormErrors)}
                        formName={'OpptjeningUtland'}
                        intlMessages={opptjeningUtlandMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default OpptjeningUtlandExample;
