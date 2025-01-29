import { Alert, Bleed, BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateRangeFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { PeriodeMedInntekt } from '../../../../api/types';
import { useAppIntl } from '../../../../i18n';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { erAlleInntektSpørsmålBesvartOgGyldig, getInntektFromFormValues } from './inntektFormUtils';
import ArbeidstakerSpørsmål from './spørsmål/ArbeidstakerSpørsmål';
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
    harAnsattInntekt = 'harAnsattInntekt',
    harSNInntekt = 'harSNInntekt',
    harYtelseInntekt = 'harYtelseInntekt',
    ansattInntekt = 'ansattInntekt',
    snInntekt = 'snInntekt',
    ytelseInntekt = 'ytelseInntekt',
    bekrefterInntekt = 'bekrefterInntekt',
}

export interface InntektFormValues {
    [InntektFormFields.harAnsattInntekt]?: YesOrNo;
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
            <VStack gap="2" className="rounded-md bg-white p-8 shadow-large">
                <Heading level="2" size="medium">
                    Inntektskjema {gjelderEndring ? '(endring)' : null}
                </Heading>
                {inntektSendt ? (
                    <VStack gap="4">
                        <Alert variant="success">Inntekt for perioden er sendt</Alert>
                        <Box>
                            <Button variant="tertiary" onClick={() => window.location.reload()}>
                                Ok, oppdater side
                            </Button>
                        </Box>
                    </VStack>
                ) : (
                    <>
                        <BodyShort>
                            Spørsmålene nedenfor gjelder for perioden{' '}
                            {dateRangeFormatter.getDateRangeText(periode, intl.locale)}.
                        </BodyShort>

                        <Box marginBlock="4 0">
                            <FormikWrapper
                                initialValues={{}}
                                onSubmit={handleSubmit}
                                renderForm={({ values }) => {
                                    const harAnsattInntekt = values[InntektFormFields.harAnsattInntekt] === YesOrNo.YES;
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
                                            submitPending={pending}
                                            formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                            <FormLayout.Questions>
                                                <ArbeidstakerSpørsmål harAnsattInntekt={harAnsattInntekt} />
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
                        </Box>
                    </>
                )}
            </VStack>
        </Bleed>
    );
};

export default InntektForm;
