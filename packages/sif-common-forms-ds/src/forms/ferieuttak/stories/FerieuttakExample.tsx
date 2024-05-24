import { Box, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { flatten } from 'flat';
import { ferieuttakMessages } from '../';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import FerieuttakForm, { FerieuttakFormErrors } from '../FerieuttakForm';
import FerieuttakListAndDialog from '../FerieuttakListAndDialog';
import { Ferieuttak } from '../types';

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
                    <Tabs.Tab value="list" label="FerieuttakListAndDialog" />
                    <Tabs.Tab value="form" label="FerieuttakForm" />
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
                </Tabs.Panel>
                <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}>
                    <Box padding="4" borderWidth="1" borderRadius="small">
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
                        <SubmitPreview values={singleFormValues} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(FerieuttakFormErrors)}
                            formName={'Ferieuttak'}
                            intlMessages={ferieuttakMessages}
                        />
                        <MessagesPreview messages={ferieuttakMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
