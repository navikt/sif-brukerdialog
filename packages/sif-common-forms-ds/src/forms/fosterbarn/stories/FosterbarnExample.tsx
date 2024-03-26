import { Box, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { flatten } from 'flat';
import { fosterbarnMessages } from '../';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
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
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="list" label="FosterbarnListAndDialog" />
                    <Tabs.Tab value="form" label="FosterbarnForm" />
                    <Tabs.Tab value="messages" label="Tekster" />
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
                <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}>
                    <Box padding="4" borderWidth="1" borderRadius="small">
                        <FosterbarnForm
                            fosterbarn={{}}
                            onSubmit={setSingleFormValues}
                            onCancel={() => {
                                // eslint-disable-next-line no-console
                                console.log('cancel me');
                            }}
                        />
                        <SubmitPreview values={singleFormValues} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(FosterbarnFormErrors)}
                            formName={'Fosterbarn'}
                            intlMessages={fosterbarnMessages}
                        />
                        <MessagesPreview messages={fosterbarnMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
