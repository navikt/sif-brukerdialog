import { Panel, Tabs, VStack } from '@navikt/ds-react';
/* eslint-disable no-console */
import { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate4YearsAgo, getDateToday } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import AnnetBarnForm, { AnnetBarnFormErrors } from '../AnnetBarnForm';
import AnnetBarnListAndDialog from '../AnnetBarnListAndDialog';
import { annetBarnMessages, useAnnetBarnIntl } from '../annetBarnMessages';
import { AnnetBarn } from '../types';

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
                    <Tabs.Tab value="list" label="AnnetBarnListAndDialog" />
                    <Tabs.Tab value="form" label="AnnetBarnForm" />
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
                </Tabs.Panel>
                <Tabs.Panel value="form" style={{ maxWidth: '30rem' }}>
                    <Panel border={true}>
                        <AnnetBarnForm
                            annetBarn={{}}
                            onSubmit={setSingleFormValues}
                            onCancel={() => {
                                console.log('cancel me');
                            }}
                            minDate={getDate4YearsAgo()}
                            maxDate={getDateToday()}
                        />

                        <SubmitPreview values={singleFormValues} />
                    </Panel>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(AnnetBarnFormErrors)}
                            formName={'annetBarn'}
                            intlMessages={annetBarnMessages}
                        />
                        <MessagesPreview messages={annetBarnMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default AnnetBarnExample;
