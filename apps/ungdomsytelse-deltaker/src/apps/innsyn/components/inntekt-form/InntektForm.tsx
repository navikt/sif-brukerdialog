import { Alert, Box, Button, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, YesOrNo } from '@navikt/sif-common-formik-ds';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { Inntekt } from '@navikt/ung-common';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { getInntektFromFormValues, inntektFormComponents } from './inntektFormUtils';
import { InntektFormValues } from './types';
import InntektDefaultForm from './varianter/InntektDefaultForm';
import {
    UngdomsytelseInntektsrapportering,
    zUngdomsytelseInntektsrapportering,
} from '@navikt/k9-brukerdialog-prosessering-api';

interface Props {
    inntekt?: Inntekt;
    periode: DateRange;
    onCancel: () => void;
}

const InntektForm = ({ periode, inntekt, onCancel }: Props) => {
    const { intl } = useAppIntl();
    const { error, inntektSendt, pending, rapporterInntekt } = useRapporterInntekt();
    const { FormikWrapper, Form } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const inntekt = getInntektFromFormValues(values, false);
        const data: UngdomsytelseInntektsrapportering = zUngdomsytelseInntektsrapportering.parse({
            oppgittInntektForPeriode: {
                periodeForInntekt: {
                    fraOgMed: dateToISODate(periode.from),
                    tilOgMed: dateToISODate(periode.to),
                },
                arbeidstakerOgFrilansInntekt: inntekt.arbeidstakerOgFrilansInntekt,
                inntektFraYtelse: inntekt.inntektFraYtelse,
            },
            harBekreftetInntekt: values.bekrefterInntekt === true,
        });
        rapporterInntekt(data);
    };

    const initialValues: Partial<InntektFormValues> = inntekt
        ? {
              harArbeidstakerOgFrilansInntekt: inntekt.arbeidstakerOgFrilansInntekt || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              harInntektFraYtelse: inntekt.inntektFraYtelse || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              ansattInntekt: `${inntekt.arbeidstakerOgFrilansInntekt}`,
              ytelseInntekt: `${inntekt.inntektFraYtelse}`,
          }
        : {};

    return (
        <VStack gap="6">
            {inntektSendt ? (
                <VStack gap="8">
                    <Alert variant="success">Inntekt for perioden er sendt</Alert>
                    <Box>
                        <Button variant="tertiary" onClick={() => window.location.reload()}>
                            Ok, oppdater side
                        </Button>
                    </Box>
                </VStack>
            ) : (
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
