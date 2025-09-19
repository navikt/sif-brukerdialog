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
import { useAppIntl } from '@shared/i18n';

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
    onSuccess: (data: UngdomsytelseInntektsrapportering | void) => void;
    onCancel: () => void;
}

const InntektForm = ({ måned, oppgaveReferanse, onCancel, onSuccess }: Props) => {
    const { intl } = useAppIntl();
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
            rapporterMutateAsync(data).then(() => onSuccess(data));
        } else {
            lukkMutateAsync(oppgaveReferanse).then(() => onSuccess());
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
                        submitButtonLabel="Send inn svaret ditt"
                        showButtonArrows={true}
                        onCancel={onCancel}
                        cancelButtonLabel="Avbryt"
                        includeValidationSummary={true}
                        submitPending={isPending}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                        <VStack gap="4">
                            <FormLayout.Questions>
                                <YesOrNoQuestion
                                    name={InntektFormFields.harLønn}
                                    legend={`Fikk du utbetalt lønn i ${måned}?`}
                                    validate={(v) => {
                                        const vError = getYesOrNoValidator()(v);
                                        return vError ? { key: vError, values: { måned } } : undefined;
                                    }}
                                />

                                {harArbeidstakerOgFrilansInntekt ? (
                                    <VStack gap="4">
                                        <NumberInput
                                            name={InntektFormFields.lønn}
                                            label="Hvor mye fikk du i lønn før skatt?"
                                            integerValue={true}
                                            description="Se på lønnsslippen din hva lønnen din var før det ble trukket skatt av den."
                                            validate={getNumberValidator({
                                                min: 1,
                                                max: 999999,
                                                required: true,
                                                allowDecimals: false,
                                            })}
                                        />
                                        <ReadMore header="Hvordan finner du ut hva lønnen din var før skatt?">
                                            Når du har en jobb der du får utbetalt lønn, får du alltid en lønnsslipp fra
                                            arbeidsgiveren din. På lønnsslippen står det blant annet hva lønnen din er
                                            før det blir trukket skatt av den, og det er det tallet du skal skrive inn
                                            her. Spør arbeidsgiveren din hvis du er usikker på hvor du finner
                                            lønnsslippen.
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
