import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import { OpptjeningUtland } from '../types';
import OpptjeningUtlandListAndDialog from '../OpptjeningUtlandListAndDialog';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { opptjeningUtlandMessages } from '../opptjeningUtlandMessages';
import OpptjeningUtlandForm, { OpptjeningUtlandFormErrors } from '../OpptjeningUtlandForm';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import { Box, Tabs, VStack } from '@navikt/ds-react';

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
                                    <OpptjeningUtlandListAndDialog
                                        minDate={date1YearAgo}
                                        maxDate={date1YearFromNow}
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
                <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}>
                    <Box padding="4" borderWidth="1" borderRadius="small">
                        <OpptjeningUtlandForm
                            opptjening={initialValues.opptjeningUtland[0]}
                            minDate={date1YearAgo}
                            maxDate={date1YearFromNow}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                        <SubmitPreview values={singleFormValues} />
                    </Box>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(OpptjeningUtlandFormErrors)}
                            formName={'OpptjeningUtland'}
                            intlMessages={opptjeningUtlandMessages}
                        />
                        <MessagesPreview messages={opptjeningUtlandMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default OpptjeningUtlandExample;
