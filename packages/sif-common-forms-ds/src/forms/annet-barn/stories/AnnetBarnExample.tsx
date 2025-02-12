import { Tabs, VStack } from '@navikt/ds-react';
/* eslint-disable no-console */
import { useState } from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getDate4YearsAgo, getDateToday } from '@navikt/sif-common-utils';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import AnnetBarnForm, { AnnetBarnFormErrors } from '../AnnetBarnForm';
import AnnetBarnListAndDialog from '../AnnetBarnListAndDialog';
import { annetBarnMessages, useAnnetBarnIntl } from '../annetBarnMessages';
import { AnnetBarn } from '../types';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import { flatten } from 'flat';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';

enum FormField {
    'annetBarn' = 'annetBarn',
}

interface FormValues {
    [FormField.annetBarn]: AnnetBarn[];
}
const initialValues: FormValues = { annetBarn: [] };

const AnnetBarnExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<AnnetBarn> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const visBarnTypeValg = true;
    const annetBarn = listFormValues?.[FormField.annetBarn];
    const disallowedFødselsnumre = annetBarn ? annetBarn.map((barn) => barn.fnr) : undefined;

    const { text } = useAnnetBarnIntl();

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
                    <VStack gap="6">
                        <TypedFormikWrapper<FormValues>
                            initialValues={initialValues}
                            onSubmit={setListFormValues}
                            renderForm={() => {
                                return (
                                    <TypedFormikForm<FormValues, ValidationError>
                                        includeButtons={true}
                                        submitButtonLabel="Valider skjema">
                                        <AnnetBarnListAndDialog<FormField>
                                            name={FormField.annetBarn}
                                            validate={getListValidator({ required: true })}
                                            labels={{
                                                addLabel: text('@forms.annetBarn.dialog.title'),
                                                listTitle: text('@forms.annetBarn.list.title'),
                                                emptyListText: text('@forms.annetBarn.list.ingenLagtTil'),
                                                modalTitle: text('@forms.annetBarn.dialog.title'),
                                            }}
                                            minDate={getDate4YearsAgo()}
                                            maxDate={getDateToday()}
                                            visBarnTypeValg={visBarnTypeValg}
                                            disallowedFødselsnumre={disallowedFødselsnumre}
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
                        <AnnetBarnForm
                            annetBarn={{}}
                            onSubmit={setSingleFormValues}
                            onCancel={() => {
                                console.log('cancel me');
                            }}
                            minDate={getDate4YearsAgo()}
                            maxDate={getDateToday()}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <MessagesPreview messages={annetBarnMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={flatten(AnnetBarnFormErrors)}
                        formName={'annetBarn'}
                        intlMessages={annetBarnMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default AnnetBarnExample;
