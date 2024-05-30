import { Panel, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import BostedUtlandForm, { BostedUtlandFormErrors } from '../BostedUtlandForm';
import BostedUtlandListAndDialog from '../BostedUtlandListAndDialog';
import { bostedUtlandMessages } from '../bostedUtlandMessages';
import { BostedUtland } from '../types';

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
                    <Tabs.Tab value="list" label="BostedUtlandListAndDialog" />
                    <Tabs.Tab value="form" label="BostedUtlandForm" />
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
                                    <BostedUtlandListAndDialog<FormField>
                                        name={FormField.bosted}
                                        minDate={date1YearAgo}
                                        maxDate={date1YearFromNow}
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
                    <Panel border={true}>
                        <BostedUtlandForm
                            minDate={date1YearAgo}
                            maxDate={date1YearFromNow}
                            onSubmit={setSingleFormValues}
                            onCancel={() => null}
                        />
                        <SubmitPreview values={singleFormValues} />
                    </Panel>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={flatten(BostedUtlandFormErrors)}
                            formName={'bostedUtland'}
                            intlMessages={bostedUtlandMessages}
                        />
                        <MessagesPreview messages={bostedUtlandMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
