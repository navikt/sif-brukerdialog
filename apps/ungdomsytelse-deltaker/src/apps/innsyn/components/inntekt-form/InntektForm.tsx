import { Alert, BodyShort, Box, Button, Heading, ReadMore, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { DateRange, dateRangeFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { Inntekt, InntektsrapporteringDTO } from '../../../../api/types';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { InntektFormValues } from './types';
import { getInntektFromFormValues, inntektFormComponents } from './inntektFormUtils';
import InntektDefaultForm from './varianter/InntektDefaultForm';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import InntektTableForm from './varianter/InntektTableForm';

interface Props {
    inntekt?: Inntekt;
    periode: DateRange;
    gjelderEndring?: boolean;
    variant?: 'kompakt' | 'vanlig';
    kanEndreVariant?: boolean;
    onCancel: () => void;
}

const InntektForm = ({
    periode,
    inntekt,
    gjelderEndring,
    variant = 'vanlig',
    kanEndreVariant = true,
    onCancel,
}: Props) => {
    const { intl } = useAppIntl();
    const { error, inntektSendt, pending, rapporterInntekt } = useRapporterInntekt();
    const [kompakt, setKompakt] = useState(variant === 'kompakt');
    const { FormikWrapper, Form } = inntektFormComponents;

    const handleSubmit = (values: InntektFormValues) => {
        const inntekt = getInntektFromFormValues(values, kompakt);
        const data: InntektsrapporteringDTO = {
            oppgittInntektForPeriode: {
                periodeForInntekt: {
                    fraOgMed: dateToISODate(periode.from),
                    tilOgMed: dateToISODate(periode.to),
                },
                arbeidstakerOgFrilansInntekt: inntekt.arbeidstakerOgFrilansInntekt,
                inntektFraYtelse: inntekt.inntektFraYtelse,
                næringsinntekt: inntekt.næringsinntekt,
            },
            harBekreftetInntekt: values.bekrefterInntekt === true,
        };
        rapporterInntekt(data);
    };

    const initialValues: Partial<InntektFormValues> = inntekt
        ? {
              harArbeidstakerOgFrilansInntekt: inntekt.arbeidstakerOgFrilansInntekt || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              harNæringsinntekt: inntekt.næringsinntekt || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              harInntektFraYtelse: inntekt.inntektFraYtelse || 0 > 0 ? YesOrNo.YES : YesOrNo.NO,
              ansattInntekt: `${inntekt.arbeidstakerOgFrilansInntekt}`,
              snInntekt: `${inntekt.næringsinntekt}`,
              ytelseInntekt: `${inntekt.inntektFraYtelse}`,
          }
        : {};

    return (
        <>
            <VStack gap="2">
                {/* {kompakt ? null : ( */}
                <Heading level="2" size="small">
                    Inntektskjema {gjelderEndring ? '(endring)' : null}
                </Heading>
                {/* )} */}

                {kanEndreVariant ? (
                    <Switch
                        size="small"
                        value="kompakt"
                        onChange={(evt) => {
                            setKompakt(evt.target.checked);
                        }}
                        checked={kompakt}>
                        Vis kompakt skjema
                    </Switch>
                ) : null}
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
                    {!kompakt ? (
                        <VStack gap="2">
                            <BodyShort>
                                Spørsmålene nedenfor gjelder for perioden{' '}
                                {dateRangeFormatter.getDateRangeText(periode, intl.locale)}.
                            </BodyShort>
                            <ReadMore header="Les mer om inntekt">
                                Inntekten du skal oppgi er hva du har tjent i perioden. Dette er ikke det samme som hva
                                du har fått utbetalt. Hvis du er usikker på hva du skal oppgi, kan du se på lønnsslippen
                                din eller kontakte arbeidsgiveren din.
                            </ReadMore>
                        </VStack>
                    ) : null}

                    <FormikWrapper
                        initialValues={initialValues}
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
                                    <VStack gap="4">
                                        {kompakt ? (
                                            <InntektTableForm inntekt={getInntektFromFormValues(values, true)} />
                                        ) : (
                                            <InntektDefaultForm values={values} periode={periode} />
                                        )}

                                        {inntekt ? (
                                            <Alert variant="info" inline={true}>
                                                Når du endrer inntekt på tidligere perioder, vil Lorem ipsum dolor sit
                                                amet consectetur adipisicing elit. Voluptas cumque quo sunt.
                                            </Alert>
                                        ) : null}

                                        {error ? <Alert variant="error">{error}</Alert> : null}
                                    </VStack>
                                </Form>
                            );
                        }}
                    />
                </VStack>
            )}
        </>
    );
};

export default InntektForm;
