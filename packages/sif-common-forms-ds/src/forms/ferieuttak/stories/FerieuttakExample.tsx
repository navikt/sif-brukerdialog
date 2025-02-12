import { Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { getIntlFormErrorHandler, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { flatten } from 'flat';
import { ferieuttakMessages } from '../';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import FerieuttakForm, { FerieuttakFormErrors } from '../FerieuttakForm';
import FerieuttakListAndDialog from '../FerieuttakListAndDialog';
import { Ferieuttak } from '../types';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';

enum FormField {
    'ferie' = 'ferie',
}

interface FormValues {
    [FormField.ferie]: Ferieuttak[];
}
const initialValues: FormValues = { ferie: [] };

const FormikExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Ferieuttak> | undefined>(undefined);
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
                    <VStack gap="8">
                        <TypedFormikWrapper<FormValues>
                            initialValues={initialValues}
                            onSubmit={setListFormValues}
                            renderForm={() => {
                                return (
                                    <TypedFormikForm<FormValues, ValidationError>
                                        includeButtons={true}
                                        submitButtonLabel="Valider skjema"
                                        formErrorHandler={getIntlFormErrorHandler(intl)}>
                                        <FerieuttakListAndDialog<FormField>
                                            name={FormField.ferie}
                                            minDate={getDate1YearAgo()}
                                            maxDate={getDate1YearFromNow()}
                                            validate={getListValidator({ required: true })}
                                            labels={{
                                                addLabel: 'Legg til ferie',
                                                listTitle: 'Registrerte ferier',
                                                modalTitle: 'Ferie',
                                                emptyListText: 'Ingen ferier er lagt til',
                                            }}
                                        />
                                    </TypedFormikForm>
                                );
                            }}
                        />
                        <SubmitPreview values={listFormValues} />
                    </VStack>
                </Tabs.Panel>
                <Tabs.Panel value="form">
                    <StoryFormWrapper values={singleFormValues}>
                        <FerieuttakForm
                            minDate={getDate1YearAgo()}
                            maxDate={dayjs().subtract(1, 'month').toDate()}
                            ferieuttak={{}}
                            onSubmit={setSingleFormValues}
                            onCancel={() => {
                                // eslint-disable-next-line no-console
                                console.log('cancel me');
                            }}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <MessagesPreview messages={ferieuttakMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(FerieuttakFormErrors)}
                        formName={'Ferieuttak'}
                        intlMessages={ferieuttakMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
