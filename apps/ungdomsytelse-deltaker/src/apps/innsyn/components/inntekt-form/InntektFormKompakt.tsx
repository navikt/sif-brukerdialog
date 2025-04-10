import { Alert, Bleed, Box, Button, Heading, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { getInntektFromFormValues, inntektFormComponents } from './inntektFormUtils';
import { InntektFormFields, InntektFormValues } from './types';
import InntektDefaultForm from './varianter/InntektDefaultForm';
import InntektKompaktForm from './varianter/InntektKompaktForm';
import {
    UngdomsytelseInntektsrapportering,
    zUngdomsytelseInntektsrapportering,
} from '@navikt/k9-brukerdialog-prosessering-api';

interface Props {
    periode: DateRange;
    variant?: 'kompakt' | 'vanlig';
    onCancel: () => void;
}

const InntektFormKompakt = ({ periode, variant = 'kompakt', onCancel }: Props) => {
    const { intl } = useAppIntl();
    const { error, inntektSendt, pending, rapporterInntekt } = useRapporterInntekt();
    const [kompakt, setKompakt] = useState(variant === 'kompakt');
    const { FormikWrapper, Form, ConfirmationCheckbox } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const inntekt = getInntektFromFormValues(values, true);
        const data: UngdomsytelseInntektsrapportering = zUngdomsytelseInntektsrapportering.parse({
            oppgittInntektForPeriode: {
                periodeForInntekt: {
                    fraOgMed: dateToISODate(periode.from),
                    tilOgMed: dateToISODate(periode.to),
                },
                arbeidOgFrilansInntekter: inntekt.arbeidOgFrilansInntekter,
                ytelseInntekter: inntekt.ytelseInntekter,
            },
            harBekreftetInntekt: values.bekrefterInntekt === true,
        });
        rapporterInntekt(data);
    };

    return (
        <Bleed marginInline="5">
            <VStack gap="4" className="rounded-md bg-white p-8 shadow-small">
                <VStack gap="2">
                    <Heading level="2" size="medium">
                        Inntektskjema
                    </Heading>
                    <Switch
                        size="small"
                        value="kompakt"
                        onChange={(evt) => {
                            setKompakt(evt.target.checked);
                        }}
                        checked={kompakt}>
                        Vis kompakt skjema
                    </Switch>
                </VStack>

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
                            initialValues={{}}
                            onSubmit={handleSubmit}
                            renderForm={({ values }) => {
                                return (
                                    <Form
                                        submitButtonLabel="Send inn inntekt"
                                        onCancel={onCancel}
                                        cancelButtonLabel="Avbryt"
                                        includeValidationSummary={true}
                                        submitPending={pending}
                                        formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                        <VStack gap="8">
                                            {kompakt ? (
                                                <InntektKompaktForm values={values} periode={periode} />
                                            ) : (
                                                <InntektDefaultForm values={values} periode={periode} />
                                            )}
                                            <ConfirmationCheckbox
                                                name={InntektFormFields.bekrefterInntekt}
                                                label="Jeg bekrefter at opplysningene er korrekte"
                                                validate={getCheckedValidator()}></ConfirmationCheckbox>
                                            {error ? <Alert variant="error">{error}</Alert> : null}
                                        </VStack>
                                    </Form>
                                );
                            }}
                        />
                    </VStack>
                )}
            </VStack>
        </Bleed>
    );
};

export default InntektFormKompakt;
