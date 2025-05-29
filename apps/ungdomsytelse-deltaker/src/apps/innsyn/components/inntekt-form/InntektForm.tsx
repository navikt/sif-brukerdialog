import { Box, ReadMore, VStack } from '@navikt/ds-react';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import {
    getIntlFormErrorHandler,
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateRangeFormatter } from '@navikt/sif-common-utils';
import { getCheckedValidator, getNumberValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/api/useRapporterInntekt';

export enum InntektFormFields {
    harArbeidstakerOgFrilansInntekt = 'harArbeidstakerOgFrilansInntekt',
    ansattInntekt = 'ansattInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harArbeidstakerOgFrilansInntekt]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}

const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

interface Props {
    oppgaveReferanse: string;
    periode: DateRange;
    onSuccess: (data: UngdomsytelseInntektsrapportering) => void;
    onCancel: () => void;
}

const InntektForm = ({ periode, oppgaveReferanse, onCancel, onSuccess }: Props) => {
    const { intl } = useAppIntl();
    const { error, isPending, mutateAsync } = useRapporterInntekt();
    const { FormikWrapper, Form, ConfirmationCheckbox, YesOrNoQuestion, NumberInput } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const harArbeidstakerOgFrilansInntekt =
            values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;

        const arbeidstakerOgFrilansInntekt = harArbeidstakerOgFrilansInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
            : 0;

        const data: UngdomsytelseInntektsrapportering = {
            oppgittInntekt: {
                arbeidstakerOgFrilansInntekt,
            },
            oppgaveReferanse,
            harBekreftetInntekt: values.bekrefterInntekt === true,
        };
        mutateAsync(data).then(() => onSuccess(data));
    };

    return (
        <FormikWrapper
            initialValues={{}}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                const harArbeidstakerOgFrilansInntekt =
                    values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;

                const periodetekst = dateRangeFormatter.getDateRangeText(periode, intl.locale);

                return (
                    <Form
                        submitButtonLabel="Send inn"
                        showButtonArrows={true}
                        onCancel={onCancel}
                        cancelButtonLabel="Avbryt"
                        includeValidationSummary={true}
                        submitPending={isPending}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                        <VStack gap="4">
                            <FormLayout.Questions>
                                <YesOrNoQuestion
                                    name={InntektFormFields.harArbeidstakerOgFrilansInntekt}
                                    legend={`Har du hatt inntekt som arbeidstaker eller frilanser i perioden ${periodetekst}?`}
                                    validate={getYesOrNoValidator()}
                                    description={
                                        <ReadMore header="Hva er inntekt som arbeidstaker eller frilanser?">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam
                                            quisquam eum enim cum. Consequuntur aspernatur itaque quasi porro! Optio
                                            tempora a, id ipsa incidunt aliquid sequi aut non deserunt?
                                        </ReadMore>
                                    }
                                />

                                {harArbeidstakerOgFrilansInntekt ? (
                                    <FormLayout.QuestionBleedTop>
                                        <Box className=" bg-deepblue-50 p-6 rounded-md">
                                            <NumberInput
                                                name={InntektFormFields.ansattInntekt}
                                                label="Oppgi i hele kroner hvor mye du har hatt i inntekt som arbeidstaker eller frilanser i perioden."
                                                integerValue={true}
                                                validate={getNumberValidator({
                                                    min: 1,
                                                    required: true,
                                                    allowDecimals: false,
                                                })}
                                            />
                                        </Box>
                                    </FormLayout.QuestionBleedTop>
                                ) : null}
                                <ConfirmationCheckbox
                                    name={InntektFormFields.bekrefterInntekt}
                                    label="Jeg bekrefter at opplysningene er korrekte"
                                    validate={getCheckedValidator()}></ConfirmationCheckbox>
                            </FormLayout.Questions>
                            {error ? <ApiErrorAlert error={error} /> : null}
                        </VStack>
                    </Form>
                );
            }}
        />
    );
};

export default InntektForm;
