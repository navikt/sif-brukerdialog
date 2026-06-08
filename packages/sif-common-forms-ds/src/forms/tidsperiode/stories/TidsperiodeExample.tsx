import { Tabs, VStack } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import {
    getIntlFormErrorHandler,
    TypedFormikForm,
    TypedFormikWrapper,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { getDate1YearAgo, getDate1YearFromNow, getDateToday } from '@navikt/sif-common-utils';
import { getListValidator } from '@navikt/sif-validation';
import { flatten } from 'flat';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { tidsperiodeMessages } from '../i18n';
import TidsperiodeForm, { TidsperiodeFormErrors } from '../TidsperiodeForm';
import TidsperiodeListAndDialog from '../TidsperiodeListAndDialog';
import { DateTidsperiode } from '../types';

enum FormField {
    'tidsperiode' = 'tidsperiode',
}

interface FormValues {
    [FormField.tidsperiode]: DateTidsperiode[];
}
const initialValues: FormValues = { tidsperiode: [] };

const TidsperiodeExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<DateTidsperiode> | undefined>(undefined);
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
                                    <TidsperiodeListAndDialog<FormField>
                                        name={FormField.tidsperiode}
                                        minDate={getDate1YearAgo()}
                                        maxDate={getDateToday()}
                                        validate={getListValidator({ required: true })}
                                        labels={{
                                            addLabel: 'Legg til periode',
                                            listTitle: 'Registrerte periode',
                                            modalTitle: 'Periode',
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
                        <TidsperiodeForm
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            tidsperiode={{}}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <MessagesPreview messages={tidsperiodeMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(TidsperiodeFormErrors)}
                        formName="Tidsperiode"
                        intlMessages={tidsperiodeMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default TidsperiodeExample;
