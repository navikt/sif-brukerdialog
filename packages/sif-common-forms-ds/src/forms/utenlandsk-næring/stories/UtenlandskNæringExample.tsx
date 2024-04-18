import { Box, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { flatten } from 'flat';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { UtenlandskNæring } from '../types';
import UtenlandskNæringForm, { UtenlandskNæringFormErrors } from '../UtenlandskNæringForm';
import UtenlandskNæringListAndDialog from '../UtenlandskNæringListAndDialog';
import { utenlandskNæringMessages } from '../utenlandskNæringMessages';

enum FormField {
    'utenlandskNæring' = 'utenlandskNæring',
}

interface FormValues {
    [FormField.utenlandskNæring]: UtenlandskNæring[];
}
const initialValues: FormValues = {
    utenlandskNæring: [],
};

const UtenlandskNæringExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<UtenlandskNæring> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <Tabs defaultValue="list">
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="list" label="ListAndDialog" />
                    <Tabs.Tab value="form" label="Form" />
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
                                    <UtenlandskNæringListAndDialog
                                        name={FormField.utenlandskNæring}
                                        validate={getListValidator({ required: true })}
                                        labels={{
                                            addLabel: 'Legg til næringsvirksomhet i et annet EØS-land',
                                            listTitle: 'Utenlandsk næring',
                                            emptyListText: 'Ingen registrert',
                                            modalTitle: 'næringsvirksomhet i et annet EØS-land',
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
                        <UtenlandskNæringForm
                            utenlandskNæring={initialValues.utenlandskNæring[0]}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                        <SubmitPreview values={singleFormValues} />
                    </Box>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(UtenlandskNæringFormErrors)}
                            formName={'UtenlandskNæring'}
                            intlMessages={utenlandskNæringMessages}
                        />
                        <MessagesPreview messages={utenlandskNæringMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default UtenlandskNæringExample;
