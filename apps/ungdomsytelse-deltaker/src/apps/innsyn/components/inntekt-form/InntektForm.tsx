import { Alert, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, YesOrNo } from '@navikt/sif-common-formik-ds';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { Inntekt } from '@navikt/ung-common';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { getInntektFromFormValues, inntektFormComponents } from './inntektFormUtils';
import { InntektFormValues } from './types';
import InntektDefaultForm from './varianter/InntektDefaultForm';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';

interface Props {
    inntekt?: Inntekt;
    periode: DateRange;
    onSuccess: () => void;
    onCancel: () => void;
}

const InntektForm = ({ periode, inntekt, onCancel, onSuccess }: Props) => {
    const { intl } = useAppIntl();
    const { error, pending, rapporterInntekt } = useRapporterInntekt();
    const { FormikWrapper, Form } = inntektFormComponents;

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
        rapporterInntekt(data).then(onSuccess);
    };

    const initialValues: Partial<InntektFormValues> = inntekt
        ? {
              harArbeidstakerOgFrilansInntekt: inntekt.arbeidOgFrilansInntekter || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              harInntektFraYtelse: inntekt.ytelseInntekter || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              ansattInntekt: `${inntekt.arbeidOgFrilansInntekter}`,
              ytelseInntekt: `${inntekt.ytelseInntekter}`,
          }
        : {};

    return (
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
    );
};

export default InntektForm;
