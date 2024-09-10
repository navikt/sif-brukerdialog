import { BodyLong, Heading, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getDate1YearAgo, getDate1YearFromNow, getDateToday } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import { FraværDag, fraværDagToFraværDateRange, fraværMessages, FraværPeriode, fraværPeriodeToDateRange } from '../';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import FraværDagerListAndDialog from '../FraværDagerListAndDialog';
import FraværDagFormView, { FraværDagFormErrors } from '../FraværDagForm';
import FraværPeriodeForm, { FraværPeriodeFormErrors } from '../FraværPeriodeForm';
import FraværPerioderListAndDialog from '../FraværPerioderListAndDialog';
import { FraværFieldValidationErrors, validateNoCollisions } from '../fraværValidationUtils';
import StoryFormWrapper from '../../../../storybook/components/story-form-wrapper/StoryFormWrapper';

enum FormField {
    perioder = 'perioder',
    dager = 'dager',
}

interface FormValues {
    [FormField.perioder]: FraværPeriode[];
    [FormField.dager]: FraværDag[];
}

const initialValues: FormValues = { [FormField.perioder]: [], [FormField.dager]: [] };

const FormikExample = () => {
    const [fraværPeriodeSingleFormValues, setFraværPeriodeSingleFormValues] = useState<
        Partial<FraværPeriode> | undefined
    >(undefined);
    const [fraværDagSingleFormValues, setFraværDagSingleFormValues] = useState<Partial<FraværDag> | undefined>(
        undefined,
    );
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();

    return (
        <Tabs defaultValue="list">
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="list" label="ListAndDialog" />
                    <Tabs.Tab value="perioderForm" label="PerioderForm" />
                    <Tabs.Tab value="dagerForm" label="DagerForm" />
                    <Tabs.Tab value="messages" label="Tekster" />
                    <Tabs.Tab value="validationMessages" label="Valideringsmeldinger" />
                </Tabs.List>
                <Tabs.Panel value="list" style={{ maxWidth: '50rem' }}>
                    <TypedFormikWrapper<FormValues>
                        initialValues={initialValues}
                        onSubmit={setListFormValues}
                        renderForm={(formik) => {
                            const { perioder = [], dager = [] } = formik.values;
                            const dateRangesToDisable = [
                                ...perioder.map(fraværPeriodeToDateRange),
                                ...dager.map(fraværDagToFraværDateRange),
                            ];
                            return (
                                <TypedFormikForm<FormValues, ValidationError | FraværFieldValidationErrors>
                                    includeButtons={true}
                                    submitButtonLabel="Valider skjema"
                                    formErrorHandler={getFormErrorHandler(intl)}>
                                    <FormBlock>
                                        <Heading level="2" size="medium" spacing={true}>
                                            FraværPerioderListAndDialog
                                        </Heading>
                                        <FraværPerioderListAndDialog<FormField>
                                            name={FormField.perioder}
                                            minDate={getDate1YearAgo()}
                                            maxDate={getDateToday()}
                                            periodeDescription={
                                                <BodyLong style={{ marginTop: '.5rem', paddingBottom: '.5rem' }}>
                                                    Du kan kun søke for ett og samme år i en søknad. Får å søke for
                                                    flere år, må du sende en søknad for hvert år.
                                                </BodyLong>
                                            }
                                            validate={(value) => {
                                                const listError = getListValidator({ required: true })(value);
                                                if (listError) {
                                                    return listError;
                                                }
                                                const collisionError = validateNoCollisions(dager, perioder);
                                                if (collisionError) {
                                                    return collisionError;
                                                }
                                            }}
                                            labels={{
                                                listTitle: 'Perioder med fravær',
                                                addLabel: 'Legg til periode',
                                                modalTitle: 'Fravær hele dager',
                                                emptyListText: 'Ingen perioder er lagt til',
                                            }}
                                            dateRangesToDisable={dateRangesToDisable}
                                            helgedagerIkkeTillat={true}
                                        />
                                    </FormBlock>
                                    <FormBlock>
                                        <Heading level="2" size="medium" spacing={true}>
                                            FraværDagerListAndDialog
                                        </Heading>
                                        <FraværDagerListAndDialog<FormField>
                                            name={FormField.dager}
                                            minDate={getDate1YearAgo()}
                                            maxDate={getDateToday()}
                                            validate={(value) => {
                                                const listError = getListValidator({ required: true })(value);
                                                if (listError) {
                                                    return listError;
                                                }
                                                const collisionError = validateNoCollisions(dager, perioder);
                                                if (collisionError) {
                                                    return collisionError;
                                                }
                                            }}
                                            labels={{
                                                addLabel: 'Legg til dag med delvis fravær',
                                                listTitle: 'Dager med delvis fravær',
                                                modalTitle: 'Fravær deler av dag',
                                                emptyListText: 'Ingen dager er lagt til',
                                            }}
                                            dateRangesToDisable={dateRangesToDisable}
                                            helgedagerIkkeTillatt={true}
                                            maksArbeidstidPerDag={24}
                                        />
                                    </FormBlock>
                                </TypedFormikForm>
                            );
                        }}
                    />
                    <SubmitPreview values={listFormValues} />
                </Tabs.Panel>
                <Tabs.Panel value="perioderForm">
                    <StoryFormWrapper values={fraværPeriodeSingleFormValues}>
                        <FraværPeriodeForm
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            fraværPeriode={{}}
                            onSubmit={setFraværPeriodeSingleFormValues}
                            onCancel={() => {}}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>
                <Tabs.Panel value="dagerForm">
                    <StoryFormWrapper values={fraværDagSingleFormValues}>
                        <FraværDagFormView
                            minDate={getDate1YearAgo()}
                            maxDate={getDate1YearFromNow()}
                            fraværDag={{}}
                            onSubmit={setFraværDagSingleFormValues}
                            onCancel={() => {}}
                        />
                    </StoryFormWrapper>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <MessagesPreview messages={fraværMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={{
                            ...flatten(FraværDagFormErrors),
                            ...flatten(FraværPeriodeFormErrors),
                        }}
                        formName={'Fosterbarn'}
                        intlMessages={fraværMessages}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
