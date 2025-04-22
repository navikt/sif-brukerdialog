import { FormLayout } from '@navikt/sif-common-ui';
import ArbeidstakerFrilanserSpørsmål from '../spørsmål/ArbeidstakerFrilanserSpørsmål';
import { InntektFormFields, InntektFormValues } from '../types';
import {
    erAlleInntektSpørsmålBesvartOgGyldig,
    getInntektFromFormValues,
    inntektFormComponents,
} from '../inntektFormUtils';
import { getCheckedValidator } from '@navikt/sif-validation';
import InntektOppsummering from '../../inntekt-oppsummering/InntektOppsummering';
import { DateRange } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

interface Props {
    periode: DateRange;
    values: InntektFormValues;
}

const InntektDefaultForm = ({ periode, values }: Props) => {
    const { ConfirmationCheckbox } = inntektFormComponents;
    const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;

    const inntekt = erAlleInntektSpørsmålBesvartOgGyldig(values) ? getInntektFromFormValues(values) : undefined;

    return (
        <FormLayout.Questions>
            <ArbeidstakerFrilanserSpørsmål
                harArbeidstakerOgFrilansInntekt={harArbeidstakerOgFrilansInntekt}
                periode={periode}
            />
            <ConfirmationCheckbox
                name={InntektFormFields.bekrefterInntekt}
                label="Jeg bekrefter at opplysningene er korrekte"
                validate={getCheckedValidator()}>
                {inntekt ? <InntektOppsummering periode={periode} inntekt={getInntektFromFormValues(values)} /> : null}
            </ConfirmationCheckbox>
        </FormLayout.Questions>
    );
};

export default InntektDefaultForm;
