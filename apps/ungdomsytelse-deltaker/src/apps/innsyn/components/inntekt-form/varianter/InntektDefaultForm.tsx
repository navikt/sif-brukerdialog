import { FormLayout } from '@navikt/sif-common-ui';
import ArbeidstakerFrilanserSpørsmål from '../spørsmål/ArbeidstakerFrilanserSpørsmål';
import SelvstendigNæringsdrivendeSpørsmål from '../spørsmål/SelvstendigNæringsdrivendeSpørsmål';
import YtelseSpørsmål from '../spørsmål/YtelseSpørsmål';
import { InntektFormFields, InntektFormValues } from '../types';
import {
    erAlleInntektSpørsmålBesvartOgGyldig,
    getInntektFromFormValues,
    inntektFormComponents,
} from '../inntektFormUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import InntektOppsummering from '../../inntekt-oppsummering/InntektOppsummering';
import { DateRange } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

interface Props {
    periode: DateRange;
    values: InntektFormValues;
}

const InntektDefaultForm = ({ periode, values }: Props) => {
    const { ConfirmationCheckbox } = inntektFormComponents;
    const harArbeidstakerFrilanserInntekt = values[InntektFormFields.harArbeidstakerFrilanserInntekt] === YesOrNo.YES;
    const harSNInntekt = values[InntektFormFields.harSNInntekt] === YesOrNo.YES;
    const harYtelseInntekt = values[InntektFormFields.harYtelseInntekt] === YesOrNo.YES;

    const inntekt = erAlleInntektSpørsmålBesvartOgGyldig(values) ? getInntektFromFormValues(values) : undefined;

    return (
        <FormLayout.Questions>
            <ArbeidstakerFrilanserSpørsmål harArbeidstakerFrilanserInntekt={harArbeidstakerFrilanserInntekt} />

            <SelvstendigNæringsdrivendeSpørsmål harSNInntekt={harSNInntekt} />

            <YtelseSpørsmål harYtelseInntekt={harYtelseInntekt} />

            {inntekt ? (
                <ConfirmationCheckbox
                    name={InntektFormFields.bekrefterInntekt}
                    label="Jeg bekrefter at opplysningene er korrekte"
                    validate={getCheckedValidator()}>
                    <InntektOppsummering periode={periode} inntekt={getInntektFromFormValues(values)} />
                </ConfirmationCheckbox>
            ) : null}
        </FormLayout.Questions>
    );
};

export default InntektDefaultForm;
