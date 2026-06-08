import { Tabs, VStack } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import {
    getIntlFormErrorHandler,
    TypedFormikForm,
    TypedFormikWrapper,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-validation';
import { flatten } from 'flat';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { fosterbarnMessages } from '../';
import FosterbarnForm, { FosterbarnFormErrors } from '../FosterbarnForm';
import FosterbarnListAndDialog from '../FosterbarnListAndDialog';
import { Fosterbarn } from '../types';

enum FormField {
    'fosterbarn' = 'fosterbarn',
}

interface FormValues {
    [FormField.fosterbarn]: Fosterbarn[];
}
const initialValues: FormValues = { fosterbarn: [] };

const FormikExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Fosterbarn> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <Tabs defaultValue="list">
            <VStack gap="space-16">
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
                                    <FosterbarnListAndDialog<FormField>
                                        name={FormField.fosterbarn}
                                        validate={getListValidator({ required: true })}
                                    />
                                </TypedFormikForm>
                            );
                        }}
                    />
                    <SubmitPreview values={listFormValues} />
                </Tabs.Panel>
                <Tabs.Panel value="form">
                    <StoryFormWrapper values={singleFormValues}>
                        <FosterbarnForm
                            fosterbarn={{}}
                            onSubmit={setSingleFormValues}
                            onCancel={() => {
                                // eslint-disable-next-line no-console
                                console.log('cancel me');
                            }}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <MessagesPreview messages={fosterbarnMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(FosterbarnFormErrors)}
                        formName="Fosterbarn"
                        intlMessages={fosterbarnMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
