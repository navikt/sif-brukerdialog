import { Box, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { Utenlandsopphold } from '../types';
import UtenlandsoppholdForm, { UtlandsoppholdFormErrors } from '../UtenlandsoppholdForm';
import UtenlandsoppholdListAndDialog from '../UtenlandsoppholdListAndDialog';
import { utenlandsoppholdMessages } from '../utenlandsoppholdMessages';

enum FormField {
    'utenlandsopphold' = 'utenlandsopphold',
}

interface FormValues {
    [FormField.utenlandsopphold]: Utenlandsopphold[];
}
const initialValues: FormValues = {
    utenlandsopphold: [],
};

const UtenlandsoppholdExample = ({ excludeInnlagtQuestion }: { excludeInnlagtQuestion: boolean }) => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Utenlandsopphold> | undefined>(undefined);
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
                                    <UtenlandsoppholdListAndDialog
                                        minDate={getDate1YearAgo()}
                                        maxDate={getDate1YearFromNow()}
                                        name={FormField.utenlandsopphold}
                                        excludeInnlagtQuestion={excludeInnlagtQuestion}
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
                <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}>
                    <Box padding="4" borderWidth="1" borderRadius="small">
                        <UtenlandsoppholdForm
                            opphold={initialValues.utenlandsopphold[0]}
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            excludeInnlagtQuestion={excludeInnlagtQuestion}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                        <SubmitPreview values={singleFormValues} />
                    </Box>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(UtlandsoppholdFormErrors)}
                            intlMessages={utenlandsoppholdMessages}
                        />
                        <MessagesPreview messages={utenlandsoppholdMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default UtenlandsoppholdExample;
