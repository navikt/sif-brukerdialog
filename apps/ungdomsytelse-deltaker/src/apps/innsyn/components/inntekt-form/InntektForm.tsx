import { Alert, Box, Button, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, YesOrNo } from '@navikt/sif-common-formik-ds';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { Inntekt } from '@navikt/ung-common';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { getInntektFromFormValues, inntektFormComponents } from './inntektFormUtils';
import { InntektFormValues } from './types';
import InntektDefaultForm from './varianter/InntektDefaultForm';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { useEffect, useRef } from 'react';

interface Props {
    inntekt?: Inntekt;
    periode: DateRange;
    onCancel: () => void;
}

const InntektForm = ({ periode, inntekt, onCancel }: Props) => {
    const { intl } = useAppIntl();
    const { error, inntektSendt, pending, rapporterInntekt } = useRapporterInntekt();
    const { FormikWrapper, Form } = inntektFormComponents;

    const okButtonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (values: InntektFormValues) => {
        const inntekt = getInntektFromFormValues(values, false);
        const data: UngdomsytelseInntektsrapportering = {
            oppgittInntektForPeriode: {
                periodeForInntekt: {
                    fraOgMed: dateToISODate(periode.from),
                    tilOgMed: dateToISODate(periode.to),
                },
                arbeidstakerOgFrilansInntekt: inntekt.arbeidOgFrilansInntekter,
                inntektFraYtelse: inntekt.ytelseInntekter,
            },
            harBekreftetInntekt: values.bekrefterInntekt === true,
        };
        rapporterInntekt(data);
    };

    useEffect(() => {
        // Sett fokus på okButton når inntektSendt er true
        if (inntektSendt && okButtonRef.current) {
            okButtonRef.current.focus();
        }
    }, [inntektSendt]);

    const initialValues: Partial<InntektFormValues> = inntekt
        ? {
              harArbeidstakerOgFrilansInntekt: inntekt.arbeidOgFrilansInntekter || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              harInntektFraYtelse: inntekt.ytelseInntekter || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              ansattInntekt: `${inntekt.arbeidOgFrilansInntekter}`,
              ytelseInntekt: `${inntekt.ytelseInntekter}`,
          }
        : {};

    return (
        <VStack gap="6">
            <VStack gap="8" aria-live="polite">
                {inntektSendt ? (
                    <>
                        <Alert variant="success">Inntekt for perioden er sendt</Alert>
                        <Box>
                            <Button ref={okButtonRef} variant="tertiary" onClick={() => window.location.reload()}>
                                Ok, oppdater side
                            </Button>
                        </Box>
                    </>
                ) : null}
            </VStack>
            {inntektSendt ? null : (
                <VStack gap="8">
                    <FormikWrapper
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        renderForm={({ values }) => {
                            return (
                                <Form
                                    submitButtonLabel="Send inn"
                                    showButtonArrows={true}
                                    onCancel={onCancel}
                                    cancelButtonLabel="Avbryt"
                                    includeValidationSummary={true}
                                    submitPending={pending}
                                    formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                    <VStack gap="4">
                                        <InntektDefaultForm values={values} periode={periode} />
                                        {error ? <Alert variant="error">{error}</Alert> : null}
                                    </VStack>
                                </Form>
                            );
                        }}
                    />
                </VStack>
            )}
        </VStack>
    );
};

export default InntektForm;
