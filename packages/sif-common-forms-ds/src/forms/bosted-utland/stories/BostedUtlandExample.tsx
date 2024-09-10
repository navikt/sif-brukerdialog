import { Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import BostedUtlandForm, { BostedUtlandFormErrors } from '../BostedUtlandForm';
import BostedUtlandListAndDialog from '../BostedUtlandListAndDialog';
import { bostedUtlandMessages } from '../bostedUtlandMessages';
import { BostedUtland } from '../types';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { flatten } from 'flat';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';

enum FormField {
    'bosted' = 'bosted',
}

interface FormValues {
    [FormField.bosted]: BostedUtland[];
}
const initialValues: FormValues = { bosted: [] };

const FormikExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<BostedUtland> | undefined>(undefined);
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
                                    <BostedUtlandListAndDialog<FormField>
                                        name={FormField.bosted}
                                        minDate={getDate1YearAgo()}
                                        maxDate={getDate1YearFromNow()}
                                        validate={getListValidator({ required: true })}
                                        labels={{
                                            addLabel: 'Legg til utenlandsopphold',
                                            listTitle: 'Registrerte utenlandsopphold',
                                            modalTitle: 'Utenlandsopphold',
                                            emptyListText: 'Ingen utenlandsopphold er lagt til',
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
                        <BostedUtlandForm
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <MessagesPreview messages={bostedUtlandMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(BostedUtlandFormErrors)}
                        formName={'bostedUtland'}
                        intlMessages={bostedUtlandMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
