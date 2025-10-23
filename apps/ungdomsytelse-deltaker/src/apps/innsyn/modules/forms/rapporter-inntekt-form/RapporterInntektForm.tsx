import { useRapporterInntekt } from '@innsyn/hooks/api/useRapporterInntekt';
import { Alert, BodyLong, ReadMore, VStack } from '@navikt/ds-react';
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
import { useState } from 'react';

export enum InntektFormFields {
    harInntekt = 'harInntekt',
    inntekt = 'inntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harInntekt]?: YesOrNo;
    [InntektFormFields.inntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}

const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

interface Props {
    oppgaveReferanse: string;
    måned: string;
    onSuccess: (harRapportertInntekt: boolean) => void;
    onCancel: () => void;
}

const RapporterInntektForm = ({ måned, oppgaveReferanse, onCancel, onSuccess }: Props) => {
    const { intl, text } = useAppIntl();
    const { error, isPending, mutateAsync } = useRapporterInntekt();
    const { FormikWrapper, Form, YesOrNoQuestion, NumberInput } = inntektFormComponents;
    const [dtoError, setDtoError] = useState<string | undefined>(undefined);

    const handleSubmit = (values: InntektFormValues) => {
        const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harInntekt] === YesOrNo.YES;

        const arbeidstakerOgFrilansInntekt = harArbeidstakerOgFrilansInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.inntekt])
            : 0;

        if (harArbeidstakerOgFrilansInntekt && arbeidstakerOgFrilansInntekt === undefined) {
            setDtoError(text('inntektForm.hentUtBeløpFeil'));
            return;
        }

        const data: UngdomsytelseInntektsrapportering = {
            oppgittInntekt: {
                arbeidstakerOgFrilansInntekt,
            },
            oppgaveReferanse,
        };
        mutateAsync(data).then(() => onSuccess(harArbeidstakerOgFrilansInntekt));
    };

    return (
        <FormikWrapper
            initialValues={{}}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harInntekt] === YesOrNo.YES;

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
                                    name={InntektFormFields.harInntekt}
                                    legend={text('inntektForm.utbetaltInntektLegend', { måned })}
                                    validate={(v) => {
                                        const vError = getYesOrNoValidator()(v);
                                        return vError ? { key: vError, values: { måned } } : undefined;
                                    }}
                                />

                                {harArbeidstakerOgFrilansInntekt ? (
                                    <VStack gap="4">
                                        <NumberInput
                                            name={InntektFormFields.inntekt}
                                            label={text('inntektForm.inntektLabel')}
                                            integerValue={true}
                                            description={text('inntektForm.inntektDescription')}
                                            onFocus={dtoError ? () => setDtoError(undefined) : undefined}
                                            validate={getNumberValidator({
                                                min: 1,
                                                max: 999999,
                                                required: true,
                                                allowDecimals: false,
                                            })}
                                        />
                                        <VStack gap="2">
                                            <ReadMore header={text('inntektForm.hvordanFinnerDuUtInntekt.tittel')}>
                                                <BodyLong spacing>
                                                    <AppText id="inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.1" />
                                                </BodyLong>
                                                <BodyLong spacing>
                                                    <AppText id="inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.2" />
                                                </BodyLong>
                                            </ReadMore>
                                            <ReadMore header={text('inntektForm.feilInntekt.tittel')}>
                                                <BodyLong spacing>
                                                    <AppText id="inntektForm.feilInntekt.tekst.1" />
                                                </BodyLong>
                                                <BodyLong spacing>
                                                    <AppText id="inntektForm.feilInntekt.tekst.2" />
                                                </BodyLong>
                                            </ReadMore>
                                        </VStack>
                                    </VStack>
                                ) : null}
                            </FormLayout.Questions>
                            {error ? <ApiErrorAlert error={error} /> : null}
                            {dtoError ? <Alert variant="error">{dtoError}</Alert> : null}
                        </VStack>
                    </Form>
                );
            }}
        />
    );
};

export default RapporterInntektForm;
