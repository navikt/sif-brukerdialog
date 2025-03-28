import { FormLayout } from '@navikt/sif-common-ui';
import ArbeidstakerFrilanserSpørsmål from '../spørsmål/ArbeidstakerFrilanserSpørsmål';
import YtelseSpørsmål from '../spørsmål/YtelseSpørsmål';
import { InntektFormFields, InntektFormValues } from '../types';
import {
    erAlleInntektSpørsmålBesvartOgGyldig,
    getInntektFromFormValues,
    inntektFormComponents,
} from '../inntektFormUtils';
import { getCheckedValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import InntektOppsummering from '../../inntekt-oppsummering/InntektOppsummering';
import { DateRange, dateRangeFormatter } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { useAppIntl } from '../../../../../i18n';

interface Props {
    periode: DateRange;
    values: InntektFormValues;
}

const { YesOrNoQuestion } = inntektFormComponents;

const InntektDefaultForm = ({ periode, values }: Props) => {
    const { intl } = useAppIntl();
    const { ConfirmationCheckbox } = inntektFormComponents;
    const harArbeidstakerOgFrilansInntekt = values[InntektFormFields.harArbeidstakerOgFrilansInntekt] === YesOrNo.YES;
    const harInntektFraYtelse = values[InntektFormFields.harInntektFraYtelse] === YesOrNo.YES;

    const inntekt = erAlleInntektSpørsmålBesvartOgGyldig(values) ? getInntektFromFormValues(values) : undefined;

    const harHattInntektSvar = values[InntektFormFields.harHattInntekt];
    const harHattInntekt = harHattInntektSvar === YesOrNo.YES;
    const harIkkeHattInntekt = harHattInntektSvar === YesOrNo.NO;
    const periodetekst = dateRangeFormatter.getDateRangeText(periode, intl.locale);

    return (
        <FormLayout.Questions>
            <YesOrNoQuestion
                name={InntektFormFields.harHattInntekt}
                legend={`Har du hatt inntekt eller mottatt ytelser fra Nav i perioden ${periodetekst}?`}
                validate={getYesOrNoValidator()}
            />
            {harHattInntekt ? (
                <>
                    <ArbeidstakerFrilanserSpørsmål harArbeidstakerOgFrilansInntekt={harArbeidstakerOgFrilansInntekt} />

                    <YtelseSpørsmål harInntektFraYtelse={harInntektFraYtelse} />
                </>
            ) : null}

            {inntekt || harIkkeHattInntekt ? (
                <ConfirmationCheckbox
                    name={InntektFormFields.bekrefterInntekt}
                    label="Jeg bekrefter at opplysningene er korrekte"
                    validate={getCheckedValidator()}>
                    {inntekt ? (
                        <InntektOppsummering periode={periode} inntekt={getInntektFromFormValues(values)} />
                    ) : null}
                </ConfirmationCheckbox>
            ) : null}
        </FormLayout.Questions>
    );
};

export default InntektDefaultForm;
