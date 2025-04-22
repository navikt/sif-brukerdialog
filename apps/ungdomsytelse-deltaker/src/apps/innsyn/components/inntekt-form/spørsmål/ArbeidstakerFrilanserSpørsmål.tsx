import { Box, ReadMore } from '@navikt/ds-react';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { FormLayout } from '@navikt/sif-common-ui';
import { inntektFormComponents } from '../inntektFormUtils';
import { InntektFormFields } from '../types';
import { DateRange, dateRangeFormatter } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../../../i18n';

interface Props {
    harArbeidstakerOgFrilansInntekt: boolean;
    periode: DateRange;
}

const ArbeidstakerFrilanserSpørsmål = ({ harArbeidstakerOgFrilansInntekt, periode }: Props) => {
    const { intl } = useAppIntl();
    const { YesOrNoQuestion, NumberInput } = inntektFormComponents;
    const periodetekst = dateRangeFormatter.getDateRangeText(periode, intl.locale);
    return (
        <>
            <YesOrNoQuestion
                name={InntektFormFields.harArbeidstakerOgFrilansInntekt}
                legend={`Har du hatt inntekt som arbeidstaker eller frilanser i perioden ${periodetekst}?`}
                validate={getYesOrNoValidator()}
                description={
                    <ReadMore header="Hva er inntekt som arbeidstaker eller frilanser?">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam quisquam eum enim cum.
                        Consequuntur aspernatur itaque quasi porro! Optio tempora a, id ipsa incidunt aliquid sequi aut
                        non deserunt?
                    </ReadMore>
                }
            />

            {harArbeidstakerOgFrilansInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <Box className=" bg-deepblue-50 p-6 rounded-md">
                        <NumberInput
                            name={InntektFormFields.ansattInntekt}
                            label="Oppgi i hele kroner hvor mye du har hatt i inntekt som arbeidstaker eller frilanser i perioden."
                            integerValue={true}
                            validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
                        />
                    </Box>
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default ArbeidstakerFrilanserSpørsmål;
