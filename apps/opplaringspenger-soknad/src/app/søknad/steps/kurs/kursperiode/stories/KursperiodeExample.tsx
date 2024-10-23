import { Box, Tabs, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate1YearAgo, getDate1YearFromNow, getDateToday } from '@navikt/sif-common-utils';
import { Kursperiode } from '../../../../../types/Kursperiode';
import KursperiodeListAndDialog from '../KursperiodeListAndDialog';
import KursperiodeForm from '../KursperiodeForm';
// import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
// import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
// import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
// import TidsperiodeForm, { TidsperiodeFormErrors } from '../TidsperiodeForm';
// import TidsperiodeListAndDialog from '../TidsperiodeListAndDialog';
// import { tidsperiodeMessages } from '../tidsperiodeMessages';
// import { Kursperiode } from '../types';

enum FormField {
    'tidsperiode' = 'tidsperiode',
}

interface FormValues {
    [FormField.tidsperiode]: Kursperiode[];
}
const initialValues: FormValues = { tidsperiode: [] };

const KursperiodeExample = () => {
    const intl = useIntl();
    return (
        <Tabs defaultValue="form">
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="list" label="ListAndDialog" />
                    <Tabs.Tab value="form" label="Form" />
                    <Tabs.Tab value="messages" label="Tekster" />
                </Tabs.List>
                <Tabs.Panel value="list" style={{ maxWidth: '50rem' }}>
                    <TypedFormikWrapper<FormValues>
                        initialValues={initialValues}
                        onSubmit={() => Promise.resolve()}
                        renderForm={() => {
                            return (
                                <TypedFormikForm<FormValues, ValidationError>
                                    includeButtons={true}
                                    submitButtonLabel="Valider skjema"
                                    formErrorHandler={getFormErrorHandler(intl)}>
                                    <KursperiodeListAndDialog<FormField>
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
                </Tabs.Panel>
                <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}>
                    <Box padding="4" borderWidth="1" borderRadius="small">
                        <KursperiodeForm
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            onSubmit={() => null}
                            onCancel={() => null}
                        />
                    </Box>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default KursperiodeExample;
