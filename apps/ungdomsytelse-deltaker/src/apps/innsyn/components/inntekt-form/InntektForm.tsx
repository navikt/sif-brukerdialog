import { VStack } from '@navikt/ds-react';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { getIntlFormErrorHandler, YesOrNo } from '@navikt/sif-common-formik-ds';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { Inntekt } from '@navikt/ung-common';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/api/useRapporterInntekt';
import { getInntektFromFormValues, inntektFormComponents } from './inntektFormUtils';
import { InntektFormValues } from './types';
import InntektDefaultForm from './varianter/InntektDefaultForm';

interface Props {
    inntekt?: Inntekt;
    periode: DateRange;
    onSuccess: (data: UngdomsytelseInntektsrapportering) => void;
    onCancel: () => void;
}

const InntektForm = ({ periode, inntekt, onCancel, onSuccess }: Props) => {
    const { intl } = useAppIntl();
    const { error, isPending, mutateAsync } = useRapporterInntekt();
    const { FormikWrapper, Form } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const nyInntekt = getInntektFromFormValues(values, false);
        const data: UngdomsytelseInntektsrapportering = {
            oppgittInntektForPeriode: {
                periodeForInntekt: {
                    fraOgMed: dateToISODate(periode.from),
                    tilOgMed: dateToISODate(periode.to),
                },
                arbeidstakerOgFrilansInntekt: nyInntekt.arbeidOgFrilansInntekter,
            },
            harBekreftetInntekt: values.bekrefterInntekt === true,
        };
        mutateAsync(data).then(() => onSuccess(data));
    };

    const initialValues: Partial<InntektFormValues> = inntekt
        ? {
              harArbeidstakerOgFrilansInntekt: inntekt.arbeidOgFrilansInntekter || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              ansattInntekt: `${inntekt.arbeidOgFrilansInntekter}`,
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
                            submitPending={isPending}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                            <VStack gap="4">
                                <InntektDefaultForm values={values} periode={periode} />
                                {error ? <ApiErrorAlert error={error} /> : null}
                            </VStack>
                        </Form>
                    );
                }}
            />
        </VStack>
    );
};

export default InntektForm;
