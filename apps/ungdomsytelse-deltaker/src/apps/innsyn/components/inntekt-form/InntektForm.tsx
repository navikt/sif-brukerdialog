import { Alert, Bleed, BodyShort, Box, Button, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateRangeFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { PeriodeMedInntekt } from '../../../../api/types';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { erAlleInntektSpørsmålBesvartOgGyldig, getInntektFromFormValues } from './inntektFormUtils';
import ArbeidstakerFrilanserSpørsmål from './spørsmål/ArbeidstakerFrilanserSpørsmål';
import SelvstendigNæringsdrivendeSpørsmål from './spørsmål/SelvstendigNæringsdrivendeSpørsmål';
import YtelseSpørsmål from './spørsmål/YtelseSpørsmål';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';

interface Props {
    deltakelseId: string;
    periode: DateRange;
    gjelderEndring?: boolean;
    onCancel: () => void;
}

export enum InntektFormFields {
    harArbeidstakerFrilanserInntekt = 'harArbeidstakerFrilanserInntekt',
    harSNInntekt = 'harSNInntekt',
    harYtelseInntekt = 'harYtelseInntekt',
    ansattInntekt = 'ansattInntekt',
    snInntekt = 'snInntekt',
    ytelseInntekt = 'ytelseInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harArbeidstakerFrilanserInntekt]?: YesOrNo;
    [InntektFormFields.harSNInntekt]?: YesOrNo;
    [InntektFormFields.harYtelseInntekt]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.snInntekt]?: string;
    [InntektFormFields.ytelseInntekt]?: string;
    [InntektFormFields.bekrefterInntekt]?: boolean;
}

export const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

const { FormikWrapper, Form, ConfirmationCheckbox } = inntektFormComponents;

const InntektForm = ({ deltakelseId, periode, gjelderEndring, onCancel }: Props) => {
    const { intl } = useAppIntl();
    const { error, inntektSendt, pending, rapporterInntekt } = useRapporterInntekt();

    const handleSubmit = (values: InntektFormValues) => {
        const inntekt = getInntektFromFormValues(values);
        const data: PeriodeMedInntekt = {
            ...inntekt,
            fraOgMed: dateToISODate(periode.from),
            tilOgMed: dateToISODate(periode.to),
            bekrefterInntekt: true,
        };
        rapporterInntekt(deltakelseId, data);
    };
    return (
        <Bleed marginInline="5">
            <VStack gap="4" className="rounded-md bg-white p-8 shadow-large">
                <Heading level="2" size="medium">
                    Inntektskjema {gjelderEndring ? '(endring)' : null}
                </Heading>
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

                        <FormikWrapper
                            initialValues={{}}
                            onSubmit={handleSubmit}
                            renderForm={({ values }) => {
                                const harArbeidstakerFrilanserInntekt =
                                    values[InntektFormFields.harArbeidstakerFrilanserInntekt] === YesOrNo.YES;
                                const harSNInntekt = values[InntektFormFields.harSNInntekt] === YesOrNo.YES;
                                const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt] === YesOrNo.YES;

                                const inntekt = erAlleInntektSpørsmålBesvartOgGyldig(values)
                                    ? getInntektFromFormValues(values)
                                    : undefined;
                                return (
                                    <Form
                                        submitButtonLabel="Send inn inntekt"
                                        onCancel={onCancel}
                                        cancelButtonLabel="Avbryt"
                                        includeValidationSummary={true}
                                        submitPending={pending}
                                        formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                        <FormLayout.Questions>
                                            <ArbeidstakerFrilanserSpørsmål
                                                harArbeidstakerFrilanserInntekt={harArbeidstakerFrilanserInntekt}
                                            />

                                            <SelvstendigNæringsdrivendeSpørsmål harSNInntekt={harSNInntekt} />

                                            <YtelseSpørsmål harYtelseInntekt={harYtelseInntekt} />

                                            {inntekt ? (
                                                <ConfirmationCheckbox
                                                    name={InntektFormFields.bekrefterInntekt}
                                                    label="Jeg bekrefter at opplysningene er korrekte"
                                                    validate={getCheckedValidator()}>
                                                    Samlet inntekt for perioden er{' '}
                                                    <FormattedNumber value={inntekt.samletInntekt} /> kr.{' '}
                                                </ConfirmationCheckbox>
                                            ) : null}
                                        </FormLayout.Questions>
                                        {error ? <Alert variant="error">{error}</Alert> : null}
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

export default InntektForm;
