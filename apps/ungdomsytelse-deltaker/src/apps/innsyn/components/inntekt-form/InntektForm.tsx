import { Alert, Bleed, BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, dateRangeFormatter, dateToISODate } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../../i18n';
import ArbeidstakerSpørsmål from './ArbeidstakerSpørsmål';
import SelvstendigNæringsdrivendeSpørsmål from './SelvstendigNæringsdrivendeSpørsmål';
import YtelseSpørsmål from './YtelseSpørsmål';
import { useRapporterInntekt } from '../../hooks/useRapporterInntekt';
import { PeriodeMedInntekt } from '../../../../api/types';

interface Props {
    deltakelseId: string;
    periode: DateRange;
    onCancel: () => void;
}

export enum InntektFormFields {
    harAnsattInntekt = 'harAnsattInntekt',
    harSNInntekt = 'harSNInntekt',
    harYtelseInntekt = 'harYtelseInntekt',
    ansattInntekt = 'ansattInntekt',
    snInntekt = 'snInntekt',
    ytelseInntekt = 'ytelseInntekt',
}

interface InntektFormValues {
    [InntektFormFields.harAnsattInntekt]?: YesOrNo;
    [InntektFormFields.harSNInntekt]?: YesOrNo;
    [InntektFormFields.harYtelseInntekt]?: YesOrNo;
    [InntektFormFields.ansattInntekt]?: string;
    [InntektFormFields.snInntekt]?: string;
    [InntektFormFields.ytelseInntekt]?: string;
}

export const inntektFormComponents = getTypedFormComponents<InntektFormFields, InntektFormValues, ValidationError>();

const { FormikWrapper, Form } = inntektFormComponents;

const InntektForm = ({ deltakelseId, periode, onCancel }: Props) => {
    const { intl } = useAppIntl();
    const { error, inntektSendt, pending, rapporterInntekt } = useRapporterInntekt();

    const onValidSubmit = (values: InntektFormValues) => {
        const harAnsattInntekt = values[InntektFormFields.harAnsattInntekt] === YesOrNo.YES;
        const harSNInntekt = values[InntektFormFields.harSNInntekt] === YesOrNo.YES;
        const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt] === YesOrNo.YES;

        const inntektAnsatt = harAnsattInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.ansattInntekt]) || 0
            : 0;
        const inntektSN = harSNInntekt ? getNumberFromNumberInputValue(values[InntektFormFields.snInntekt]) || 0 : 0;
        const inntektYtelse = harYtelseInntekt
            ? getNumberFromNumberInputValue(values[InntektFormFields.ytelseInntekt]) || 0
            : 0;

        const data: PeriodeMedInntekt = {
            fraOgMed: dateToISODate(periode.from),
            tilOgMed: dateToISODate(periode.to),
            inntektAnsatt,
            inntektSN,
            inntektYtelse,
            samletInntekt: inntektAnsatt + inntektSN + inntektYtelse,
            bekrefterInntekt: true,
        };
        rapporterInntekt(deltakelseId, data);
        console.log(values);
    };
    return (
        <Bleed marginInline="5">
            <VStack gap="2" className="rounded-md bg-white p-8 shadow-large">
                <Heading level="2" size="medium">
                    Inntektskjema
                </Heading>
                {inntektSendt ? (
                    <VStack gap="4">
                        <Alert variant="success">Inntekt for perioden er sendt</Alert>
                        <Box>
                            <Button variant="tertiary">Ok, oppdater side</Button>
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
                                onSubmit={onValidSubmit}
                                renderForm={({ values }) => {
                                    const harAnsattInntekt = values[InntektFormFields.harAnsattInntekt] === YesOrNo.YES;
                                    const harSNInntekt = values[InntektFormFields.harSNInntekt] === YesOrNo.YES;
                                    const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt] === YesOrNo.YES;

                                    return (
                                        <Form
                                            submitButtonLabel="Send inn inntekt"
                                            onCancel={onCancel}
                                            cancelButtonLabel="Avbryt"
                                            submitPending={pending}
                                            formErrorHandler={getIntlFormErrorHandler(intl, 'inntektForm.validation')}>
                                            <FormLayout.Questions>
                                                {/* Arbeidstaker */}
                                                <ArbeidstakerSpørsmål harAnsattInntekt={harAnsattInntekt} />

                                                {/* Selvstendig næringsdrivende */}
                                                <SelvstendigNæringsdrivendeSpørsmål harSNInntekt={harSNInntekt} />

                                                {/* Ytelse inntekt */}
                                                <YtelseSpørsmål harYtelseInntekt={harYtelseInntekt} />
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
