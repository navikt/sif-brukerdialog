import { BodyLong, Box, Heading, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { date1YearAgo, date1YearFromNow, dateToday } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import { FraværDag, fraværDagToFraværDateRange, fraværMessages, FraværPeriode, fraværPeriodeToDateRange } from '../';
import MessagesPreview from '../../../../storybook/components/messages-preview/MessagesPreview';
import SubmitPreview from '../../../../storybook/components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import FraværDagerListAndDialog from '../FraværDagerListAndDialog';
import FraværDagFormView, { FraværDagFormErrors } from '../FraværDagForm';
import FraværPeriodeForm, { FraværPeriodeFormErrors } from '../FraværPeriodeForm';
import FraværPerioderListAndDialog from '../FraværPerioderListAndDialog';
import { FraværFieldValidationErrors, validateNoCollisions } from '../fraværValidationUtils';

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
                    <Tabs.Tab value="perioderForm" label="FraværPeriodeForm" />
                    <Tabs.Tab value="dagerForm" label="FraværDagerForm" />
                    <Tabs.Tab value="messages" label="Tekster" />
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
                                            minDate={date1YearAgo}
                                            maxDate={dateToday}
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
                                            minDate={date1YearAgo}
                                            maxDate={dateToday}
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
                <Tabs.Panel value="perioderForm" style={{ maxWidth: '30rem' }}>
                    <Box padding="6" borderWidth="1" borderRadius="medium">
                        <FraværPeriodeForm
                            minDate={date1YearAgo}
                            maxDate={date1YearFromNow}
                            fraværPeriode={{}}
                            onSubmit={setFraværPeriodeSingleFormValues}
                            onCancel={() => {}}
                        />
                    </Box>
                    <SubmitPreview values={fraværPeriodeSingleFormValues} />
                </Tabs.Panel>
                <Tabs.Panel value="dagerForm" style={{ maxWidth: '30rem' }}>
                    <Box padding="4" borderWidth="1" borderRadius="small">
                        <FraværDagFormView
                            minDate={date1YearAgo}
                            maxDate={date1YearFromNow}
                            fraværDag={{}}
                            onSubmit={setFraværDagSingleFormValues}
                            onCancel={() => {}}
                        />
                    </Box>
                    <SubmitPreview values={fraværDagSingleFormValues} />
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <Block margin="xxl" padBottom="l">
                        <FormValidationErrorMessages
                            validationErrorIntlKeys={{
                                ...flatten(FraværDagFormErrors),
                                ...flatten(FraværPeriodeFormErrors),
                            }}
                            formName={'Fosterbarn'}
                            intlMessages={fraværMessages}
                        />
                        <MessagesPreview messages={fraværMessages} showExplanation={false} />
                    </Block>
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default FormikExample;
