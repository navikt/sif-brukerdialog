import { Alert, BodyLong, Button, HStack, ReadMore, VStack } from '@navikt/ds-react';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { FormLayout } from '@navikt/sif-common-ui';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { ApiErrorAlert } from '@sif/api';
import { aktivitetspenger } from '@sif/api/k9-prosessering';
import { createSifFormComponents, SifForm, useSifValidate, YesOrNo } from '@sif/rhf';
import { getNumberFromNumberInputValue } from '@sif/rhf/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { UngUiText, useUngUiIntl } from '../../../i18n';
import { useOppgavePage } from '../../../pages/hooks/useOppgavePage';

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

const { YesOrNoQuestion, NumberInput } = createSifFormComponents<InntektFormValues>();

export interface RapporterInntektFormProps {
    oppgaveReferanse: string;
    måned: string;
    onSuccess: (harRapportertInntekt: boolean) => void;
}

export const RapporterInntektForm = ({ måned, oppgaveReferanse, onSuccess }: RapporterInntektFormProps) => {
    const { text } = useUngUiIntl();
    const { error, isPending, mutateAsync } = aktivitetspenger.useRapporterInntektAktivitetspenger();
    const { validateField } = useSifValidate('@ungInnsyn.inntektForm');
    const { onCancel, onSuccess: onPageSuccess } = useOppgavePage();
    const [dtoError, setDtoError] = useState<string | undefined>(undefined);

    const methods = useForm<InntektFormValues>({
        defaultValues: {},
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const harArbeidstakerOgFrilansInntekt = methods.watch(InntektFormFields.harInntekt) === YesOrNo.YES;

    const handleSubmit = async (values: InntektFormValues) => {
        const harInntekt = values[InntektFormFields.harInntekt] === YesOrNo.YES;

        const arbeidstakerOgFrilansInntekt = harInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.inntekt])
            : 0;

        if (harInntekt && arbeidstakerOgFrilansInntekt === undefined) {
            setDtoError(text('@ungInnsyn.inntektForm.hentUtBeløpFeil'));
            return;
        }

        const data: UngdomsytelseInntektsrapportering = {
            oppgittInntekt: {
                arbeidstakerOgFrilansInntekt,
            },
            oppgaveReferanse,
        };
        try {
            await mutateAsync(data);
            onPageSuccess?.();
            onSuccess(harInntekt);
        } catch {
            // error is tracked by mutation hook
        }
    };

    return (
        <SifForm
            methods={methods}
            onSubmit={handleSubmit}
            buttons={
                <HStack gap="space-16">
                    <Button type="submit" loading={isPending}>
                        {text('@ungInnsyn.inntektForm.submitLabel')}
                    </Button>
                    {onCancel ? (
                        <Button variant="secondary" type="button" onClick={onCancel}>
                            {text('@ungInnsyn.inntektForm.cancelLabel')}
                        </Button>
                    ) : null}
                </HStack>
            }>
            <VStack gap="space-16">
                <FormLayout.Questions>
                    <YesOrNoQuestion
                        name={InntektFormFields.harInntekt}
                        legend={text('@ungInnsyn.inntektForm.utbetaltInntektLegend', { måned })}
                        validate={validateField(InntektFormFields.harInntekt, getYesOrNoValidator())}
                    />

                    {harArbeidstakerOgFrilansInntekt ? (
                        <VStack gap="space-16">
                            <NumberInput
                                name={InntektFormFields.inntekt}
                                label={text('@ungInnsyn.inntektForm.inntektLabel')}
                                integerValue={true}
                                description={text('@ungInnsyn.inntektForm.inntektDescription')}
                                onFocus={dtoError ? () => setDtoError(undefined) : undefined}
                                validate={validateField(
                                    InntektFormFields.inntekt,
                                    getNumberValidator({
                                        min: 1,
                                        max: 999999,
                                        required: true,
                                        allowDecimals: false,
                                    }),
                                )}
                            />
                            <VStack gap="space-8">
                                <ReadMore header={text('@ungInnsyn.inntektForm.hvordanFinnerDuUtInntekt.tittel')}>
                                    <BodyLong spacing>
                                        <UngUiText id="@ungInnsyn.inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.1" />
                                    </BodyLong>
                                    <BodyLong spacing>
                                        <UngUiText id="@ungInnsyn.inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.2" />
                                    </BodyLong>
                                </ReadMore>
                                <ReadMore header={text('@ungInnsyn.inntektForm.feilInntekt.tittel')}>
                                    <BodyLong spacing>
                                        <UngUiText id="@ungInnsyn.inntektForm.feilInntekt.tekst.1" />
                                    </BodyLong>
                                    <BodyLong spacing>
                                        <UngUiText id="@ungInnsyn.inntektForm.feilInntekt.tekst.2" />
                                    </BodyLong>
                                </ReadMore>
                            </VStack>
                        </VStack>
                    ) : null}
                </FormLayout.Questions>
                {error ? <ApiErrorAlert error={error} /> : null}
                {dtoError ? <Alert variant="error">{dtoError}</Alert> : null}
            </VStack>
        </SifForm>
    );
};
