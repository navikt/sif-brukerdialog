import { Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { getIntlFormErrorHandler, TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { Utenlandsopphold, UtenlandsoppholdVariant } from '../types';
import UtenlandsoppholdForm, { UtlandsoppholdFormErrors } from '../UtenlandsoppholdForm';
import UtenlandsoppholdListAndDialog from '../UtenlandsoppholdListAndDialog';
import { utenlandsoppholdMessages } from '../utenlandsoppholdMessages';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';

enum FormField {
    'utenlandsopphold' = 'utenlandsopphold',
}

interface FormValues {
    [FormField.utenlandsopphold]: Utenlandsopphold[];
}
const initialValues: FormValues = {
    utenlandsopphold: [],
};

const UtenlandsoppholdExample = ({ variant }: { variant: UtenlandsoppholdVariant }) => {
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
                                    <UtenlandsoppholdListAndDialog
                                        minDate={getDate1YearAgo()}
                                        maxDate={getDate1YearFromNow()}
                                        name={FormField.utenlandsopphold}
                                        variant={variant}
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
                        <UtenlandsoppholdForm
                            opphold={initialValues.utenlandsopphold[0]}
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            variant={variant}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    <MessagesPreview messages={utenlandsoppholdMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(UtlandsoppholdFormErrors)}
                        intlMessages={utenlandsoppholdMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default UtenlandsoppholdExample;
