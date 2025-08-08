import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
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
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/api/useRapporterInntekt';
import { useMarkerOppgaveSomLukket } from '../../hooks/api/useMarkerOppgaveSomLukket';

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
    const { FormikWrapper, Form, YesOrNoQuestion, NumberInput, ConfirmationCheckbox } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const harArbeidstakerOgFrilansInntekt =
            values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;

        if (harArbeidstakerOgFrilansInntekt) {
            const arbeidstakerOgFrilansInntekt = harArbeidstakerOgFrilansInntekt
                ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
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
                const harArbeidstakerOgFrilansInntekt =
                    values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;

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
                                    name={InntektFormFields.harArbeidstakerOgFrilansInntekt}
                                    legend={`Hadde du lønn i ${måned}?`}
                                    validate={(v) => {
                                        const vError = getYesOrNoValidator()(v);
                                        return vError ? { key: vError, values: { måned } } : undefined;
                                    }}
                                />

                                {harArbeidstakerOgFrilansInntekt ? (
                                    <NumberInput
                                        name={InntektFormFields.ansattInntekt}
                                        label={`Hvor mye tjente du i ${måned}`}
                                        integerValue={true}
                                        description={
                                            <VStack gap="2" marginBlock="2 0">
                                                <BodyLong>
                                                    Oppgi hva du tjente før skatt som arbeidstaker eller frilanser.
                                                    Mottar du andre ytelser fra Nav skal du ikke ta med dette.
                                                </BodyLong>
                                                <ReadMore header="Hvor finner jeg ut hva jeg tjente før skatt?">
                                                    Info kommer
                                                </ReadMore>
                                                <ReadMore header="Hva betyr arbeidstaker og frilanse?">
                                                    Info kommer
                                                </ReadMore>
                                            </VStack>
                                        }
                                        validate={getNumberValidator({
                                            min: 1,
                                            max: 999999,
                                            required: true,
                                            allowDecimals: false,
                                        })}
                                    />
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
