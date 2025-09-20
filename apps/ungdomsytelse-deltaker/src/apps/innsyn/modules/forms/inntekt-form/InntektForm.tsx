import { useMarkerOppgaveSomLukket } from '@innsyn/hooks/api/useMarkerOppgaveSomLukket';
import { useRapporterInntekt } from '@innsyn/hooks/api/useRapporterInntekt';
import { ReadMore, VStack } from '@navikt/ds-react';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import {
    getIntlFormErrorHandler,
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import { AppText, useAppIntl } from '@shared/i18n';

export enum InntektFormFields {
    harLønn = 'harLønn',
    lønn = 'lønn',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harLønn]?: YesOrNo;
    [InntektFormFields.lønn]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}

const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

interface Props {
    oppgaveReferanse: string;
    måned: string;
    onSuccess: (harRapportertInntekt: boolean) => void;
    onCancel: () => void;
}

const InntektForm = ({ måned, oppgaveReferanse, onCancel, onSuccess }: Props) => {
    const { intl, text } = useAppIntl();
    const {
        error: rapporterError,
        isPending: rapporterPending,
        mutateAsync: rapporterMutateAsync,
    } = useRapporterInntekt();
    const { error: lukkError, isPending: lukkPending, mutateAsync: lukkMutateAsync } = useMarkerOppgaveSomLukket();
    const { FormikWrapper, Form, YesOrNoQuestion, NumberInput } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harLønn] === YesOrNo.YES;

        if (harArbeidstakerOgFrilansInntekt) {
            const arbeidstakerOgFrilansInntekt = harArbeidstakerOgFrilansInntekt
                ? getNumberFromNumberInputValue(values[InntektFormFields.lønn]) || 0
                : 0;

            const data: UngdomsytelseInntektsrapportering = {
                oppgittInntekt: {
                    arbeidstakerOgFrilansInntekt,
                },
                oppgaveReferanse,
                harBekreftetInntekt: true,
            };
            rapporterMutateAsync(data).then(() => onSuccess(true));
        } else {
            lukkMutateAsync(oppgaveReferanse).then(() => onSuccess(false));
        }
    };

    const isPending = rapporterPending || lukkPending;
    const error = rapporterError || lukkError;

    return (
        <FormikWrapper
            initialValues={{}}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harLønn] === YesOrNo.YES;

                return (
                    <Form
                        submitButtonLabel={text('inntektForm.submitLabel')}
                        showButtonArrows={true}
                        onCancel={onCancel}
                        cancelButtonLabel={text('inntektForm.cancelLabel')}
                        includeValidationSummary={true}
                        submitPending={isPending}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                        <VStack gap="4">
                            <FormLayout.Questions>
                                <YesOrNoQuestion
                                    name={InntektFormFields.harLønn}
                                    legend={text('inntektForm.utbetaltLønnLegend', { måned })}
                                    validate={(v) => {
                                        const vError = getYesOrNoValidator()(v);
                                        return vError ? { key: vError, values: { måned } } : undefined;
                                    }}
                                />

                                {harArbeidstakerOgFrilansInntekt ? (
                                    <VStack gap="4">
                                        <NumberInput
                                            name={InntektFormFields.lønn}
                                            label={text('inntektForm.lønnLabel')}
                                            integerValue={true}
                                            description={text('inntektForm.lønnDescription')}
                                            validate={getNumberValidator({
                                                min: 1,
                                                max: 999999,
                                                required: true,
                                                allowDecimals: false,
                                            })}
                                        />
                                        <ReadMore header={text('inntektForm.hvordanFinnerDuUtLønn')}>
                                            <AppText id="inntektForm.hvordanFinnerDuUtLønnBeskrivelse" />
                                        </ReadMore>
                                    </VStack>
                                ) : null}
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
